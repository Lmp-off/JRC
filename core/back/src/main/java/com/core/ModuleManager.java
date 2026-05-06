package com.core;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class ModuleManager {
    
    private final Map<String, ModuleProcess> modules = new ConcurrentHashMap<>();
    
    public void startModule(String moduleType) throws IOException {
        // Путь к исполняемому файлу модуля
        String modulePath = switch (moduleType) {
            case "ssh" -> "./modules/ssh-module.jar";
            case "llm" -> "./modules/llm-module";
            default -> throw new IllegalArgumentException("Unknown module: " + moduleType);
        };
        
        // Запускаем процесс
        ProcessBuilder pb = new ProcessBuilder("java", "-jar", modulePath);
        Process process = pb.start();
        
        // Получаем PID
        long pid = process.pid();
        
        // Назначаем порт (можно передать аргументом)
        int port = findFreePort();
        
        // Сохраняем информацию
        ModuleProcess module = new ModuleProcess();
        module.setModuleId(moduleType + "-" + pid);
        module.setGroup(moduleType.toUpperCase() + "_PROVIDER");
        module.setProcess(process);
        module.setPid(pid);
        module.setPort(port);
        module.setEndpoint("http://localhost:" + port);
        
        modules.put(module.getModuleId(), module);
        
        // Регистрируем в реестре ядра
        registerInKernel(module);
        
        // Мониторим процесс в отдельном потоке
        monitorProcess(module);
    }
    
    private void monitorProcess(ModuleProcess module) {
        CompletableFuture.runAsync(() -> {
            try {
                int exitCode = module.getProcess().waitFor();
                System.err.println("Module " + module.getModuleId() + " exited with code " + exitCode);
                
                // Удаляем из реестра
                modules.remove(module.getModuleId());
                unregisterFromKernel(module);
                
                // Перезапускаем?
                if (exitCode != 0) {
                    restartModule(module.getModuleId());
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }
}

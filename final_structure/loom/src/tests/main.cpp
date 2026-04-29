//g++ -std=c++17     src/core/loom.cpp     src/discovery/cache.cpp     src/core/server_core_api.cpp     src/connection/local/uds.cpp     src/tests/main.cpp src/global.cpp     -o test -pthread

/*
---------------------
!AUTO GENERATED TEST!
---------------------
*/

#include "../../include/loom.h"
#include <iostream>
#include <csignal>
#include <unistd.h>
#include <string>
#include <thread>

bool keep_running = true;

void signal_handler(int sig) {
    std::cout << "\n🛑 Получен сигнал " << sig << ", остановка..." << std::endl;
    stop();
    keep_running = false;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Использование: ./test <имя_модуля>" << std::endl;
        std::cerr << "Пример: ./test t1   (в другом терминале ./test t2)" << std::endl;
        return 1;
    }
    
    std::string module_name = argv[1];
    
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
    signal(SIGPIPE, SIG_IGN);
    
    std::cout << "🚀 Запуск модуля: " << module_name << std::endl;
    start(module_name.c_str());
    
    if (module_name == "t1") {
        std::cout << "🔍 Поиск модуля t2..." << std::endl;
        use_module_direct("t2");
    } else if (module_name == "t2") {
        std::cout << "🔍 Поиск модуля t1..." << std::endl;
        use_module_direct("t1");
    }
    
    std::thread sender_thread([&module_name]() {
        int counter = 0;
        while (keep_running) {
            sleep(3);
            
            if (module_name == "t1") {
                std::string msg = "Привет от t1 #" + std::to_string(++counter);
                std::cout << "📤 Отправка t1 -> t2: " << msg << std::endl;
                module_send("t2", msg.c_str());
            } else if (module_name == "t2") {
                std::string msg = "Привет от t2 #" + std::to_string(++counter);
                std::cout << "📤 Отправка t2 -> t1: " << msg << std::endl;
                module_send("t1", msg.c_str());
            }
        }
    });
    
    sender_thread.detach();
    
    std::cout << "✅ Модуль " << module_name << " готов. Ожидание сообщений..." << std::endl;
    
    while (keep_running) {
        sleep(1);
    }
    
    std::cout << "👋 Завершение модуля " << module_name << std::endl;
    return 0;
}
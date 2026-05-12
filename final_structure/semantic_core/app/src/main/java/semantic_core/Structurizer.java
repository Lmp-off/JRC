package semantic_core;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;

public class Structurizer {

    private static final String[] FOLDERS = {
            "JSC",
            "JSC/data",
            "JSC/cache", 
            "JSC/logs",
            "JSC/config",
            "JSC/modules"
        };

    public static void start() throws StructException{
        Path currentDir = Paths.get(System.getProperty("user.dir"));
        
        for (String folder : FOLDERS) {
            try{
                createFolder(currentDir, folder);
            }
            catch(Exception e){
                throw new StructException("**bad structure**");
            }
        }
    }
    public static void clearAndStart() throws StructException{
        Path currentDir = Paths.get(System.getProperty("user.dir"));
        
        for (String folder : FOLDERS) {
            try{
                deleteFolder(currentDir, folder);
                createFolder(currentDir, folder);
            }
            catch(Exception e){
                throw new StructException("**bad structure**");
            }
        }
    }

    private static void createFolder(Path path, String name){
        Path npath = path.resolve(name);
        
        if (!Files.exists(npath)){
            try {
                Files.createDirectory(npath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void deleteFolder(Path path, String name){
        Path npath = path.resolve(name);
        
        if (Files.exists(npath)){
            try {
                Files.walk(npath)
                    .sorted(Comparator.reverseOrder())
                    .forEach(p -> {
                        try {
                            Files.deleteIfExists(p);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
}
class StructException extends Exception{
        public StructException (){}
        
        public StructException (String message){
            super(message);
        }
    }

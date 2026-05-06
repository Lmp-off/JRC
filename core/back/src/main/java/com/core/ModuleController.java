package com.core;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ModuleController {

    @RequestMapping("/modules")
    public List<Module> getModules(){
        return List.of(
            new Module("SVRS", "server module"),
            new Module("AICT", "assistant chat")
        );
    }
}

package com.core.servers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/servers")
public class ServerController {

    @GetMapping("/data")
    public List<ServerData> getdata(){
        return List.of(new ServerData("1", "lcorps1","123", "active", false, ""));
    }

    @PostMapping("/add/connection/ssh")
    public ResponseEntity<?> addSSH(
        @RequestBody String ip,
        @RequestBody String username,
        @RequestBody String password
    ){
        try{
            return ResponseEntity.ok().build();
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

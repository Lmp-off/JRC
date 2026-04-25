//g++ -std=c++17 src/core/loom.cpp src/tests/main.cpp -o test && ./test
#include "../../include/loom.h"


#include <iostream>
#include <unistd.h>
#include "string"
#include <thread>
#include <atomic>

static std::atomic<bool> g_running(true);
static std::thread g_event_loop_thread;

void event_loop(){
    std::cout<<"started module + {name}"<<"\n";
    
    while (1){
        sleep(1);
        std::cout<<"still running"<<"\n";
    }
}

int start(){
    g_event_loop_thread = std::thread(event_loop);

    return 0;
}

#include "metalogger.h"
#include <iostream>
#include <ctime>

namespace metalog{


bool g_logger_active = true;
LogLevel g_logger_level = LOG_INFO;

void logger_init(bool active, LogLevel level) {
    g_logger_active = active;
    g_logger_level = level;
}

void toggle_logger(bool activate) {
    g_logger_active = activate;
}

void set_logger_level(LogLevel level) {
    g_logger_level = level;
}

void write_log(const std::string& s, LogLevel lv) {
    if (!g_logger_active) return;
    if (lv > g_logger_level) return;
    
    const char* level_names[] = {"[ERROR]", "[WARN] ", "[INFO] ", "[DEBUG]", "[TRACE]"};
    
    time_t now = time(nullptr);
    struct tm* tm_info = localtime(&now);
    char time_buf[20];
    strftime(time_buf, sizeof(time_buf), "%H:%M:%S", tm_info);
    
    std::cout << "[" << time_buf << "] " << level_names[lv] << " " << s << std::endl;
}

}
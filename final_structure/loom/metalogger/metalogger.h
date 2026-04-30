#ifndef METALOGGER_H
#define METALOGGER_H

#include <string>

namespace metalog {

enum LogLevel {
    LOG_ERROR,
    LOG_WARNING,
    LOG_INFO,
    LOG_DEBUG,
    LOG_TRACE
};

extern bool g_logger_active;
extern LogLevel g_logger_level;

void logger_init(bool active, LogLevel level);
void toggle_logger(bool activate);
void set_logger_level(LogLevel level);
void write_log(const std::string& s, LogLevel lv);

#define METALOG_ERROR(msg) write_log(msg, metalog::LOG_ERROR)
#define METALOG_WARNING(msg) write_log(msg, metalog::LOG_WARNING)
#define METALOG_INFO(msg) write_log(msg, metalog::LOG_INFO)
#define METALOG_DEBUG(msg) write_log(msg, metalog::LOG_DEBUG)
#define METALOG_TRACE(msg) write_log(msg, metalog::LOG_TRACE)

}

#endif
#ifndef LOOM_H
#define LOOM_H

#include <cstdint>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

uint8_t start(const char* module_name);
uint8_t stop(void);
uint8_t use_module_direct(const char* module_name);
uint8_t use_module(const char* description, const char* as_name);
void module_send(const char* module_name, const char* message);

#ifdef __cplusplus
}
#endif

#endif
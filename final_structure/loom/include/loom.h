#ifndef LOOM_H
#define LOOM_H

#ifdef __cplusplus
extern "C" {
#endif

int start(void);
bool find(const char* description);
bool find_by_name(const char* module_name);

#ifdef __cplusplus
}
#endif

#endif
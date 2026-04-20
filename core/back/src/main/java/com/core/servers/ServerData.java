package com.core.servers;

public record ServerData(
    String id,
    String name,
    String ip,
    String state,
    Boolean ssh,
    String description
) {}

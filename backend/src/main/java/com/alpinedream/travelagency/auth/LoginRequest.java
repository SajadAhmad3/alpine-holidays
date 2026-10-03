package com.alpinedream.travelagency.auth;

public record LoginRequest(
    String username,
    String password) {
}

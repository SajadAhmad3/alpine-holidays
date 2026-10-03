package com.alpinedream.travelagency.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {

  private final AdminUserRepository adminUserRepository;
  private final PasswordEncoder passwordEncoder;

  public AdminUserService(
      AdminUserRepository adminUserRepository,
      PasswordEncoder passwordEncoder) {

    this.adminUserRepository = adminUserRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public boolean authenticate(
      String username,
      String password) {

    return adminUserRepository
        .findByUsername(username)
        .map(admin -> passwordEncoder.matches(
            password,
            admin.getPasswordHash()))
        .orElse(false);
  }
}

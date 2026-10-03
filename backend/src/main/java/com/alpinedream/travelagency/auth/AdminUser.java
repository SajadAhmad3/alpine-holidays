package com.alpinedream.travelagency.auth;

import jakarta.persistence.*;

@Entity
@Table(name = "admin_users")
public class AdminUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String username;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  protected AdminUser() {
  }

  public AdminUser(String username, String passwordHash) {
    this.username = username;
    this.passwordHash = passwordHash;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getPasswordHash() {
    return passwordHash;
  }
}

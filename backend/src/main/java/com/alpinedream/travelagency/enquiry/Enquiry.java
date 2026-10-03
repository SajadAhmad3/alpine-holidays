package com.alpinedream.travelagency.enquiry;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enquiries")
public class Enquiry {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String email;

  private String phone;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String message;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private EnquiryStatus status;

  protected Enquiry() {
  }

  public Enquiry(
      String name,
      String email,
      String phone,
      String message) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.createdAt = LocalDateTime.now();
    this.status = EnquiryStatus.NEW;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getPhone() {
    return phone;
  }

  public String getMessage() {
    return message;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public EnquiryStatus getStatus() {
    return status;
  }

  public void setStatus(EnquiryStatus status) {
    this.status = status;
  }
}

package com.alpinedream.travelagency.offer;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "offers")
public class Offer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 150)
  private String name;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String description;

  @Column(nullable = false)
  private Integer days;

  @Column(nullable = false)
  private Integer nights;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal price;

  @Column(name = "location_summary", nullable = false)
  private String locationSummary;

  @Column(name = "image_url", nullable = false, columnDefinition = "TEXT")
  private String imageUrl;

  @Column(nullable = false)
  private Boolean active;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt;

  @Column(nullable = false)
  private Boolean featured;

  protected Offer() {
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public Integer getDays() {
    return days;
  }

  public Integer getNights() {
    return nights;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public String getLocationSummary() {
    return locationSummary;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public Boolean getActive() {
    return active;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setDays(Integer days) {
    this.days = days;
  }

  public void setNights(Integer nights) {
    this.nights = nights;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public void setLocationSummary(String locationSummary) {
    this.locationSummary = locationSummary;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public Boolean getFeatured() {
    return featured;
  }

  public void setFeatured(Boolean featured) {
    this.featured = featured;
  }
}

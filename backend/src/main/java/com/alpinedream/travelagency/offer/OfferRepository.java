package com.alpinedream.travelagency.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;
import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {

  List<Offer> findByActiveTrue();

  @Query("""
      SELECT o
      FROM Offer o
      WHERE o.active = true
        AND o.featured = true
      """)
  Optional<Offer> findFeaturedActiveOffer();

  @Modifying
  @Query("""
      UPDATE Offer o
      SET o.featured = false
      WHERE o.featured = true
      """)
  void clearFeatured();
}

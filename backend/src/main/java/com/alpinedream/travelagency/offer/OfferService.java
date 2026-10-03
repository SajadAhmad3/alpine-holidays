package com.alpinedream.travelagency.offer;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OfferService {

  private final OfferRepository offerRepository;

  public OfferService(OfferRepository offerRepository) {
    this.offerRepository = offerRepository;
  }

  public List<Offer> getAllOffers() {
    return offerRepository.findAll();
  }

  public FeaturedOfferResponse getFeaturedOffer() {

    Offer offer = offerRepository.findFeaturedActiveOffer()
        .orElseThrow(() -> new IllegalStateException("No active offers available"));

    return new FeaturedOfferResponse(
        offer.getId(),
        offer.getName(),
        offer.getDescription(),
        offer.getDays(),
        offer.getNights(),
        offer.getPrice(),
        offer.getLocationSummary(),
        offer.getImageUrl());
  }

  public Offer createOffer(CreateOfferRequest request) {

    Offer offer = new Offer();

    offer.setName(request.name());
    offer.setDescription(request.description());
    offer.setDays(request.days());
    offer.setNights(request.nights());
    offer.setPrice(request.price());
    offer.setLocationSummary(request.locationSummary());
    offer.setImageUrl(request.imageUrl());
    offer.setActive(request.active());
    offer.setCreatedAt(LocalDateTime.now());

    return offerRepository.save(offer);
  }

  public Offer updateOffer(Long id, CreateOfferRequest request) {

    Offer offer = offerRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Offer not found"));

    offer.setName(request.name());
    offer.setDescription(request.description());
    offer.setDays(request.days());
    offer.setNights(request.nights());
    offer.setPrice(request.price());
    offer.setLocationSummary(request.locationSummary());
    offer.setImageUrl(request.imageUrl());
    offer.setActive(request.active());

    return offerRepository.save(offer);
  }

  public Offer updateOfferActive(Long id, boolean active) {

    Offer offer = offerRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Offer not found"));

    offer.setActive(active);

    return offerRepository.save(offer);
  }

  @Transactional
  public Offer setFeatured(Long id) {

    Offer offer = offerRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Offer not found"));

    if (!offer.getActive()) {
      throw new IllegalStateException(
          "An inactive offer cannot be featured");
    }

    offerRepository.clearFeatured();

    offer.setFeatured(true);

    return offerRepository.save(offer);
  }

  public void deleteOffer(Long id) {
    Offer offer = offerRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Offer not found"));

    offerRepository.delete(offer);
  }
}

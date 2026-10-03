package com.alpinedream.travelagency.offer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

  private final OfferService offerService;

  public OfferController(OfferService offerService) {
    this.offerService = offerService;
  }

  @GetMapping
  public List<Offer> getAllOffers() {
    return offerService.getAllOffers();
  }

  @GetMapping("/featured")
  public FeaturedOfferResponse getFeaturedOffer() {
    return offerService.getFeaturedOffer();
  }
}

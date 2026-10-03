package com.alpinedream.travelagency.offer;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/offers")
public class AdminOfferController {

  private final OfferService offerService;

  public AdminOfferController(OfferService offerService) {
    this.offerService = offerService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Offer createOffer(
      @RequestBody CreateOfferRequest request) {

    return offerService.createOffer(request);
  }

  @PutMapping("/{id}")
  public Offer updateOffer(
      @PathVariable Long id,
      @Valid @RequestBody CreateOfferRequest request) {

    return offerService.updateOffer(id, request);
  }

  @PutMapping("/{id}/active")
  public Offer updateOfferActive(
      @PathVariable Long id,
      @RequestParam boolean active) {

    return offerService.updateOfferActive(id, active);
  }

  @PostMapping("/{id}/featured")
  public Offer setFeatured(
      @PathVariable Long id) {

    return offerService.setFeatured(id);
  }

  @DeleteMapping("/{id}")
  public void DeleteOffer(@PathVariable Long id) {
    offerService.deleteOffer(id);
  }
}

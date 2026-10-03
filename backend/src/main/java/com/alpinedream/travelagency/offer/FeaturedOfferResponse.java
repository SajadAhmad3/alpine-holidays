package com.alpinedream.travelagency.offer;

import java.math.BigDecimal;

public record FeaturedOfferResponse(
    Long id,
    String name,
    String description,
    Integer days,
    Integer nights,
    BigDecimal price,
    String locationSummary,
    String imageUrl) {
}

package com.alpinedream.travelagency.offer;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateOfferRequest(
    @NotBlank String name,

    @NotBlank String description,

    @NotNull @Min(1) Integer days,

    @NotNull @Min(0) Integer nights,

    @NotNull @DecimalMin("0.0") BigDecimal price,

    @NotBlank String locationSummary,

    @NotBlank String imageUrl,

    @NotNull Boolean active) {
}

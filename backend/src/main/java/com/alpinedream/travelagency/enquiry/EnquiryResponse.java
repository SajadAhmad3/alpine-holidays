package com.alpinedream.travelagency.enquiry;

import java.time.LocalDateTime;

public record EnquiryResponse(
    Long id,
    String name,
    String email,
    String phone,
    String message,
    LocalDateTime createdAt,
    EnquiryStatus status) {
}

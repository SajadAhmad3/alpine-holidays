package com.alpinedream.travelagency.enquiry;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

  private final EnquiryService enquiryService;

  public EnquiryController(EnquiryService enquiryService) {
    this.enquiryService = enquiryService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Enquiry createEnquiry(
      @Valid @RequestBody CreateEnquiryRequest request) {

    return enquiryService.createEnquiry(request);
  }
}

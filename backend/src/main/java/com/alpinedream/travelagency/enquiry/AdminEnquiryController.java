package com.alpinedream.travelagency.enquiry;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/enquiries")
public class AdminEnquiryController {

  private final EnquiryService enquiryService;

  public AdminEnquiryController(EnquiryService enquiryService) {
    this.enquiryService = enquiryService;
  }

  @GetMapping
  public List<EnquiryResponse> getAllEnquiries() {
    return enquiryService.getAllEnquiries();
  }

  @PatchMapping("/{id}/status")
  public Enquiry updateStatus(
      @PathVariable Long id,
      @RequestBody UpdateEnquiryStatusRequest request) {

    return enquiryService.updateStatus(
        id,
        request.status());
  }

  @DeleteMapping("/{id}")
  public void DeleteEnquiry(@PathVariable Long id) {
    enquiryService.deleteEnquiry(id);
  }
}

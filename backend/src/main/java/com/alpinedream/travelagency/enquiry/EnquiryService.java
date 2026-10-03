package com.alpinedream.travelagency.enquiry;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnquiryService {

  private final EnquiryRepository enquiryRepository;

  public EnquiryService(EnquiryRepository enquiryRepository) {
    this.enquiryRepository = enquiryRepository;
  }

  public Enquiry createEnquiry(CreateEnquiryRequest request) {

    String email = request.email() == null
        ? null
        : request.email().trim();

    String phone = request.phone() == null || request.phone().isBlank()
        ? null
        : request.phone().trim();

    String message = request.message() == null
        ? null
        : request.message().trim();

    List<Enquiry> duplicates = enquiryRepository.findDuplicates(email, phone, message);

    if (!duplicates.isEmpty()) {
      return duplicates.get(0);
    }

    Enquiry enquiry = new Enquiry(
        request.name().trim(),
        email,
        phone,
        message);

    return enquiryRepository.save(enquiry);
  }

  public List<EnquiryResponse> getAllEnquiries() {
    return enquiryRepository.findAll()
        .stream()
        .map(enquiry -> new EnquiryResponse(
            enquiry.getId(),
            enquiry.getName(),
            enquiry.getEmail(),
            enquiry.getPhone(),
            enquiry.getMessage(),
            enquiry.getCreatedAt(),
            enquiry.getStatus()))
        .toList();
  }

  public Enquiry updateStatus(Long id, EnquiryStatus status) {
    Enquiry enquiry = enquiryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Enquiry not found"));

    enquiry.setStatus(status);

    return enquiryRepository.save(enquiry);
  }

  public void deleteEnquiry(Long id) {
    Enquiry enquiry = enquiryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Enquiry not found"));

    enquiryRepository.delete(enquiry);

  }

}

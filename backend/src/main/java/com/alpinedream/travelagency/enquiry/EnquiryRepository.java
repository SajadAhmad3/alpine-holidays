package com.alpinedream.travelagency.enquiry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

  @Query("""
      SELECT e
      FROM Enquiry e
      WHERE LOWER(TRIM(e.email)) = LOWER(TRIM(:email))
        AND TRIM(e.message) = TRIM(:message)
        AND (
          (:phone IS NULL AND e.phone IS NULL)
          OR TRIM(e.phone) = TRIM(:phone)
        )
      ORDER BY e.createdAt ASC
      """)
  List<Enquiry> findDuplicates(
      @Param("email") String email,
      @Param("phone") String phone,
      @Param("message") String message);
}

package com.alpinedream.travelagency.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

  private final SecretKey secretKey;

  public JwtService(
      @Value("${jwt.secret}") String secret) {

    this.secretKey = Keys.hmacShaKeyFor(
        secret.getBytes(StandardCharsets.UTF_8));
  }

  public String generateToken(String username) {

    Date now = new Date();

    Date expiration = new Date(
        now.getTime() + 1000L * 60 * 60 * 8);

    return Jwts.builder()
        .subject(username)
        .issuedAt(now)
        .expiration(expiration)
        .signWith(secretKey)
        .compact();
  }

  public String extractUsername(String token) {

    return Jwts.parser()
        .verifyWith(secretKey)
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  public boolean isValid(String token) {

    try {
      Jwts.parser()
          .verifyWith(secretKey)
          .build()
          .parseSignedClaims(token);

      return true;

    } catch (Exception e) {
      return false;
    }
  }
}

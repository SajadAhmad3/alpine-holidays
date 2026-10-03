package com.alpinedream.travelagency.config;

import com.alpinedream.travelagency.auth.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;

  public SecurityConfig(
      JwtAuthenticationFilter jwtAuthenticationFilter) {

    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
  }

  @Bean
  SecurityFilterChain securityFilterChain(
      HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())

        .cors(cors -> cors.configurationSource(request -> {
          var config = new org.springframework.web.cors.CorsConfiguration();

          config.setAllowedOrigins(java.util.List.of("http://localhost:3000"));
          config.setAllowedMethods(java.util.List.of(
              "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
          config.setAllowedHeaders(java.util.List.of("*"));

          return config;
        }))
        .sessionManagement(session -> session.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS))

        .authorizeHttpRequests(auth -> auth

            .requestMatchers(
                "/api/offers",
                "/api/offers/featured",
                "/api/enquiries",
                "/api/chat",
                "/api/auth/login")
            .permitAll()

            .requestMatchers("/api/admin/**")
            .authenticated()

            .anyRequest()
            .permitAll())

        .addFilterBefore(
            jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}

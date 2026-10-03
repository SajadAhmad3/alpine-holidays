package com.alpinedream.travelagency.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AdminUserService adminUserService;
  private final JwtService jwtService;

  public AuthController(
      AdminUserService adminUserService,
      JwtService jwtService) {

    this.adminUserService = adminUserService;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  public LoginResponse login(
      @RequestBody LoginRequest request) {

    boolean authenticated = adminUserService.authenticate(
        request.username(),
        request.password());

    if (!authenticated) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED,
          "Invalid username or password");
    }

    // JWT comes next.
    String token = jwtService.generateToken(request.username());

    return new LoginResponse(token);
  }
}

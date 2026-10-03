package com.alpinedream.travelagency.chat;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

  private final ChatService chatService;
  private final ChatRateLimiter chatRateLimiter;

  public ChatController(
      ChatService chatService,
      ChatRateLimiter chatRateLimiter) {

    this.chatService = chatService;
    this.chatRateLimiter = chatRateLimiter;
  }

  @PostMapping
  public String chat(
      @Valid @RequestBody ChatRequest request,
      HttpServletRequest httpRequest) {

    String ipAddress = httpRequest.getRemoteAddr();

    if (!chatRateLimiter.allow(ipAddress)) {
      throw new ResponseStatusException(
          HttpStatus.TOO_MANY_REQUESTS,
          "Chat request limit reached. Please try again later.");
    }

    return chatService.chat(
        request.message(),
        request.history());
  }
}

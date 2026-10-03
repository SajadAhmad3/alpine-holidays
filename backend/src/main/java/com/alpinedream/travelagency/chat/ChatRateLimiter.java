package com.alpinedream.travelagency.chat;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ChatRateLimiter {

  private static final int MAX_REQUESTS_PER_IP = 3;
  private static final int MAX_GLOBAL_REQUESTS_PER_DAY = 10;

  private final Map<String, RequestWindow> ipRequests = new ConcurrentHashMap<>();

  private LocalDate currentDay = LocalDate.now();
  private final AtomicInteger globalRequests = new AtomicInteger(0);

  public synchronized boolean allow(String ipAddress) {

    resetIfNewDay();

    if (globalRequests.get() >= MAX_GLOBAL_REQUESTS_PER_DAY) {
      return false;
    }

    RequestWindow window = ipRequests.computeIfAbsent(
        ipAddress,
        key -> new RequestWindow());

    if (window.isExpired()) {
      window.reset();
    }

    if (window.count >= MAX_REQUESTS_PER_IP) {
      return false;
    }

    window.count++;
    globalRequests.incrementAndGet();

    return true;
  }

  private void resetIfNewDay() {

    LocalDate today = LocalDate.now();

    if (!today.equals(currentDay)) {
      currentDay = today;
      globalRequests.set(0);
      ipRequests.clear();
    }
  }

  private static class RequestWindow {

    private int count = 0;
    private LocalDateTime startedAt = LocalDateTime.now();

    private boolean isExpired() {
      return startedAt.plusHours(1).isBefore(LocalDateTime.now());
    }

    private void reset() {
      count = 0;
      startedAt = LocalDateTime.now();
    }
  }
}

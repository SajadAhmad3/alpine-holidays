package com.alpinedream.travelagency.chat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ChatRequest(

    @NotBlank @Size(max = 1000) String message,

    @Size(max = 10) List<@Valid ChatMessage> history

) {
}

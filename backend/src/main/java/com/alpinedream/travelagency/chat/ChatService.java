package com.alpinedream.travelagency.chat;

import com.alpinedream.travelagency.offer.Offer;
import com.alpinedream.travelagency.offer.OfferRepository;
import com.google.genai.Client;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

  private final Client geminiClient;
  private final OfferRepository offerRepository;

  public ChatService(
      Client geminiClient,
      OfferRepository offerRepository) {
    this.geminiClient = geminiClient;
    this.offerRepository = offerRepository;
  }

  public String chat(
      String message,
      List<ChatMessage> history) {

    List<Offer> offers = offerRepository.findAll();

    String offerContext = buildOfferContext(offers);

    StringBuilder conversation = new StringBuilder();

    if (history != null) {
      for (ChatMessage chatMessage : history) {
        conversation.append(
            chatMessage.role().equals("user")
                ? "CUSTOMER: "
                : "ASSISTANT: ");

        conversation.append(chatMessage.content());
        conversation.append("\n");
      }
    }

    String prompt = """
        You are the Alpine Dream travel assistant.

        You help customers plan Kashmir trips.

        Use ONLY the Alpine Dream offers provided below
        when answering questions about our packages,
        prices, durations, and destinations.

        Never invent an offer, price, duration, or destination.

        If the available offers do not answer the question,
        say that you don't have that information and suggest
        that the customer contact Alpine Dream.

        Keep your responses friendly, concise, and conversational.

        IMPORTANT CONVERSATION RULES:

        - Read the PREVIOUS CONVERSATION before answering the CUSTOMER MESSAGE.
        - If the customer is asking a follow-up question, use the context
          from the previous conversation.
        - If the previous assistant response discussed a specific package,
          assume follow-up questions refer to that package unless the customer
          clearly specifies another package.
        - For example, if the previous conversation discussed "Kashmir in Bloom"
          and the customer asks "How much does it cost?", answer:
          "Kashmir in Bloom costs ₹32,999.00 per person."
        - Do NOT list all packages when the customer is asking a follow-up
          about a package already being discussed.
        - Only list multiple packages when the customer explicitly asks for
          available packages, options, or a comparison.
        - Answer the customer's actual question directly.

        AVAILABLE ALPINE DREAM OFFERS:

        %s

        PREVIOUS CONVERSATION:

        %s

        CUSTOMER MESSAGE:

        %s
        """.formatted(
        offerContext,
        conversation,
        message);

    try {
      var response = geminiClient.models.generateContent(
          "gemini-3.6-flash",
          prompt,
          null);

      if (response == null ||
          response.text() == null ||
          response.text().isBlank()) {

        return "I'm having trouble responding right now. Please contact Alpine Dream on WhatsApp and we'll help you plan your journey.";
      }

      return response.text();

    } catch (Exception e) {
      System.err.println(
          "Gemini request failed: " + e.getMessage());

      return "I'm having trouble connecting right now. Please contact Alpine Dream on WhatsApp and we'll help you plan your journey.";
    }
  }

  private String buildOfferContext(List<Offer> offers) {

    if (offers.isEmpty()) {
      return "No offers are currently available.";
    }

    StringBuilder context = new StringBuilder();

    for (Offer offer : offers) {
      context.append("""
          Offer: %s
          Description: %s
          Duration: %d days / %d nights
          Price: ₹%s
          Location: %s

          """.formatted(
          offer.getName(),
          offer.getDescription(),
          offer.getDays(),
          offer.getNights(),
          offer.getPrice(),
          offer.getLocationSummary()));
    }

    return context.toString();
  }
}

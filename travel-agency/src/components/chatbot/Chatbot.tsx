"use client"

import { FormEvent, useState } from "react"
import ReactMarkdown from "react-markdown"

type Message = {
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello. Where would you like to go in Kashmir?",
  },
]

const suggestions = [
  "Show me your packages",
  "Best time to visit",
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) return

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: trimmedMessage,
      },
    ])

    setMessage("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
            history: messages,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to get chatbot response")
      }

      const answer = await response.text()

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: answer,
        },
      ])
    } catch (error) {
      console.error(error)

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please contact Alpine Dream on WhatsApp and we'll help you plan your journey.",
        },
      ])
    }
  }

  const handleSuggestion = (suggestion: string) => {
    setMessage(suggestion)
  }

  return (
    <>
      {/* Chat */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[270px] overflow-hidden rounded-xl bg-[#F7F5F0] shadow-[0_12px_35px_rgba(0,0,0,0.14)] ring-1 ring-[#27241f]/10 sm:bottom-5 sm:right-5 sm:w-[310px] sm:rounded-2xl">
          {/* Header */}
          <div className="relative h-14 overflow-hidden sm:h-20">
            <img
              src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80"
              alt="Kashmir valley"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black/20 text-xs text-white backdrop-blur-sm transition hover:bg-black/40 sm:h-6 sm:w-6 sm:text-sm"
            >
              ×
            </button>

            <div className="absolute bottom-2 left-3 text-white sm:bottom-3 sm:left-4">
              <p className="text-[10px] font-medium sm:text-xs">
                Alpine Dream
              </p>

              <p className="mt-0.5 text-[6px] uppercase tracking-[0.14em] text-white/70 sm:text-[8px] sm:tracking-[0.18em]">
                Kashmir Travel Assistant
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[145px] min-h-[105px] flex-col gap-1.5 overflow-y-auto p-2 sm:max-h-[210px] sm:min-h-[150px] sm:gap-2.5 sm:p-3">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] px-2 py-1.5 text-[9px] leading-relaxed sm:px-3 sm:py-2 sm:text-[11px] ${
                    item.role === "user"
                      ? "rounded-lg rounded-br-sm bg-[#27241F] text-[#F7F5F0]"
                      : "rounded-lg rounded-bl-sm bg-[#E9E2D5] text-[#27241F]"
                  }`}
                >
                  {item.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-1 last:mb-0">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">
                            {children}
                          </strong>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-1 list-decimal space-y-1 pl-4">
                            {children}
                          </ol>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-1 space-y-0.5 pl-4">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="leading-relaxed">
                            {children}
                          </li>
                        ),
                        em: ({ children }) => (
                          <em className="text-[#625B51]">
                            {children}
                          </em>
                        ),
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="mt-0.5 flex flex-wrap gap-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    className="rounded-full border border-[#27241f]/15 px-2 py-1 text-[6px] uppercase tracking-[0.07em] text-[#27241f] transition hover:bg-[#27241f] hover:text-[#F7F5F0]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[#27241f]/10 bg-[#E9E2D5] p-1.5 sm:p-2"
          >
            <div className="flex items-center rounded-lg bg-[#F7F5F0] px-1 ring-1 ring-[#27241f]/5">
              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Ask about Kashmir..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[9px] text-[#27241f] outline-none placeholder:text-[#918777] sm:text-[11px]"
              />

              <button
                type="submit"
                disabled={!message.trim()}
                aria-label="Send message"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#27241F] text-[10px] text-white transition hover:bg-[#3a3833] disabled:cursor-not-allowed disabled:opacity-30"
              >
                →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Alpine Dream travel assistant"
          className="group fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full bg-[#F7F5F0]/90 px-2 py-1.5 text-[#27241F] shadow-[0_6px_20px_rgba(0,0,0,0.12)] ring-1 ring-[#27241f]/10 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 sm:bottom-5 sm:right-5 sm:gap-2 sm:px-2.5 sm:py-2"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D6A85F] text-[10px] text-[#27241F] sm:h-7 sm:w-7 sm:text-xs">
            ✦
          </span>

          <span className="pr-0.5 text-[7px] font-medium uppercase tracking-[0.08em] sm:text-[9px] sm:tracking-[0.12em]">
            Plan Your Journey
          </span>
        </button>
      )}
    </>
  )
}

"use client"

import { FormEvent, useState } from "react"

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setStatus("submitting")

    const form = event.currentTarget
    const formData = new FormData(form)

    const enquiry = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiry),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Backend error:", response.status, errorText)
        throw new Error(`Request failed: ${response.status}`)
      }

      // We don't need to use the returned enquiry here.
      // A successful response means the enquiry was accepted.
      await response.json()

      setStatus("success")
      form.reset()
    } catch (error) {
      console.error("Enquiry submission failed:", error)
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#756b5d]"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full border-b border-[#27241f]/20 bg-transparent px-0 py-3 text-lg text-[#27241f] outline-none placeholder:text-[#918777]/60 focus:border-[#173F3F]"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#756b5d]"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full border-b border-[#27241f]/20 bg-transparent px-0 py-3 text-lg text-[#27241f] outline-none placeholder:text-[#918777]/60 focus:border-[#173F3F]"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#756b5d]"
        >
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91"
          className="w-full border-b border-[#27241f]/20 bg-transparent px-0 py-3 text-lg text-[#27241f] outline-none placeholder:text-[#918777]/60 focus:border-[#173F3F]"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#756b5d]"
        >
          Tell us about your trip
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Where would you like to go?"
          className="w-full resize-none border-b border-[#27241f]/20 bg-transparent px-0 py-3 text-lg text-[#27241f] outline-none placeholder:text-[#918777]/60 focus:border-[#173F3F]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-[#173F3F] px-8 py-3.5 text-sm font-medium text-[#F7F5F0] transition-all duration-300 hover:scale-105 hover:bg-[#234A42] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send enquiry"}
      </button>

      {status === "success" && (
        <p className="text-sm text-[#173F3F]">
          Thank you. We'll be in touch soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

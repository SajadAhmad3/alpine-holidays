import type { Metadata } from "next"
import Link from "next/link"
import ContactForm from "@/components/contact/ContactForm"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start planning your Kashmir journey with Alpine Dream Holidays. Tell us what you're looking for and we'll help shape your trip.",
}

export default function ContactPage() {
  return (
    <main className="bg-[#e9e2d5]">

      {/* Introduction */}
      <section className="px-6 pb-8 pt-18 md:pb-12 md:pt-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#756b5d]">
                Get in touch
              </p>

              <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[0.95] tracking-tight text-[#27241f] md:text-7xl">
                Let's plan your
                <br />
                Kashmir.
              </h1>
            </div>

            <div className="max-w-md">
              <div className="mb-5 h-px w-12 bg-[#756b5d]/40" />

              <p className="text-base leading-relaxed text-[#625b51] md:text-lg">
                Tell us what you're imagining. Whether you already know where
                you want to go or need a little inspiration, we'll take it
                from there.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#f4f0e8] px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.75fr_1.25fr]">

          {/* Left side */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#756b5d]">
              Your journey
            </p>

            <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight text-[#27241f] md:text-5xl">
              Start with a conversation.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#625b51]">
              A few details are all we need to start shaping your journey
              through Kashmir.
            </p>

            <div className="mt-10 border-t border-[#27241f]/10 pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#918777]">
                Prefer WhatsApp?
              </p>

              <a
                href="https://wa.me/919541790727?text=Hi%20Alpine%20Dream%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kashmir."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-[#173F3F]"
              >
                Start a conversation →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl">
            <ContactForm />
          </div>

        </div>
      </section>

    </main>
  )
}

import type { Metadata } from "next"
import DestinationsHero from "@/components/destinations/DestinationsHero"
import DestinationList from "@/components/destinations/DestinationList"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kashmir Destinations",
  description:
    "Explore Srinagar, Gulmarg, Pahalgam and Sonamarg with Alpine Dream Holidays and discover the different experiences Kashmir has to offer.",
}

export default function DestinationsPage() {
  return (
    <main>
      <DestinationsHero />

      <DestinationList />

      <section className="bg-[#173F3F] px-6 py-24 text-[#F7F5F0] md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Your journey
            </p>

            <h2 className="mt-6 font-serif text-5xl leading-[0.95] md:text-7xl">
              Not sure where
              <br />
              to begin?
            </h2>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              You don't have to know. Tell us what kind of experience you're
              looking for, and we'll help you find your way through Kashmir.
            </p>

            <Link
              href="/contact"
              className="mt-9 inline-block rounded-full bg-[#F7F5F0] px-7 py-3 text-sm font-medium text-[#173F3F] transition-transform duration-300 hover:scale-105"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import KashmirExperiences from "@/components/KashmirExperiences"
import WhyTravelWithUs from "@/components/WhyTravelWithUs"
import FeaturedExperience from "@/components/FeaturedExperience"
import HowItWorks from "@/components/HowItWorks"
import Testimonials from "@/components/Testimonials"
import ReadyToTravel from "@/components/ReadyToTravel"

export const metadata: Metadata = {
  title: "Kashmir Travel & Holidays",
  description:
    "Discover thoughtfully planned Kashmir journeys through Srinagar, Gulmarg, Pahalgam and Sonamarg with Alpine Dream Holidays.",
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Alpine Dream Holidays",
  url: "https://www.alpinedreamholidays.com",
  description:
    "Thoughtfully planned journeys through Kashmir, including Srinagar, Gulmarg, Pahalgam and Sonamarg.",
  areaServed: {
    "@type": "Place",
    name: "Kashmir",
  },
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Navbar />
      <Hero />
      <KashmirExperiences />
      <WhyTravelWithUs />
      <section id="offers">
        <FeaturedExperience />
      </section>
      <HowItWorks />
      <Testimonials />
      <ReadyToTravel />
    </main>
  )
}

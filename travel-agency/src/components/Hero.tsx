"use client"

import { useState, useRef } from "react"

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000",
  },
{
  image:
    "https://images.unsplash.com/photo-1569852837213-00d97a707a83?q=80&w=2000&auto=format&fit=crop",
},
  {
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2000",
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const touchStart = useRef<number | null>(null)

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    )
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return

    const touchEnd = event.changedTouches[0].clientX
    const distance = touchStart.current - touchEnd

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide()
      } else {
        previousSlide()
      }
    }

    touchStart.current = null
  }

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <img
        src={slides[activeSlide].image}
        alt="Kashmir"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#173F3F]/35 via-transparent to-black/20" />

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[100svh] items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl text-white">

          <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-white/75 md:text-sm">
            Experience Kashmir
          </p>

<h1 className="max-w-4xl text-4xl font-medium leading-[0.92] tracking-[-0.03em] sm:text-5xl md:text-7xl lg:text-[5.5rem]">
            Where the mountains
            <br />
            tell the story.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Thoughtfully planned journeys through the valleys,
            mountains and timeless beauty of Kashmir.
          </p>

<button
  type="button"
  onClick={() => {
    document.getElementById("offers")?.scrollIntoView({
      behavior: "smooth",
    })
  }}
  className="mt-9 rounded-full bg-[#173F3F] px-8 py-3.5 text-sm font-medium text-[#F7F5F0] transition-all duration-300 hover:scale-105 hover:bg-[#234A42]"
>
  Explore Kashmir
</button>        </div>
      </div>

      {/* Previous */}
      <button
        onClick={previousSlide}
        aria-label="Previous image"
        className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/40 p-3 text-white transition hover:bg-white hover:text-black md:block"
      >
        ←
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        aria-label="Next image"
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/40 p-3 text-white transition hover:bg-white hover:text-black md:block"
      >
        →
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 transition-all ${
              activeSlide === index
                ? "w-12 bg-white"
                : "w-6 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#e9e2d5] via-[#e9e2d5]/20 to-transparent" />
    </section>
  )
}

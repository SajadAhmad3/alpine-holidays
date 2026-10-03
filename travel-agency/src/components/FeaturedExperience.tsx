export default async function FeaturedExperience() {
  try {
const response = await fetch(
"http://backend:8080/api/offers/featured",  {
    cache: "no-store",
  }
)
    if (!response.ok) {
      throw new Error("Failed to fetch featured offer")
    }

    const offer = await response.json()

    return (
      <section className="bg-[#173F3F] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#D6A85F]">
                Plan Your Escape
              </p>

              <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-[#F7F5F0] md:text-5xl">
                A Kashmir journey
                <br />
                worth taking.
              </h2>
            </div>

            <div className="hidden pb-1 text-right md:block">
              <p className="text-xs uppercase tracking-[0.25em] text-[#B8C8C3]">
                Featured
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#B8C8C3]/60">
                Journey
              </p>
            </div>
          </div>

          {/* Featured journey */}
          <div className="grid overflow-hidden bg-[#234A42] md:grid-cols-[1.1fr_0.9fr]">

            {/* Image */}
            <div className="relative h-[420px] md:h-[560px]">
              <img
                src={offer.imageUrl}
                alt={offer.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="absolute left-5 top-5 bg-[#F7F5F0] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#173F3F]">
                Alpine Dream
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-7 md:p-10">

              <div>

                {/* Duration */}
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D6A85F]">
                  {offer.days} Days · {offer.nights} Nights
                </p>

                {/* Package name */}
                <h3 className="mt-5 text-4xl font-medium leading-[1] tracking-tight text-[#F7F5F0] md:text-5xl">
                  {offer.name}
                </h3>

                {/* Description */}
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#C7D2CE]">
                  {offer.description}
                </p>

                {/* Destinations */}
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#91AAA3]">
                    Journey through
                  </p>

                  <p className="mt-2 text-sm text-[#F7F5F0]">
                    {offer.locationSummary}
                  </p>
                </div>

              </div>

              {/* Bottom */}
<div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#91AAA3]">
                    From
                  </p>

                  <p className="mt-1 text-2xl font-medium tracking-tight text-[#F7F5F0]">
                    ₹{Number(offer.price).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-xs text-[#91AAA3]">
                    per person
                  </p>
                </div>

                <a
                  href={`https://wa.me/919541790727?text=${encodeURIComponent(
                    `Hi Alpine Dream,

I'm interested in the "${offer.name}" journey.

Journey details:
• ${offer.days} Days · ${offer.nights} Nights
• ${offer.locationSummary}
• Starting from ₹${Number(offer.price).toLocaleString("en-IN")} per person

I'd like to know more about this journey.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border-b border-[#D6A85F] pb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#F7F5F0] transition-colors duration-300 hover:text-[#D6A85F]"
                >
                  Inquire About This Journey

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Failed to load featured offer:", error)

    return (
      <section className="bg-[#173F3F] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="border border-white/10 bg-[#234A42] px-6 py-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#D6A85F]">
              Plan Your Escape
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-[#F7F5F0] md:text-4xl">
              Our journeys are being updated.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#B8C8C3]">
              Please check back shortly or contact us directly to plan your Kashmir journey.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

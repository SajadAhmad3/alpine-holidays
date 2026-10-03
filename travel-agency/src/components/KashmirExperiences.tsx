import Link from "next/link"

const destinations = [
  {
    number: "01",
    name: "Gulmarg",
    category: "Adventure",
  },
  {
    number: "02",
    name: "Pahalgam",
    category: "Nature",
  },
  {
    number: "03",
    name: "Sonamarg",
    category: "Mountains",
  },
  {
    number: "04",
    name: "Srinagar",
    category: "Culture",
  },
]

export default function KashmirExperiences() {
  return (
    <section className="bg-[#e9e2d5] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#756b5d]">
              Explore Kashmir
            </p>

            <h2 className="mt-5 max-w-xl text-5xl font-medium leading-[0.95] tracking-tight text-[#27241f] md:text-7xl">
              Find your
              <br />
              Kashmir.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-lg leading-relaxed text-[#625b51] md:text-xl">
              One valley. Endless ways to experience it.
            </p>
          </div>
        </div>

        {/* Main visual */}
        <div className="mt-12 grid gap-6 md:grid-cols-[1.5fr_0.7fr] md:items-stretch">

          {/* Image */}
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1800"
              alt="Kashmir mountain landscape"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 text-white md:bottom-9 md:left-9">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Kashmir
              </p>

              <p className="mt-2 font-serif text-3xl md:text-4xl">
                Let the journey unfold.
              </p>
            </div>
          </div>

          {/* Destination list */}
          <div className="flex flex-col justify-between bg-[#f4f0e8] p-7 md:p-9">

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#918777]">
                Four places
              </p>

              <div className="mt-8">
                {destinations.map((destination) => (
                  <div
                    key={destination.name}
                    className="flex items-center justify-between border-t border-[#27241f]/10 py-5"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs text-[#918777]">
                        {destination.number}
                      </span>

                      <h3 className="font-serif text-2xl text-[#27241f]">
                        {destination.name}
                      </h3>
                    </div>

                    <span className="text-xs uppercase tracking-[0.15em] text-[#918777]">
                      {destination.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 border-t border-[#27241f]/10 pt-6">
              <Link
                href="/destinations"
                className="group flex items-center justify-between"
              >
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#173F3F]">
                  Explore destinations
                </span>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#173F3F]/25 text-lg text-[#173F3F] transition-all duration-300 group-hover:bg-[#173F3F] group-hover:text-white">
                  →
                </span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

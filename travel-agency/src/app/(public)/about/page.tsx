import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Alpine Dream Holidays and our approach to creating thoughtful, effortless journeys through Kashmir.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#e9e2d5] text-[#27241f]">

      {/* Hero */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden bg-[#173F3F]">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000"
          alt="Kashmir mountains"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-12 md:pb-20 lg:px-20">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#D6A85F]">
            Alpine Dream
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-medium leading-[0.95] tracking-tight text-[#F7F5F0] md:text-7xl">
            Travel deeper.
            <br />
            Experience Kashmir.
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#756b5d]">
              About Us
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              Kashmir isn't just a destination.
              <br />
              It's an experience.
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-[#625b51]">
              <p>
                Alpine Dream creates thoughtfully planned journeys
                through Kashmir, designed around the places, landscapes
                and experiences that make the valley special.
              </p>

              <p>
                From the lakes of Srinagar to the valleys of Pahalgam
                and the mountains of Gulmarg, our journeys are designed
                to give travellers the time to experience Kashmir rather
                than simply pass through it.
              </p>

              <p>
                Whether you're visiting for the first time or returning
                to discover another side of the valley, we're here to
                make planning your journey simple.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Image / Philosophy */}
      <section className="bg-[#F4F0E8] px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2">

          <div className="relative min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1600"
              alt="Kashmir valley"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#173F3F] p-8 md:p-14">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D6A85F]">
              Our Approach
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-[#F7F5F0] md:text-4xl">
              Thoughtful journeys.
              <br />
              No unnecessary complexity.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#C7D2CE] md:text-base">
              We believe a good journey should feel effortless.
              That's why our packages focus on carefully chosen
              destinations, sensible itineraries and experiences
              that let you enjoy Kashmir at your own pace.
            </p>

            <a
              href="https://wa.me/919541790727?text=Hi%20Alpine%20Dream%2C%20I'd%20like%20to%20plan%20a%20trip%20to%20Kashmir."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-fit rounded-full bg-[#D6A85F] px-6 py-3 text-sm font-medium text-[#173F3F] transition hover:scale-105"
            >
              Plan your journey →
            </a>
          </div>

        </div>
      </section>

      {/* Closing */}
      <section className="px-6 py-20 text-center md:px-12 md:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#756b5d]">
          Alpine Dream Holidays
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-5xl">
          Your Kashmir story starts here.
        </h2>

        <a
          href="/destinations"
          className="mt-8 inline-block rounded-full bg-[#173F3F] px-7 py-3.5 text-sm font-medium text-[#F7F5F0] transition hover:scale-105 hover:bg-[#234A42]"
        >
          Explore Kashmir
        </a>
      </section>

    </main>
  )
}

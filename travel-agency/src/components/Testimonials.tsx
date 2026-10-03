const testimonials = [
  {
    quote:
      "We came for the mountains, but left remembering the quiet mornings, the people and the little moments in between.",
    name: "A traveller",
  },
  {
    quote:
      "Kashmir felt less like a place we visited and more like a place we had somehow always known.",
    name: "A traveller",
  },
  {
    quote:
      "There was no rush. Just mountains, valleys and enough time to actually enjoy being there.",
    name: "A traveller",
  },
]

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div className="relative min-h-[680px]">

        <img
          src="https://kashmirtourtravel.com/blog/wp-content/uploads/2024/08/Visiting-Kashmir-in-September-scaled.jpg"
          alt="Kashmir landscape with travellers"
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover blur-[1px]"
        />

        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#173F3F]/35 via-black/10 to-black/45" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-6xl flex-col justify-center px-6 py-20 text-center">

          {/* Label */}
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-white/70">
            Stories From Kashmir
          </p>

          {/* Heading */}
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-medium leading-[0.95] tracking-tight text-white md:text-5xl">
            Some journeys stay
            <br />
            with you.
          </h2>

          {/* Testimonials */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-10">

            {testimonials.map((testimonial) => (
              <article
                key={testimonial.quote}
                className="flex flex-col items-center"
              >
                {/* Quote */}
                <span className="text-4xl leading-none text-[#D6A85F]">
                  “
                </span>

                <blockquote className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
                  {testimonial.quote}
                </blockquote>

                {/* Traveller */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#D6A85F]" />

                  <p className="text-xs uppercase tracking-[0.2em] text-white/65">
                    {testimonial.name}
                  </p>

                  <div className="h-px w-6 bg-[#D6A85F]" />
                </div>
              </article>
            ))}

          </div>

          {/* Bottom detail */}
          <div className="mt-16">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Kashmir · India
            </p>
          </div>

        </div>
      </div>

    </section>
  )
}

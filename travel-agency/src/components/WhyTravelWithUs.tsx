const reasons = [
  {
    number: "01",
    title: "Local knowledge",
    description:
      "We know Kashmir beyond the postcard — its roads, seasons, hidden corners and the details that make a journey memorable.",
  },
  {
    number: "02",
    title: "Your journey",
    description:
      "No two travellers are the same. We shape your trip around your interests, your pace and the way you want to experience Kashmir.",
  },
  {
    number: "03",
    title: "We handle the rest",
    description:
      "Stays, transfers, experiences and the details in between. We take care of the logistics so you can enjoy the journey.",
  },
]

export default function WhyTravelWithUs() {
  return (
    <section className="bg-[#172A3A] px-6 py-20 text-[#F4F1E8] md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Intro */}
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D6A85F]">
            Why Alpine Dream
          </p>

<h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            Travel differently.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#B8C0C2] md:text-xl">
            Kashmir isn&apos;t a checklist. It&apos;s a place to experience.
            We&apos;re here to make sure you experience it your way.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-20 border-t border-white/15">
          {reasons.map((reason) => (
            <article
              key={reason.number}
              className="group grid gap-6 border-b border-white/15 py-10 md:grid-cols-[180px_1fr_1fr] md:items-center md:py-14"
            >
              {/* Number */}
              <span className="font-serif text-6xl leading-none text-white/10 md:text-8xl">
                {reason.number}
              </span>

              {/* Title */}
              <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="max-w-md text-base leading-relaxed text-[#B8C0C2] md:justify-self-end">
                {reason.description}
              </p>
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
<p className="max-w-xl text-3xl font-medium leading-tight md:text-4xl">
            The mountains are waiting.
            <br />
            We&apos;ll handle the rest.
          </p>

<a
  href="https://wa.me/919541790727?text=Hi%20Alpine%20Dream%2C%20I%27d%20like%20to%20start%20planning%20my%20Kashmir%20journey."
  target="_blank"
  rel="noopener noreferrer"
  className="w-fit border-b border-[#D6A85F] pb-2 text-sm uppercase tracking-[0.2em] text-[#F4F1E8] transition-colors hover:text-[#D6A85F]"
>
  Start Your Journey →
</a>        
        </div>

      </div>
    </section>
  )
}

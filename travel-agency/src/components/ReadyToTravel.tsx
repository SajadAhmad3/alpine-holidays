const backgroundImage =
  "https://kashmirtourtravel.com/blog/wp-content/uploads/2024/08/Visiting-Kashmir-in-September-scaled.jpg"


export default function ReadyToTravel() {
  return (
    <section className="relative overflow-hidden bg-[#173F3F]">
      <div className="relative min-h-[560px]">

        {/* Background */}
        <img
          src={backgroundImage}
          alt="Travellers experiencing Kashmir"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-[#173F3F]/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#173F3F]/75 via-[#173F3F]/20 to-black/10" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[560px] items-end px-6 py-14 md:px-12 md:py-16 lg:px-20">

          <div className="max-w-3xl">

            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#D6A85F]">
              Ready to Travel?
            </p>

            <h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-tight text-[#F7F5F0] md:text-6xl">
              Your Kashmir
              <br />
              story starts here.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Tell us what you're imagining. The places you'd like to see,
              the pace you'd like to take, and the kind of journey you want.
            </p>

<a
  href="https://wa.me/919541790727?text=Hi%20Alpine%20Dream%2C%20I%27d%20like%20to%20plan%20a%20Kashmir%20trip.%20I%27d%20like%20to%20discuss%20my%20travel%20plans."
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-block rounded-full bg-[#F7F5F0] px-8 py-3.5 text-sm font-medium text-[#173F3F] transition-all duration-300 hover:scale-105 hover:bg-white"
>
  Start Your Journey
</a>
          </div>

        </div>

      </div>
    </section>
  )
}

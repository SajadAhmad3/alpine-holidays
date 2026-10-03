export default function Footer() {
  return (
    <footer className="bg-[#202A27] px-6 pb-6 pt-12 text-[#F7F5F0] md:px-12 md:pb-8 md:pt-16 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Main footer */}
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.5fr_0.5fr_0.7fr] md:gap-12 md:pb-12">

          {/* Brand */}
          <div>
            <div className="mb-4 h-10 w-10 overflow-hidden rounded-full bg-white/90">
              <img
                src="/images/logo.jpeg"
                alt="Alpine Dream Holidays"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="text-lg font-medium tracking-tight text-[#F7F5F0]">
              Alpine Dream
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#B8C1BD]">
              Thoughtfully planned journeys through the valleys, mountains
              and timeless beauty of Kashmir.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D6A85F]/80">
              Explore
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="/destinations"
                className="block text-sm text-[#B8C1BD] transition-colors hover:text-[#F7F5F0]"
              >
                Kashmir
              </a>

              <a
                href="/destinations"
                className="block text-sm text-[#B8C1BD] transition-colors hover:text-[#F7F5F0]"
              >
                Journeys
              </a>

              <a
                href="/about"
                className="block text-sm text-[#B8C1BD] transition-colors hover:text-[#F7F5F0]"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D6A85F]/80">
              Get In Touch
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="mailto:hello@alpinedreamholidays.com"
                className="block text-sm text-[#B8C1BD] transition-colors hover:text-[#F7F5F0]"
              >
                hello@alpinedreamholidays.in
              </a>

              <a
                href="https://wa.me/919541790727?text=Hi%20Alpine%20Dream%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kashmir."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#B8C1BD] transition-colors hover:text-[#F7F5F0]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Mobile / desktop bottom bar */}
        <div className="pt-6">

          <div className="flex w-full items-center justify-between gap-2 overflow-hidden">

            <p className="shrink-0 whitespace-nowrap text-[9px] text-[#8F9A95] sm:text-xs">
              © {new Date().getFullYear()} Alpine Dream
            </p>

            <div className="flex min-w-0 shrink items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D6A85F]/30 text-[8px] font-medium text-[#D6A85F]">
                PW
              </div>

              <p className="truncate text-[10px] font-medium text-[#F7F5F0] sm:text-sm">
                PorlonWebMakers
              </p>
            </div>

            <p className="shrink-0 whitespace-nowrap text-[8px] uppercase tracking-[0.08em] text-[#8F9A95] sm:text-xs sm:tracking-[0.15em]">
              Kashmir · India
            </p>

          </div>

        </div>

      </div>
    </footer>
  )
}

type Destination = {
  name: string
  location: string
  description: string
  experience: string
  image: string
}

type DestinationCardProps = {
  destination: Destination
  index: number
}

export default function DestinationCard({
  destination,
  index,
}: DestinationCardProps) {
  const reversed = index % 2 !== 0

  return (
    <article
      className={`grid gap-8 md:grid-cols-12 md:items-center md:gap-12 ${
        reversed ? "md:text-right" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`overflow-hidden md:col-span-7 ${
          reversed ? "md:col-start-6" : ""
        }`}
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[540px]"
        />
      </div>

      {/* Content */}
      <div
        className={`md:col-span-5 ${
          reversed ? "md:col-start-1 md:row-start-1" : ""
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#918777]">
          {destination.location}
        </p>

        <h2 className="mt-4 text-5xl font-medium leading-[0.95] tracking-tight text-[#27241f] md:text-6xl">
          {destination.name}
        </h2>

        <p className="mt-6 text-base leading-relaxed text-[#625b51]">
          {destination.description}
        </p>

        <div
          className={`mt-8 border-t border-[#27241f]/10 pt-5 ${
            reversed ? "ml-auto" : ""
          } max-w-xs`}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#918777]">
            The experience
          </p>

          <p className="mt-2 text-sm leading-relaxed text-[#625b51]">
            {destination.experience}
          </p>
        </div>

        <div
          className={`mt-7 h-px w-10 bg-[#173F3F] ${
            reversed ? "ml-auto" : ""
          }`}
        />
      </div>
    </article>
  )
}

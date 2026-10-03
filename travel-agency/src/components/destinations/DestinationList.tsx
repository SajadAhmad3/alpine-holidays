import DestinationCard from "./DestinationCard"

const destinations = [
  {
    name: "Srinagar",
    location: "The Heart of Kashmir",
    description:
      "Begin beside the waters of Dal Lake, where houseboats drift quietly beneath the mountains. Wander through old Srinagar, discover Mughal gardens and let the city introduce you to the slower rhythm of Kashmir.",
    experience:
      "Dal Lake · Houseboats · Mughal Gardens · Old Srinagar",
 image:
  "https://images.unsplash.com/photo-1569852837213-00d97a707a83?q=80&w=1800&auto=format&fit=crop", },
  {
    name: "Gulmarg",
    location: "The Meadow of Flowers",
    description:
      "Gulmarg is where the landscape opens up. Alpine meadows, pine forests and enormous mountain views make it one of Kashmir's most striking escapes.",
    experience:
      "Gondola · Mountain walks · Meadows · Snow",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1800",
  },
  {
    name: "Pahalgam",
    location: "The Valley of Shepherds",
    description:
      "Follow the Lidder River into a landscape of pine forests and quiet mountain villages. Pahalgam is for long walks, fresh air and days where there is nowhere you particularly need to be.",
    experience:
      "Lidder River · Pine forests · Valleys · Village life",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1800",
  },
  {
    name: "Sonamarg",
    location: "Meadow of Gold",
    description:
      "As the road climbs higher, Kashmir begins to feel wilder. Sonamarg sits beneath dramatic Himalayan peaks and opens the door to some of the region's most spectacular landscapes.",
    experience:
      "Mountain roads · Alpine meadows · High valleys · Himalayas",
    image:
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1800",
  },
]

export default function DestinationList() {
  return (
    <section className="bg-[#FAFAF7] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 flex items-end justify-between border-b border-[#27241f]/10 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#756b5d]">
            The places
          </p>

          <p className="hidden text-sm text-[#918777] md:block">
            Srinagar · Gulmarg · Pahalgam · Sonamarg
          </p>
        </div>

        <div className="space-y-24 md:space-y-40">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

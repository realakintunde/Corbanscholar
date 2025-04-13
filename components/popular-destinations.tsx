import Image from "next/image"
import Link from "next/link"

export default function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: "United States",
      count: "5,200+ scholarships",
      image: "/placeholder.svg?key=sre1m",
      url: "/search?country=usa",
    },
    {
      id: 2,
      name: "United Kingdom",
      count: "3,800+ scholarships",
      image: "/campus-autumn-walk.png",
      url: "/search?country=uk",
    },
    {
      id: 3,
      name: "Canada",
      count: "2,500+ scholarships",
      image: "/autumn-campus-walk.png",
      url: "/search?country=canada",
    },
    {
      id: 4,
      name: "Australia",
      count: "2,100+ scholarships",
      image: "/campus-walkway.png",
      url: "/search?country=australia",
    },
    {
      id: 5,
      name: "Germany",
      count: "1,900+ scholarships",
      image: "/university-courtyard-life.png",
      url: "/search?country=germany",
    },
    {
      id: 6,
      name: "France",
      count: "1,700+ scholarships",
      image: "/placeholder.svg?height=200&width=300&query=French university campus",
      url: "/search?country=france",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <Link
          key={destination.id}
          href={destination.url}
          className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          <div className="relative h-48 w-full">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h3 className="text-xl font-bold">{destination.name}</h3>
              <p className="text-sm text-gray-200">{destination.count}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

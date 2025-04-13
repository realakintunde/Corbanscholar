import Link from "next/link"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  return (
    <div className={className}>
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">CorbanScholar</span>
      </Link>
    </div>
  )
}

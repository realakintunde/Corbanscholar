"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, School, DollarSign, Loader2, Search } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

type Favorite = {
  id: number
  scholarship_id: number
  title: string
  university: string
  country: string
  amount: string
  deadline: string
  level: string
  field: string
  created_at: string
}

export default function UserFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return

      try {
        setLoading(true)
        const response = await fetch("/api/user/favorites")

        if (!response.ok) {
          throw new Error("Failed to fetch favorites")
        }

        const data = await response.json()
        setFavorites(data.favorites || [])
      } catch (error) {
        console.error("Error fetching favorites:", error)
        toast({
          title: "Error",
          description: "Failed to load your favorites",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, toast])

  const removeFavorite = async (scholarshipId: number) => {
    try {
      const response = await fetch(`/api/user/favorites/${scholarshipId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove favorite")
      }

      setFavorites((prev) => prev.filter((fav) => fav.scholarship_id !== scholarshipId))
      toast({
        title: "Success",
        description: "Scholarship removed from favorites",
      })
    } catch (error) {
      console.error("Error removing favorite:", error)
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No saved scholarships</h3>
        <p className="mb-4 max-w-md text-muted-foreground">
          You haven&apos;t saved any scholarships yet. Browse scholarships and click the heart icon to save them for
          later.
        </p>
        <Button asChild>
          <Link href="/search">Find Scholarships</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Scholarships</h2>
        <p className="text-muted-foreground">{favorites.length} saved</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <Card key={favorite.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <Badge variant="outline">{favorite.level}</Badge>
                <Badge variant="outline">{favorite.field}</Badge>
              </div>
              <CardTitle className="mt-2 line-clamp-2 text-lg">{favorite.title}</CardTitle>
              <CardDescription className="flex items-center">
                <School className="mr-1 h-3 w-3" />
                {favorite.university}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {favorite.country}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  Deadline: {new Date(favorite.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="mr-1 h-3 w-3" />
                  {favorite.amount}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/scholarship/${favorite.scholarship_id}`}>View Details</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFavorite(favorite.scholarship_id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

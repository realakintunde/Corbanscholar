"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, GraduationCap, Globe, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ScholarshipDiscovery() {
  const [activeTab, setActiveTab] = useState("popular")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Discover Scholarships</CardTitle>
        <CardDescription>Not sure what to search for? Explore scholarships by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Popular
            </TabsTrigger>
            <TabsTrigger value="level" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> By Level
            </TabsTrigger>
            <TabsTrigger value="region" className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> By Region
            </TabsTrigger>
            <TabsTrigger value="field" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> By Field
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <DiscoveryCard
                title="Featured Scholarships"
                description="Highlighted scholarships with excellent opportunities"
                icon={<Award className="h-5 w-5 text-amber-500" />}
                link="/search?featured=true"
              />
              <DiscoveryCard
                title="Full Funding"
                description="Scholarships that cover all expenses"
                icon={<Award className="h-5 w-5 text-green-500" />}
                link="/search?q=full%20funding"
              />
              <DiscoveryCard
                title="Upcoming Deadlines"
                description="Apply before it's too late"
                icon={<Award className="h-5 w-5 text-red-500" />}
                link="/search?deadline=upcoming"
              />
              <DiscoveryCard
                title="Most Viewed"
                description="Popular scholarships among students"
                icon={<Award className="h-5 w-5 text-blue-500" />}
                link="/search?sort=views"
              />
            </div>
          </TabsContent>

          <TabsContent value="level" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <LevelCard level="Undergraduate" color="bg-blue-100" textColor="text-blue-700" />
              <LevelCard level="Graduate" color="bg-purple-100" textColor="text-purple-700" />
              <LevelCard level="Doctoral" color="bg-amber-100" textColor="text-amber-700" />
              <LevelCard level="Postdoctoral" color="bg-green-100" textColor="text-green-700" />
              <LevelCard level="Research" color="bg-red-100" textColor="text-red-700" />
              <LevelCard level="All Levels" color="bg-gray-100" textColor="text-gray-700" />
            </div>
          </TabsContent>

          <TabsContent value="region" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <RegionCard region="North America" countries={["United States", "Canada"]} />
              <RegionCard region="Europe" countries={["United Kingdom", "Germany", "France"]} />
              <RegionCard region="Asia" countries={["Japan", "China", "Singapore"]} />
              <RegionCard region="Australia & Oceania" countries={["Australia", "New Zealand"]} />
              <RegionCard region="Africa" countries={["South Africa", "Egypt", "Kenya"]} />
              <RegionCard region="South America" countries={["Brazil", "Argentina", "Chile"]} />
            </div>
          </TabsContent>

          <TabsContent value="field" className="mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FieldCard field="Engineering" icon="🔧" />
              <FieldCard field="Medicine & Health" icon="🩺" />
              <FieldCard field="Business & Economics" icon="📊" />
              <FieldCard field="Computer Science" icon="💻" />
              <FieldCard field="Arts & Humanities" icon="🎭" />
              <FieldCard field="Natural Sciences" icon="🔬" />
              <FieldCard field="Social Sciences" icon="🌍" />
              <FieldCard field="Law" icon="⚖️" />
              <FieldCard field="All Fields" icon="📚" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/search">Advanced Search</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function DiscoveryCard({
  title,
  description,
  icon,
  link,
}: {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href={link}>Explore</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function LevelCard({ level, color, textColor }: { level: string; color: string; textColor: string }) {
  return (
    <Link href={`/search?level=${level}`} className="block">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className={`${color} ${textColor}`}>
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {level}
          </CardTitle>
        </CardHeader>
        <CardFooter className="pt-4">
          <Button variant="ghost" className="w-full">
            Browse Scholarships
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

function RegionCard({ region, countries }: { region: string; countries: string[] }) {
  return (
    <Link href={`/search?region=${region}`} className="block">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {region}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {countries.map((country) => (
              <Badge key={country} variant="outline">
                {country}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full">
            View Region
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

function FieldCard({ field, icon }: { field: string; icon: string }) {
  return (
    <Link href={`/search?field=${field}`} className="block">
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            {field}
          </CardTitle>
        </CardHeader>
        <CardFooter className="pt-4">
          <Button variant="ghost" className="w-full">
            Browse Field
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

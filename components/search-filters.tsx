"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SearchFiltersProps {
  initialCountry?: string
  initialField?: string
  initialLevel?: string
  initialAmount?: string
  initialSource?: string // Added source parameter
}

export default function SearchFilters({
  initialCountry = "",
  initialField = "",
  initialLevel = "",
  initialAmount = "",
  initialSource = "", // Added source parameter
}: SearchFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Filter states
  const [countries, setCountries] = useState<string[]>(initialCountry ? initialCountry.split(",") : [])
  const [fields, setFields] = useState<string[]>(initialField ? initialField.split(",") : [])
  const [levels, setLevels] = useState<string[]>(initialLevel ? initialLevel.split(",") : [])
  const [amount, setAmount] = useState<string>(initialAmount || "")
  const [sources, setSources] = useState<string[]>(initialSource ? initialSource.split(",") : []) // Added source state

  // Active filters count
  const activeFiltersCount = countries.length + fields.length + levels.length + sources.length + (amount ? 1 : 0)

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams(searchParams.toString())

    // Handle country filter
    if (countries.length > 0) {
      params.set("country", countries.join(","))
    } else {
      params.delete("country")
    }

    // Handle field filter
    if (fields.length > 0) {
      params.set("field", fields.join(","))
    } else {
      params.delete("field")
    }

    // Handle level filter
    if (levels.length > 0) {
      params.set("level", levels.join(","))
    } else {
      params.delete("level")
    }

    // Handle source filter
    if (sources.length > 0) {
      params.set("source", sources.join(","))
    } else {
      params.delete("source")
    }

    // Handle amount filter
    if (amount) {
      params.set("amount", amount)
    } else {
      params.delete("amount")
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [countries, fields, levels, amount, sources, router, pathname, searchParams])

  const clearFilters = () => {
    setCountries([])
    setFields([])
    setLevels([])
    setAmount("")
    setSources([])
  }

  const toggleCountry = (value: string) => {
    setCountries((current) => (current.includes(value) ? current.filter((c) => c !== value) : [...current, value]))
  }

  const toggleField = (value: string) => {
    setFields((current) => (current.includes(value) ? current.filter((f) => f !== value) : [...current, value]))
  }

  const toggleLevel = (value: string) => {
    setLevels((current) => (current.includes(value) ? current.filter((l) => l !== value) : [...current, value]))
  }

  const toggleSource = (value: string) => {
    setSources((current) => (current.includes(value) ? current.filter((s) => s !== value) : [...current, value]))
  }

  return (
    <div className="space-y-4">
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="text-xs">
            {activeFiltersCount} {activeFiltersCount === 1 ? "filter" : "filters"} applied
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["sources", "countries", "fields", "levels", "amount"]}>
        {/* New Sources Filter Section */}
        <AccordionItem value="sources">
          <AccordionTrigger className="text-sm font-medium">Scholarship Sources</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "fulbright", label: "Fulbright" },
                { id: "chevening", label: "Chevening" },
                { id: "daad", label: "DAAD" },
                { id: "commonwealth", label: "Commonwealth" },
                { id: "erasmus", label: "Erasmus+" },
                { id: "australia-awards", label: "Australia Awards" },
                { id: "confucius", label: "Confucius Institute" },
                { id: "rotary", label: "Rotary Foundation" },
                { id: "aga-khan", label: "Aga Khan Foundation" },
                { id: "gates", label: "Gates Cambridge" },
                { id: "rhodes", label: "Rhodes Scholarship" },
                { id: "schwarzman", label: "Schwarzman Scholars" },
              ].map((source) => (
                <div key={source.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`source-${source.id}`}
                    checked={sources.includes(source.id)}
                    onCheckedChange={() => toggleSource(source.id)}
                  />
                  <label
                    htmlFor={`source-${source.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {source.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="countries">
          <AccordionTrigger className="text-sm font-medium">Countries</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "usa", label: "United States" },
                { id: "uk", label: "United Kingdom" },
                { id: "canada", label: "Canada" },
                { id: "australia", label: "Australia" },
                { id: "germany", label: "Germany" },
                { id: "france", label: "France" },
                { id: "china", label: "China" },
                { id: "japan", label: "Japan" },
                { id: "singapore", label: "Singapore" },
                { id: "india", label: "India" },
                { id: "brazil", label: "Brazil" },
                { id: "south-africa", label: "South Africa" },
                { id: "netherlands", label: "Netherlands" },
                { id: "sweden", label: "Sweden" },
                { id: "switzerland", label: "Switzerland" },
              ].map((country) => (
                <div key={country.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`country-${country.id}`}
                    checked={countries.includes(country.id)}
                    onCheckedChange={() => toggleCountry(country.id)}
                  />
                  <label
                    htmlFor={`country-${country.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {country.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fields">
          <AccordionTrigger className="text-sm font-medium">Fields of Study</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "business", label: "Business & Management" },
                { id: "engineering", label: "Engineering" },
                { id: "medicine", label: "Medicine & Health Sciences" },
                { id: "arts", label: "Arts & Humanities" },
                { id: "science", label: "Natural Sciences" },
                { id: "technology", label: "Computer Science & IT" },
                { id: "law", label: "Law" },
                { id: "education", label: "Education" },
                { id: "social-sciences", label: "Social Sciences" },
                { id: "environmental", label: "Environmental Studies" },
                { id: "agriculture", label: "Agriculture" },
                { id: "mathematics", label: "Mathematics & Statistics" },
                { id: "economics", label: "Economics" },
                { id: "journalism", label: "Journalism & Media" },
                { id: "architecture", label: "Architecture & Design" },
              ].map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`field-${field.id}`}
                    checked={fields.includes(field.id)}
                    onCheckedChange={() => toggleField(field.id)}
                  />
                  <label
                    htmlFor={`field-${field.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="levels">
          <AccordionTrigger className="text-sm font-medium">Academic Levels</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "undergraduate", label: "Undergraduate" },
                { id: "masters", label: "Masters" },
                { id: "phd", label: "PhD" },
                { id: "postdoctoral", label: "Postdoctoral" },
                { id: "research", label: "Research" },
                { id: "exchange", label: "Exchange Programs" },
                { id: "summer", label: "Summer Programs" },
                { id: "vocational", label: "Vocational Training" },
                { id: "high-school", label: "High School" },
              ].map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level.id}`}
                    checked={levels.includes(level.id)}
                    onCheckedChange={() => toggleLevel(level.id)}
                  />
                  <label
                    htmlFor={`level-${level.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amount">
          <AccordionTrigger className="text-sm font-medium">Scholarship Amount</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={amount} onValueChange={setAmount}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="amount-any" />
                <Label htmlFor="amount-any">Any amount</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under5000" id="amount-under5000" />
                <Label htmlFor="amount-under5000">Under $5,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5000-10000" id="amount-5000-10000" />
                <Label htmlFor="amount-5000-10000">$5,000 - $10,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10000-20000" id="amount-10000-20000" />
                <Label htmlFor="amount-10000-20000">$10,000 - $20,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="over20000" id="amount-over20000" />
                <Label htmlFor="amount-over20000">Over $20,000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fullTuition" id="amount-fullTuition" />
                <Label htmlFor="amount-fullTuition">Full Tuition</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

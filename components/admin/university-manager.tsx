"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Trash, Edit, ExternalLink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

type University = {
  id: number
  name: string
  country: string
  website: string
  scholarship_count: number
}

type Country = {
  id: number
  name: string
  code?: string
}

export default function UniversityManager() {
  const { toast } = useToast()
  const [universities, setUniversities] = useState<University[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    countryId: "",
    website: "",
  })
  const [countries, setCountries] = useState<Country[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchUniversities()
    fetchCountries()
  }, [])

  const fetchUniversities = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/universities")
      if (!response.ok) throw new Error("Failed to fetch universities")
      const data = await response.json()
      setUniversities(data.universities)
    } catch (error) {
      console.error("Error fetching universities:", error)
      toast({
        title: "Error",
        description: "Failed to load universities",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch("/api/reference?type=countries")
      if (!response.ok) throw new Error("Failed to fetch countries")
      const data = await response.json()
      setCountries(data.data)
    } catch (error) {
      console.error("Error fetching countries:", error)
      toast({
        title: "Error",
        description: "Failed to load countries",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      countryId: "",
      website: "",
    })
    setEditingId(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/universities/${editingId}` : "/api/universities"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          countryId: Number(formData.countryId),
        }),
      })

      if (!response.ok) throw new Error(`Failed to ${editingId ? "update" : "create"} university`)

      toast({
        title: "Success",
        description: `University ${editingId ? "updated" : "created"} successfully`,
      })

      setDialogOpen(false)
      fetchUniversities()
      resetForm()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingId ? "update" : "create"} university`,
        variant: "destructive",
      })
    }
  }

  const handleEdit = async (id: number) => {
    try {
      const university = universities.find((u) => u.id === id)
      if (!university) throw new Error("University not found")

      const countryId = countries.find((c) => c.name === university.country)?.id

      setFormData({
        name: university.name,
        countryId: countryId ? String(countryId) : "",
        website: university.website,
      })

      setEditingId(id)
      setDialogOpen(true)
    } catch (error) {
      console.error("Error editing university:", error)
      toast({
        title: "Error",
        description: "Failed to load university details",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this university?")) return

    try {
      const response = await fetch(`/api/universities/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete university")

      toast({
        title: "Success",
        description: "University deleted successfully",
      })

      fetchUniversities()
    } catch (error) {
      console.error("Error deleting university:", error)
      toast({
        title: "Error",
        description: "Failed to delete university",
        variant: "destructive",
      })
    }
  }

  const filteredUniversities = universities.filter(
    (university) =>
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search universities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add University
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add New"} University</DialogTitle>
              <DialogDescription>Enter the details for the university. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="country" className="text-right">
                    Country *
                  </label>
                  <div className="col-span-3">
                    <Select
                      name="countryId"
                      value={formData.countryId}
                      onValueChange={(value) => handleSelectChange("countryId", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.id} value={String(country.id)}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="website" className="text-right">
                    Website *
                  </label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save University</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Scholarships</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredUniversities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No universities found
                </TableCell>
              </TableRow>
            ) : (
              filteredUniversities.map((university) => (
                <TableRow key={university.id}>
                  <TableCell className="font-medium">{university.name}</TableCell>
                  <TableCell>{university.country}</TableCell>
                  <TableCell>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline flex items-center"
                    >
                      {university.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell>{university.scholarship_count}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(university.id)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(university.id)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

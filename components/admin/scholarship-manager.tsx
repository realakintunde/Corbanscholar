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
import { Plus, MoreHorizontal, FileUp, Download, Trash, Edit, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

type Scholarship = {
  id: number
  title: string
  university: string
  country: string
  deadline: string
  level: string
  field: string
  amount: string
  featured: boolean
  view_count?: number
}

type FormData = {
  title: string
  universityId: string
  countryId: string
  amount: string
  deadline: string
  levelId: string
  fieldId: string
  description: string
  eligibility: string[]
  benefits: string[]
  applicationProcess: string[]
  website: string
  featured: boolean
}

type ReferenceItem = {
  id: number
  name: string
  code?: string
}

export default function ScholarshipManager() {
  const { toast } = useToast()
  const router = useRouter()
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    universityId: "",
    countryId: "",
    amount: "",
    deadline: "",
    levelId: "",
    fieldId: "",
    description: "",
    eligibility: [""],
    benefits: [""],
    applicationProcess: [""],
    website: "",
    featured: false,
  })

  // Reference data
  const [universities, setUniversities] = useState<ReferenceItem[]>([])
  const [countries, setCountries] = useState<ReferenceItem[]>([])
  const [fields, setFields] = useState<ReferenceItem[]>([])
  const [levels, setLevels] = useState<ReferenceItem[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  // Load scholarships
  useEffect(() => {
    fetchScholarships()
    fetchReferenceData()
  }, [])

  const fetchScholarships = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/scholarships?limit=50`)
      if (!response.ok) throw new Error("Failed to fetch scholarships")
      const data = await response.json()
      setScholarships(data.scholarships)
    } catch (error) {
      console.error("Error fetching scholarships:", error)
      toast({
        title: "Error",
        description: "Failed to load scholarships",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchReferenceData = async () => {
    try {
      // Fetch universities
      const uniResponse = await fetch(`/api/universities`)
      if (uniResponse.ok) {
        const data = await uniResponse.json()
        setUniversities(data.universities)
      }

      // Fetch countries
      const countriesResponse = await fetch(`/api/reference?type=countries`)
      if (countriesResponse.ok) {
        const data = await countriesResponse.json()
        setCountries(data.data)
      }

      // Fetch fields
      const fieldsResponse = await fetch(`/api/reference?type=fields`)
      if (fieldsResponse.ok) {
        const data = await fieldsResponse.json()
        setFields(data.data)
      }

      // Fetch levels
      const levelsResponse = await fetch(`/api/reference?type=levels`)
      if (levelsResponse.ok) {
        const data = await levelsResponse.json()
        setLevels(data.data)
      }
    } catch (error) {
      console.error("Error fetching reference data:", error)
      toast({
        title: "Error",
        description: "Failed to load reference data",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayItemChange = (
    arrayName: "eligibility" | "benefits" | "applicationProcess",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]]
      newArray[index] = value
      return { ...prev, [arrayName]: newArray }
    })
  }

  const addArrayItem = (arrayName: "eligibility" | "benefits" | "applicationProcess") => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName], ""]
      return { ...prev, [arrayName]: newArray }
    })
  }

  const removeArrayItem = (arrayName: "eligibility" | "benefits" | "applicationProcess", index: number) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]]
      newArray.splice(index, 1)
      return { ...prev, [arrayName]: newArray }
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      universityId: "",
      countryId: "",
      amount: "",
      deadline: "",
      levelId: "",
      fieldId: "",
      description: "",
      eligibility: [""],
      benefits: [""],
      applicationProcess: [""],
      website: "",
      featured: false,
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/scholarships/${editingId}` : "/api/scholarships"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          universityId: Number(formData.universityId),
          countryId: Number(formData.countryId),
          levelId: Number(formData.levelId),
          fieldId: Number(formData.fieldId),
        }),
      })

      if (!response.ok) throw new Error(`Failed to ${editingId ? "update" : "create"} scholarship`)

      toast({
        title: "Success",
        description: `Scholarship ${editingId ? "updated" : "created"} successfully`,
      })

      setDialogOpen(false)
      fetchScholarships()
      resetForm()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: `Failed to ${editingId ? "update" : "create"} scholarship`,
        variant: "destructive",
      })
    }
  }

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(`/api/scholarships/${id}`)
      if (!response.ok) throw new Error("Failed to fetch scholarship details")

      const data = await response.json()
      const scholarship = data.scholarship

      setFormData({
        title: scholarship.title,
        universityId: String(scholarship.universityId || ""),
        countryId: String(scholarship.countryId || ""),
        amount: scholarship.amount,
        deadline: format(new Date(scholarship.deadline), "yyyy-MM-dd"),
        levelId: String(scholarship.levelId || ""),
        fieldId: String(scholarship.fieldId || ""),
        description: scholarship.description,
        eligibility: scholarship.eligibility.length ? scholarship.eligibility : [""],
        benefits: scholarship.benefits.length ? scholarship.benefits : [""],
        applicationProcess: scholarship.applicationProcess.length ? scholarship.applicationProcess : [""],
        website: scholarship.website,
        featured: scholarship.featured,
      })

      setEditingId(id)
      setDialogOpen(true)
    } catch (error) {
      console.error("Error fetching scholarship details:", error)
      toast({
        title: "Error",
        description: "Failed to load scholarship details",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?")) return

    try {
      const response = await fetch(`/api/scholarships/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete scholarship")

      toast({
        title: "Success",
        description: "Scholarship deleted successfully",
      })

      fetchScholarships()
    } catch (error) {
      console.error("Error deleting scholarship:", error)
      toast({
        title: "Error",
        description: "Failed to delete scholarship",
        variant: "destructive",
      })
    }
  }

  const filteredScholarships = scholarships.filter(
    (scholarship) =>
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search scholarships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Import from CSV</DropdownMenuItem>
              <DropdownMenuItem>Import from JSON</DropdownMenuItem>
              <DropdownMenuItem>Import from API</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Scholarship
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit" : "Add New"} Scholarship</DialogTitle>
                <DialogDescription>
                  Enter the details for the scholarship. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right">
                      Title *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="university" className="text-right">
                      University *
                    </label>
                    <div className="col-span-3">
                      <Select
                        name="universityId"
                        value={formData.universityId}
                        onValueChange={(value) => handleSelectChange("universityId", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a university" />
                        </SelectTrigger>
                        <SelectContent>
                          {universities.map((uni) => (
                            <SelectItem key={uni.id} value={String(uni.id)}>
                              {uni.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                    <label htmlFor="amount" className="text-right">
                      Amount *
                    </label>
                    <Input
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="deadline" className="text-right">
                      Deadline *
                    </label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="level" className="text-right">
                      Level *
                    </label>
                    <div className="col-span-3">
                      <Select
                        name="levelId"
                        value={formData.levelId}
                        onValueChange={(value) => handleSelectChange("levelId", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select academic level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level.id} value={String(level.id)}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="field" className="text-right">
                      Field *
                    </label>
                    <div className="col-span-3">
                      <Select
                        name="fieldId"
                        value={formData.fieldId}
                        onValueChange={(value) => handleSelectChange("fieldId", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select field of study" />
                        </SelectTrigger>
                        <SelectContent>
                          {fields.map((field) => (
                            <SelectItem key={field.id} value={String(field.id)}>
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="description" className="text-right pt-2">
                      Description *
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="eligibility" className="text-right pt-2">
                      Eligibility *
                    </label>
                    <div className="col-span-3 space-y-2">
                      {formData.eligibility.map((item, index) => (
                        <div key={`eligibility-${index}`} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => handleArrayItemChange("eligibility", index, e.target.value)}
                            placeholder="Eligibility requirement"
                            required
                          />
                          {formData.eligibility.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("eligibility", index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("eligibility")}>
                        Add Eligibility Requirement
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="benefits" className="text-right pt-2">
                      Benefits *
                    </label>
                    <div className="col-span-3 space-y-2">
                      {formData.benefits.map((item, index) => (
                        <div key={`benefits-${index}`} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => handleArrayItemChange("benefits", index, e.target.value)}
                            placeholder="Benefit"
                            required
                          />
                          {formData.benefits.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("benefits", index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("benefits")}>
                        Add Benefit
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="applicationProcess" className="text-right pt-2">
                      Application Process *
                    </label>
                    <div className="col-span-3 space-y-2">
                      {formData.applicationProcess.map((item, index) => (
                        <div key={`app-process-${index}`} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => handleArrayItemChange("applicationProcess", index, e.target.value)}
                            placeholder="Application step"
                            required
                          />
                          {formData.applicationProcess.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("applicationProcess", index)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem("applicationProcess")}
                      >
                        Add Application Step
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="website" className="text-right">
                      Website URL *
                    </label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="featured" className="text-right">
                      Featured
                    </label>
                    <div className="col-span-3 flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                        className="h-4 w-4"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm">
                        Show as featured scholarship
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Scholarship</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredScholarships.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No scholarships found
                </TableCell>
              </TableRow>
            ) : (
              filteredScholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell className="font-medium">{scholarship.title}</TableCell>
                  <TableCell>{scholarship.university}</TableCell>
                  <TableCell>{scholarship.country}</TableCell>
                  <TableCell>{new Date(scholarship.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>{scholarship.level}</TableCell>
                  <TableCell>{scholarship.amount}</TableCell>
                  <TableCell>{scholarship.view_count || 0}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(scholarship.id)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/scholarship/${scholarship.id}`)}>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(scholarship.id)} className="text-red-600">
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

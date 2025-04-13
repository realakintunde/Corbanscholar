import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, PenLine } from "lucide-react"

export const metadata: Metadata = {
  title: "Application Templates | International Scholarship Finder",
  description:
    "Download free templates for your scholarship applications including CVs, motivation letters, and research proposals.",
}

export default function TemplatesPage() {
  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Application Templates</h1>
        <p className="text-lg text-muted-foreground">
          Download professionally designed templates to strengthen your scholarship applications.
        </p>
      </div>

      <Tabs defaultValue="documents" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="letters">Letters</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TemplateCard
              title="Academic CV"
              description="A comprehensive CV template focused on academic achievements, publications, and research experience."
              type="Word/PDF"
            />
            <TemplateCard
              title="Skills-Based Resume"
              description="Highlight your relevant skills and experiences with this clean, professional resume template."
              type="Word/PDF"
            />
            <TemplateCard
              title="International Student CV"
              description="Specially formatted CV template for international students applying for scholarships abroad."
              type="Word/PDF"
            />
          </div>
        </TabsContent>

        <TabsContent value="letters" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TemplateCard
              title="Motivation Letter"
              description="A structured template for writing compelling motivation letters that highlight your goals and aspirations."
              type="Word/PDF"
            />
            <TemplateCard
              title="Statement of Purpose"
              description="Template with guidance for crafting a powerful statement of purpose for graduate programs."
              type="Word/PDF"
            />
            <TemplateCard
              title="Cover Letter"
              description="Professional cover letter template for scholarship and grant applications."
              type="Word/PDF"
            />
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TemplateCard
              title="Research Proposal"
              description="Structured template for developing a comprehensive research proposal with methodology section."
              type="Word/PDF"
            />
            <TemplateCard
              title="Project Timeline"
              description="Visual timeline template to outline your research or project milestones."
              type="Excel/PDF"
            />
            <TemplateCard
              title="Budget Proposal"
              description="Detailed budget template for research projects and scholarship funding requests."
              type="Excel/PDF"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 rounded-lg bg-slate-50 p-8 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Need help with your application essays?</h2>
            <p className="text-muted-foreground">
              Try our AI Essay Writer to get started with a draft for your scholarship application.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/resources/templates/ai-essay-writer">
              <PenLine className="mr-2 h-4 w-4" />
              Try AI Essay Writer
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({ title, description, type }: { title: string; description: string; type: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </Button>
      </CardFooter>
    </Card>
  )
}

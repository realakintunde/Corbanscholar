import { JSDOM } from "jsdom"
import { db } from "@/lib/db"

// Types
type ScrapedScholarship = {
  title: string
  university: string
  country: string
  amount: string
  deadline: string
  level: string
  field: string
  description: string
  eligibility: string[]
  benefits: string[]
  applicationProcess: string[]
  website: string
}

// Configuration for different scholarship websites
const scraperConfigs = {
  fulbright: {
    url: "https://foreign.fulbrightonline.org/",
    selectors: {
      title: ".scholarship-title",
      university: ".university-name",
      country: ".country",
      amount: ".amount",
      deadline: ".deadline",
      level: ".academic-level",
      field: ".field-of-study",
      description: ".description",
      eligibility: ".eligibility li",
      benefits: ".benefits li",
      applicationProcess: ".application-process li",
    },
  },
  chevening: {
    url: "https://www.chevening.org/scholarships/",
    selectors: {
      // Similar structure as above
    },
  },
  // Add more scholarship sources as needed
}

// Main scraper function
export async function scrapeScholarships(source: keyof typeof scraperConfigs): Promise<ScrapedScholarship[]> {
  try {
    const config = scraperConfigs[source]
    if (!config) {
      throw new Error(`No scraper configuration found for source: ${source}`)
    }

    // Fetch the HTML content
    const response = await fetch(config.url)
    const html = await response.text()

    // Parse the HTML
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract scholarship data
    const scholarships: ScrapedScholarship[] = []

    // This is a simplified example - in a real scraper, you would have more complex logic
    // to extract multiple scholarships from a page
    const scholarship: ScrapedScholarship = {
      title: document.querySelector(config.selectors.title)?.textContent?.trim() || "Unknown Scholarship",
      university: document.querySelector(config.selectors.university)?.textContent?.trim() || "Unknown University",
      country: document.querySelector(config.selectors.country)?.textContent?.trim() || "Unknown Country",
      amount: document.querySelector(config.selectors.amount)?.textContent?.trim() || "Unknown Amount",
      deadline: document.querySelector(config.selectors.deadline)?.textContent?.trim() || "Unknown Deadline",
      level: document.querySelector(config.selectors.level)?.textContent?.trim() || "Unknown Level",
      field: document.querySelector(config.selectors.field)?.textContent?.trim() || "Unknown Field",
      description:
        document.querySelector(config.selectors.description)?.textContent?.trim() || "No description available",
      eligibility: Array.from(document.querySelectorAll(config.selectors.eligibility)).map(
        (el) => el.textContent?.trim() || "",
      ),
      benefits: Array.from(document.querySelectorAll(config.selectors.benefits)).map(
        (el) => el.textContent?.trim() || "",
      ),
      applicationProcess: Array.from(document.querySelectorAll(config.selectors.applicationProcess)).map(
        (el) => el.textContent?.trim() || "",
      ),
      website: config.url,
    }

    scholarships.push(scholarship)

    return scholarships
  } catch (error) {
    console.error(`Error scraping ${source}:`, error)
    return []
  }
}

// Function to save scraped scholarships to the database
export async function saveScrapedScholarships(scholarships: ScrapedScholarship[]): Promise<void> {
  try {
    for (const scholarship of scholarships) {
      await db.scholarships.create(scholarship)
    }
    console.log(`Successfully saved ${scholarships.length} scholarships to the database`)
  } catch (error) {
    console.error("Error saving scraped scholarships:", error)
  }
}

// Scheduled job to run the scraper
export async function runScheduledScraping(): Promise<void> {
  console.log("Starting scheduled scholarship scraping...")

  // Scrape from all configured sources
  for (const source of Object.keys(scraperConfigs) as Array<keyof typeof scraperConfigs>) {
    console.log(`Scraping from source: ${source}`)
    const scholarships = await scrapeScholarships(source)
    await saveScrapedScholarships(scholarships)
  }

  console.log("Scheduled scholarship scraping completed")
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { languages } from "@/lib/i18n"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("en")

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage")
    if (storedLang && languages.some((lang) => lang.code === storedLang)) {
      setCurrentLang(storedLang)
      document.documentElement.lang = storedLang
    }
  }, [])

  // Change language
  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode)
    localStorage.setItem("preferredLanguage", langCode)
    document.documentElement.lang = langCode

    // Reload the page to apply the language change
    // In a more sophisticated implementation, we would use a context provider
    // to update the language without reloading
    window.location.reload()
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentLang === lang.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

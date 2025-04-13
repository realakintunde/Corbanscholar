// Define available languages
export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

// Define translation dictionaries
export const translations = {
  en: {
    // Common
    appName: "Scholarship Finder",
    search: "Search",
    country: "Country",
    field: "Field of Study",
    level: "Academic Level",
    amount: "Amount",
    deadline: "Deadline",
    university: "University",
    viewDetails: "View Details",
    applyNow: "Apply Now",

    // Homepage
    heroTitle: "Find Your Perfect Scholarship",
    heroSubtitle: "Discover universities worldwide offering scholarships for international students.",
    featuredScholarships: "Featured Scholarships",
    popularDestinations: "Popular Study Destinations",
    howItWorks: "How It Works",
    searchStep: "Search",
    searchStepDesc: "Find scholarships by country, region, or field of study",
    compareStep: "Compare",
    compareStepDesc: "Review eligibility requirements and benefits",
    applyStep: "Apply",
    applyStepDesc: "Get direct links to application portals",
    ctaTitle: "Ready to Find Your Scholarship?",
    ctaSubtitle: "Join thousands of students who have found their perfect scholarship match.",
    startSearching: "Start Searching",

    // Search
    searchScholarships: "Search Scholarships",
    filters: "Filters",
    academicLevel: "Academic Level",
    scholarshipAmount: "Scholarship Amount",
    applyFilters: "Apply Filters",
    resetFilters: "Reset Filters",
    results: "Results",
    showing: "Showing",
    of: "of",
    scholarships: "scholarships",
    noScholarshipsFound: "No scholarships found",
    tryAdjusting: "Try adjusting your search criteria to find more results.",
    loadMore: "Load More Scholarships",

    // Scholarship Details
    backToSearch: "Back to Search",
    eligibility: "Eligibility",
    benefits: "Benefits",
    applicationProcess: "Application Process",
    overview: "Overview",
    readyToApply: "Ready to Apply?",
    visitWebsite: "Visit Official Website",
    relatedScholarships: "Related Scholarships",
    daysRemaining: "days remaining",
    deadlineToday: "Deadline is today",
    deadlinePassed: "Deadline passed",

    // Resources
    resources: "Resources",
    applicationGuides: "Application Guides",
    essayTemplates: "Essay Templates",
    visaInformation: "Visa Information",
    faq: "FAQ",

    // Community
    community: "Community",
    discussions: "Discussions",
    successStories: "Success Stories",
    findMentors: "Find Mentors",
    events: "Events",
  },
  es: {
    // Common
    appName: "Buscador de Becas",
    search: "Buscar",
    country: "País",
    field: "Campo de Estudio",
    level: "Nivel Académico",
    amount: "Cantidad",
    deadline: "Fecha Límite",
    university: "Universidad",
    viewDetails: "Ver Detalles",
    applyNow: "Aplicar Ahora",

    // Homepage
    heroTitle: "Encuentra Tu Beca Perfecta",
    heroSubtitle: "Descubre universidades en todo el mundo que ofrecen becas para estudiantes internacionales.",
    featuredScholarships: "Becas Destacadas",
    popularDestinations: "Destinos Populares",
    howItWorks: "Cómo Funciona",
    searchStep: "Buscar",
    searchStepDesc: "Encuentra becas por país, región o campo de estudio",
    compareStep: "Comparar",
    compareStepDesc: "Revisa los requisitos de elegibilidad y beneficios",
    applyStep: "Aplicar",
    applyStepDesc: "Obtén enlaces directos a los portales de aplicación",
    ctaTitle: "¿Listo para Encontrar Tu Beca?",
    ctaSubtitle: "Únete a miles de estudiantes que han encontrado su beca perfecta.",
    startSearching: "Comenzar Búsqueda",

    // Search
    searchScholarships: "Buscar Becas",
    filters: "Filtros",
    academicLevel: "Nivel Académico",
    scholarshipAmount: "Monto de la Beca",
    applyFilters: "Aplicar Filtros",
    resetFilters: "Restablecer Filtros",
    results: "Resultados",
    showing: "Mostrando",
    of: "de",
    scholarships: "becas",
    noScholarshipsFound: "No se encontraron becas",
    tryAdjusting: "Intenta ajustar tus criterios de búsqueda para encontrar más resultados.",
    loadMore: "Cargar Más Becas",

    // Scholarship Details
    backToSearch: "Volver a la Búsqueda",
    eligibility: "Elegibilidad",
    benefits: "Beneficios",
    applicationProcess: "Proceso de Aplicación",
    overview: "Resumen",
    readyToApply: "¿Listo para Aplicar?",
    visitWebsite: "Visitar Sitio Web Oficial",
    relatedScholarships: "Becas Relacionadas",
    daysRemaining: "días restantes",
    deadlineToday: "La fecha límite es hoy",
    deadlinePassed: "Fecha límite pasada",

    // Resources
    resources: "Recursos",
    applicationGuides: "Guías de Aplicación",
    essayTemplates: "Plantillas de Ensayos",
    visaInformation: "Información de Visa",
    faq: "Preguntas Frecuentes",

    // Community
    community: "Comunidad",
    discussions: "Discusiones",
    successStories: "Historias de Éxito",
    findMentors: "Encontrar Mentores",
    events: "Eventos",
  },
  // Add more languages as needed
  fr: {
    // Basic translations for French
    appName: "Recherche de Bourses",
    search: "Rechercher",
    // Add more translations as needed
  },
  de: {
    // Basic translations for German
    appName: "Stipendiensuche",
    search: "Suchen",
    // Add more translations as needed
  },
  zh: {
    // Basic translations for Chinese
    appName: "奖学金查找器",
    search: "搜索",
    // Add more translations as needed
  },
}

// Default language
export const defaultLanguage = "en"

// Get translation function
export function getTranslation(lang: string, key: string): string {
  const language = languages.find((l) => l.code === lang) ? lang : defaultLanguage
  const dictionary = translations[language as keyof typeof translations] || translations.en

  return (dictionary as any)[key] || translations.en[key as keyof typeof translations.en] || key
}

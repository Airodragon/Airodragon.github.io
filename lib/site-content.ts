export const siteConfig = {
  name: "Revify Studio",
  legalName: "Revify Studio LLC",
  tagline: "Web design, development, and growth systems for serious founders.",
  description:
    "Revify Studio helps startups and local businesses launch high-converting websites, build automation workflows, and scale demand with measurable marketing strategy.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revify.studio",
  email: "hello@revify.studio",
  phone: "+880 1700-000000",
  location: "Sylhet, Bangladesh",
  responseTime: "Replies within 24 hours",
  launchTimeline: "Average launch in 2-4 weeks"
} as const;

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", shortLabel: "in" },
  { label: "Instagram", href: "https://www.instagram.com", shortLabel: "ig" },
  { label: "X", href: "https://x.com", shortLabel: "x" },
  { label: "Dribbble", href: "https://dribbble.com", shortLabel: "db" }
] as const;

export const trustedBy = [
  "Slack",
  "Google",
  "Dropbox",
  "Booking.com",
  "Notion",
  "HubSpot"
] as const;

export const stats = [
  { label: "Projects delivered", value: "120+" },
  { label: "Avg conversion uplift", value: "38%" },
  { label: "Client retention", value: "92%" },
  { label: "Years of experience", value: "8+" }
] as const;

export const services = [
  {
    title: "Conversion-Focused Website Design",
    description:
      "High-trust website systems with clear messaging, premium UX, and conversion paths designed for qualified leads.",
    outcomes: ["Wireframes + UI system", "Responsive pages", "Brand-consistent design"],
    priceFrom: "from $1,500"
  },
  {
    title: "Next.js Development",
    description:
      "Fast, maintainable websites using modern Next.js architecture, component-driven development, and SEO-ready structure.",
    outcomes: ["App Router setup", "Performance optimization", "Production deployment"],
    priceFrom: "from $2,500"
  },
  {
    title: "Marketing & Growth Ops",
    description:
      "Campaign strategy and tracking that turns your website into a measurable revenue channel, not just an online brochure.",
    outcomes: ["Analytics dashboard", "Funnel optimization", "Retention automation"],
    priceFrom: "from $1,000"
  },
  {
    title: "Ongoing Partnership",
    description:
      "A monthly support model for teams who need reliable iteration, experimentation, and technical ownership after launch.",
    outcomes: ["Weekly iterations", "Priority support", "Roadmap planning"],
    priceFrom: "from $800/mo"
  }
] as const;

export const processSteps = [
  {
    title: "Discovery Sprint",
    description:
      "Align on goals, ICP, and revenue levers. Define scope, pages, conversion actions, and KPI targets."
  },
  {
    title: "Design System & Copy",
    description:
      "Create visual language, page structure, and clear conversion copy so every section has a business purpose."
  },
  {
    title: "Build & Integrations",
    description:
      "Develop the site with Next.js, CMS or API integrations, analytics, and automation hooks for growth workflows."
  },
  {
    title: "Launch & Optimize",
    description:
      "Go live with QA checklists, performance hardening, SEO setup, and an optimization loop based on real data."
  }
] as const;

export const projects = [
  {
    title: "SaaS Lead Generation Platform",
    category: "B2B SaaS",
    summary:
      "Redesigned and rebuilt a multi-page SaaS website with product storytelling, gated assets, and trial conversion UX.",
    impact: "+64% trial signups in 90 days",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "HubSpot API"],
    href: "/contact"
  },
  {
    title: "Ecommerce Landing Suite",
    category: "DTC Ecommerce",
    summary:
      "Built campaign-specific funnels and performance landing pages for seasonal products and paid social campaigns.",
    impact: "3.1x ROAS on paid traffic",
    stack: ["Next.js", "A/B Testing", "GA4", "Meta Pixel"],
    href: "/contact"
  },
  {
    title: "Consulting Brand Reposition",
    category: "Professional Services",
    summary:
      "Repositioned service narrative and visual identity to attract enterprise contracts and premium retainers.",
    impact: "2x inbound qualified leads",
    stack: ["Brand Strategy", "UI Design", "Next.js", "SEO"],
    href: "/contact"
  }
] as const;

export const testimonials = [
  {
    quote:
      "Revify took us from an outdated website to a conversion machine. We finally have a site that sells while we sleep.",
    name: "Samiul Hasan",
    role: "Founder, GrowthNest"
  },
  {
    quote:
      "Fast communication, clean execution, and serious strategic thinking. Every decision was tied to measurable outcomes.",
    name: "Nadia Rahman",
    role: "Marketing Lead, Cartivo"
  },
  {
    quote:
      "The quality and speed were exceptional. We launched on time and our sales team immediately noticed better lead quality.",
    name: "Rafi Chowdhury",
    role: "CEO, PipelineOrbit"
  }
] as const;

export const pricingPlans = [
  {
    name: "Starter Launch",
    price: "$1,500",
    timeline: "1-2 weeks",
    description: "Perfect for solo founders who need a clean, professional website quickly.",
    featured: false,
    features: [
      "Up to 5 responsive pages",
      "Conversion-focused copy guidance",
      "Basic SEO setup",
      "Deployment + analytics integration"
    ]
  },
  {
    name: "Growth System",
    price: "$3,200",
    timeline: "2-4 weeks",
    description: "For teams that want a scalable site plus growth infrastructure from day one.",
    features: [
      "Up to 12 custom pages",
      "Advanced animations and interactions",
      "CRM + automation integration",
      "Performance and technical SEO optimization"
    ],
    featured: true
  },
  {
    name: "Scale Retainer",
    price: "$800/mo",
    timeline: "Monthly",
    description: "Continuous optimization, rapid updates, and strategic support after launch.",
    featured: false,
    features: [
      "Priority implementation queue",
      "Ongoing A/B testing and CRO support",
      "Monthly reporting and roadmap",
      "Slack support and strategy syncs"
    ]
  }
] as const;

export const faqs = [
  {
    question: "Do you only work with startups?",
    answer:
      "No. I work with startups, agencies, and established businesses that need modern websites tied to clear revenue outcomes."
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. Most engagements begin with an audit of your current site, then we improve design, messaging, UX, and performance without losing momentum."
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "A short kickoff call, your business goals, existing brand assets, and access to any tools involved in the build (domain, analytics, CRM, etc.)."
  },
  {
    question: "Do you help with deployment and domain setup?",
    answer:
      "Absolutely. Every project includes deployment assistance, domain configuration, DNS checks, and post-launch QA."
  }
] as const;

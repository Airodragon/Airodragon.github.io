# Portfolio Design Guidelines for Mihir Srivastava

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from modern developer portfolios (Linear's minimalism, Vercel's technical elegance, Stripe's professional polish) to create a sophisticated, developer-focused personal brand.

**Core Principles**:
- Technical sophistication through restrained design
- Content-first hierarchy emphasizing achievements
- Subtle motion that feels purposeful, not distracting
- Professional credibility through clean execution

---

## Color Palette

### Light Mode
- **Primary Background**: 240 20% 99% (off-white base)
- **Surface**: 0 0% 100% (pure white cards)
- **Primary Accent**: 217 91% 60% (vibrant blue for CTAs and highlights)
- **Text Primary**: 222 47% 11% (deep slate for headings)
- **Text Secondary**: 215 16% 47% (muted slate for body)
- **Text Muted**: 214 20% 69% (light slate for metadata)
- **Border**: 214 32% 91% (subtle dividers)

### Dark Mode
- **Primary Background**: 222 47% 11% (deep navy-slate)
- **Surface**: 217 33% 17% (elevated cards)
- **Primary Accent**: 217 91% 60% (same vibrant blue)
- **Text Primary**: 210 20% 98% (off-white headings)
- **Text Secondary**: 214 20% 69% (muted for body)
- **Text Muted**: 215 16% 47% (dimmer metadata)
- **Border**: 217 33% 23% (subtle dark dividers)

**Accent Strategy**: Single blue accent used sparingly for CTAs, active states, and key highlights. Avoid additional accent colors to maintain professional restraint.

---

## Typography

**Font Stack**:
- **Primary**: Inter (via Google Fonts CDN) - body text, UI elements
- **Display**: Cal Sans or Instrument Sans (via Google Fonts) - hero headlines, section titles

**Scale** (using Tailwind classes):
- **Hero Headline**: text-7xl md:text-8xl lg:text-9xl (96-144px) - Bold weight
- **Section Headers**: text-4xl md:text-5xl (36-48px) - Semibold
- **Subsection Headers**: text-2xl md:text-3xl (24-30px) - Semibold  
- **Body Large**: text-xl md:text-2xl (20-24px) - Regular
- **Body**: text-base md:text-lg (16-18px) - Regular
- **Small/Meta**: text-sm (14px) - Medium weight

**Line Height**: Generous 1.6-1.8 for body text, 1.1-1.2 for headlines

---

## Layout System

**Spacing Primitives**: Consistent Tailwind units of **4, 6, 8, 12, 16, 24, 32** for padding, margins, and gaps.

**Section Rhythm**:
- Hero: 100vh with centered content
- Content Sections: py-24 md:py-32 (ample breathing room)
- Component Internal: p-6 md:p-8 for cards
- Grid Gaps: gap-6 md:gap-8 for project grids

**Container Strategy**:
- Max Width: max-w-7xl for most sections
- Text Content: max-w-4xl for readability
- Horizontal Padding: px-6 md:px-8 lg:px-12

**Responsive Breakpoints**:
- Mobile: Single column, stacked navigation
- Tablet (md:): 2-column grids where appropriate
- Desktop (lg:): 3-4 column project grids, expanded navigation

---

## Component Library

### Navigation
- Sticky header with backdrop-blur-lg and subtle border-b
- Floating nav pills on desktop with smooth hover indicators
- Mobile: Clean hamburger menu with slide-in drawer
- Theme toggle: Minimal icon button with smooth transition

### Hero Section
- Full viewport height with vertically centered content
- Large headline with gradient text effect (subtle)
- Professional tagline and brief value proposition
- Dual CTA buttons: primary (filled) + secondary (outline with backdrop-blur when over image)
- Social links row: Icon buttons with subtle hover lift
- **Hero Image**: Large, professional photo or abstract gradient background (right side on desktop, full background on mobile)

### About Section  
- Two-column layout (desktop): Bio + Skills breakdown
- Icon-enhanced cards for education, expertise highlights
- Skills organized by category with clean pill/tag display
- No progress bars - simple, confident list presentation

### Experience Section
- Timeline-style layout with connecting line (subtle)
- Company logo/icon + role/period metadata
- Expandable achievement bullets with smooth reveal
- Alternating card positions for visual interest

### Project Showcase
- 3-column grid (desktop) with hover-lift cards
- Each card: Title, description, tech stack pills, "View Project" link
- Featured project: Larger hero card with screenshot
- Filter tabs: "All", "Professional", "Personal" (smooth underline indicator)

### Contact Section
- Split layout: Contact form (left) + Info/Social (right)
- Simple form: Name, Email, Message with subtle validation
- Alternative contact methods clearly displayed
- Social links repeated with larger touch targets

### Footer
- Minimal: Copyright + Quick links + Social icons
- Single line on desktop, stacked on mobile

---

## Interactive Elements

**Hover States**:
- Cards: Subtle lift (transform: translateY(-4px)) + border color shift
- Buttons: Background color darken + scale(1.02)
- Links: Underline reveal from left
- Social icons: Scale(1.1) + rotate(5deg) for playfulness

**Animations** (minimal, purposeful):
- Section reveals: Fade up on scroll (Intersection Observer)
- Text: Stagger children animation on hero load
- Theme toggle: Smooth 300ms color transition
- NO spinning loaders, pulsing elements, or distracting motions

**Focus States**: 
- Visible ring-2 ring-offset-2 for keyboard navigation
- Consistent focus indicator across all interactive elements

---

## Images

**Hero Background Image**:
- **Description**: Abstract gradient mesh or professional workspace photo (desk setup, code on screen, subtle tech aesthetic)
- **Placement**: Full viewport background on mobile, right 60% of screen on desktop with content overlay on left
- **Treatment**: Subtle gradient overlay (dark mode: dark overlay, light mode: light overlay) for text contrast

**Project Thumbnails**:
- **Requirement**: Placeholder images showing project UI mockups or representative screenshots
- **Treatment**: Rounded corners (rounded-lg), subtle shadow, zoom on hover

**Optional Profile Photo**: 
- Small circular photo in About section or header (128px diameter)
- Placed near bio text, not as main hero element

---

## Quality Standards

- **Accessibility**: WCAG 2.1 AA compliant contrast ratios, semantic HTML, keyboard navigation
- **Performance**: Lazy load images, minimize animation overhead
- **Responsiveness**: Mobile-first with progressive enhancement
- **Code Quality**: Clean component structure, reusable utilities, consistent naming
- **Professional Polish**: Pixel-perfect alignment, consistent spacing, refined micro-interactions

**Visual Hierarchy**: Hero → Projects/Experience (co-equal weight) → About → Skills → Contact
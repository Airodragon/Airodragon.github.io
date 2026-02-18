export type NavSectionId = 'home' | 'about' | 'experience' | 'projects' | 'contact';
export type CustomizableSectionId = Exclude<NavSectionId, 'home'>;

export interface SocialLink {
  id: 'email' | 'github' | 'linkedin' | 'leetcode';
  label: string;
  href: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  type: 'Professional' | 'Personal' | 'Open Source';
  company: string;
  url?: string;
}

export const portfolioContent = {
  profile: {
    name: 'Mihir Srivastava',
    role: 'Software Engineer',
    headline: 'Designing modern, high-performance web products from idea to scale.',
    subheadline: 'Full-stack developer focused on React, Next.js, API architecture, and delightful UX.',
    summary:
      'I build scalable web experiences with a strong focus on product quality, performance, and design systems. Currently leading API design and visual workflow initiatives at Apiwiz.',
    location: 'New Delhi, India',
    email: 'mihir190801@gmail.com',
    phone: '+91 8700993995',
    timezone: 'IST (UTC+5:30)',
    resumeUrl: '#',
    availability: 'Open to collaborations and product-focused engineering roles.',
  },
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ] as const satisfies ReadonlyArray<{ id: NavSectionId; label: string }>,
  socials: [
    { id: 'email', label: 'Email', href: 'mailto:mihir190801@gmail.com' },
    { id: 'github', label: 'GitHub', href: 'https://github.com' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
    { id: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com' },
  ] as const satisfies ReadonlyArray<SocialLink>,
  highlights: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Enterprise Products', value: '8+' },
    { label: 'Primary Stack', value: 'React + Node' },
  ] as const,
  aboutCards: [
    {
      title: 'Professional Background',
      body: 'Software Engineer with hands-on experience building enterprise and consumer products across API platforms, financial services, and growth-focused web apps.',
    },
    {
      title: 'Education',
      body: 'B.Tech in Computer Science and Engineering from NIET, NCR (2019-2023), with deep focus on DSA, software architecture, and database systems.',
    },
    {
      title: 'Engineering Focus',
      body: 'I enjoy translating complex workflows into clear and intuitive experiences through thoughtful frontend architecture, reusable components, and clean abstractions.',
    },
  ] as const,
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Java', 'Python'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Redux', 'React Query', 'AngularJS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'OpenAPI'],
    },
    {
      category: 'Tooling',
      items: ['Git', 'Postman', 'Strapi CMS', 'Vite', 'Tailwind CSS'],
    },
  ] as const satisfies ReadonlyArray<SkillCategory>,
  experience: [
    {
      company: 'Apiwiz',
      role: 'Software Engineer',
      period: 'Sep 2023 - Present',
      location: 'India',
      summary: 'Own and evolve API design experiences for enterprise teams.',
      highlights: [
        'Leading API Design module development with Swagger/OpenAPI specification generation via visual UI',
        'Implemented a flow-based interface for API Builder, improving product workflow efficiency',
        'Established reusable frontend patterns and OpenAPI-compliant system architecture',
        'Collaborated across frontend and backend teams in an Agile delivery model',
      ],
    },
    {
      company: 'Nowfloats (Reliance Jio Platforms)',
      role: 'Software Engineer',
      period: 'Jun 2023 - Sep 2023',
      location: 'Hyderabad, India',
      summary: 'Delivered production-ready fintech interfaces and CMS-driven experiences.',
      highlights: [
        'Developed the official Jio Finance website using Next.js and Strapi CMS',
        'Contributed to full-stack architecture for Jio Loans across app and web channels',
        'Shipped frontend features and optimizations for Boost platform initiatives',
      ],
    },
    {
      company: 'Cloudologic',
      role: 'Developer Intern',
      period: 'Jan 2023 - Jun 2023',
      location: 'New Delhi, India',
      summary: 'Improved UX, performance, and discoverability for core web products.',
      highlights: [
        'Redesigned responsive UI and improved SEO for SkillKai and Cloudologic platforms',
        'Reduced load times and improved usability through frontend optimizations',
      ],
    },
  ] as const satisfies ReadonlyArray<ExperienceItem>,
  projects: [
    {
      title: 'API Design & Builder Platform',
      description:
        'Enterprise-grade visual UI for Swagger/OpenAPI specification generation with reusable components and version-aware workflow controls.',
      tech: ['React', 'Node.js', 'OpenAPI', 'Redux', 'Express.js'],
      type: 'Professional',
      company: 'Apiwiz',
    },
    {
      title: 'Jio Finance Platform',
      description:
        'Full-stack delivery of a high-visibility financial platform with CMS integration and cross-channel compatibility.',
      tech: ['Next.js', 'Strapi CMS', 'React', 'Node.js'],
      type: 'Professional',
      company: 'Reliance Jio',
    },
    {
      title: 'Cloud Desktop Environment',
      description:
        'A Linux-based cloud desktop prototype enabling real-time browser access with secure MERN architecture and terminal tooling.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Linux'],
      type: 'Personal',
      company: 'Personal Project',
    },
  ] as const satisfies ReadonlyArray<ProjectItem>,
};

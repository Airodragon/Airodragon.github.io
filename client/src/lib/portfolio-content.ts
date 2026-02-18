export type NavSectionId = 'home' | 'about' | 'experience' | 'projects' | 'contact';
export type CustomizableSectionId = Exclude<NavSectionId, 'home'>;

export interface SocialLink {
  id: 'email' | 'portfolio' | 'github' | 'linkedin' | 'leetcode';
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
    headline: 'Software Engineer building scalable full-stack products with modern web technologies.',
    subheadline: 'Specialized in React, Next.js, Node.js, and API-centric product development.',
    summary:
      'I build performant and user-focused applications across frontend and backend systems. Currently leading API Design module development at Apiwiz, with prior experience delivering fintech products at Reliance Jio Platforms.',
    location: 'New Delhi, India',
    email: 'mihir190801@gmail.com',
    phone: '+91 8700993995',
    timezone: 'IST (UTC+5:30)',
    resumeUrl: '/Mihir_Srivastava.pdf',
    availability: 'Open to software engineering opportunities and strong product collaborations.',
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
    { id: 'portfolio', label: 'Portfolio', href: 'https://airodragon.github.io' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/Airodragon' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mihir-srivastava/' },
    { id: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com/u/mihir190801/' },
  ] as const satisfies ReadonlyArray<SocialLink>,
  highlights: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Current Role', value: 'Apiwiz · Software Engineer' },
    { label: 'Education', value: 'B.Tech CSE · CGPA 7.5' },
  ] as const,
  aboutCards: [
    {
      title: 'Professional Background',
      body: 'Software Engineer with experience delivering API platforms, fintech products, and full-stack web solutions focused on performance and usability.',
    },
    {
      title: 'Education',
      body: 'B.Tech in Computer Science and Engineering from NIET, NCR (2019 - 2023), graduating with CGPA 7.5.',
    },
    {
      title: 'Core Strengths',
      body: 'Strong foundation in Data Structures and Algorithms, OOP, and DBMS with a practical approach to reusable system design and clean implementation.',
    },
  ] as const,
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript', 'Java', 'Python'],
    },
    {
      category: 'Frameworks / Technologies',
      items: [
        'React',
        'Next.js',
        'Node.js',
        'Express.js',
        'Redux',
        'React Query',
        'Bootstrap',
        'Material UI',
        'AngularJS',
      ],
    },
    {
      category: 'Database',
      items: ['MongoDB', 'PostgreSQL', 'SQL'],
    },
    {
      category: 'Tools',
      items: ['Postman', 'Git', 'Strapi (CMS)'],
    },
    {
      category: 'CS Fundamentals',
      items: ['Data Structures & Algorithms', 'OOP', 'DBMS'],
    },
  ] as const satisfies ReadonlyArray<SkillCategory>,
  experience: [
    {
      company: 'Apiwiz',
      role: 'Software Engineer',
      period: 'Sep 2023 - Present',
      location: 'India',
      summary: 'Leading API design workflows with focus on visual tooling and scalable architecture.',
      highlights: [
        'Leading API Design module development to generate Swagger/OpenAPI specifications through a visual UI',
        'Built flow-based API Builder interfaces to design, link, and test APIs efficiently',
        'Integrated best practices for modular design, reusability, and OpenAPI compliance',
        'Collaborated across React frontend and backend systems in an Agile environment',
      ],
    },
    {
      company: 'Nowfloats (Reliance Jio Platforms)',
      role: 'Software Engineer',
      period: 'Jun 2023 - Sep 2023',
      location: 'Hyderabad, India',
      summary: 'Delivered production fintech experiences across web and app channels.',
      highlights: [
        'Developed the official Jio Finance website using Next.js and Strapi CMS',
        'Built full-stack architecture for Jio Loans used across MyJio, JFS app, and web',
        'Delivered Boost platform enhancements including pagination and rich text improvements',
      ],
    },
    {
      company: 'Cloudologic',
      role: 'Developer Intern',
      period: 'Jan 2023 - Jun 2023',
      location: 'New Delhi, India',
      summary: 'Improved UI quality, SEO, and frontend performance on production platforms.',
      highlights: [
        'Redesigned responsive UI and improved SEO for SkillKai and Cloudologic platforms',
        'Reduced load times and improved usability through frontend codebase optimization',
      ],
    },
  ] as const satisfies ReadonlyArray<ExperienceItem>,
  projects: [
    {
      title: 'Cloud Desktop Environment',
      description:
        'Created a Linux-based cloud desktop interface with real-time virtual access, allowing users to interact with remote Linux environments using a secure MERN stack.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Linux'],
      type: 'Personal',
      company: 'Personal Project',
    },
    {
      title: 'API Design & Builder Platform',
      description:
        'Enterprise UI platform for visual API design, Swagger/OpenAPI generation, and reusable workflow-driven API development.',
      tech: ['React', 'OpenAPI', 'Node.js', 'Redux'],
      type: 'Professional',
      company: 'Apiwiz',
    },
    {
      title: 'Jio Finance Platform',
      description:
        'Contributed to official Jio Finance and Jio Loans experiences with CMS-backed architecture and cross-channel delivery.',
      tech: ['Next.js', 'Strapi CMS', 'React', 'Node.js'],
      type: 'Professional',
      company: 'Reliance Jio',
    },
  ] as const satisfies ReadonlyArray<ProjectItem>,
};

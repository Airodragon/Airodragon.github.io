import { Card, CardContent } from '@/components/ui/card';

const experiences = [
  {
    company: 'Apiwiz',
    role: 'Software Engineer',
    period: 'Sep 2023 - Present',
    location: 'India',
    highlights: [
      'Leading API Design module development with Swagger/OpenAPI specification generation via visual UI',
      'Implemented flow-based interface for API Builder module, improving development lifecycle efficiency',
      'Ensured integration of best practices for reusability, modular design, and OpenAPI compliance',
      'Collaborated across frontend (React) and backend systems in Agile environment'
    ]
  },
  {
    company: 'Nowfloats (Reliance Jio Platforms)',
    role: 'Software Engineer',
    period: 'Jun 2023 - Sep 2023',
    location: 'Hyderabad, India',
    highlights: [
      'Developed official Jio Finance website using Next.js and Strapi CMS',
      'Built full-stack architecture for Jio Loans accessed via MyJio, JFS app, and web',
      'Delivered frontend features and optimizations for Boost platform'
    ]
  },
  {
    company: 'Cloudologic',
    role: 'Developer Intern',
    period: 'Jan 2023 - Jun 2023',
    location: 'New Delhi, India',
    highlights: [
      'Redesigned responsive UI and improved SEO for SkillKai and Cloudologic platforms',
      'Reduced load times and enhanced usability through frontend codebase optimization'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Work Experience</h2>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="hover-elevate"
              data-testid={`card-experience-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1" data-testid={`text-role-${index}`}>{exp.role}</h3>
                    <p className="text-xl text-primary font-semibold mb-2" data-testid={`text-company-${index}`}>{exp.company}</p>
                  </div>
                  <div className="text-muted-foreground text-sm md:text-right">
                    <p className="font-medium" data-testid={`text-period-${index}`}>{exp.period}</p>
                    <p data-testid={`text-location-${index}`}>{exp.location}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground/80" data-testid={`text-highlight-${index}-${idx}`}>
                      <span className="text-primary mt-1 font-bold">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

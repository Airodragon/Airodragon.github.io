import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'API Design & Builder Platform',
    description: 'Enterprise-grade visual UI for Swagger/OpenAPI specification generation with comprehensive version control, reusable components, and flow-based API design interface.',
    tech: ['React', 'Node.js', 'OpenAPI', 'Redux', 'Express.js'],
    type: 'Professional',
    company: 'Apiwiz'
  },
  {
    title: 'Jio Finance Platform',
    description: 'Full-stack development of official Jio Finance website and Jio Loans platform with seamless CMS integration and cross-platform accessibility.',
    tech: ['Next.js', 'Strapi CMS', 'React', 'Node.js'],
    type: 'Professional',
    company: 'Reliance Jio'
  },
  {
    title: 'Cloud Desktop Environment',
    description: 'Linux-based cloud desktop interface providing real-time virtual access through secure MERN stack architecture with interactive terminal access.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Linux'],
    type: 'Personal',
    company: 'Personal Project'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="hover-elevate flex flex-col"
              data-testid={`card-project-${index}`}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                <div className="p-3 bg-primary/10 rounded-md">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" data-testid={`badge-type-${index}`}>
                  {project.type}
                </Badge>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-foreground" data-testid={`text-title-${index}`}>{project.title}</h3>
                <p className="text-sm text-primary mb-3 font-medium" data-testid={`text-company-${index}`}>{project.company}</p>
                <p className="text-muted-foreground mb-4 flex-grow leading-relaxed text-sm" data-testid={`text-description-${index}`}>{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs text-muted-foreground font-medium" data-testid={`text-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                      #{tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

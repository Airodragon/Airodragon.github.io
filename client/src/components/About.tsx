import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const skills = {
  languages: ['JavaScript', 'Java', 'Python'],
  frontend: ['React', 'Next.js', 'Redux', 'React Query', 'AngularJS'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'SQL'],
  tools: ['Git', 'Postman', 'Strapi CMS', 'Bootstrap', 'Material UI']
};

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Cards - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="group hover-elevate backdrop-blur-sm bg-card/50 border-card-border transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Professional Background</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      Software Engineer with 2+ years of experience in full-stack development, currently leading API design initiatives at Apiwiz. Previously contributed to major projects at Reliance Jio Platforms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover-elevate backdrop-blur-sm bg-card/50 border-card-border transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Education</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      B.Tech in Computer Science and Engineering from NIET, NCR (2019-2023) with a CGPA of 7.5. Strong foundation in Data Structures, Algorithms, and Database Management Systems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover-elevate backdrop-blur-sm bg-card/50 border-card-border transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">Expertise</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      Specialized in React ecosystem, API architecture, and scalable full-stack solutions. Passionate about clean code, modern design patterns, and delivering exceptional user experiences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Section - Takes 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              <h3 className="text-3xl font-bold text-foreground mb-8">Technical Skills</h3>
              
              <div className="space-y-4">
                {Object.entries(skills).map(([category, items], index) => (
                  <Card 
                    key={category} 
                    className="group hover-elevate backdrop-blur-sm bg-card/50 border-card-border transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-primary">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className="backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                            data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

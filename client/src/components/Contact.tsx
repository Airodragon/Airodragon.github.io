import { Github, Linkedin, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Let's Work Together</h2>
        <p className="text-lg text-foreground/80 mb-12 leading-relaxed max-w-2xl mx-auto">
          I'm currently open to new opportunities and collaborations. Whether you have a project in mind, need consultation, or just want to connect, I'd love to hear from you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            asChild
            className="px-10"
            data-testid="button-send-email"
          >
            <a href="mailto:mihir190801@gmail.com">Send an Email</a>
          </Button>
          <Button 
            size="lg"
            variant="outline"
            asChild
            className="px-10"
            data-testid="button-call"
          >
            <a href="tel:+918700993995">+91 8700993995</a>
          </Button>
        </div>

        <Card className="inline-block">
          <CardContent className="p-8">
            <p className="text-muted-foreground mb-4">Connect with me on</p>
            <div className="flex gap-4 justify-center">
              <Button variant="ghost" size="icon" asChild data-testid="link-github-footer">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="link-linkedin-footer">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="link-leetcode-footer">
                <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                  <Code className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

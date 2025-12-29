import { useState } from "react";
import { Sparkles, ArrowRight, BookOpen, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export const HeroSection = ({ onGenerate, isLoading }: HeroSectionProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim());
    }
  };

  const features = [
    { icon: BookOpen, text: "Structured Learning Path" },
    { icon: Target, text: "Milestone Tracking" },
    { icon: Zap, text: "AI-Powered Curriculum" },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      
      <div className="container relative z-10 px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Learning</span>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Master Anything with{" "}
            <span className="gradient-text">AI Roadmaps</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Enter any topic and get an AI-generated learning roadmap with actionable checklists. 
            Track your progress from zero to mastery.
          </p>
          
          {/* Search form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="What do you want to learn? (e.g., React, Machine Learning, Guitar)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 h-14 text-base px-6 bg-card border-2 focus-visible:ring-primary"
              />
              <Button 
                type="submit" 
                variant="hero" 
                size="xl"
                disabled={isLoading || !topic.trim()}
                className="min-w-[160px]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </form>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 text-muted-foreground">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

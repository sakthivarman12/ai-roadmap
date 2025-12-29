import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/HeroSection";
import { LearningRoadmap } from "@/components/LearningRoadmap";
import { LearningPath } from "@/types/learning";
import { generateLearningPath } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    
    try {
      const path = await generateLearningPath(topic);
      setLearningPath(path);
      
      toast({
        title: "Roadmap Generated! 🚀",
        description: `Your personalized learning path for "${topic}" is ready.`,
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleItem = (phaseId: string, itemId: string) => {
    if (!learningPath) return;

    setLearningPath((prev) => {
      if (!prev) return prev;

      const updatedPhases = prev.phases.map((phase) => {
        if (phase.id !== phaseId) return phase;

        const updatedItems = phase.items.map((item) => {
          if (item.id !== itemId) return item;
          return { ...item, completed: !item.completed };
        });

        return { ...phase, items: updatedItems };
      });

      const completedItems = updatedPhases.reduce(
        (sum, phase) => sum + phase.items.filter((item) => item.completed).length,
        0
      );

      return {
        ...prev,
        phases: updatedPhases,
        completedItems,
      };
    });
  };

  const handleReset = () => {
    setLearningPath(null);
  };

  return (
    <>
      <Helmet>
        <title>LearnPath AI - Master Any Skill with AI-Powered Roadmaps</title>
        <meta
          name="description"
          content="Generate personalized learning roadmaps and checklists with AI. Track your progress from beginner to expert with structured learning paths."
        />
      </Helmet>

      <main className="min-h-screen">
        {!learningPath ? (
          <HeroSection onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          <LearningRoadmap
            learningPath={learningPath}
            onToggleItem={handleToggleItem}
            onReset={handleReset}
          />
        )}
      </main>
    </>
  );
};

export default Index;

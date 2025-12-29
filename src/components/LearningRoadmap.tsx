import { LearningPath } from "@/types/learning";
import { RoadmapPhase } from "./RoadmapPhase";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, BookOpen, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearningRoadmapProps {
  learningPath: LearningPath;
  onToggleItem: (phaseId: string, itemId: string) => void;
  onReset: () => void;
}

export const LearningRoadmap = ({ learningPath, onToggleItem, onReset }: LearningRoadmapProps) => {
  const overallProgress = learningPath.totalItems > 0 
    ? (learningPath.completedItems / learningPath.totalItems) * 100 
    : 0;

  const currentPhaseIndex = learningPath.phases.findIndex((phase) =>
    phase.items.some((item) => !item.completed)
  );

  return (
    <section className="py-16">
      <div className="container px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Learning Path: <span className="gradient-text">{learningPath.topic}</span>
                </h2>
              </div>
              <p className="text-muted-foreground text-lg">
                {learningPath.phases.length} phases • {learningPath.totalItems} learning objectives
              </p>
            </div>
            <Button variant="outline" onClick={onReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              New Topic
            </Button>
          </div>

          {/* Overall progress card */}
          <div className="bg-card rounded-2xl p-6 border card-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                  {overallProgress === 100 ? (
                    <Trophy className="w-8 h-8 text-accent" />
                  ) : (
                    <Target className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold">
                    {Math.round(overallProgress)}%
                    {overallProgress === 100 && (
                      <span className="ml-2 text-lg text-accent">Completed! 🎉</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <Progress value={overallProgress} className="h-4" />
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  {learningPath.completedItems} of {learningPath.totalItems} objectives completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="max-w-4xl mx-auto space-y-8">
          {learningPath.phases.map((phase, index) => (
            <div 
              key={phase.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RoadmapPhase
                phase={phase}
                isActive={index === currentPhaseIndex}
                onToggleItem={(itemId) => onToggleItem(phase.id, itemId)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

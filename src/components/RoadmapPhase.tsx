import { RoadmapPhase as RoadmapPhaseType } from "@/types/learning";
import { ChecklistItem } from "./ChecklistItem";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapPhaseProps {
  phase: RoadmapPhaseType;
  isActive: boolean;
  onToggleItem: (itemId: string) => void;
}

export const RoadmapPhase = ({ phase, isActive, onToggleItem }: RoadmapPhaseProps) => {
  const completedCount = phase.items.filter((item) => item.completed).length;
  const totalCount = phase.items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isActive && "ring-2 ring-primary ring-offset-2",
        isComplete && "bg-gradient-to-br from-primary/5 to-accent/5"
      )}
    >
      {/* Phase number indicator */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
      
      <CardHeader className="pl-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                {phase.order}
              </span>
              <CardTitle className="text-xl">{phase.title}</CardTitle>
              {isComplete && (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              )}
            </div>
            <CardDescription className="text-base">
              {phase.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
            <Clock className="w-4 h-4" />
            {phase.duration}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-primary">
              {completedCount} / {totalCount} completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="pl-8">
        <div className="space-y-3">
          {phase.items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

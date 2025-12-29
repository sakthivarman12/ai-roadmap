export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  phase: number;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  duration: string;
  items: ChecklistItem[];
  order: number;
}

export interface LearningPath {
  topic: string;
  phases: RoadmapPhase[];
  totalItems: number;
  completedItems: number;
}

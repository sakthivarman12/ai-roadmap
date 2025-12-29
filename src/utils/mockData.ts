import { LearningPath, RoadmapPhase, ChecklistItem } from "@/types/learning";

const generateId = () => Math.random().toString(36).substring(2, 11);

export const generateMockLearningPath = (topic: string): LearningPath => {
  // This is a mock function - will be replaced with AI-generated content
  const phases: RoadmapPhase[] = [
    {
      id: generateId(),
      title: "Foundations & Setup",
      description: `Get started with the essential concepts and tools needed for ${topic}`,
      duration: "1-2 weeks",
      order: 1,
      items: [
        {
          id: generateId(),
          title: `Understand what ${topic} is and why it matters`,
          description: "Learn the core concepts and real-world applications",
          completed: false,
          phase: 1,
        },
        {
          id: generateId(),
          title: "Set up your learning environment",
          description: "Install necessary tools and configure your workspace",
          completed: false,
          phase: 1,
        },
        {
          id: generateId(),
          title: "Complete your first tutorial",
          description: "Follow a beginner-friendly guide to build something simple",
          completed: false,
          phase: 1,
        },
      ],
    },
    {
      id: generateId(),
      title: "Core Concepts",
      description: `Master the fundamental building blocks of ${topic}`,
      duration: "2-3 weeks",
      order: 2,
      items: [
        {
          id: generateId(),
          title: "Learn the basic syntax and structure",
          description: "Understand the foundational elements and how they work together",
          completed: false,
          phase: 2,
        },
        {
          id: generateId(),
          title: "Practice with hands-on exercises",
          description: "Complete coding challenges to reinforce your learning",
          completed: false,
          phase: 2,
        },
        {
          id: generateId(),
          title: "Build small projects",
          description: "Apply what you've learned by creating mini-projects",
          completed: false,
          phase: 2,
        },
        {
          id: generateId(),
          title: "Review and document your progress",
          description: "Take notes and create a personal reference guide",
          completed: false,
          phase: 2,
        },
      ],
    },
    {
      id: generateId(),
      title: "Intermediate Skills",
      description: `Expand your knowledge with more advanced ${topic} concepts`,
      duration: "3-4 weeks",
      order: 3,
      items: [
        {
          id: generateId(),
          title: "Explore advanced patterns and techniques",
          description: "Learn industry best practices and common patterns",
          completed: false,
          phase: 3,
        },
        {
          id: generateId(),
          title: "Study real-world examples",
          description: "Analyze how professionals use these skills in production",
          completed: false,
          phase: 3,
        },
        {
          id: generateId(),
          title: "Build a portfolio project",
          description: "Create something meaningful to showcase your abilities",
          completed: false,
          phase: 3,
        },
      ],
    },
    {
      id: generateId(),
      title: "Advanced Mastery",
      description: `Achieve expertise and start contributing to the ${topic} community`,
      duration: "4+ weeks",
      order: 4,
      items: [
        {
          id: generateId(),
          title: "Deep dive into specialized areas",
          description: "Focus on areas that interest you most",
          completed: false,
          phase: 4,
        },
        {
          id: generateId(),
          title: "Contribute to open source",
          description: "Give back to the community and learn from others",
          completed: false,
          phase: 4,
        },
        {
          id: generateId(),
          title: "Teach others what you've learned",
          description: "Solidify your knowledge by helping beginners",
          completed: false,
          phase: 4,
        },
        {
          id: generateId(),
          title: "Stay current with latest trends",
          description: "Follow industry news and continue learning",
          completed: false,
          phase: 4,
        },
      ],
    },
  ];

  const totalItems = phases.reduce((sum, phase) => sum + phase.items.length, 0);

  return {
    topic,
    phases,
    totalItems,
    completedItems: 0,
  };
};

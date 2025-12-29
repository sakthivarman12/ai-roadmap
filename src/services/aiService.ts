import { supabase } from "@/integrations/supabase/client";
import { LearningPath } from "@/types/learning";

export const generateLearningPath = async (topic: string): Promise<LearningPath> => {
  console.log("Calling generate-roadmap function for topic:", topic);
  
  const { data, error } = await supabase.functions.invoke('generate-roadmap', {
    body: { topic }
  });

  if (error) {
    console.error("Error from generate-roadmap:", error);
    throw new Error(error.message || "Failed to generate learning path");
  }

  if (data.error) {
    console.error("API error:", data.error);
    throw new Error(data.error);
  }

  console.log("Successfully received learning path:", data);
  return data as LearningPath;
};

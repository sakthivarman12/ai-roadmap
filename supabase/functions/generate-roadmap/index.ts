import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const generateId = () => Math.random().toString(36).substring(2, 11);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();
    
    if (!topic || typeof topic !== 'string') {
      console.error("Invalid topic provided:", topic);
      return new Response(
        JSON.stringify({ error: "Topic is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Generating learning path for topic:", topic);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert educational curriculum designer. Create a comprehensive, practical learning roadmap for any topic the user wants to learn from scratch.

Your response must be a valid JSON object with this exact structure:
{
  "phases": [
    {
      "title": "Phase title",
      "description": "Brief description of what this phase covers",
      "duration": "Estimated time (e.g., '1-2 weeks')",
      "items": [
        {
          "title": "Task title",
          "description": "Brief description of what to do or learn"
        }
      ]
    }
  ]
}

Guidelines:
- Create 4-5 logical phases that progress from beginner to advanced
- Each phase should have 3-5 actionable learning items
- Make items specific and actionable, not vague
- Include practical projects and hands-on exercises
- Tailor the roadmap specifically to the topic
- Be encouraging and realistic about timelines
- ONLY respond with valid JSON, no additional text`;

    const userPrompt = `Create a detailed learning roadmap for: "${topic}"

I want to learn this from absolute scratch. Please create a structured path with clear phases and actionable checklist items.`;

    console.log("Calling Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    let content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error("No content in AI response:", data);
      throw new Error("No content in AI response");
    }

    // Clean up the response - remove markdown code blocks if present
    content = content.trim();
    if (content.startsWith("```json")) {
      content = content.slice(7);
    } else if (content.startsWith("```")) {
      content = content.slice(3);
    }
    if (content.endsWith("```")) {
      content = content.slice(0, -3);
    }
    content = content.trim();

    console.log("Parsing AI response...");
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Transform the response to include IDs and proper structure
    const phases = parsed.phases.map((phase: any, index: number) => ({
      id: generateId(),
      title: phase.title,
      description: phase.description,
      duration: phase.duration,
      order: index + 1,
      items: phase.items.map((item: any) => ({
        id: generateId(),
        title: item.title,
        description: item.description,
        completed: false,
        phase: index + 1,
      })),
    }));

    const totalItems = phases.reduce((sum: number, phase: any) => sum + phase.items.length, 0);

    const learningPath = {
      topic,
      phases,
      totalItems,
      completedItems: 0,
    };

    console.log("Successfully generated learning path with", phases.length, "phases and", totalItems, "items");

    return new Response(
      JSON.stringify(learningPath),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-roadmap function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to generate roadmap" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

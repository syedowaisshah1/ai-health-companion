import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");

    const systemPrompts: Record<string, string> = {
      symptom: `You are an AI medical symptom analyzer at MediCare AI clinic. When a patient describes symptoms:
1. Analyze the symptoms carefully
2. List 2-4 possible conditions (most likely first)
3. Provide a severity assessment (mild/moderate/serious)
4. Give practical recommendations
5. Always include a disclaimer that this is not a medical diagnosis

Format your response clearly with sections. Be empathetic and professional. Keep responses concise but informative.`,
      
      chat: `You are MediCare AI's friendly 24/7 health assistant chatbot. You help patients with:
- General health questions
- Clinic information (open Mon-Sat 8AM-8PM, emergency 24/7)
- Appointment guidance (direct them to the booking section)
- Location: 123 Healthcare Avenue, Medical District
- Phone: +92 300 1234567
- Available departments: Cardiology, Neurology, Orthopedics, Ophthalmology, Pediatrics, General Medicine

Be warm, helpful, and concise. If someone describes serious symptoms, advise them to seek immediate medical attention. Always remind users that you're an AI assistant and not a replacement for professional medical advice.`,
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts.chat;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("OpenAI error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

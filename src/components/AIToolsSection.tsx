import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageCircle, Send, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const symptomDB: Record<string, string> = {
  headache: "Possible causes: Tension headache, Migraine, Dehydration, Sinusitis. 💡 Recommendation: Rest, stay hydrated, and consult a doctor if it persists beyond 48 hours.",
  fever: "Possible causes: Viral infection, Flu, COVID-19, Bacterial infection. 💡 Recommendation: Monitor temperature, take paracetamol, and visit a doctor if fever exceeds 102°F.",
  cough: "Possible causes: Common cold, Bronchitis, Allergies, Asthma. 💡 Recommendation: Stay hydrated, use honey & warm fluids. See a doctor if cough lasts more than 2 weeks.",
  "chest pain": "⚠️ This could be serious. Possible causes: Angina, GERD, Muscle strain, Heart attack. 💡 Recommendation: Seek immediate medical attention.",
  "stomach pain": "Possible causes: Gastritis, Food poisoning, IBS, Appendicitis. 💡 Recommendation: Avoid spicy food, stay hydrated, and consult a doctor if pain is severe.",
  fatigue: "Possible causes: Anemia, Thyroid issues, Sleep disorder, Stress. 💡 Recommendation: Ensure adequate sleep, balanced diet, and get blood tests done.",
};

const AIToolsSection = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hello! 👋 I'm your AI health assistant. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const checkSymptoms = () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const lower = symptoms.toLowerCase();
      const match = Object.entries(symptomDB).find(([key]) => lower.includes(key));
      setResult(match ? match[1] : "Based on your symptoms, we recommend scheduling a consultation with one of our specialists for a thorough examination. Our AI couldn't identify a specific condition — a doctor can provide accurate diagnosis.");
      setLoading(false);
    }, 1500);
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((m) => [...m, { role: "user", text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "Thank you for your question! For accurate medical advice, I recommend booking an appointment with our specialists. Is there anything else I can help with?";
      if (lower.includes("appointment") || lower.includes("book")) reply = "You can book an appointment right below in the booking section! We have slots available this week. 📅";
      else if (lower.includes("hour") || lower.includes("timing") || lower.includes("open")) reply = "Our clinic is open Mon–Sat, 8:00 AM to 8:00 PM. Emergency services are available 24/7! 🏥";
      else if (lower.includes("location") || lower.includes("address") || lower.includes("where")) reply = "We're located at 123 Healthcare Avenue, Medical District. You can find us on the map in the contact section below! 📍";
      const match = Object.entries(symptomDB).find(([key]) => lower.includes(key));
      if (match) reply = match[1];
      setChatMessages((m) => [...m, { role: "bot", text: reply }]);
    }, 1000);
  };

  return (
    <section id="ai-tools" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">AI-Powered</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Smart Health Tools</h2>
          <p className="text-muted-foreground text-lg">Use our AI tools for quick symptom analysis and 24/7 chat support.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Symptom Checker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-8 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-xl">AI Symptom Checker</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">Describe your symptoms below and our AI will suggest possible conditions.</p>
            <Textarea
              placeholder="E.g., I have a headache and mild fever since 2 days..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mb-4 min-h-[100px]"
            />
            <Button onClick={checkSymptoms} disabled={loading} className="w-full">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Brain className="w-4 h-4 mr-2" />}
              Analyze Symptoms
            </Button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <p className="text-sm leading-relaxed">{result}</p>
                  <p className="text-xs text-muted-foreground mt-3">⚠️ This is not a medical diagnosis. Please consult a doctor.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border shadow-soft flex flex-col"
          >
            <div className="flex items-center gap-3 p-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">AI Health Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" /> Online 24/7
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[350px]">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.role === "user" ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-secondary rounded-bl-md"}`}>
                    {m.role === "bot" && <Bot className="w-4 h-4 mb-1 text-primary inline mr-1" />}
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border flex gap-2">
              <Input
                placeholder="Ask me anything about health..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
              />
              <Button size="icon" onClick={sendChat}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageCircle, Send, Bot, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { streamAI } from "@/lib/ai-stream";
import { useToast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const AIToolsSection = () => {
  const { toast } = useToast();

  // Symptom checker state
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hello! 👋 I'm your AI health assistant at MediCare AI. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const checkSymptoms = async () => {
    if (!symptoms.trim() || analyzing) return;
    setAnalyzing(true);
    setResult("");

    let accumulated = "";
    try {
      await streamAI({
        messages: [{ role: "user", content: symptoms }],
        mode: "symptom",
        onDelta: (chunk) => {
          accumulated += chunk;
          setResult(accumulated);
        },
        onDone: () => setAnalyzing(false),
      });
    } catch {
      toast({ title: "AI service unavailable", description: "Please try again later.", variant: "destructive" });
      setAnalyzing(false);
    }
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg: Msg = { role: "user", content: chatInput };
    const updatedMsgs = [...chatMessages, userMsg];
    setChatMessages(updatedMsgs);
    setChatInput("");
    setChatLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setChatMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length === updatedMsgs.length + 1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamAI({
        messages: updatedMsgs,
        mode: "chat",
        onDelta: upsert,
        onDone: () => setChatLoading(false),
      });
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again or call us at +92 300 1234567." }]);
      setChatLoading(false);
    }
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
          <p className="text-muted-foreground text-lg">Powered by advanced AI for instant symptom analysis and 24/7 chat support.</p>
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
            <p className="text-muted-foreground text-sm mb-4">Describe your symptoms and our AI will analyze possible conditions.</p>
            <Textarea
              placeholder="E.g., I have a headache and mild fever since 2 days..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mb-4 min-h-[100px]"
            />
            <Button onClick={checkSymptoms} disabled={analyzing} className="w-full">
              {analyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Brain className="w-4 h-4 mr-2" />}
              {analyzing ? "Analyzing..." : "Analyze Symptoms"}
            </Button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 max-h-[300px] overflow-y-auto"
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
                  {!analyzing && <p className="text-xs text-muted-foreground mt-3">⚠️ This is not a medical diagnosis. Please consult a doctor.</p>}
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
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" /> Powered by AI • Online 24/7
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[350px]">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${m.role === "user" ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-secondary rounded-bl-md"}`}>
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && chatMessages[chatMessages.length - 1]?.role === "user" && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-secondary rounded-bl-md">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-border flex gap-2">
              <Input
                placeholder="Ask me anything about health..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                disabled={chatLoading}
              />
              <Button size="icon" onClick={sendChat} disabled={chatLoading}>
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

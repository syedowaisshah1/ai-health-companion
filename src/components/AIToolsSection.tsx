import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MessageCircle, Send, Bot, Loader2, User, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { streamAI } from "@/lib/ai-stream";
import { useToast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const AIToolsSection = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
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
        onDelta: (chunk) => { accumulated += chunk; setResult(accumulated); },
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
      await streamAI({ messages: updatedMsgs, mode: "chat", onDelta: upsert, onDone: () => setChatLoading(false) });
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again or call +92 300 1234567." }]);
      setChatLoading(false);
    }
  };

  return (
    <section id="ai-tools" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            <Zap className="w-3 h-3" /> AI-Powered
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
            Smart Health <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Powered by advanced AI for instant symptom analysis and 24/7 chat support.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Symptom Checker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border/50 p-8 shadow-card hover:shadow-hover transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow/30">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">AI Symptom Checker</h3>
                <p className="text-xs text-muted-foreground">Powered by GPT-4</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">Describe your symptoms and our AI will analyze possible conditions.</p>
            <Textarea
              placeholder="E.g., I have a headache and mild fever since 2 days..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mb-4 min-h-[110px] resize-none border-border/50 focus:border-primary/50"
            />
            <Button onClick={checkSymptoms} disabled={analyzing} className="w-full h-12 gradient-primary text-primary-foreground shadow-glow/30 hover:shadow-glow transition-all">
              {analyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              {analyzing ? "Analyzing..." : "Analyze Symptoms"}
            </Button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 p-5 rounded-xl bg-primary/5 border border-primary/15 max-h-[300px] overflow-y-auto"
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
                  {!analyzing && <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-primary/10">⚠️ This is not a medical diagnosis. Please consult a doctor.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border/50 shadow-card hover:shadow-hover transition-shadow duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 p-6 pb-4 border-b border-border/50">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow/30">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">AI Health Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" /> Online 24/7 • Powered by GPT-4
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[370px]">
              {chatMessages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0 mt-1 shadow-glow/20">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${m.role === "user" ? "gradient-primary text-primary-foreground rounded-2xl rounded-br-md shadow-glow/20" : "bg-muted/60 rounded-2xl rounded-bl-md"}`}>
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {chatLoading && chatMessages[chatMessages.length - 1]?.role === "user" && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-glow/20">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-muted/60 rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-border/50 flex gap-2">
              <Input
                placeholder="Ask me anything about health..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                disabled={chatLoading}
                className="h-12 border-border/50 focus:border-primary/50"
              />
              <Button size="icon" onClick={sendChat} disabled={chatLoading} className="h-12 w-12 gradient-primary text-primary-foreground shadow-glow/30 hover:shadow-glow transition-all shrink-0">
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

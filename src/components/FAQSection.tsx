import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  { q: "How does the AI Symptom Checker work?", a: "Our AI analyzes your described symptoms against a medical database to suggest possible conditions. It's designed for initial guidance — always consult a doctor for proper diagnosis." },
  { q: "Is the AI Chatbot available 24/7?", a: "Yes! Our AI Health Assistant is available round the clock to answer general health queries, help with appointment booking, and provide clinic information." },
  { q: "How do I book an appointment?", a: "Simply scroll to the booking section, fill in your details, select a date, time slot, and department, then confirm. You'll receive a confirmation notification." },
  { q: "Is my health data secure?", a: "Absolutely. We use industry-standard encryption and follow HIPAA guidelines to protect all patient information." },
  { q: "Can I cancel or reschedule my appointment?", a: "Yes, you can cancel or reschedule your appointment by contacting our reception at least 4 hours before the scheduled time." },
  { q: "Do you offer telemedicine consultations?", a: "Yes! We offer video consultations for follow-ups and non-emergency cases. Ask about it when booking your appointment." },
];

const FAQSection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <div className="container max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
          <HelpCircle className="w-3 h-3 mr-1.5" /> FAQ
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <AccordionItem value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-6 shadow-soft data-[state=open]:shadow-card transition-shadow">
              <AccordionTrigger className="text-left font-heading font-semibold hover:text-primary transition-colors py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;

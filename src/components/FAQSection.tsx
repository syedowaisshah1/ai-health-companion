import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "How does the AI Symptom Checker work?", a: "Our AI analyzes your described symptoms against a medical database to suggest possible conditions. It's designed for initial guidance — always consult a doctor for proper diagnosis." },
  { q: "Is the AI Chatbot available 24/7?", a: "Yes! Our AI Health Assistant is available round the clock to answer general health queries, help with appointment booking, and provide clinic information." },
  { q: "How do I book an appointment?", a: "Simply scroll to the booking section, fill in your details, select a date, time slot, and department, then confirm. You'll receive a confirmation notification." },
  { q: "Is my health data secure?", a: "Absolutely. We use industry-standard encryption and follow HIPAA guidelines to protect all patient information." },
  { q: "Can I cancel or reschedule my appointment?", a: "Yes, you can cancel or reschedule your appointment by contacting our reception at least 4 hours before the scheduled time." },
  { q: "Do you offer telemedicine consultations?", a: "Yes! We offer video consultations for follow-ups and non-emergency cases. Ask about it when booking your appointment." },
];

const FAQSection = () => (
  <section className="py-24 bg-card">
    <div className="container max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">FAQ</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Frequently Asked Questions</h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-xl border border-border px-6">
            <AccordionTrigger className="text-left font-heading font-semibold hover:text-primary">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;

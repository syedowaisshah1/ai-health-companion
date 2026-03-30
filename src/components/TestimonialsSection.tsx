import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Ayesha Malik", role: "Patient", text: "The AI symptom checker accurately identified my condition. Saved me a lot of worry. Highly recommended!", rating: 5 },
  { name: "Rajesh Kumar", role: "Patient", text: "Dr. Khan is amazing! The online booking system made it so easy. Best clinic experience ever.", rating: 5 },
  { name: "Maria Santos", role: "Patient", text: "24/7 chat support helped me at 2 AM when my child had a fever. Incredible service!", rating: 5 },
  { name: "Ali Hassan", role: "Patient", text: "Modern facility with caring staff. The AI tools are a game changer for healthcare.", rating: 4 },
];

const TestimonialsSection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
          What Our <span className="text-gradient">Patients Say</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card rounded-2xl p-7 border border-border/50 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 relative"
          >
            <Quote className="w-10 h-10 text-primary/10 absolute top-5 right-5" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {r.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-heading font-bold text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

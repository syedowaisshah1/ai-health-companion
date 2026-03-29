import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Ayesha Malik", text: "The AI symptom checker accurately identified my condition. Saved me a lot of worry. Highly recommended!", rating: 5 },
  { name: "Rajesh Kumar", text: "Dr. Khan is amazing! The online booking system made it so easy. Best clinic experience ever.", rating: 5 },
  { name: "Maria Santos", text: "24/7 chat support helped me at 2 AM when my child had a fever. Incredible service!", rating: 5 },
  { name: "Ali Hassan", text: "Modern facility with caring staff. The AI tools are a game changer for healthcare.", rating: 4 },
];

const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Patients Say</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-soft relative"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{r.text}"</p>
            <p className="font-heading font-bold text-sm">{r.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

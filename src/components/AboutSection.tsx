import { motion } from "framer-motion";
import { Award, Clock, HeartPulse, Users } from "lucide-react";

const highlights = [
  { icon: Award, title: "Board Certified", desc: "All doctors are board-certified specialists" },
  { icon: Clock, title: "24/7 AI Support", desc: "Round-the-clock virtual health assistant" },
  { icon: HeartPulse, title: "Advanced Care", desc: "Latest medical technology & AI diagnostics" },
  { icon: Users, title: "Patient First", desc: "Personalized care plans for every patient" },
];

const AboutSection = () => (
  <section id="about" className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">About Us</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          Leading the Future of Healthcare
        </h2>
        <p className="text-muted-foreground text-lg">
          MediCare AI combines decades of medical expertise with cutting-edge artificial intelligence to deliver faster, smarter, and more accurate healthcare solutions.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-background shadow-soft hover:shadow-card-hover transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
              <h.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">{h.title}</h3>
            <p className="text-muted-foreground text-sm">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;

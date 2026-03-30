import { motion } from "framer-motion";
import { Award, Clock, HeartPulse, Users } from "lucide-react";

const highlights = [
  { icon: Award, title: "Board Certified", desc: "All doctors are board-certified specialists", color: "from-primary to-primary" },
  { icon: Clock, title: "24/7 AI Support", desc: "Round-the-clock virtual health assistant", color: "from-accent to-accent" },
  { icon: HeartPulse, title: "Advanced Care", desc: "Latest medical technology & AI diagnostics", color: "from-primary to-accent" },
  { icon: Users, title: "Patient First", desc: "Personalized care plans for every patient", color: "from-accent to-primary" },
];

const AboutSection = () => (
  <section id="about" className="py-28 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">About Us</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
          Leading the Future of <span className="text-gradient">Healthcare</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
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
            className="group relative p-7 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl gradient-primary opacity-0 group-hover:opacity-[0.03] transition-opacity" />
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 shadow-glow/30 group-hover:shadow-glow transition-shadow">
              <h.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">{h.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;

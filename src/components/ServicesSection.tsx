import { motion } from "framer-motion";
import { Bone, Brain, Eye, Heart, Pill, Syringe, Baby, Microscope, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Heart, name: "Cardiology", desc: "Heart health checkups, ECG & advanced cardiac care" },
  { icon: Brain, name: "Neurology", desc: "Brain & nervous system diagnostics and treatment" },
  { icon: Bone, name: "Orthopedics", desc: "Bone, joint & muscle care with modern techniques" },
  { icon: Eye, name: "Ophthalmology", desc: "Comprehensive eye exams & vision correction" },
  { icon: Baby, name: "Pediatrics", desc: "Complete healthcare for infants & children" },
  { icon: Pill, name: "General Medicine", desc: "Everyday health issues, preventive care & checkups" },
  { icon: Microscope, name: "Diagnostics", desc: "AI-powered lab tests & imaging services" },
  { icon: Syringe, name: "Vaccination", desc: "Complete vaccination programs for all ages" },
];

const ServicesSection = () => (
  <section id="services" className="py-28 relative overflow-hidden">
    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">Our Services</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
          Comprehensive <span className="text-gradient">Medical Services</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">From routine checkups to specialized treatments, we offer a full range of healthcare services.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative p-6 rounded-2xl border border-border/50 bg-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-13 h-13 rounded-xl bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center mb-4 transition-all duration-300">
                <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading font-bold group-hover:text-primary-foreground transition-colors duration-300">{s.name}</h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </div>
              <p className="text-muted-foreground text-sm group-hover:text-primary-foreground/80 transition-colors duration-300 leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;

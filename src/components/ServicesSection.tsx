import { motion } from "framer-motion";
import { Bone, Brain, Eye, Heart, Pill, Syringe, Baby, Microscope } from "lucide-react";

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
  <section id="services" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">Our Services</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Comprehensive Medical Services</h2>
        <p className="text-muted-foreground text-lg">From routine checkups to specialized treatments, we offer a full range of healthcare services.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group p-6 rounded-2xl border border-border bg-card hover:shadow-card-hover hover:border-primary/30 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:gradient-primary flex items-center justify-center mb-4 transition-all">
              <s.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-heading font-bold mb-1">{s.name}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;

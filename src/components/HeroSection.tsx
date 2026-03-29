import { motion } from "framer-motion";
import { CalendarDays, Brain, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-doctor.jpg";

const stats = [
  { icon: CalendarDays, value: "10K+", label: "Patients Treated" },
  { icon: Brain, value: "AI", label: "Powered Diagnosis" },
  { icon: ShieldCheck, value: "99%", label: "Satisfaction Rate" },
];

const HeroSection = () => (
  <section id="home" className="relative pt-20 md:pt-0 min-h-screen flex items-center overflow-hidden">
    {/* Background gradient blob */}
    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full gradient-primary opacity-10 blur-3xl pointer-events-none" />

    <div className="container grid md:grid-cols-2 gap-12 items-center py-16 md:py-0">
      {/* Text */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase gradient-primary text-primary-foreground mb-6">
          AI-Powered Healthcare
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Your Health, <br />
          <span className="text-primary">Our Priority</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mb-8">
          Experience next-generation healthcare with AI-powered diagnostics, smart appointment booking, and 24/7 virtual assistance.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <a href="#booking">Book Appointment</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#ai-tools">Try AI Symptom Checker</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-12">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative flex justify-center"
      >
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 rounded-3xl gradient-primary opacity-20 blur-2xl scale-110" />
          <img
            src={heroImg}
            alt="Doctor at MediCare AI Clinic"
            className="relative rounded-3xl shadow-card w-full object-cover"
            width={768}
            height={1024}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

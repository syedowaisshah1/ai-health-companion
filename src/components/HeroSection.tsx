import { motion } from "framer-motion";
import { CalendarDays, Brain, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-doctor.jpg";

const stats = [
  { icon: CalendarDays, value: "10K+", label: "Patients Treated" },
  { icon: Brain, value: "AI", label: "Powered Diagnosis" },
  { icon: ShieldCheck, value: "99%", label: "Satisfaction Rate" },
];

const HeroSection = () => (
  <section id="home" className="relative pt-20 md:pt-0 min-h-screen flex items-center overflow-hidden">
    {/* Animated background blobs */}
    <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none animate-blob" style={{ animationDelay: "4s" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />

    {/* Dot grid pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

    <div className="container grid md:grid-cols-2 gap-12 items-center py-16 md:py-0 relative z-10">
      {/* Text */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase gradient-primary text-primary-foreground mb-6 shadow-glow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Healthcare
        </motion.span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
          Your Health, <br />
          <span className="text-gradient">Our Priority</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
          Experience next-generation healthcare with AI-powered diagnostics, smart appointment booking, and 24/7 virtual assistance.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow hover:shadow-hover transition-all duration-300 px-8 h-13 text-base" asChild>
            <a href="#booking">
              Book Appointment
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 h-13 px-8 text-base" asChild>
            <a href="#ai-tools">
              <Brain className="w-4 h-4 mr-2" />
              Try AI Symptom Checker
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-glow/50">
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative flex justify-center"
      >
        <div className="relative w-full max-w-md">
          {/* Glow behind image */}
          <div className="absolute inset-0 rounded-3xl gradient-primary opacity-20 blur-3xl scale-110 animate-pulse-soft" />
          {/* Decorative ring */}
          <div className="absolute -inset-4 rounded-[2rem] border border-primary/10" />
          <img
            src={heroImg}
            alt="Doctor at MediCare AI Clinic"
            className="relative rounded-3xl shadow-card w-full object-cover"
            width={768}
            height={1024}
          />
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-4 top-1/4 glass rounded-2xl px-4 py-3 shadow-card border border-border/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-bold">AI Diagnosis</p>
                <p className="text-[10px] text-muted-foreground">98% Accuracy</p>
              </div>
            </div>
          </motion.div>
          {/* Floating badge bottom */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -left-4 bottom-1/4 glass rounded-2xl px-4 py-3 shadow-card border border-border/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs font-bold">Trusted Care</p>
                <p className="text-[10px] text-muted-foreground">10K+ Patients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

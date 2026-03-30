import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const info = [
  { icon: MapPin, label: "Address", value: "123 Healthcare Avenue, Medical District, City 54000" },
  { icon: Phone, label: "Phone", value: "+92 300 1234567" },
  { icon: Mail, label: "Email", value: "info@medicareai.com" },
  { icon: Clock, label: "Hours", value: "Mon – Sat: 8 AM – 8 PM | Emergency: 24/7" },
];

const ContactSection = () => (
  <section id="contact" className="py-28 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">Contact</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">Have questions? Reach out to us anytime.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          {info.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-glow/30">
                <item.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-sm uppercase tracking-wide text-muted-foreground mb-1">{item.label}</h4>
                <p className="text-foreground font-medium text-sm">{item.value}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0 mt-1" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-card border border-border/50 h-[380px]"
        >
          <iframe
            title="MediCare AI Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.474136!2d67.0011!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDAnMDMuOSJF!5e0!3m2!1sen!2s!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;

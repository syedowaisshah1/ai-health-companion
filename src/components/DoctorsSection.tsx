import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const doctors = [
  { name: "Dr. Sarah Khan", specialty: "Cardiologist", exp: "15 years", rating: 4.9, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. Ahmed Raza", specialty: "Neurologist", exp: "12 years", rating: 4.8, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. Priya Sharma", specialty: "Pediatrician", exp: "10 years", rating: 4.9, img: "https://images.unsplash.com/photo-1594824476967-48c8b964f56a?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. James Miller", specialty: "Orthopedic Surgeon", exp: "18 years", rating: 4.7, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face" },
];

const DoctorsSection = () => (
  <section id="doctors" className="py-28 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">Our Team</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
          Meet Our <span className="text-gradient">Expert Doctors</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">Experienced, compassionate doctors dedicated to your well-being.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {doctors.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img src={d.img} alt={d.name} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={400} height={400} />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <Button size="sm" className="w-full gradient-primary text-primary-foreground text-xs" asChild>
                  <a href="#booking"><Calendar className="w-3 h-3 mr-1.5" />Book Appointment</a>
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading font-bold text-lg">{d.name}</h3>
              <p className="text-primary text-sm font-semibold">{d.specialty}</p>
              <p className="text-muted-foreground text-xs mt-1">{d.exp} experience</p>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/50">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-bold">{d.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">rating</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DoctorsSection;

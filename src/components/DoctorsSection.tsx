import { motion } from "framer-motion";
import { Star } from "lucide-react";

const doctors = [
  { name: "Dr. Sarah Khan", specialty: "Cardiologist", exp: "15 years", rating: 4.9, img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. Ahmed Raza", specialty: "Neurologist", exp: "12 years", rating: 4.8, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. Priya Sharma", specialty: "Pediatrician", exp: "10 years", rating: 4.9, img: "https://images.unsplash.com/photo-1594824476967-48c8b964f56a?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. James Miller", specialty: "Orthopedic Surgeon", exp: "18 years", rating: 4.7, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face" },
];

const DoctorsSection = () => (
  <section id="doctors" className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">Our Team</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Meet Our Expert Doctors</h2>
        <p className="text-muted-foreground text-lg">Experienced, compassionate doctors dedicated to your well-being.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {doctors.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-shadow"
          >
            <img src={d.img} alt={d.name} className="w-full h-56 object-cover" loading="lazy" width={400} height={400} />
            <div className="p-5">
              <h3 className="font-heading font-bold text-lg">{d.name}</h3>
              <p className="text-primary text-sm font-medium">{d.specialty}</p>
              <p className="text-muted-foreground text-xs mt-1">{d.exp} experience</p>
              <div className="flex items-center gap-1 mt-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-semibold">{d.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DoctorsSection;

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Mail, Phone, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];
const departments = ["General Medicine", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Ophthalmology"];

const BookingSection = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", dept: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time || !form.dept) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Appointment Booked! ✅", description: "We'll send you a confirmation shortly." });
  };

  if (submitted) {
    return (
      <section id="booking" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container max-w-lg text-center relative z-10">
          <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center shadow-glow">
            <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3">Appointment Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Thank you, {form.name}. Your appointment is booked for:</p>
          <p className="font-heading font-bold text-xl text-gradient">{form.date} at {form.time}</p>
          <p className="text-muted-foreground text-sm mt-1">{form.dept}</p>
          <Button className="mt-8 gradient-primary text-primary-foreground" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", date: "", time: "", dept: "" }); }}>
            Book Another Appointment
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary mb-4">
            <CalendarDays className="w-3 h-3 mr-1.5" /> Appointment
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-5 tracking-tight">
            Book Your <span className="text-gradient">Visit</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Schedule an appointment online — quick, easy, and hassle-free.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Full Name *</label>
              <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Mail className="w-4 h-4 text-primary" /> Email *</label>
              <Input type="email" placeholder="john@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary" /> Phone</label>
              <Input type="tel" placeholder="+92 300 1234567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> Date *</label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-12" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Time Slot *</label>
              <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                <SelectTrigger className="h-12"><SelectValue placeholder="Select time" /></SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-primary" /> Department *</label>
              <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
                <SelectTrigger className="h-12"><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full mt-8 h-13 gradient-primary text-primary-foreground shadow-glow hover:shadow-hover transition-all text-base">
            <CalendarDays className="w-4 h-4 mr-2" /> Confirm Appointment
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;

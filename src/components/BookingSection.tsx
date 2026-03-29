import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Mail, Phone, CheckCircle2 } from "lucide-react";
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
      <section id="booking" className="py-24 bg-card">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container max-w-lg text-center">
          <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-3">Appointment Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Thank you, {form.name}. Your appointment is booked for:</p>
          <p className="font-heading font-bold text-xl text-primary">{form.date} at {form.time}</p>
          <p className="text-muted-foreground text-sm mt-1">{form.dept}</p>
          <Button className="mt-8" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", date: "", time: "", dept: "" }); }}>
            Book Another Appointment
          </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Appointment</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Book Your Visit</h2>
          <p className="text-muted-foreground text-lg">Schedule an appointment online — quick, easy, and hassle-free.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-background rounded-2xl p-8 shadow-card border border-border"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1"><User className="w-4 h-4" /> Full Name *</label>
              <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1"><Mail className="w-4 h-4" /> Email *</label>
              <Input type="email" placeholder="john@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1"><Phone className="w-4 h-4" /> Phone</label>
              <Input type="tel" placeholder="+92 300 1234567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1"><CalendarDays className="w-4 h-4" /> Date *</label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1"><Clock className="w-4 h-4" /> Time Slot *</label>
              <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5">Department *</label>
              <Select value={form.dept} onValueChange={(v) => setForm({ ...form, dept: v })}>
                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full mt-6">
            <CalendarDays className="w-4 h-4 mr-2" /> Confirm Appointment
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;

import { Stethoscope } from "lucide-react";

const Footer = () => (
  <footer className="gradient-primary text-primary-foreground py-12">
    <div className="container">
      <div className="grid sm:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 font-heading font-bold text-xl mb-3">
            <Stethoscope className="w-6 h-6" /> MediCare AI
          </div>
          <p className="text-sm opacity-80">AI-powered healthcare for a healthier tomorrow.</p>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Quick Links</h4>
          <div className="space-y-1 text-sm opacity-80">
            <a href="#about" className="block hover:opacity-100 transition-opacity">About</a>
            <a href="#services" className="block hover:opacity-100 transition-opacity">Services</a>
            <a href="#doctors" className="block hover:opacity-100 transition-opacity">Doctors</a>
            <a href="#booking" className="block hover:opacity-100 transition-opacity">Book Appointment</a>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-3">Contact</h4>
          <div className="space-y-1 text-sm opacity-80">
            <p>+92 300 1234567</p>
            <p>info@medicareai.com</p>
            <p>Mon – Sat: 8 AM – 8 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-70">
        © {new Date().getFullYear()} MediCare AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

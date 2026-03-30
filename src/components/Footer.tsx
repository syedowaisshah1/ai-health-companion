import { Stethoscope, Heart } from "lucide-react";

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Gradient top border */}
    <div className="h-1 gradient-primary" />

    <div className="bg-foreground text-background py-16">
      <div className="container">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-extrabold text-xl">MediCare AI</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed max-w-xs">AI-powered healthcare for a healthier tomorrow. Experience next-generation medical care.</p>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wide opacity-80">Quick Links</h4>
            <div className="space-y-2.5 text-sm">
              <a href="#about" className="block opacity-50 hover:opacity-100 transition-opacity">About Us</a>
              <a href="#services" className="block opacity-50 hover:opacity-100 transition-opacity">Services</a>
              <a href="#doctors" className="block opacity-50 hover:opacity-100 transition-opacity">Our Doctors</a>
              <a href="#booking" className="block opacity-50 hover:opacity-100 transition-opacity">Book Appointment</a>
              <a href="#ai-tools" className="block opacity-50 hover:opacity-100 transition-opacity">AI Tools</a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wide opacity-80">Contact Info</h4>
            <div className="space-y-2.5 text-sm opacity-50">
              <p>+92 300 1234567</p>
              <p>info@medicareai.com</p>
              <p>Mon – Sat: 8 AM – 8 PM</p>
              <p>Emergency: 24/7</p>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-40">
          <p>© {new Date().getFullYear()} MediCare AI. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart className="w-3 h-3 fill-current text-destructive" /> AI Technology</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

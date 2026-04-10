import React from 'react';
import { 
  Shield, 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Phone,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1.5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight">HireConnect</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">
              Empowering Nigeria's workforce through secure, verified connections. The bridge between trust and professionalism.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4">
              {['Browse Workers', 'Pricing Plans', 'Success Stories', 'Safety & Trust', 'How it Works'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">For Workers</h4>
            <ul className="space-y-4">
              {['Register as Expert', 'Verification Process', 'Training Resources', 'Earnings & Escrow', 'Dispute Resolution'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Support Line</p>
                  <p className="font-bold">+234 903 953 5267</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Email Address</p>
                  <p className="font-bold">hello@hireconnect.ng</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} HireConnect Nigeria. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">PWA Manifest</a>
          </div>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> in Lagos
          </p>
        </div>
      </div>
    </footer>
  );
};
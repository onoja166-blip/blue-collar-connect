import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Briefcase, Star, Search, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  onBrowse: () => void;
  onApply: () => void;
}

export const Hero = ({ onBrowse, onApply }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-blue-100 text-blue-800 border-none px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest mb-8 shadow-sm">
                \ud83c\uddf3\ud83c\uddec Nigeria's #1 Trusted Marketplace
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black text-blue-950 leading-[0.9] tracking-tighter italic">
                Hire Local <br />
                <span className="text-blue-600">Verified</span> Pros.
              </h1>
              <p className="mt-8 text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Access the elite network of vetted Nigerian artisans. From plumbers to ushers, we connect you with professionals who are background checked and reliable.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button 
                onClick={onBrowse}
                className="h-20 px-12 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-3xl shadow-2xl shadow-blue-900/20 text-xl w-full sm:w-auto transition-transform active:scale-95 group"
              >
                Find an Expert <Search className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={onApply}
                className="h-20 px-12 border-2 border-slate-100 hover:bg-slate-50 text-blue-950 font-black rounded-3xl text-xl w-full sm:w-auto transition-transform active:scale-95"
              >
                Join as a Worker
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-10 pt-10 border-t border-slate-50"
            >
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600"><ShieldCheck className="w-7 h-7" /></div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">100% Vetted</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600"><Zap className="w-7 h-7" /></div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Instant Booking</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><CheckCircle2 className="w-7 h-7" /></div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Escrow Secure</p>
               </div>
            </motion.div>
          </div>

          <div className="lg:w-2/5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative z-10"
            >
               <div className="bg-white p-4 rounded-[48px] shadow-2xl rotate-3 relative overflow-hidden">
                  <img 
                    src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/electrician-nigerian-expert-a7d56dba-1775821764984.webp" 
                    alt="Nigerian Professional" 
                    className="w-full h-auto rounded-[40px]"
                  />
                  <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border border-white">
                     <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white"><CheckCircle2 className="w-6 h-6" /></div>
                     <div>
                        <p className="font-black text-blue-950 text-lg">Musa Ibrahim</p>
                        <p className="text-xs font-bold text-slate-400 uppercase">Verified Electrician</p>
                     </div>
                  </div>
               </div>
               
               {/* Floating Badges */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="absolute -top-10 -right-10 bg-blue-900 text-white p-8 rounded-[40px] shadow-2xl"
               >
                  <Star className="w-8 h-8 text-amber-400 mb-2 fill-current" />
                  <p className="text-2xl font-black">4.9/5</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg Rating</p>
               </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
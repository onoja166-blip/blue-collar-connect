import React from 'react';
import { Check, ShieldCheck, UserPlus, Lock, Zap, Crown, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface PricingProps {
  onSelectWorker: (plan: string) => void;
  onSelectClient: (plan: { amount: number; title: string }) => void;
}

export const Pricing = ({ onSelectWorker, onSelectClient }: PricingProps) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="bg-blue-100 text-blue-700 border-none px-4 py-1.5 rounded-full mb-6 font-black uppercase tracking-widest text-xs">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-6">Choose Your Path to Success</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Transparent, affordable plans for both clients and professionals in the Nigerian market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Worker Plan */}
          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <Card className="h-full border-none shadow-xl shadow-slate-200/50 rounded-[40px] overflow-hidden flex flex-col">
              <CardHeader className="bg-blue-900 text-white p-10">
                <Badge className="bg-white/20 text-white border-none mb-4 font-bold">FOR WORKERS</Badge>
                <CardTitle className="text-3xl font-black">Verification Portal</CardTitle>
                <CardDescription className="text-blue-100 mt-2">Join the network of verified elite professionals</CardDescription>
              </CardHeader>
              <CardContent className="p-10 flex-1 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 italic">\u20a62,000</span>
                  <span className="text-slate-500 font-bold">One-time fee</span>
                </div>
                <ul className="space-y-4">
                  {['Official NIN/ID Verification', 'Vetted Trust Badge', 'Search Result Visibility', 'Direct Client Contacts', 'SMS/WhatsApp Job Alerts'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check className="w-4 h-4" /></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-10 pt-0">
                <Button className="w-full bg-blue-900 hover:bg-blue-800 h-16 rounded-2xl text-lg font-bold shadow-xl shadow-blue-900/20" onClick={() => onSelectWorker('verification')}>
                  Apply Now <UserPlus className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Client Standard */}
          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <Card className="h-full border-none shadow-xl shadow-slate-200/50 rounded-[40px] overflow-hidden flex flex-col">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-10">
                <Badge className="bg-blue-100 text-blue-700 border-none mb-4 font-bold">FOR CLIENTS</Badge>
                <CardTitle className="text-3xl font-black">Standard Access</CardTitle>
                <CardDescription className="text-slate-500 mt-2">Perfect for households and small businesses</CardDescription>
              </CardHeader>
              <CardContent className="p-10 flex-1 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 italic">\u20a65,000</span>
                  <span className="text-slate-500 font-bold">/ 30 Days</span>
                </div>
                <ul className="space-y-4">
                  {['View Unlimited Contact Details', 'Unlock Direct Chat', 'Vetted Background Reports', 'Priority Matching', 'Secure Escrow Protection'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Check className="w-4 h-4" /></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-10 pt-0">
                <Button variant="outline" className="w-full border-blue-900 text-blue-900 hover:bg-blue-50 h-16 rounded-2xl text-lg font-bold" onClick={() => onSelectClient({ amount: 5000, title: 'Standard Access' })}>
                  Select Plan <Zap className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Client Corporate */}
          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <Card className="h-full border-2 border-blue-600 shadow-2xl shadow-blue-900/10 rounded-[40px] overflow-hidden flex flex-col relative">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase">Best Value</div>
              <CardHeader className="bg-blue-50/50 p-10">
                <Badge className="bg-blue-600 text-white border-none mb-4 font-bold">CORPORATE</Badge>
                <CardTitle className="text-3xl font-black">Enterprise Plan</CardTitle>
                <CardDescription className="text-slate-500 mt-2">For large estates, companies & recruitment</CardDescription>
              </CardHeader>
              <CardContent className="p-10 flex-1 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 italic">\u20a615,000</span>
                  <span className="text-slate-500 font-bold">/ 3 Months</span>
                </div>
                <ul className="space-y-4">
                  {['Multi-user Account Access', 'Dedicated Account Manager', 'Bulk Hiring Tools', 'Verified Skill Assessments', 'Advanced Dispute Resolution'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0"><Building className="w-4 h-4" /></div>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-10 pt-0">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-16 rounded-2xl text-lg font-bold shadow-xl shadow-blue-600/20" onClick={() => onSelectClient({ amount: 15000, title: 'Enterprise Plan' })}>
                  Go Corporate <Building className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Trust Banner */}
        <div className="mt-20 bg-white p-10 rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
           <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-14 h-14 text-blue-600" />
           </div>
           <div className="flex-1">
              <h3 className="text-2xl font-black text-blue-900 mb-2">Strict Safety Protocols</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Every professional on HireConnect undergoes a rigorous multi-stage verification process, including biometric NIN matching and background checks. Your safety is our priority.
              </p>
           </div>
           <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-black text-blue-600">100%</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Verified</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-blue-600">24/7</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Support</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
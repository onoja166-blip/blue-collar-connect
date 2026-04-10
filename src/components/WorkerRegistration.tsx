import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Upload, 
  ShieldCheck, 
  Phone,
  ArrowRight,
  CheckCircle2,
  Video,
  FileText,
  Lock,
  Star,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CATEGORIES } from '../types';
import { PaymentForm } from './PaymentForm';
import { toast } from 'sonner';

interface WorkerRegistrationProps {
  onSuccess: () => void;
}

export const WorkerRegistration = ({ onSuccess }: WorkerRegistrationProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    category: '',
    exp: '',
    bio: '',
    idType: 'NIN'
  });

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.phone)) {
      toast.error('Please fill in your basic info');
      return;
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="grid lg:grid-cols-5 h-full min-h-[750px]">
        <div className="lg:col-span-2 bg-blue-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-none px-4 py-1.5 rounded-full mb-8 font-black uppercase text-[10px] tracking-widest">
              Phase {step} of {totalSteps}
            </Badge>
            <h2 className="text-4xl font-black mb-10 leading-tight italic tracking-tight">
              {step === 1 && "Start Your Professional Journey"}
              {step === 2 && "Your Expertise & Experience"}
              {step === 3 && "Safety & Verification"}
              {step === 4 && "Final Activation Step"}
            </h2>
            <div className="space-y-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${step === s ? 'bg-white text-blue-900 scale-110 shadow-2xl' : step > s ? 'bg-green-400 text-white' : 'bg-blue-800 text-blue-400'}`}>
                    {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                  </div>
                  <p className={`font-bold text-lg transition-all ${step === s ? 'text-white' : 'text-blue-400'}`}>
                    {s === 1 && "Basic Details"}
                    {s === 2 && "Skill Showcase"}
                    {s === 3 && "Identity Vault"}
                    {s === 4 && "Secure Payment"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-[32px] border border-white/10 relative z-10">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-blue-900"><Star className="w-6 h-6 fill-current" /></div>
               <p className="font-black text-sm">HireConnect Premium Advantage</p>
            </div>
            <p className="text-blue-100 text-xs leading-relaxed font-medium mb-4 italic italic">
              "Verified professionals earn 3.5x more on average. Your safety badge is the #1 reason clients hire on this platform."
            </p>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-white/20 rounded-full"><AvatarFallback className="bg-blue-700 text-[10px] font-black">PRO</AvatarFallback></Avatar>
              <p className="font-black text-[10px] tracking-tight text-white">Join 5,000+ Verified Artisans</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">Full Name (Government Issued)</Label>
                    <div className="relative">
                      <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Olamide Babatunde" className="h-14 rounded-2xl border-slate-100 focus:border-blue-600 px-6 font-bold" />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">Phone Number (For OTP)</Label>
                    <div className="relative">
                      <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="090 1234 5678" className="h-14 rounded-2xl pl-12 font-bold" />
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">State</Label>
                      <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                        <SelectTrigger className="h-14 rounded-2xl border-slate-100 font-bold"><SelectValue placeholder="Lagos" /></SelectTrigger>
                        <SelectContent className="rounded-2xl">{['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">City</Label>
                      <Input value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="Ikeja" className="h-14 rounded-2xl font-bold" />
                    </div>
                  </div>
                </div>
                <Button onClick={nextStep} className="w-full h-18 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-3xl shadow-2xl text-lg">Continue <ArrowRight className="ml-3 w-6 h-6" /></Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">Skill Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                      <SelectTrigger className="h-14 rounded-2xl font-bold"><SelectValue placeholder="Select Expertise" /></SelectTrigger>
                      <SelectContent className="rounded-2xl">{CATEGORIES.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">Years of Experience</Label>
                    <div className="relative"><Input type="number" value={formData.exp} onChange={(e) => setFormData({...formData, exp: e.target.value})} placeholder="e.g. 5" className="h-14 rounded-2xl font-bold" /><Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" /></div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">Professional Bio</Label>
                    <Textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} placeholder="Tell us what makes you the best..." className="min-h-[140px] rounded-3xl p-6 font-medium bg-slate-50" />
                  </div>
                </div>
                <div className="flex gap-4"><Button variant="outline" onClick={prevStep} className="h-16 px-8 rounded-2xl">Back</Button><Button onClick={nextStep} className="flex-1 h-16 bg-blue-900 font-black rounded-2xl shadow-xl">Next Step</Button></div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100 flex items-start gap-6"><div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-blue-600 shrink-0"><ShieldCheck className="w-8 h-8" /></div><div><h3 className="font-black text-blue-950 text-lg mb-1">Identity Vault</h3><p className="text-xs text-blue-700 font-bold leading-relaxed">Government ID is mandatory for platform trust.</p></div></div>
                <div className="space-y-2"><Label className="font-black text-slate-700 uppercase tracking-widest text-[10px]">ID Type</Label><Select value={formData.idType} onValueChange={(v) => setFormData({...formData, idType: v})}><SelectTrigger className="h-12 rounded-xl font-bold"><SelectValue /></SelectTrigger><SelectContent className="rounded-xl"><SelectItem value="NIN">NIN</SelectItem><SelectItem value="Voter">Voter's Card</SelectItem><SelectItem value="Driver">Driver's License</SelectItem></SelectContent></Select></div>
                <div className="grid gap-4">
                   <div className="p-10 border-2 border-dashed border-slate-100 rounded-[32px] text-center space-y-4 hover:border-blue-600 transition-all cursor-pointer group"><div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-100"><FileText className="w-8 h-8 text-slate-400 group-hover:text-blue-600" /></div><p className="font-black text-slate-700">Upload Govt ID</p></div>
                   <div className="p-10 border-2 border-dashed border-slate-100 rounded-[32px] text-center space-y-4 hover:border-blue-600 transition-all cursor-pointer group"><div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-100"><Video className="w-8 h-8 text-slate-400 group-hover:text-blue-600" /></div><p className="font-black text-slate-700">Selfie Intro (Optional)</p></div>
                </div>
                <div className="flex gap-4 pt-4"><Button variant="outline" onClick={prevStep} className="h-16 px-8 rounded-2xl">Back</Button><Button onClick={nextStep} className="flex-1 h-16 bg-blue-900 font-black rounded-2xl shadow-xl">Submit Vetting</Button></div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                 <div className="text-center space-y-2"><h3 className="text-3xl font-black text-blue-950 italic">Final Step: Activation</h3><p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">One-time security & verification fee</p></div>
                 <div className="bg-blue-900 rounded-[40px] shadow-2xl overflow-hidden shadow-blue-900/30"><PaymentForm amount={2000} title="Portal Verification" onSuccess={onSuccess} /></div>
                 <div className="flex items-center justify-center gap-6 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]"><div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Secure</div><div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Instant</div><div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Guaranteed</div></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
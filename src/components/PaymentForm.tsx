import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Smartphone,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface PaymentFormProps {
  amount: number;
  title: string;
  onSuccess: () => void;
}

export const PaymentForm = ({ amount, title, onSuccess }: PaymentFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      setTimeout(onSuccess, 2000);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount Due</p>
                <p className="text-4xl font-black text-blue-900 italic">\u20a6{amount.toLocaleString()}</p>
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-2 rounded-xl font-bold">{title}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-3 text-left ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}`} />
                <p className="font-bold">Debit Card</p>
              </button>
              <button 
                onClick={() => setPaymentMethod('transfer')}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-3 text-left ${paymentMethod === 'transfer' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <Smartphone className={`w-6 h-6 ${paymentMethod === 'transfer' ? 'text-blue-600' : 'text-slate-400'}`} />
                <p className="font-bold">Bank Transfer</p>
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <p className="text-sm font-bold text-slate-700">Secure Payment Gate</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your transaction is encrypted and processed via our secure partners (Paystack/Flutterwave). We do not store your card details.
              </p>
            </div>

            <Button 
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20"
              onClick={() => setStep(2)}
            >
              Proceed to Secure Payment <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Card Number</Label>
                  <div className="relative">
                    <Input placeholder="0000 0000 0000 0000" className="h-14 rounded-xl pl-12 font-mono" required />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Expiry Date</Label>
                    <Input placeholder="MM / YY" className="h-14 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">CVV</Label>
                    <Input placeholder="123" type="password" className="h-14 rounded-xl" maxLength={3} required />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-16 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-2xl shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Securely...
                  </div>
                ) : (
                  `Pay \u20a6${amount.toLocaleString()}`
                )}
              </Button>
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-center text-slate-500 font-bold text-sm"
              >
                \u2190 Go Back
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-6"
          >
            <div className="w-24 h-24 bg-green-100 rounded-[32px] flex items-center justify-center mx-auto text-green-600 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-blue-900">Payment Successful!</h3>
              <p className="text-slate-600 mt-2 font-medium">Your transaction was completed successfully.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl inline-block w-full max-w-sm border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Transaction Ref</span>
                <span className="text-xs font-mono font-bold">TXN-7392-HC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold uppercase">Status</span>
                <Badge className="bg-green-500 text-white border-none">Completed</Badge>
              </div>
            </div>
            <p className="text-slate-400 text-sm italic">Redirecting you to your dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
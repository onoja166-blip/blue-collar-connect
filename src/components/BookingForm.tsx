import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ClipboardList, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BookingFormProps {
  provider: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BookingForm = ({ provider, onSuccess, onCancel }: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !description) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate booking creation
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Job booked with ${provider.name}!`);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-blue-900 p-8 text-white flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black italic">Book Appointment</h3>
          <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mt-1">Securing {provider.name}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
          <Zap className="w-6 h-6 text-amber-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-black text-slate-700">Service Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full h-14 justify-start text-left font-bold rounded-2xl border-slate-100",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5 text-blue-600" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="font-black text-slate-700">Preferred Time</Label>
            <div className="relative">
              <Input 
                type="time" 
                className="h-14 rounded-2xl border-slate-100 pl-12 font-bold"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-black text-slate-700">Job Description & Requirements</Label>
          <div className="relative">
            <Textarea 
              placeholder="Describe what you need help with (e.g., Fixing a burst pipe in the kitchen)..." 
              className="min-h-[120px] rounded-2xl border-slate-100 p-6 font-medium"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <ClipboardList className="absolute right-4 top-4 w-5 h-5 text-slate-300" />
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
           <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-black text-blue-950">Escrow Protection Active</p>
           </div>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
             Funds will be held securely and only released to {provider.name} after you confirm job completion. HireConnect protects both parties.
           </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="ghost" className="h-16 px-8 rounded-2xl font-bold text-slate-500" onClick={onCancel}>Cancel</Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 h-16 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Securing Professional...
              </div>
            ) : (
              "Confirm & Deposit into Escrow"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
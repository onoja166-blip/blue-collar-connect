import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface RatingFormProps {
  booking: any;
  onSuccess: () => void;
}

export const RatingForm = ({ booking, onSuccess }: RatingFormProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Thank you for your feedback!');
      onSuccess();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-amber-500 p-8 text-white flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black italic">Job Feedback</h3>
          <p className="text-amber-100 text-sm font-bold uppercase tracking-widest mt-1">Rate your experience</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-10">
        <div className="text-center space-y-6">
           <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">How was {booking.worker_name}'s service?</p>
           <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform hover:scale-125"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  <Star 
                    className={`w-12 h-12 ${ (hover || rating) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-200' } transition-colors`}
                  />
                </button>
              ))}
           </div>
           {rating > 0 && (
             <p className="font-black text-blue-950 text-xl italic">
               {rating === 5 && "Exceptional service!"}
               {rating === 4 && "Great work!"}
               {rating === 3 && "Good, but room for improvement."}
               {rating === 2 && "Could have been better."}
               {rating === 1 && "Disappointing experience."}
             </p>
           )}
        </div>

        <div className="space-y-4">
          <Label className="font-black text-slate-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" /> Public Review (Optional)
          </Label>
          <Textarea 
            placeholder="Share details of your experience to help others..." 
            className="min-h-[120px] rounded-[32px] border-slate-100 p-6 font-medium bg-slate-50 focus:bg-white"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100">
           <p className="text-xs text-blue-700 font-bold leading-relaxed flex items-center gap-3">
             <ShieldCheck className="w-5 h-5 shrink-0" />
             Your rating directly affects the professional's visibility and rewards on the platform. Please be honest.
           </p>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-18 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-[32px] shadow-xl text-lg"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};
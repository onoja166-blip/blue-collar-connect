import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Shield, 
  Lock, 
  MessageSquare,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ChatProps {
  recipient: {
    name: string;
    role: string;
    image?: string;
    isVerified?: boolean;
  };
  isContactLocked?: boolean;
}

export const Chat = ({ recipient, isContactLocked = true }: ChatProps) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'recipient', text: 'Good morning! How can I help you today?', timestamp: '09:00 AM' },
    { id: 2, sender: 'me', text: 'Hello, I saw your profile and I need an electrician for some urgent wiring work.', timestamp: '09:05 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInput('');
    toast.success('Message sent');
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl">
      {/* Chat Header */}
      <div className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-12 h-12 rounded-2xl shadow-md">
              <AvatarImage src={recipient.image} />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold uppercase">{recipient.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900">{recipient.name}</h3>
              {recipient.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{recipient.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors"><Phone className="w-5 h-5" /></button>
          <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Locked Overlay */}
      {isContactLocked && (
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-10 flex flex-col items-center justify-center p-10 text-center">
             <div className="w-20 h-20 bg-blue-900 text-white rounded-[32px] flex items-center justify-center mb-6 shadow-2xl">
                <Lock className="w-10 h-10" />
             </div>
             <h4 className="text-2xl font-black text-blue-950 italic mb-4">Conversation Locked</h4>
             <p className="text-slate-600 font-medium max-w-xs mb-8">
               You need to subscribe to our ₦5,000 Standard Plan to unlock direct messaging and contact details.
             </p>
             <Button className="bg-blue-900 h-14 px-10 rounded-2xl font-black shadow-xl shadow-blue-900/20">
               Unlock Messaging Now
             </Button>
          </div>

          {/* Blurred background messages */}
          <div className="p-8 space-y-6">
             {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`p-4 rounded-3xl max-w-[70%] font-medium ${m.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}>
                      {m.text}
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      {!isContactLocked && (
        <>
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            <div className="flex justify-center mb-8">
               <Badge className="bg-blue-50 text-blue-700 border-none font-bold italic py-1.5 px-4 rounded-full">
                 <Shield className="w-3 h-3 mr-2" /> This conversation is secured & recorded
               </Badge>
            </div>

            {messages.map(m => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={m.id}
                className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex flex-col gap-1">
                  <div className={`p-5 rounded-[28px] max-w-[80%] font-medium shadow-sm ${m.sender === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                    {m.text}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 px-2">{m.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-6 border-t border-slate-100">
            <div className="flex gap-3">
              <Input 
                placeholder="Type your message securely..." 
                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white px-6 font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} className="w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white p-0 shrink-0 shadow-lg shadow-blue-600/20">
                <Send className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
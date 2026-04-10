import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  Star,
  Briefcase,
  MapPin,
  Zap,
  MessageSquare,
  Calendar,
  CreditCard,
  Bell,
  LogOut,
  User,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Marketplace } from './components/Marketplace';
import { WorkerRegistration } from './components/WorkerRegistration';
import { AdminDashboard } from './components/AdminDashboard';
import { Chat } from './components/Chat';
import { Footer } from './components/Footer';
import { BookingForm } from './components/BookingForm';
import { RatingForm } from './components/RatingForm';

// Types
import { UserRole, CATEGORIES } from './types';

type View = 'home' | 'browse' | 'pricing' | 'profile-detail' | 'dashboard' | 'worker-reg' | 'login' | 'chat' | 'booking' | 'rating';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [role, setRole] = useState<UserRole | 'guest'>('guest');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to HireConnect!', time: '1h ago', read: false },
    { id: 2, text: 'Your profile has been verified.', time: '3h ago', read: true }
  ]);

  useEffect(() => {
    const savedRole = localStorage.getItem('bcc_role');
    const savedSub = localStorage.getItem('bcc_sub');
    if (savedRole) setRole(savedRole as UserRole);
    if (savedSub === 'true') setIsSubscribed(true);
  }, []);

  const navigateTo = (v: View) => {
    if ((v === 'browse' || v === 'chat') && role === 'guest') {
       toast.error('Please login or register to access this feature');
       setView('login');
       return;
    }
    setView(v);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setRole('guest');
    setIsSubscribed(false);
    localStorage.removeItem('bcc_role');
    localStorage.removeItem('bcc_sub');
    setView('home');
    toast.success('Logged out successfully');
  };

  const handleWorkerRegSuccess = () => {
    setRole('worker');
    localStorage.setItem('bcc_role', 'worker');
    setView('dashboard');
    toast.success('Worker profile activated!');
  };

  const handleClientSubSuccess = () => {
    setIsSubscribed(true);
    localStorage.setItem('bcc_sub', 'true');
    setView('browse');
    toast.success('Subscription activated! Access unlocked.');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" richColors />
      
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
               <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Briefcase className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-black text-blue-950 tracking-tighter italic">HireConnect<span className="text-blue-600">.</span>NG</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
               {['browse', 'pricing', 'chat'].map((v) => (
                 <button 
                   key={v}
                   onClick={() => navigateTo(v as View)}
                   className={`text-sm font-black uppercase tracking-widest transition-colors ${view === v ? 'text-blue-600' : 'text-slate-400 hover:text-blue-950'}`}
                 >
                   {v}
                 </button>
               ))}
            </div>

            <div className="flex items-center gap-4">
               {role !== 'guest' && (
                 <Popover>
                    <PopoverTrigger asChild>
                       <button className="relative w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                          <Bell className="w-5 h-5 text-slate-600" />
                          {unreadCount > 0 && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>}
                       </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 rounded-[32px] overflow-hidden shadow-2xl border-slate-100" align="end">
                       <div className="bg-blue-900 p-6 text-white">
                          <h4 className="font-black italic">Notifications</h4>
                       </div>
                       <div className="max-h-[300px] overflow-y-auto">
                          {notifications.map(n => (
                            <div key={n.id} className={`p-5 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
                               <p className="text-sm font-bold text-slate-800">{n.text}</p>
                               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 block">{n.time}</span>
                            </div>
                          ))}
                       </div>
                       <div className="p-4 text-center border-t border-slate-50">
                          <button className="text-xs font-black text-blue-600 uppercase tracking-widest">Clear All</button>
                       </div>
                    </PopoverContent>
                 </Popover>
               )}

               {role === 'guest' ? (
                 <Button className="h-12 px-6 bg-blue-900 hover:bg-blue-800 rounded-2xl font-black shadow-xl shadow-blue-900/10" onClick={() => navigateTo('login')}>
                    Sign In
                 </Button>
               ) : (
                 <Popover>
                    <PopoverTrigger asChild>
                       <Avatar className="w-12 h-12 rounded-2xl cursor-pointer hover:scale-105 transition-transform shadow-lg border-2 border-white">
                          <AvatarFallback className="bg-blue-600 text-white font-black">O</AvatarFallback>
                       </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2 rounded-2xl shadow-2xl border-slate-100" align="end">
                       <div className="p-4 border-b border-slate-50">
                          <p className="font-black text-slate-900 truncate">Olamide B.</p>
                          <Badge className="bg-blue-50 text-blue-700 border-none px-2 py-0.5 mt-1 text-[10px] font-black uppercase">{role}</Badge>
                       </div>
                       <div className="p-2 space-y-1">
                          <button onClick={() => navigateTo('dashboard')} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                             <LayoutDashboard className="w-4 h-4" /> Dashboard
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                             <User className="w-4 h-4" /> Profile
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                             <Settings className="w-4 h-4" /> Settings
                          </button>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50">
                             <LogOut className="w-4 h-4" /> Logout
                          </button>
                       </div>
                    </PopoverContent>
                 </Popover>
               )}
            </div>
         </div>
      </nav>

      <main className="pt-20 min-h-[calc(100vh-64px-300px)]">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onBrowse={() => navigateTo('browse')} onApply={() => navigateTo('pricing')} />

              <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                   <Badge className="bg-blue-100 text-blue-800 border-none px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest mb-4">Elite Network</Badge>
                   <h2 className="text-4xl md:text-5xl font-black text-blue-950 italic tracking-tight">Trusted Nigerian Professionals.</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                   {CATEGORIES.map((cat, i) => (
                     <motion.div
                       key={cat.id}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.05 }}
                       onClick={() => navigateTo('browse')}
                       className="group cursor-pointer"
                     >
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-slate-100 border border-slate-50 group-hover:border-blue-200 transition-all p-2 h-full">
                           <div className="aspect-square relative rounded-[28px] overflow-hidden mb-4">
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-2xl w-10 h-10 flex items-center justify-center shadow-lg text-xl">
                                 {cat.icon}
                              </div>
                           </div>
                           <div className="px-3 pb-4">
                              <h3 className="font-black text-blue-950 text-sm mb-1">{cat.name}</h3>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Pros</p>
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'browse' && (
            <motion.div key="browse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-7xl mx-auto px-4 py-12">
               <div className="mb-12">
                  <h1 className="text-4xl font-black text-blue-950 italic">Expert Marketplace</h1>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Verified Professional Services Across Nigeria</p>
               </div>
               <Marketplace 
                 isSubscribed={isSubscribed} 
                 onViewProfile={(p) => {
                   setSelectedProvider(p);
                   navigateTo('profile-detail');
                 }} 
                 onSubscribe={() => navigateTo('pricing')}
               />
            </motion.div>
          )}

          {view === 'profile-detail' && selectedProvider && (
            <motion.div key="profile-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-4xl mx-auto px-4 py-12">
              <Button variant="ghost" className="mb-8 font-bold text-slate-500" onClick={() => navigateTo('browse')}>
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
              </Button>

              <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
                 <div className="h-48 bg-blue-900 relative overflow-hidden">
                    <div className="absolute -bottom-16 left-12">
                       <Avatar className="w-40 h-40 border-[10px] border-white shadow-2xl rounded-[40px]">
                          <AvatarImage src={selectedProvider.image} className="object-cover" />
                          <AvatarFallback className="bg-slate-100 text-blue-900 font-black text-4xl">{selectedProvider.name[0]}</AvatarFallback>
                       </Avatar>
                    </div>
                 </div>

                 <div className="pt-24 px-12 pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <h1 className="text-4xl font-black text-blue-950">{selectedProvider.name}</h1>
                             {selectedProvider.isVerified && <div className="bg-blue-600 text-white p-1.5 rounded-xl"><ShieldCheck className="w-5 h-5" /></div>}
                          </div>
                          <div className="flex flex-wrap items-center gap-6">
                             <div className="flex items-center gap-2 text-slate-500 font-bold"><Briefcase className="w-4 h-4 text-blue-600" /> {CATEGORIES.find(c => c.id === selectedProvider.category)?.name}</div>
                             <div className="flex items-center gap-2 text-slate-500 font-bold"><MapPin className="w-4 h-4 text-blue-600" /> {selectedProvider.location}</div>
                             <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-xl border border-amber-100 font-black"><Star className="w-4 h-4 fill-current" /> {selectedProvider.rating} ({selectedProvider.reviews})</div>
                          </div>
                       </div>

                       <div className="flex gap-3">
                          <Button 
                            className="h-16 px-8 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20"
                            onClick={() => {
                               if (!isSubscribed) {
                                  toast.error('Subscription required to book professionals');
                                  navigateTo('pricing');
                               } else {
                                  navigateTo('booking');
                               }
                            }}
                          >
                             Hire Professional <Zap className="ml-2 w-5 h-5 text-amber-400" />
                          </Button>
                          <Button variant="outline" className="h-16 w-16 p-0 rounded-2xl" onClick={() => navigateTo('chat')}>
                             <MessageSquare className="w-6 h-6 text-slate-600" />
                          </Button>
                       </div>
                    </div>
                    
                    <div className="mt-16 grid lg:grid-cols-3 gap-12">
                       <div className="lg:col-span-2 space-y-8">
                          <h2 className="text-2xl font-black italic text-blue-950">About this Expert</h2>
                          <p className="text-slate-600 text-lg leading-relaxed">
                             Specialized {CATEGORIES.find(c => c.id === selectedProvider.category)?.name.toLowerCase()} with {selectedProvider.exp} experience. 
                             Committed to delivering high-quality, reliable service within the Nigerian market.
                             Verified background and skills.
                          </p>
                       </div>
                       <Card className="border-none shadow-xl rounded-[32px] p-8 space-y-6">
                          <h3 className="font-black text-blue-950">Safety Features</h3>
                          <div className="space-y-4">
                             <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-sm font-bold">Verified NIN Identity</span></div>
                             <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-sm font-bold">Background Checked</span></div>
                             <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-sm font-bold">Escrow Protection</span></div>
                          </div>
                       </Card>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {view === 'booking' && (
            <motion.div key="booking" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto px-4 py-20">
               <BookingForm 
                 provider={selectedProvider} 
                 onSuccess={() => navigateTo('dashboard')} 
                 onCancel={() => navigateTo('profile-detail')} 
               />
            </motion.div>
          )}

          {view === 'rating' && (
            <motion.div key="rating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto px-4 py-20">
               <RatingForm 
                 booking={{ worker_name: selectedProvider?.name || 'Musa Ibrahim' }} 
                 onSuccess={() => navigateTo('dashboard')} 
               />
            </motion.div>
          )}

          {view === 'pricing' && (
            <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Pricing 
                onSelectWorker={() => navigateTo('worker-reg')} 
                onSelectClient={() => {
                   setRole('client');
                   localStorage.setItem('bcc_role', 'client');
                   handleClientSubSuccess();
                }} 
              />
            </motion.div>
          )}

          {view === 'worker-reg' && (
            <motion.div key="worker-reg" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto px-4 py-20">
              <WorkerRegistration onSuccess={handleWorkerRegSuccess} />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-12">
               {role === 'admin' ? <AdminDashboard /> : (
                 <div className="space-y-10">
                    <div className="flex justify-between items-end">
                       <div>
                          <h1 className="text-4xl font-black text-blue-950 italic">Dashboard</h1>
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Welcome, Olamide</p>
                       </div>
                       <div className="flex gap-3">
                          <Button variant="outline" className="h-12 px-6 rounded-xl font-bold" onClick={() => navigateTo('rating')}>Demo Rate Job</Button>
                          <Button className="h-12 px-6 bg-blue-900 rounded-xl font-bold" onClick={() => navigateTo('browse')}>Find Help</Button>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <Card className="border-none shadow-xl rounded-[32px] p-8">
                          <Badge className="bg-green-100 text-green-700 border-none font-bold mb-4">ACTIVE</Badge>
                          <h3 className="text-lg font-black text-slate-900 mb-2">Status</h3>
                          <p className="text-slate-500 text-sm font-medium">Your account is in good standing. {role === 'client' ? 'All contacts unlocked.' : 'Live in marketplace.'}</p>
                       </Card>
                       <Card className="border-none shadow-xl rounded-[32px] p-8">
                          <Badge className="bg-blue-100 text-blue-700 border-none font-bold mb-4">1 PENDING</Badge>
                          <h3 className="text-lg font-black text-slate-900 mb-2">Recent Jobs</h3>
                          <p className="text-slate-500 text-sm font-medium">Job #7291: Waiting for professional to start.</p>
                       </Card>
                       <Card className="border-none shadow-xl rounded-[32px] p-8 bg-blue-900 text-white">
                          <Badge className="bg-white/20 text-white border-none font-bold mb-4">NEW</Badge>
                          <h3 className="text-lg font-black mb-2">Market Insight</h3>
                          <p className="text-blue-100 text-sm font-medium">Artisans in Lagos are seeing a 40% increase in demand this week.</p>
                       </Card>
                    </div>
                 </div>
               )}
            </motion.div>
          )}

          {view === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto px-4 py-12">
               <Chat 
                 recipient={selectedProvider || { name: 'Musa Ibrahim', role: 'Electrician', isVerified: true }}
                 isContactLocked={!isSubscribed}
               />
            </motion.div>
          )}

          {view === 'login' && (
            <motion.div key="login" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-24">
               <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 p-12 text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                     <Lock className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-black text-blue-950 italic mb-8">Secure Login</h2>
                  <div className="space-y-4 mb-8">
                     <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl" onClick={() => { setRole('client'); localStorage.setItem('bcc_role', 'client'); navigateTo('dashboard'); toast.success('Logged in as Client'); }}>Login as Client</Button>
                     <Button className="w-full h-14 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-2xl" onClick={() => { setRole('worker'); localStorage.setItem('bcc_role', 'worker'); navigateTo('dashboard'); toast.success('Logged in as Worker'); }}>Login as Worker</Button>
                     <Button variant="ghost" className="w-full h-14 text-slate-400 font-bold" onClick={() => { setRole('admin'); localStorage.setItem('bcc_role', 'admin'); navigateTo('dashboard'); toast.success('Logged in as Admin'); }}>Admin Portal</Button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
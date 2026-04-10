import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Filter, 
  Zap,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '../types';
import { toast } from 'sonner';

interface MarketplaceProps {
  isSubscribed: boolean;
  onViewProfile: (p: any) => void;
  onSubscribe: () => void;
}

export const Marketplace = ({ isSubscribed, onViewProfile, onSubscribe }: MarketplaceProps) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');

  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu'];

  const providers = [
    { id: '1', name: 'Musa Ibrahim', category: 'electricians', location: 'Lagos', rating: 4.9, reviews: 124, exp: '8 years', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/electrician-nigerian-expert-a7d56dba-1775821764984.webp', isVerified: true },
    { id: '2', name: 'Sarah Okon', category: 'nannies', location: 'Abuja', rating: 4.8, reviews: 86, exp: '5 years', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/nanny-nigerian-professional-4d772e5f-1775821760626.webp', isVerified: true },
    { id: '3', name: 'Chidi Okafor', category: 'plumbers', location: 'Lagos', rating: 4.7, reviews: 54, exp: '10 years', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/plumber-nigerian-artisan-8c4c80a5-1775821761461.webp', isVerified: true },
    { id: '4', name: 'Tunde Ajayi', category: 'carpenters', location: 'Ibadan', rating: 4.9, reviews: 42, exp: '12 years', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/carpenter-391ae10f-1775822066287.webp', isVerified: true },
    { id: '5', name: 'Grace Peters', category: 'event_staff', location: 'Enugu', rating: 5.0, reviews: 19, exp: '3 years', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/event-staff-f6becd04-1775822066812.webp', isVerified: true },
    { id: '6', name: 'Ibrahim Bala', category: 'drivers', location: 'Kano', rating: 4.7, reviews: 33, exp: '7 years', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e5b8c380-00ae-440d-95f7-5a3ccbd31c35/driver-ef0dfc9a-1775822067261.webp', isVerified: false },
  ];

  const filtered = providers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || p.category === category;
    const matchesLoc = location === 'all' || p.location === location;
    return matchesSearch && matchesCat && matchesLoc;
  });

  const handleNearMe = () => {
    toast.info('Accessing GPS location...');
    setTimeout(() => {
      setLocation('Lagos');
      toast.success('Showing workers in Lagos (Your current location)');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-[32px] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            placeholder="Search by name or skill..." 
            className="h-14 rounded-2xl pl-12 border-slate-100 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-14 w-full md:w-56 rounded-2xl font-bold">
            <SelectValue placeholder="Expertise" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="h-14 w-full md:w-48 rounded-2xl font-bold">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectItem value="all">All Nigeria</SelectItem>
            {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button onClick={handleNearMe} className="h-14 w-full md:w-14 rounded-2xl bg-blue-100 text-blue-900 hover:bg-blue-200 shadow-none border-none">
           <Navigation className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={p.id}
              className="group"
            >
              <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-square overflow-hidden">
                   <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-5 right-5 flex flex-col gap-2">
                      {p.isVerified && (
                         <div className="bg-blue-600 text-white p-2 rounded-2xl border-2 border-white shadow-lg">
                            <ShieldCheck className="w-5 h-5" />
                         </div>
                      )}
                      <div className="bg-white text-amber-500 p-2 rounded-2xl font-black flex items-center gap-1 text-xs shadow-lg">
                         <Star className="w-3.5 h-3.5 fill-current" /> {p.rating}
                      </div>
                   </div>
                   <div className="absolute bottom-5 left-5 right-5 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                      <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-black rounded-2xl shadow-2xl" onClick={() => onViewProfile(p)}>View Portfolio</Button>
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-black text-blue-950 tracking-tight mb-1">{p.name}</h3>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{CATEGORIES.find(c => c.id === p.category)?.name}</p>
                   <div className="flex items-center gap-2 pt-6 border-t border-slate-50 text-slate-600 font-bold">
                      <MapPin className="w-4 h-4 text-blue-600" /> {p.location}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
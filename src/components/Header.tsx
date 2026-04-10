import React from 'react';
import { 
  Menu, 
  X, 
  Shield, 
  User, 
  Bell, 
  LogOut,
  LayoutDashboard,
  Search,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole | 'guest';
  currentView: string;
  onNavigate: (view: any) => void;
  onLogout: () => void;
}

export const Header = ({ role, currentView, onNavigate, onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-blue-900 tracking-tight">HireConnect</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('browse')}
            className={`text-sm font-semibold transition-colors ${currentView === 'browse' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            Find Workers
          </button>
          <button 
            onClick={() => onNavigate('pricing')}
            className={`text-sm font-semibold transition-colors ${currentView === 'pricing' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            Pricing
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {role === 'guest' ? (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" className="font-bold" onClick={() => onNavigate('login')}>Login</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 font-bold px-6 rounded-xl shadow-lg shadow-blue-600/20" onClick={() => onNavigate('pricing')}>Join Now</Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 cursor-pointer border-2 border-slate-100">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold uppercase">{role[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                  <DropdownMenuLabel>
                    <p className="font-bold">My Account</p>
                    <p className="text-xs text-slate-500 font-normal capitalize">Logged in as {role}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl cursor-pointer py-3" onClick={() => onNavigate('dashboard')}>
                    <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
                  </DropdownMenuItem>
                  {role === 'worker' && (
                    <DropdownMenuItem className="rounded-xl cursor-pointer py-3" onClick={() => onNavigate('profile-edit')}>
                      <User className="w-4 h-4 mr-3" /> Edit Profile
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl cursor-pointer py-3 text-red-600" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-3" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left p-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Home</button>
              <button onClick={() => { onNavigate('browse'); setIsMenuOpen(false); }} className="block w-full text-left p-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Find Workers</button>
              <button onClick={() => { onNavigate('pricing'); setIsMenuOpen(false); }} className="block w-full text-left p-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Pricing</button>
              {role === 'guest' ? (
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button variant="outline" className="font-bold rounded-xl" onClick={() => onNavigate('login')}>Login</Button>
                  <Button className="bg-blue-600 font-bold rounded-xl" onClick={() => onNavigate('pricing')}>Join</Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full font-bold rounded-xl text-red-600 border-red-100" onClick={onLogout}>Logout</Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
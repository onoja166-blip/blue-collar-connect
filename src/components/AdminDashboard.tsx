import React from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  CreditCard, 
  Search,
  CheckCircle,
  XCircle,
  MoreVertical,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '4,281', icon: Users, color: 'blue' },
    { label: 'Total Revenue', value: '₦8.4M', icon: CreditCard, color: 'green' },
    { label: 'Pending Verification', value: '142', icon: ShieldAlert, color: 'amber' },
    { label: 'Active Subscriptions', value: '912', icon: TrendingUp, color: 'purple' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-blue-950 italic">Master Control</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Platform Overview & System Health</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl font-bold">Export Reports</Button>
          <Button className="h-12 px-6 bg-blue-900 rounded-xl font-bold">System Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-xl shadow-slate-100 rounded-[32px] overflow-hidden">
              <CardContent className="p-8 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-3xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 shadow-inner`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-none shadow-xl shadow-slate-100 rounded-[40px] overflow-hidden">
        <CardHeader className="p-10 border-b border-slate-50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black">Worker Verifications</CardTitle>
            <CardDescription className="font-medium">Review and approve professional applications</CardDescription>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search applicants..." className="pl-10 h-11 rounded-xl w-64" />
            </div>
            <Button variant="ghost" className="p-3"><Filter className="w-5 h-5" /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-50">
                <TableHead className="pl-10 h-16 font-bold uppercase text-[10px] text-slate-400 tracking-widest">Professional</TableHead>
                <TableHead className="h-16 font-bold uppercase text-[10px] text-slate-400 tracking-widest">Category</TableHead>
                <TableHead className="h-16 font-bold uppercase text-[10px] text-slate-400 tracking-widest">Submitted</TableHead>
                <TableHead className="h-16 font-bold uppercase text-[10px] text-slate-400 tracking-widest">Status</TableHead>
                <TableHead className="h-16 font-bold uppercase text-[10px] text-slate-400 tracking-widest pr-10 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((u) => (
                <TableRow key={u} className="border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <TableCell className="pl-10 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 rounded-2xl">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=user${u}`} />
                        <AvatarFallback>U{u}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-slate-900">Tunde Ajayi</p>
                        <p className="text-xs text-slate-500 font-medium">tunde.ajayi@example.com</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 font-bold text-slate-700">Plumbing</TableCell>
                  <TableCell className="py-5 text-slate-500 font-medium">Oct 24, 2023</TableCell>
                  <TableCell className="py-5">
                    <Badge className="bg-amber-50 text-amber-700 border-none px-3 py-1 font-bold">Pending</Badge>
                  </TableCell>
                  <TableCell className="py-5 pr-10 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" className="w-10 h-10 p-0 text-green-600 hover:bg-green-50 rounded-xl"><CheckCircle className="w-5 h-5" /></Button>
                      <Button variant="ghost" className="w-10 h-10 p-0 text-red-600 hover:bg-red-50 rounded-xl"><XCircle className="w-5 h-5" /></Button>
                      <Button variant="ghost" className="w-10 h-10 p-0 text-slate-400 rounded-xl"><MoreVertical className="w-5 h-5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockStaff, StaffMember } from '@/data/mockData';
import { Search, Plus, Phone, Calendar, DollarSign, Edit, UserCheck, UserX } from 'lucide-react';
import { ROLE_LABELS } from '@/constants/theme';

const StaffPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = mockStaff.filter(s => {
    if (filter === 'active' && !s.isActive) return false;
    if (filter === 'inactive' && s.isActive) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Staff</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditStaff(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="flex gap-2">
        {(['all', 'active', 'inactive'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${filter === f ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((staff, i) => (
          <motion.div key={staff.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${staff.isActive ? 'gradient-warm text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-1.5">
                      {staff.name}
                      {staff.isActive ? <UserCheck size={12} className="text-accent" /> : <UserX size={12} className="text-destructive" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{ROLE_LABELS[staff.role]} · {staff.phone}</p>
                  </div>
                </div>
                <button onClick={() => { setEditStaff(staff); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                  <Edit size={14} className="text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <Calendar size={14} className="mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-semibold">{staff.attendance}</p>
                  <p className="text-[10px] text-muted-foreground">Days</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <DollarSign size={14} className="mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs font-semibold">₹{staff.perDaySalary}</p>
                  <p className="text-[10px] text-muted-foreground">Per Day</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <DollarSign size={14} className="mx-auto text-primary mb-1" />
                  <p className={`text-xs font-semibold ${staff.toPay > 0 ? 'text-primary' : 'text-accent'}`}>₹{staff.toPay}</p>
                  <p className="text-[10px] text-muted-foreground">Due</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setShowForm(false)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-display">{editStaff ? 'Edit Staff' : 'Add Staff'}</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={editStaff?.name} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground">Phone</label>
                    <input defaultValue={editStaff?.phone} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground">Role</label>
                    <select defaultValue={editStaff?.role || 'waiter'} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="waiter">Waiter</option><option value="manager">Manager</option>
                    </select></div>
                </div>
                <div><label className="text-xs text-muted-foreground">Per Day Salary (₹)</label>
                  <input type="number" defaultValue={editStaff?.perDaySalary || 500} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">{editStaff ? 'Update' : 'Add Staff'}</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffPage;

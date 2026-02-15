import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockExpenses, Expense } from '@/data/mockData';
import { Search, Plus, Wallet, Edit, CheckCircle, Clock } from 'lucide-react';

const ExpensesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Expense | null>(null);

  const filtered = mockExpenses.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()));
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
  const unpaid = mockExpenses.filter(e => !e.isPaid).reduce((s, e) => s + e.amount, 0);

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Expenses</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold">₹{totalExpenses.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Total This Month</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold text-primary">₹{unpaid.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Unpaid</p>
        </GlassCard>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search expenses..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-2">
        {filtered.map((exp, i) => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Wallet size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{exp.name}</p>
                  <p className="text-xs text-muted-foreground">{exp.description.substring(0, 30)}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <p className="text-sm font-bold">₹{exp.amount.toLocaleString()}</p>
                  <span className={`status-badge text-[10px] ${exp.isPaid ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'}`}>
                    {exp.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <button onClick={() => { setEditItem(exp); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                  <Edit size={14} className="text-muted-foreground" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Expense' : 'Add Expense'}</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={editItem?.name} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground">Description</label>
                  <input defaultValue={editItem?.description} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground">Amount (₹)</label>
                    <input type="number" defaultValue={editItem?.amount} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground">Vendor</label>
                    <select className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm">
                      <option value="">None</option><option>Fresh Farms</option><option>Dairy Direct</option>
                    </select></div>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">{editItem ? 'Update' : 'Add'}</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpensesPage;

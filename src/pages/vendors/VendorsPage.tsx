import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockVendors, Vendor } from '@/data/mockData';
import { Search, Plus, Phone, Edit, Truck, DollarSign } from 'lucide-react';

const VendorsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Vendor | null>(null);

  const filtered = mockVendors.filter(v => !search || v.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Vendors</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-2">
        {filtered.map((vendor, i) => (
          <motion.div key={vendor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Truck size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={10} /> {vendor.phone}</p>
                  </div>
                </div>
                <button onClick={() => { setEditItem(vendor); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                  <Edit size={14} className="text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="text-center p-2 rounded-xl bg-destructive/5">
                  <p className="text-xs font-semibold text-primary">₹{vendor.toPay.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">To Pay</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-accent/5">
                  <p className="text-xs font-semibold text-accent">₹{vendor.toReceive.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">To Receive</p>
                </div>
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
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Vendor' : 'Add Vendor'}</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={editItem?.name} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground">Phone</label>
                  <input defaultValue={editItem?.phone} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">{editItem ? 'Update' : 'Add Vendor'}</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorsPage;

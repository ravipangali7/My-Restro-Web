import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockMenuItems, MenuItem } from '@/data/mockData';
import { Search, Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const categories = ['All', 'Main Course', 'Starters', 'Breads', 'Beverages', 'Desserts'];

const MenuPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);

  const filtered = mockMenuItems.filter(item => {
    if (activeCat !== 'All' && item.category !== activeCat) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Menu Items</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search menu..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCat === cat ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
                  🍽️
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">₹{item.price}</span>
                <div className={`w-2 h-2 rounded-full ${item.isAvailable ? 'bg-accent' : 'bg-destructive'}`} />
                <button onClick={() => { setEditItem(item); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                  <Edit size={14} className="text-muted-foreground" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4"
            >
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Item' : 'Add Menu Item'}</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={editItem?.name} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Price (₹)</label>
                    <input type="number" defaultValue={editItem?.price} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Category</label>
                    <select defaultValue={editItem?.category} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                      {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Available</span>
                  <div className="w-10 h-6 rounded-full bg-accent/20 flex items-center px-1">
                    <div className="w-4 h-4 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">
                  {editItem ? 'Update' : 'Add Item'}
                </motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;

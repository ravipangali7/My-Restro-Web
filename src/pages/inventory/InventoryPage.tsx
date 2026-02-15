import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockInventory, InventoryItem } from '@/data/mockData';
import { Search, Plus, AlertTriangle, Package, Edit } from 'lucide-react';

const InventoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'low'>('all');

  const filtered = mockInventory.filter(item => {
    if (filter === 'low' && item.currentStock > item.minStock) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Inventory</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="flex gap-2">
        {(['all', 'low'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === f ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            {f === 'all' ? 'All Items' : '⚠️ Low Stock'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((item, i) => {
          const isLow = item.currentStock <= item.minStock;
          const stockPercent = Math.min((item.currentStock / (item.minStock * 3)) * 100, 100);
          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <GlassCard className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLow ? 'bg-destructive/20' : 'bg-accent/20'}`}>
                      {isLow ? <AlertTriangle size={18} className="text-destructive" /> : <Package size={18} className="text-accent" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">₹{item.costPerUnit}/{item.unit}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <p className="text-sm font-bold">{item.currentStock} {item.unit}</p>
                      <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                    </div>
                    <button onClick={() => { setEditItem(item); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                      <Edit size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted/50 overflow-hidden">
                  <div className={`h-full rounded-full ${isLow ? 'bg-destructive' : 'bg-accent'}`} style={{ width: `${stockPercent}%` }} />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setShowForm(false)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Item' : 'Add Inventory Item'}</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={editItem?.name} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground">Current Stock</label>
                    <input type="number" defaultValue={editItem?.currentStock} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground">Unit</label>
                    <input defaultValue={editItem?.unit || 'kg'} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground">Min Stock</label>
                    <input type="number" defaultValue={editItem?.minStock} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground">Cost/Unit (₹)</label>
                    <input type="number" defaultValue={editItem?.costPerUnit} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">{editItem ? 'Update' : 'Add Item'}</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InventoryPage;

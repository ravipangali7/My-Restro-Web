import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockComboSets, ComboSet } from '@/data/mockData';
import { Plus, Edit, Package, Tag } from 'lucide-react';

const CombosPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<ComboSet | null>(null);

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Combo Sets</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="space-y-3">
        {mockComboSets.map((combo, i) => (
          <motion.div key={combo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Package size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{combo.name}</p>
                    <p className="text-xs text-muted-foreground">{combo.productNames.length} items</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <p className="text-lg font-bold gradient-text">₹{combo.price}</p>
                  <button onClick={() => { setEditItem(combo); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                    <Edit size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {combo.productNames.map((name, j) => (
                  <span key={j} className="status-badge text-[10px] bg-muted/50 text-muted-foreground">{name}</span>
                ))}
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
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Combo' : 'Add Combo'}</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Combo Name</label>
                  <input defaultValue={editItem?.name} placeholder="Lunch Special" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground">Price (₹)</label>
                  <input type="number" defaultValue={editItem?.price} placeholder="399" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground">Products (select items to include)</label>
                  <div className="mt-2 space-y-1.5 max-h-40 overflow-auto">
                    {['Butter Chicken', 'Paneer Tikka', 'Dal Makhani', 'Naan', 'Biryani', 'Gulab Jamun', 'Masala Chai', 'Mango Lassi'].map(name => (
                      <label key={name} className="flex items-center gap-2 p-2 rounded-xl bg-muted/30 cursor-pointer">
                        <input type="checkbox" defaultChecked={editItem?.productNames.includes(name)} className="rounded" />
                        <span className="text-sm">{name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">{editItem ? 'Update' : 'Add Combo'}</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CombosPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockUnits, UnitItem } from '@/data/mockData';
import { Plus, Edit, Ruler } from 'lucide-react';

const UnitsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<UnitItem | null>(null);

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Units</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mockUnits.map((unit, i) => (
          <motion.div key={unit.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{unit.symbol}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{unit.name}</p>
                    <p className="text-xs text-muted-foreground">Symbol: {unit.symbol}</p>
                  </div>
                </div>
                <button onClick={() => { setEditItem(unit); setShowForm(true); }} className="p-1.5 rounded-lg bg-muted/50">
                  <Edit size={12} className="text-muted-foreground" />
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
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Unit' : 'Add Unit'}</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Name</label>
                  <input defaultValue={editItem?.name} placeholder="Kilogram" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div><label className="text-xs text-muted-foreground">Symbol</label>
                  <input defaultValue={editItem?.symbol} placeholder="kg" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
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

export default UnitsPage;

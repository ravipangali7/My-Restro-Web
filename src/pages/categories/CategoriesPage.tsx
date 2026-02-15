import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockCategories, Category } from '@/data/mockData';
import { Search, Plus, Edit, Tag } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);

  const filtered = mockCategories.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Categories</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setEditItem(null); setShowForm(true); }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Tag size={22} className="text-primary" />
              </div>
              <p className="text-sm font-semibold">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{cat.itemCount} items</p>
              <button onClick={() => { setEditItem(cat); setShowForm(true); }}
                className="mt-2 p-1.5 rounded-lg bg-muted/50 mx-auto">
                <Edit size={12} className="text-muted-foreground" />
              </button>
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
              <h3 className="text-lg font-bold font-display">{editItem ? 'Edit Category' : 'Add Category'}</h3>
              <div><label className="text-xs text-muted-foreground">Name</label>
                <input defaultValue={editItem?.name} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
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

export default CategoriesPage;

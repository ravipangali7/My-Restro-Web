import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockProductRawMaterials, mockMenuItems, mockInventory } from '@/data/mockData';
import { Plus, Search, Link2, Package, ChevronDown } from 'lucide-react';

const RecipesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  // Group by product
  const grouped = mockProductRawMaterials.reduce((acc, prm) => {
    const key = `${prm.productId}-${prm.productVariantId || 'default'}`;
    if (!acc[key]) acc[key] = { productName: prm.productName, variantUnit: prm.variantUnit, items: [] };
    acc[key].items.push(prm);
    return acc;
  }, {} as Record<string, { productName: string; variantUnit: string; items: typeof mockProductRawMaterials }>);

  const entries = Object.entries(grouped).filter(([_, g]) =>
    !search || g.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Recipe Mapping</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <p className="text-xs text-muted-foreground">Maps products to raw materials for automatic stock deduction on orders.</p>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-2">
        {entries.map(([key, group], i) => (
          <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3">
              <button onClick={() => setExpandedProduct(expandedProduct === key ? null : key)} className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Link2 size={18} className="text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">{group.productName}</p>
                    <p className="text-xs text-muted-foreground">Variant: {group.variantUnit} · {group.items.length} ingredients</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expandedProduct === key ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedProduct === key && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="mt-3 space-y-1.5 pt-3 border-t border-glass-border">
                      {group.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-muted/20">
                          <div className="flex items-center gap-2">
                            <Package size={14} className="text-muted-foreground" />
                            <span className="text-sm">{item.rawMaterialName}</span>
                          </div>
                          <span className="text-sm font-medium text-primary">{item.rawMaterialQuantity} {mockInventory.find(i => i.id === item.rawMaterialId)?.unit || ''}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <h3 className="text-lg font-bold font-display">Add Recipe Mapping</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Product</label>
                  <select className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm">
                    {mockMenuItems.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select></div>
                <div><label className="text-xs text-muted-foreground">Raw Material</label>
                  <select className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm">
                    {mockInventory.map(i => <option key={i.id} value={i.id}>{i.name} ({i.unit})</option>)}
                  </select></div>
                <div><label className="text-xs text-muted-foreground">Quantity Required (per unit)</label>
                  <input type="number" step="0.01" placeholder="0.3" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">Add Mapping</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipesPage;

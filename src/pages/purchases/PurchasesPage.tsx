import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockPurchases, Purchase } from '@/data/mockData';
import { Search, Plus, Receipt, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const PurchasesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [viewItem, setViewItem] = useState<Purchase | null>(null);

  const filtered = mockPurchases.filter(p => !search || p.vendorName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Purchases</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search purchases..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-2">
        {filtered.map((purchase, i) => (
          <motion.div key={purchase.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            onClick={() => setViewItem(purchase)} className="cursor-pointer">
            <GlassCard className="p-3 flex items-center justify-between active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Receipt size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{purchase.vendorName}</p>
                  <p className="text-xs text-muted-foreground">{purchase.items.length} items · {purchase.createdAt}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <p className="text-sm font-bold">₹{purchase.total.toLocaleString()}</p>
                  <span className={`status-badge text-[10px] ${purchase.isPaid ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'}`}>
                    {purchase.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* View Detail Modal */}
      <AnimatePresence>
        {viewItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={() => setViewItem(null)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[80vh] overflow-auto">
              <h3 className="text-lg font-bold font-display">Purchase #{viewItem.id.slice(-2)}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Receipt size={14} /> {viewItem.vendorName} · {viewItem.createdAt}
              </div>
              <div className="space-y-2">
                {viewItem.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-glass-border last:border-0">
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.quantity} × ₹{item.price}</p>
                    </div>
                    <p className="text-sm font-medium">₹{item.total}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1 pt-2 border-t border-glass-border">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{viewItem.subtotal}</span></div>
                {viewItem.discount > 0 && (
                  <div className="flex justify-between text-sm text-accent"><span>Discount ({viewItem.discountType === 'percentage' ? `${viewItem.discount}%` : `₹${viewItem.discount}`})</span><span>-₹{viewItem.subtotal - viewItem.total}</span></div>
                )}
                <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{viewItem.total}</span></div>
              </div>
              <div className="flex items-center gap-2">
                {viewItem.isPaid ? <CheckCircle size={16} className="text-accent" /> : <Clock size={16} className="text-secondary" />}
                <span className={`text-sm font-medium ${viewItem.isPaid ? 'text-accent' : 'text-secondary'}`}>{viewItem.isPaid ? 'Paid' : 'Payment Pending'}</span>
              </div>
              <button onClick={() => setViewItem(null)} className="w-full rounded-xl py-3 bg-muted border border-glass-border text-sm">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-display">New Purchase</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Vendor</label>
                  <select className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm">
                    <option>Fresh Farms Pvt Ltd</option><option>Dairy Direct</option><option>Sabzi Mandi Wholesale</option>
                  </select></div>
                <div><label className="text-xs text-muted-foreground">Item</label>
                  <input placeholder="Item name" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground">Quantity</label>
                    <input type="number" placeholder="0" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground">Price/Unit</label>
                    <input type="number" placeholder="0" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">Save Purchase</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchasesPage;

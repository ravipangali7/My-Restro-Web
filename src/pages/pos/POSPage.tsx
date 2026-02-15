import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockMenuItems } from '@/data/mockData';
import { Minus, Plus, ShoppingCart, X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  qty: number;
}

const categories = ['All', 'Main Course', 'Starters', 'Breads', 'Beverages', 'Desserts'];

const POSPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [tableNo, setTableNo] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState('');

  const availableItems = mockMenuItems.filter(i => i.isAvailable);
  const filtered = availableItems.filter(item => {
    if (activeCat !== 'All' && item.category !== activeCat) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = (item: typeof mockMenuItems[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === item.id);
      if (existing) return prev.map(c => c.menuItemId === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { menuItemId: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const updateQty = (menuItemId: string, delta: number) => {
    setCart(prev => prev.map(c => c.menuItemId === menuItemId ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div className="page-container space-y-4 pb-36">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">New Order</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Table:</span>
          <select value={tableNo} onChange={e => setTableNo(Number(e.target.value))}
            className="px-2 py-1 rounded-lg bg-muted/50 border border-glass-border text-sm">
            {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          </select>
        </div>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              activeCat === cat ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-2">
        {filtered.map((item, i) => {
          const inCart = cart.find(c => c.menuItemId === item.id);
          return (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}>
              <GlassCard className="p-3 space-y-2">
                <div className="w-full h-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">🍽️</div>
                <p className="text-xs font-semibold truncate">{item.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">₹{item.price}</span>
                  {inCart ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg gradient-warm flex items-center justify-center text-primary-foreground">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(item)}
                      className="w-7 h-7 rounded-lg gradient-warm flex items-center justify-center text-primary-foreground">
                      <Plus size={14} />
                    </motion.button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Cart bar */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100 }} animate={{ y: 0 }}
          className="fixed bottom-20 left-4 right-4 z-40 gradient-warm rounded-2xl p-4 flex items-center justify-between shadow-lg max-w-lg mx-auto"
          onClick={() => setShowCart(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShoppingCart size={18} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground">{totalItems} items</p>
              <p className="text-xs text-primary-foreground/80">Table {tableNo}</p>
            </div>
          </div>
          <p className="text-lg font-bold text-primary-foreground">₹{total}</p>
        </motion.div>
      )}

      {/* Cart sheet */}
      <AnimatePresence>
        {showCart && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center"
            onClick={() => setShowCart(false)}>
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl p-6 max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-display">Cart · Table {tableNo}</h3>
                <button onClick={() => setShowCart(false)}><X size={20} /></button>
              </div>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.menuItemId} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.menuItemId, -1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"><Minus size={14} /></button>
                      <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.menuItemId, 1)} className="w-7 h-7 rounded-lg gradient-warm flex items-center justify-center text-primary-foreground"><Plus size={14} /></button>
                      <span className="text-sm font-semibold w-12 text-right">₹{item.price * item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-glass-border space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between text-sm"><span>Tax (5%)</span><span>₹{Math.round(total * 0.05)}</span></div>
                <div className="flex justify-between font-bold"><span>Total</span><span className="gradient-text text-lg">₹{Math.round(total * 1.05)}</span></div>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setShowCart(false); setCart([]); navigate('/orders'); }}
                className="w-full gradient-warm rounded-xl py-3.5 font-semibold text-primary-foreground text-sm mt-4">
                Place Order
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POSPage;

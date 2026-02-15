import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRestaurants, mockMenuItems, mockCategories } from '@/data/mockData';
import { Search, Minus, Plus, ShoppingCart, X, Phone, CreditCard, Wallet } from 'lucide-react';

interface CartItem { menuItemId: string; name: string; price: number; qty: number; }

const QRMenuPage: React.FC = () => {
  const { slug } = useParams();
  const restaurant = mockRestaurants.find(r => r.slug === slug);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [showCart, setShowCart] = useState(false);

  if (!restaurant) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-4xl mb-4">🍽️</p>
        <h1 className="text-xl font-bold font-display">Restaurant Not Found</h1>
        <p className="text-sm text-muted-foreground mt-2">This restaurant does not exist.</p>
      </div>
    </div>
  );

  if (!restaurant.isOpen) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-4xl mb-4">🔒</p>
        <h1 className="text-xl font-bold font-display">{restaurant.name}</h1>
        <p className="text-sm text-muted-foreground mt-2">Restaurant is currently closed. Please check back later.</p>
      </div>
    </div>
  );

  const categories = ['All', ...mockCategories.filter(c => c.restaurantId === restaurant.id).map(c => c.name)];
  const items = mockMenuItems.filter(m => m.restaurantId === restaurant.id && m.isAvailable);
  const filtered = items.filter(i => {
    if (activeCat !== 'All' && i.category !== activeCat) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToCart = (item: typeof items[0]) => {
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
    <div className="min-h-screen bg-background pb-36">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-glass-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
            {restaurant.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-base font-bold font-display">{restaurant.name}</h1>
            <p className="text-xs text-muted-foreground">{restaurant.address}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search menu..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${activeCat === cat ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((item, i) => {
            const inCart = cart.find(c => c.menuItemId === item.id);
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                className="glass-card p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-xl">🍽️</div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <div className={`w-3 h-3 rounded-sm border ${item.type === 'veg' ? 'border-accent' : 'border-primary'} flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.type === 'veg' ? 'bg-accent' : 'bg-primary'}`} />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <p className="text-sm font-bold mt-0.5">₹{item.price}</p>
                  </div>
                </div>
                {inCart ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Minus size={14} /></button>
                    <span className="text-sm font-bold w-6 text-center">{inCart.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center text-primary-foreground"><Plus size={14} /></button>
                  </div>
                ) : (
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => addToCart(item)}
                    className="px-4 py-2 rounded-xl border-2 border-primary text-primary text-sm font-medium">ADD</motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cart bar */}
      {totalItems > 0 && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 gradient-warm p-4 flex items-center justify-between shadow-lg"
          onClick={() => setShowCart(true)}>
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-primary-foreground" />
            <span className="text-sm font-bold text-primary-foreground">{totalItems} items</span>
          </div>
          <p className="text-lg font-bold text-primary-foreground">₹{total} →</p>
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
              className="w-full max-w-md glass-card rounded-t-3xl p-6 max-h-[85vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-display">Your Order</h3>
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
                      <span className="text-sm font-semibold w-14 text-right">₹{item.price * item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-glass-border space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between text-sm"><span>Transaction Fee</span><span>₹15</span></div>
                <div className="flex justify-between font-bold"><span>Total</span><span className="gradient-text text-lg">₹{total + 15}</span></div>
              </div>

              <div className="mt-4 space-y-2">
                <div><label className="text-xs text-muted-foreground">Your Phone</label>
                  <div className="relative mt-1">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="tel" placeholder="9876543210" className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-muted-foreground mt-3">Payment Method</p>
                {/* Note: Cash is HIDDEN on QR menu per spec */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-sm font-medium flex items-center justify-center gap-2 text-primary">
                    <Wallet size={16} /> E-Wallet
                  </button>
                  <button className="p-3 rounded-xl bg-muted/50 border border-glass-border text-sm font-medium flex items-center justify-center gap-2">
                    <CreditCard size={16} /> Bank
                  </button>
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.97 }}
                className="w-full gradient-warm rounded-xl py-3.5 font-semibold text-primary-foreground text-sm mt-4">
                Place Order · ₹{total + 15}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRMenuPage;

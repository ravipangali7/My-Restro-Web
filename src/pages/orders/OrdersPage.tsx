import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockOrders, Order } from '@/data/mockData';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusTabs = ['all', 'pending', 'preparing', 'ready', 'served', 'paid'] as const;

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = mockOrders.filter(o => {
    if (activeTab !== 'all' && o.status !== activeTab) return false;
    if (search && !`Table ${o.tableNo}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {statusTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-2">
          {filtered.map((order, i) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => navigate(`/orders/${order.id}`)}
              className="glass-card p-3 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                  T{order.tableNo}
                </div>
                <div>
                  <p className="text-sm font-semibold">Table {order.tableNo} · #{order.id.slice(-3)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.items.length} items · {order.waiterName}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <p className="text-sm font-bold">₹{order.total}</p>
                  <span className={`status-badge text-[10px] ${
                    order.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                    order.status === 'preparing' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'ready' ? 'bg-accent/20 text-accent' :
                    order.status === 'served' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-muted text-muted-foreground'
                  }`}>{order.status}</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">No orders found</div>
      )}
    </div>
  );
};

export default OrdersPage;

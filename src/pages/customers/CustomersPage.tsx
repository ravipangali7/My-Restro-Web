import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockCustomers } from '@/data/mockData';
import { Search, Phone, Star, TrendingUp, ChevronRight } from 'lucide-react';

const CustomersPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false;
    return true;
  });

  const getCustomerTier = (orders: number) => {
    if (orders >= 50) return { label: 'VIP', color: 'bg-secondary/20 text-secondary' };
    if (orders >= 20) return { label: 'Regular', color: 'bg-accent/20 text-accent' };
    return { label: 'New', color: 'bg-blue-500/20 text-blue-400' };
  };

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Customers</h2>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold">{mockCustomers.length}</p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold">{mockCustomers.filter(c => c.totalOrders >= 50).length}</p>
          <p className="text-[10px] text-muted-foreground">VIP</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold">₹{(mockCustomers.reduce((s, c) => s + c.credit, 0)).toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Credit Due</p>
        </GlassCard>
      </div>

      <div className="space-y-2">
        {filtered.map((customer, i) => {
          const tier = getCustomerTier(customer.totalOrders);
          return (
            <motion.div key={customer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <GlassCard className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl gradient-warm flex items-center justify-center font-bold text-sm text-primary-foreground">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      {customer.name}
                      <span className={`status-badge text-[10px] ${tier.color}`}>{tier.label}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={10} /> {customer.phone}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className="text-sm font-bold">₹{customer.totalSpent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{customer.totalOrders} orders</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomersPage;

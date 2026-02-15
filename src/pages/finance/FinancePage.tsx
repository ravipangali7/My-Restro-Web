import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { DollarSign, CreditCard, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { weeklySalesData } from '@/data/mockData';
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

const transactions = [
  { id: 't1', desc: 'Spice Garden - Subscription', amount: 2999, type: 'received', date: '2026-02-10' },
  { id: 't2', desc: 'Royal Biryani - Subscription', amount: 2999, type: 'received', date: '2026-02-10' },
  { id: 't3', desc: 'WhatsApp API - Jan', amount: 1500, type: 'paid', date: '2026-02-08' },
  { id: 't4', desc: 'Server Costs - Feb', amount: 8000, type: 'paid', date: '2026-02-05' },
  { id: 't5', desc: 'Spice Garden - Transaction Fee', amount: 450, type: 'received', date: '2026-02-04' },
  { id: 't6', desc: 'Tandoor Express - Overdue', amount: 5999, type: 'pending', date: '2026-02-01' },
];

const FinancePage: React.FC = () => {
  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Finance</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Revenue" value="₹1.2L" icon={DollarSign} color="primary" trend={{ value: 22, isPositive: true }} />
        <StatCard label="Pending Dues" value="₹6K" icon={CreditCard} color="secondary" />
      </div>

      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Revenue Trend</h3>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySalesData}>
              <defs>
                <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#FF6B6B" fill="url(#finGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <h3 className="text-sm font-semibold">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.map((tx, i) => (
          <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  tx.type === 'received' ? 'bg-accent/20' : tx.type === 'paid' ? 'bg-primary/20' : 'bg-secondary/20'
                }`}>
                  {tx.type === 'received' ? <ArrowDownRight size={16} className="text-accent" /> :
                   tx.type === 'paid' ? <ArrowUpRight size={16} className="text-primary" /> :
                   <CreditCard size={16} className="text-secondary" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.desc}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${
                tx.type === 'received' ? 'text-accent' : tx.type === 'paid' ? 'text-primary' : 'text-secondary'
              }`}>
                {tx.type === 'paid' ? '-' : '+'}₹{tx.amount.toLocaleString()}
              </span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinancePage;

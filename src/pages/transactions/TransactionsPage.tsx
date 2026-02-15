import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockTransactions } from '@/data/mockData';
import { Search, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  transaction_fee: 'Transaction Fee',
  subscription_fee: 'Subscription',
  whatsapp_usage: 'WhatsApp Usage',
  share_distribution: 'Share Distribution',
  share_withdrawal: 'Share Withdrawal',
  due_paid: 'Due Payment',
  paid_record: 'Paid Record',
  received_record: 'Received Record',
};

const TransactionsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');

  const filtered = mockTransactions.filter(t => {
    if (filter !== 'all' && t.transactionType !== filter) return false;
    if (search && !t.category.toLowerCase().includes(search.toLowerCase()) && !(t.restaurantName || '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Transactions</h2>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="flex gap-2">
        {(['all', 'in', 'out'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${filter === f ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            {f === 'all' ? 'All' : f === 'in' ? '📥 Income' : '📤 Expense'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((tx, i) => (
          <motion.div key={tx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.transactionType === 'in' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                  {tx.transactionType === 'in' ? <ArrowDownLeft size={18} className="text-accent" /> : <ArrowUpRight size={18} className="text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{categoryLabels[tx.category] || tx.category}</p>
                  <p className="text-xs text-muted-foreground">{tx.restaurantName || 'System'} · {tx.createdAt}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.transactionType === 'in' ? 'text-accent' : 'text-primary'}`}>
                  {tx.transactionType === 'in' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                </p>
                <span className={`status-badge text-[10px] ${tx.paymentStatus === 'success' ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'}`}>
                  {tx.paymentStatus}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;

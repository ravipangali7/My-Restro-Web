import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockStockLogs } from '@/data/mockData';
import { Search, ArrowDownLeft, ArrowUpRight, BookOpen } from 'lucide-react';

const StockLogsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');

  const filtered = mockStockLogs.filter(l => {
    if (filter !== 'all' && l.type !== filter) return false;
    if (search && !l.rawMaterialName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Stock Logs</h2>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search by material..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="flex gap-2">
        {(['all', 'in', 'out'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${filter === f ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            {f === 'all' ? 'All' : f === 'in' ? '📥 Stock In' : '📤 Stock Out'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((log, i) => (
          <motion.div key={log.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.type === 'in' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                  {log.type === 'in' ? <ArrowDownLeft size={18} className="text-accent" /> : <ArrowUpRight size={18} className="text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-semibold">{log.rawMaterialName}</p>
                  <p className="text-xs text-muted-foreground">{log.reference}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${log.type === 'in' ? 'text-accent' : 'text-primary'}`}>
                  {log.type === 'in' ? '+' : '-'}{log.quantity}
                </p>
                <p className="text-[10px] text-muted-foreground">{new Date(log.createdAt).toLocaleDateString()}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockLogsPage;

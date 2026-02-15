import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockPaidRecords, mockReceivedRecords } from '@/data/mockData';
import { Search, ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';

const FinanceRecordsPage: React.FC = () => {
  const [tab, setTab] = useState<'paid' | 'received'>('paid');
  const [search, setSearch] = useState('');

  const paidFiltered = mockPaidRecords.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()));
  const receivedFiltered = mockReceivedRecords.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()));

  const records = tab === 'paid' ? paidFiltered : receivedFiltered;
  const totalPaid = mockPaidRecords.reduce((s, r) => s + r.amount, 0);
  const totalReceived = mockReceivedRecords.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Paid / Received</h2>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard variant="stat" className="text-center">
          <ArrowUpRight size={18} className="text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-primary">₹{totalPaid.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Total Paid</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <ArrowDownLeft size={18} className="text-accent mx-auto mb-1" />
          <p className="text-lg font-bold text-accent">₹{totalReceived.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Total Received</p>
        </GlassCard>
      </div>

      <div className="flex gap-2">
        {(['paid', 'received'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium capitalize ${tab === t ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            {t} Records
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search records..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="space-y-2">
        {tab === 'paid' ? paidFiltered.map((record, i) => (
          <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <ArrowUpRight size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{record.name}</p>
                  <p className="text-xs text-muted-foreground">{record.paymentMethod.replace('_', ' ')} · {record.createdAt}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-primary">-₹{record.amount.toLocaleString()}</p>
            </GlassCard>
          </motion.div>
        )) : receivedFiltered.map((record, i) => (
          <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <ArrowDownLeft size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{record.name}</p>
                  <p className="text-xs text-muted-foreground">{record.customerName || 'N/A'} · {record.createdAt}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-accent">+₹{record.amount.toLocaleString()}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinanceRecordsPage;

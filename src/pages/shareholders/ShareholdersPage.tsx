import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockUsers, mockShareholderWithdrawals } from '@/data/mockData';
import { PieChart, Users, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

const ShareholdersPage: React.FC = () => {
  const shareholders = mockUsers.filter(u => u.isShareholder);
  const totalBalance = shareholders.reduce((s, u) => s + (u.balance || 0), 0);

  const statusColors = {
    pending: 'bg-secondary/20 text-secondary',
    approved: 'bg-accent/20 text-accent',
    rejected: 'bg-destructive/20 text-destructive',
  };

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Shareholders</h2>

      <GlassCard className="p-4">
        <p className="text-xs text-muted-foreground">Total Shareholder Balance</p>
        <p className="text-2xl font-bold font-display mt-1">₹{totalBalance.toLocaleString()}</p>
      </GlassCard>

      <h3 className="text-sm font-semibold">Shareholders</h3>
      <div className="space-y-2">
        {shareholders.map((user, i) => (
          <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-sm text-primary">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.sharePercentage}% share</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹{(user.balance || 0).toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Balance</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <h3 className="text-sm font-semibold">Withdrawal Requests</h3>
      <div className="space-y-2">
        {mockShareholderWithdrawals.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <DollarSign size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{w.userName}</p>
                  <p className="text-xs text-muted-foreground">{w.createdAt}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹{w.amount.toLocaleString()}</p>
                <span className={`status-badge text-[10px] ${statusColors[w.status]}`}>{w.status}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShareholdersPage;

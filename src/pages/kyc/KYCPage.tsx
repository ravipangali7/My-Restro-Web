import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockUsers } from '@/data/mockData';
import { Shield, CheckCircle, Clock, XCircle, FileText, ChevronRight } from 'lucide-react';

const KYCPage: React.FC = () => {
  const owners = mockUsers.filter(u => u.role === 'owner');
  const statusColors = {
    approved: 'bg-accent/20 text-accent',
    pending: 'bg-secondary/20 text-secondary',
    rejected: 'bg-destructive/20 text-destructive',
  };
  const statusIcons = {
    approved: <CheckCircle size={16} className="text-accent" />,
    pending: <Clock size={16} className="text-secondary" />,
    rejected: <XCircle size={16} className="text-destructive" />,
  };

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">KYC Verification</h2>

      <div className="grid grid-cols-3 gap-2">
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold text-accent">{owners.filter(o => o.kycStatus === 'approved').length}</p>
          <p className="text-[10px] text-muted-foreground">Approved</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold text-secondary">{owners.filter(o => o.kycStatus === 'pending').length}</p>
          <p className="text-[10px] text-muted-foreground">Pending</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold text-destructive">{owners.filter(o => o.kycStatus === 'rejected').length}</p>
          <p className="text-[10px] text-muted-foreground">Rejected</p>
        </GlassCard>
      </div>

      <div className="space-y-2">
        {owners.map((owner, i) => (
          <motion.div key={owner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Shield size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{owner.name}</p>
                    <p className="text-xs text-muted-foreground">{owner.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`status-badge text-[10px] ${statusColors[owner.kycStatus || 'pending']}`}>
                    {owner.kycStatus || 'pending'}
                  </span>
                </div>
              </div>
              {owner.kycStatus === 'rejected' && owner.rejectReason && (
                <div className="mt-2 p-2 rounded-xl bg-destructive/5 text-xs text-destructive">
                  Reason: {owner.rejectReason}
                </div>
              )}
              {owner.kycStatus === 'pending' && (
                <div className="flex gap-2 mt-3">
                  <motion.button whileTap={{ scale: 0.95 }} className="flex-1 py-2 rounded-xl bg-accent/20 text-accent text-xs font-medium">
                    Approve
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} className="flex-1 py-2 rounded-xl bg-destructive/20 text-destructive text-xs font-medium">
                    Reject
                  </motion.button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KYCPage;

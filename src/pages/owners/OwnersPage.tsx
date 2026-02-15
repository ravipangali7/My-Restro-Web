import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockUsers } from '@/data/mockData';
import { ROLE_LABELS, ROLE_COLORS } from '@/constants/theme';
import { Phone, Building2, CheckCircle, ChevronRight } from 'lucide-react';

const OwnersPage: React.FC = () => {
  const owners = mockUsers.filter(u => u.role === 'owner');

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Owners</h2>

      <div className="space-y-2">
        {owners.map((owner, i) => (
          <motion.div key={owner.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: ROLE_COLORS.owner + '22', color: ROLE_COLORS.owner }}>
                    {owner.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold flex items-center gap-1.5">
                      {owner.name} <CheckCircle size={12} className="text-accent" />
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={10} /> {owner.phone}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <p className="text-sm font-bold">2</p><p className="text-[10px] text-muted-foreground">Restaurants</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <p className="text-sm font-bold">₹8K</p><p className="text-[10px] text-muted-foreground">Monthly</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <p className="text-sm font-bold text-accent">₹0</p><p className="text-[10px] text-muted-foreground">Due</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OwnersPage;

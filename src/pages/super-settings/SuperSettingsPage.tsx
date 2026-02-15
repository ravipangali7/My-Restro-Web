import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockSuperSetting } from '@/data/mockData';
import { Settings, DollarSign, MessageSquare, Calendar, CreditCard } from 'lucide-react';

const SuperSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(mockSuperSetting);

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">System Settings</h2>

      <GlassCard className="p-4">
        <p className="text-xs text-muted-foreground">System Balance</p>
        <p className="text-2xl font-bold font-display mt-1 gradient-text">₹{settings.balance.toLocaleString()}</p>
      </GlassCard>

      <GlassCard className="p-4 space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2"><DollarSign size={16} /> Pricing</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Per Transaction Fee</p>
              <p className="text-xs text-muted-foreground">Charged per order</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">₹</span>
              <input type="number" value={settings.perTransactionFee} onChange={e => setSettings(s => ({ ...s, perTransactionFee: Number(e.target.value) }))}
                className="w-16 px-2 py-1.5 rounded-lg bg-muted/50 border border-glass-border text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Subscription Fee/Month</p>
              <p className="text-xs text-muted-foreground">Monthly charge</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">₹</span>
              <input type="number" value={settings.subscriptionFeePerMonth} onChange={e => setSettings(s => ({ ...s, subscriptionFeePerMonth: Number(e.target.value) }))}
                className="w-20 px-2 py-1.5 rounded-lg bg-muted/50 border border-glass-border text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">QR Stand Price</p>
              <p className="text-xs text-muted-foreground">Per stand</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold">₹</span>
              <input type="number" value={settings.perQrStandPrice} onChange={e => setSettings(s => ({ ...s, perQrStandPrice: Number(e.target.value) }))}
                className="w-16 px-2 py-1.5 rounded-lg bg-muted/50 border border-glass-border text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4 space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2"><MessageSquare size={16} /> WhatsApp</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">WhatsApp Usage Billing</p>
            <p className="text-xs text-muted-foreground">Charge per message</p>
          </div>
          <div className="w-10 h-6 rounded-full bg-accent/20 flex items-center px-1 cursor-pointer">
            <div className={`w-4 h-4 rounded-full transition-transform ${settings.isWhatsappUsage ? 'bg-accent translate-x-4' : 'bg-muted-foreground'}`} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Cost Per Message</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">₹</span>
            <input type="number" step="0.1" value={settings.whatsappPerUsage} onChange={e => setSettings(s => ({ ...s, whatsappPerUsage: Number(e.target.value) }))}
              className="w-16 px-2 py-1.5 rounded-lg bg-muted/50 border border-glass-border text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4 space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2"><Calendar size={16} /> Distribution</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Due Threshold</p>
            <p className="text-xs text-muted-foreground">Max allowed dues</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">₹</span>
            <input type="number" value={settings.dueThreshold} onChange={e => setSettings(s => ({ ...s, dueThreshold: Number(e.target.value) }))}
              className="w-20 px-2 py-1.5 rounded-lg bg-muted/50 border border-glass-border text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Distribution Day</p>
            <p className="text-xs text-muted-foreground">Monthly distribution</p>
          </div>
          <input type="number" min="1" max="31" value={settings.shareDistributionDay} onChange={e => setSettings(s => ({ ...s, shareDistributionDay: Number(e.target.value) }))}
            className="w-16 px-2 py-1.5 rounded-lg bg-muted/50 border border-glass-border text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </GlassCard>

      <motion.button whileTap={{ scale: 0.97 }}
        className="w-full gradient-warm rounded-xl py-3.5 font-semibold text-primary-foreground text-sm">
        Save Changes
      </motion.button>
    </div>
  );
};

export default SuperSettingsPage;

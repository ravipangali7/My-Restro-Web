import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '@/constants/theme';
import { LogOut, User, Bell, Moon, Shield, HelpCircle, ChevronRight } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  if (!user) return null;

  const menuItems = [
    { icon: User, label: 'Profile', desc: 'Edit your details' },
    { icon: Bell, label: 'Notifications', desc: 'Manage alerts' },
    { icon: Shield, label: 'Security', desc: 'Password & 2FA' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'Get assistance' },
  ];

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Settings</h2>

      {/* Profile card */}
      <GlassCard className="p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center text-xl font-bold text-primary-foreground">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-base font-bold">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.phone}</p>
          <span className="status-badge text-[10px] mt-1" style={{ backgroundColor: ROLE_COLORS[user.role] + '22', color: ROLE_COLORS[user.role] }}>
            {ROLE_LABELS[user.role]}
          </span>
        </div>
      </GlassCard>

      {/* Quick role switch (demo) */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Switch Role (Demo)</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['super_admin', 'owner', 'manager', 'waiter'] as const).map(role => (
            <motion.button key={role} whileTap={{ scale: 0.95 }}
              onClick={() => switchRole(role)}
              className={`p-2.5 rounded-xl text-xs font-medium ${user.role === role ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
              {ROLE_LABELS[role]}
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map(({ icon: Icon, label, desc }) => (
          <GlassCard key={label} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center">
                <Icon size={16} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </GlassCard>
        ))}
      </div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={logout}
        className="w-full p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center justify-center gap-2">
        <LogOut size={16} /> Sign Out
      </motion.button>
    </div>
  );
};

export default SettingsPage;

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, ROLE_LABELS, ROLE_COLORS } from '@/constants/theme';
import { Shield, Store, UserCog, Coffee } from 'lucide-react';

const roles: { role: UserRole; icon: React.ElementType; desc: string }[] = [
  { role: 'super_admin', icon: Shield, desc: 'Full platform control' },
  { role: 'owner', icon: Store, desc: 'Manage your restaurants' },
  { role: 'manager', icon: UserCog, desc: 'Daily operations' },
  { role: 'waiter', icon: Coffee, desc: 'Take orders & serve' },
  { role: 'customer', icon: Coffee, desc: 'View orders & rewards' },
];

const LoginPage: React.FC = () => {
  const { loginAsRole } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 rounded-3xl gradient-warm mx-auto mb-4 flex items-center justify-center"
          >
            <span className="text-3xl">🍽️</span>
          </motion.div>
          <h1 className="text-2xl font-bold font-display">RestroHub</h1>
          <p className="text-sm text-muted-foreground mt-1">Restaurant Management System</p>
        </div>

        <p className="text-xs text-muted-foreground text-center mb-4">Select a role to continue (Demo)</p>

        <div className="space-y-3">
          {roles.map(({ role, icon: Icon, desc }, i) => (
            <motion.button
              key={role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => loginAsRole(role)}
              className="w-full glass-card p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: ROLE_COLORS[role] + '22', color: ROLE_COLORS[role] }}
              >
                <Icon size={22} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{ROLE_LABELS[role]}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

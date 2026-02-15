import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Bell, LogOut, Menu, ChevronDown } from 'lucide-react';
import { ROLE_LABELS } from '@/constants/theme';

export const TopBar: React.FC<{ title?: string; onMenuClick?: () => void }> = ({ title, onMenuClick }) => {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-glass-border"
    >
      <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors lg:hidden">
            <Menu size={18} className="text-muted-foreground" />
          </button>
          <div className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-none">{title || `Hi, ${user.name.split(' ')[0]}`}</h1>
            <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
              {ROLE_LABELS[user.role]} <ChevronDown size={10} />
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
            <Bell size={18} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
          <button onClick={logout} className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors lg:hidden">
            <LogOut size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

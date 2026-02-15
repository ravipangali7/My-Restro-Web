import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  color?: 'primary' | 'secondary' | 'accent' | 'info';
  className?: string;
}

const colorMap = {
  primary: 'from-primary/20 to-primary/5 text-primary',
  secondary: 'from-secondary/20 to-secondary/5 text-secondary',
  accent: 'from-accent/20 to-accent/5 text-accent',
  info: 'from-blue-500/20 to-blue-500/5 text-blue-400',
};

const iconBg = {
  primary: 'bg-primary/20 text-primary',
  secondary: 'bg-secondary/20 text-secondary',
  accent: 'bg-accent/20 text-accent',
  info: 'bg-blue-500/20 text-blue-400',
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, color = 'primary', className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('glass-card p-4 flex items-start gap-3', className)}
    >
      <div className={cn('p-2.5 rounded-xl', iconBg[color])}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-xl font-bold font-display mt-0.5">{value}</p>
        {trend && (
          <p className={cn('text-xs mt-1 font-medium', trend.isPositive ? 'text-accent' : 'text-destructive')}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
    </motion.div>
  );
};

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'light' | 'stat' | 'elevated';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, variant = 'default', className, ...props }) => {
  const variants = {
    default: 'glass-card',
    light: 'glass-card-light',
    stat: 'glass-card p-4',
    elevated: 'glass-card shadow-lg shadow-primary/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

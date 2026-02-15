import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '@/constants/theme';
import { cn } from '@/lib/utils';
import {
  Home, ShoppingBag, Users, BarChart3, Settings, ChefHat, Package, ClipboardList,
  Building2, CreditCard, UserCog, X, Layers, BookOpen, Truck, Receipt, DollarSign,
  Calendar, Star, Shield, PieChart, ArrowLeftRight, QrCode,
  Wallet, Bell, Tag, LogOut, Ruler, Box, Link2, Trophy, FileText
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  path: string;
  label: string;
  icon: LucideIcon;
  group?: string;
}

const sidebarConfigs: Record<string, SidebarItem[]> = {
  super_admin: [
    { path: '/dashboard', label: 'Dashboard', icon: Home, group: 'Main' },
    { path: '/restaurants', label: 'Restaurants', icon: Building2, group: 'Management' },
    { path: '/owners', label: 'Owners', icon: Users, group: 'Management' },
    { path: '/kyc', label: 'KYC Verification', icon: Shield, group: 'Management' },
    { path: '/finance', label: 'Finance', icon: CreditCard, group: 'Finance' },
    { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight, group: 'Finance' },
    { path: '/shareholders', label: 'Shareholders', icon: PieChart, group: 'Finance' },
    { path: '/qr-orders', label: 'QR Stand Orders', icon: QrCode, group: 'Operations' },
    { path: '/super-settings', label: 'System Settings', icon: Settings, group: 'System' },
    { path: '/settings', label: 'Profile', icon: UserCog, group: 'System' },
  ],
  owner: [
    { path: '/dashboard', label: 'Dashboard', icon: Home, group: 'Main' },
    { path: '/orders', label: 'Orders', icon: ClipboardList, group: 'Operations' },
    { path: '/menu', label: 'Menu Items', icon: ChefHat, group: 'Products' },
    { path: '/categories', label: 'Categories', icon: Tag, group: 'Products' },
    { path: '/units', label: 'Units', icon: Ruler, group: 'Products' },
    { path: '/combos', label: 'Combo Sets', icon: Box, group: 'Products' },
    { path: '/recipes', label: 'Recipe Mapping', icon: Link2, group: 'Products' },
    { path: '/inventory', label: 'Raw Materials', icon: Package, group: 'Inventory' },
    { path: '/vendors', label: 'Vendors', icon: Truck, group: 'Inventory' },
    { path: '/purchases', label: 'Purchases', icon: Receipt, group: 'Inventory' },
    { path: '/staff', label: 'Staff', icon: UserCog, group: 'People' },
    { path: '/staff-leaderboard', label: 'Leaderboard', icon: Trophy, group: 'People' },
    { path: '/customers', label: 'Customers', icon: Users, group: 'People' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, group: 'Reports' },
    { path: '/pl-report', label: 'P&L Report', icon: FileText, group: 'Reports' },
    { path: '/finance-records', label: 'Paid/Received', icon: DollarSign, group: 'Reports' },
    { path: '/expenses', label: 'Expenses', icon: Wallet, group: 'Reports' },
    { path: '/restaurants', label: 'My Restaurants', icon: Building2, group: 'Management' },
    { path: '/settings', label: 'Settings', icon: Settings, group: 'System' },
  ],
  manager: [
    { path: '/dashboard', label: 'Dashboard', icon: Home, group: 'Main' },
    { path: '/orders', label: 'Orders', icon: ClipboardList, group: 'Operations' },
    { path: '/tables', label: 'Tables', icon: Layers, group: 'Operations' },
    { path: '/menu', label: 'Menu Items', icon: ChefHat, group: 'Products' },
    { path: '/categories', label: 'Categories', icon: Tag, group: 'Products' },
    { path: '/units', label: 'Units', icon: Ruler, group: 'Products' },
    { path: '/combos', label: 'Combo Sets', icon: Box, group: 'Products' },
    { path: '/recipes', label: 'Recipe Mapping', icon: Link2, group: 'Products' },
    { path: '/inventory', label: 'Raw Materials', icon: Package, group: 'Inventory' },
    { path: '/vendors', label: 'Vendors', icon: Truck, group: 'Inventory' },
    { path: '/purchases', label: 'Purchases', icon: Receipt, group: 'Inventory' },
    { path: '/stock-logs', label: 'Stock Logs', icon: BookOpen, group: 'Inventory' },
    { path: '/staff', label: 'Staff', icon: UserCog, group: 'People' },
    { path: '/staff-leaderboard', label: 'Leaderboard', icon: Trophy, group: 'People' },
    { path: '/attendance', label: 'Attendance', icon: Calendar, group: 'People' },
    { path: '/customers', label: 'Customers', icon: Users, group: 'People' },
    { path: '/feedback', label: 'Feedback', icon: Star, group: 'People' },
    { path: '/expenses', label: 'Expenses', icon: Wallet, group: 'Finance' },
    { path: '/finance-records', label: 'Paid/Received', icon: DollarSign, group: 'Finance' },
    { path: '/pl-report', label: 'P&L Report', icon: FileText, group: 'Finance' },
    { path: '/notifications', label: 'Notifications', icon: Bell, group: 'Communication' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, group: 'Reports' },
    { path: '/settings', label: 'Settings', icon: Settings, group: 'System' },
  ],
  waiter: [
    { path: '/dashboard', label: 'Dashboard', icon: Home, group: 'Main' },
    { path: '/pos', label: 'New Order', icon: ShoppingBag, group: 'Orders' },
    { path: '/orders', label: 'My Orders', icon: ClipboardList, group: 'Orders' },
    { path: '/tables', label: 'Tables', icon: Layers, group: 'Orders' },
    { path: '/feedback', label: 'My Feedback', icon: Star, group: 'Performance' },
    { path: '/settings', label: 'Profile', icon: Settings, group: 'System' },
  ],
  customer: [
    { path: '/dashboard', label: 'Dashboard', icon: Home, group: 'Main' },
    { path: '/orders', label: 'My Orders', icon: ClipboardList, group: 'Orders' },
    { path: '/feedback', label: 'My Reviews', icon: Star, group: 'Activity' },
    { path: '/settings', label: 'Profile', icon: Settings, group: 'System' },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  if (!user) return null;

  const items = sidebarConfigs[user.role] || [];
  const groups = [...new Set(items.map(i => i.group))];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: ROLE_COLORS[user.role] + '22', color: ROLE_COLORS[user.role] }}>
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg bg-muted/50">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {groups.map(group => (
          <div key={group} className="mb-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-3 py-1 font-semibold">{group}</p>
            {items.filter(i => i.group === group).map(item => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink key={item.path + item.label} to={item.path} onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-0.5',
                    isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-glass-border">
        <button onClick={() => { logout(); onClose(); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card/80 backdrop-blur-xl border-r border-glass-border fixed left-0 top-0 bottom-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card backdrop-blur-xl border-r border-glass-border z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

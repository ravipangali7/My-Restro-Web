import React, { useState } from 'react';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Home, ShoppingBag, Users, BarChart3, Settings, ChefHat, Package, ClipboardList, Building2, CreditCard, UserCog } from 'lucide-react';

const navConfigs = {
  super_admin: [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/restaurants', label: 'Restaurants', icon: Building2 },
    { path: '/owners', label: 'Owners', icon: Users },
    { path: '/finance', label: 'Finance', icon: CreditCard },
    { path: '/settings', label: 'Settings', icon: Settings },
  ],
  owner: [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/orders', label: 'Orders', icon: ClipboardList },
    { path: '/menu', label: 'Menu', icon: ChefHat },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'More', icon: Settings },
  ],
  manager: [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/orders', label: 'Orders', icon: ClipboardList },
    { path: '/inventory', label: 'Stock', icon: Package },
    { path: '/staff', label: 'Staff', icon: UserCog },
    { path: '/settings', label: 'More', icon: Settings },
  ],
  waiter: [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/pos', label: 'New Order', icon: ShoppingBag },
    { path: '/orders', label: 'Orders', icon: ClipboardList },
    { path: '/tables', label: 'Tables', icon: ChefHat },
    { path: '/settings', label: 'Profile', icon: Settings },
  ],
  customer: [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/orders', label: 'Orders', icon: ClipboardList },
    { path: '/analytics', label: 'Activity', icon: BarChart3 },
    { path: '/settings', label: 'Profile', icon: Settings },
  ],
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!user) return null;

  const navItems = navConfigs[user.role];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="bottom-nav-safe lg:pb-4">
          {children}
        </main>
        <div className="lg:hidden">
          <BottomNav items={navItems} />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SuperAdminDashboard from './SuperAdminDashboard';
import OwnerDashboard from './OwnerDashboard';
import ManagerDashboard from './ManagerDashboard';
import WaiterDashboard from './WaiterDashboard';
import CustomerDashboard from './CustomerDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case 'super_admin': return <SuperAdminDashboard />;
    case 'owner': return <OwnerDashboard />;
    case 'manager': return <ManagerDashboard />;
    case 'waiter': return <WaiterDashboard />;
    case 'customer': return <CustomerDashboard />;
    default: return null;
  }
};

export default DashboardPage;

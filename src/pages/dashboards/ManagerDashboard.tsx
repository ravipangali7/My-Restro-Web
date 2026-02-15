import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { ClipboardList, Package, Users, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { mockOrders, mockInventory, mockStaff } from '@/data/mockData';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const pendingOrders = mockOrders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const lowStockItems = mockInventory.filter(i => i.currentStock <= i.minStock).length;
  const activeStaff = mockStaff.filter(s => s.isActive).length;

  const staffPerformance = mockStaff.filter(s => s.role === 'waiter' && s.isActive).map(s => ({
    name: s.name.split(' ')[0],
    orders: Math.floor(Math.random() * 20) + 5,
  }));

  return (
    <div className="page-container space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Pending" value={pendingOrders} icon={Clock} color="secondary" />
        <StatCard label="Low Stock" value={lowStockItems} icon={AlertTriangle} color="primary" />
        <StatCard label="Active Staff" value={activeStaff} icon={Users} color="accent" />
      </div>

      {/* Active orders */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Active Orders</h3>
          <button onClick={() => navigate('/orders')} className="text-xs text-primary">View All</button>
        </div>
        <div className="space-y-2">
          {mockOrders.filter(o => o.status !== 'paid').slice(0, 4).map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  T{order.tableNo}
                </div>
                <div>
                  <p className="text-sm font-medium">Table {order.tableNo}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} items · ₹{order.total}</p>
                </div>
              </div>
              <span className={`status-badge ${
                order.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                order.status === 'preparing' ? 'bg-blue-500/20 text-blue-400' :
                order.status === 'ready' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
              }`}>
                {order.status}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Staff performance */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Waiter Performance</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={staffPerformance}>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="orders" fill="#51CF66" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Low stock alerts */}
      {lowStockItems > 0 && (
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">⚠️ Low Stock Alerts</h3>
            <button onClick={() => navigate('/inventory')} className="text-xs text-primary">Manage</button>
          </div>
          <div className="space-y-2">
            {mockInventory.filter(i => i.currentStock <= i.minStock).map(item => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-destructive/5">
                <span className="text-sm">{item.name}</span>
                <span className="text-xs text-destructive font-medium">{item.currentStock} {item.unit} left</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default ManagerDashboard;

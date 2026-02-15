import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { mockOrders, salesData, weeklySalesData, categoryData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const todaySales = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = mockOrders.filter(o => o.status !== 'paid').length;

  return (
    <div className="page-container space-y-4">
      {/* Revenue highlight */}
      <GlassCard className="p-5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
        <p className="text-xs text-muted-foreground">Today's Revenue</p>
        <p className="text-3xl font-bold font-display mt-1">₹{todaySales.toLocaleString()}</p>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp size={14} className="text-accent" />
          <span className="text-xs text-accent font-medium">+18% vs yesterday</span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Active Orders" value={activeOrders} icon={ShoppingBag} color="secondary" />
        <StatCard label="Customers Today" value={24} icon={Users} color="accent" />
      </div>

      {/* Sales chart */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Hourly Sales</h3>
          <button className="text-xs text-primary">This Week →</button>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="ownerSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF922B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF922B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#FF922B" fill="url(#ownerSales)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Category breakdown */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Sales by Category</h3>
        <div className="flex items-center gap-4">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-1.5">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.fill }} />
                  <span className="text-xs text-muted-foreground">{c.name}</span>
                </div>
                <span className="text-xs font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'View Orders', path: '/orders' },
          { label: 'Menu Items', path: '/menu' },
          { label: 'Staff', path: '/staff' },
          { label: 'Customers', path: '/customers' },
        ].map(item => (
          <motion.button
            key={item.path}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(item.path)}
            className="glass-card p-3 flex items-center justify-between"
          >
            <span className="text-sm font-medium">{item.label}</span>
            <ArrowRight size={16} className="text-muted-foreground" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;

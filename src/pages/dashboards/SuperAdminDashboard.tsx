import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Building2, Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockRestaurants, mockUsers, weeklySalesData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="page-container space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Restaurants" value={mockRestaurants.length} icon={Building2} color="primary" trend={{ value: 12, isPositive: true }} />
        <StatCard label="Total Users" value={mockUsers.length} icon={Users} color="secondary" trend={{ value: 8, isPositive: true }} />
        <StatCard label="Revenue (MTD)" value="₹4.2L" icon={DollarSign} color="accent" trend={{ value: 15, isPositive: true }} />
        <StatCard label="Growth" value="23%" icon={TrendingUp} color="info" trend={{ value: 5, isPositive: true }} />
      </div>

      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Platform Revenue</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySalesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#FF6B6B" fill="url(#salesGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <h3 className="text-sm font-semibold">Restaurants</h3>
      <div className="space-y-2">
        {mockRestaurants.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {r.isActive ? <CheckCircle size={14} className="text-accent" /> : <AlertTriangle size={14} className="text-secondary" />}
                <span className={`text-xs ${r.isActive ? 'text-accent' : 'text-secondary'}`}>{r.isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-2">System Alerts</h3>
        <div className="space-y-2">
          {[
            { msg: '2 owners have overdue payments', type: 'warning' },
            { msg: 'New KYC verification pending', type: 'info' },
            { msg: 'Platform update scheduled tonight', type: 'info' },
          ].map((alert, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-muted/30">
              <AlertTriangle size={14} className={alert.type === 'warning' ? 'text-secondary' : 'text-blue-400'} />
              <span className="text-xs text-muted-foreground">{alert.msg}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default SuperAdminDashboard;

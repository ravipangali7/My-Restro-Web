import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { salesData, weeklySalesData, categoryData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, ShoppingBag, Users } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Analytics</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Revenue" value="₹2.7L" icon={DollarSign} color="primary" trend={{ value: 18, isPositive: true }} />
        <StatCard label="Total Orders" value="360" icon={ShoppingBag} color="secondary" trend={{ value: 12, isPositive: true }} />
        <StatCard label="Avg. Order" value="₹750" icon={TrendingUp} color="accent" />
        <StatCard label="Customers" value="186" icon={Users} color="info" trend={{ value: 8, isPositive: true }} />
      </div>

      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Weekly Sales</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySalesData}>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                {weeklySalesData.map((_, i) => <Cell key={i} fill={i === 5 ? '#FF6B6B' : '#FF6B6B44'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Today's Sales Trend</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="anSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#51CF66" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#51CF66" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#51CF66" fill="url(#anSales)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Category Breakdown</h3>
        <div className="flex items-center gap-4">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.fill }} />
                  <span className="text-xs">{c.name}</span>
                </div>
                <span className="text-xs font-semibold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default AnalyticsPage;

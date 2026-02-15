import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { monthlySalesData, mockExpenses, mockPaidRecords, mockReceivedRecords, mockOrders, paymentMethodData, orderTypeData } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const PLReportPage: React.FC = () => {
  const revenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const expenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
  const salaries = mockPaidRecords.filter(p => p.staffId).reduce((s, p) => s + p.amount, 0);
  const vendorPay = mockPaidRecords.filter(p => p.vendorId).reduce((s, p) => s + p.amount, 0);
  const received = mockReceivedRecords.reduce((s, r) => s + r.amount, 0);
  const grossProfit = revenue - vendorPay;
  const netProfit = grossProfit - expenses - salaries;

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">P&L Report</h2>

      {/* Summary */}
      <GlassCard className="p-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1 text-accent"><ArrowDownLeft size={14} /><span className="text-xs">Revenue</span></div>
            <p className="text-xl font-bold mt-1">₹{revenue.toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-primary"><ArrowUpRight size={14} /><span className="text-xs">Expenses</span></div>
            <p className="text-xl font-bold mt-1">₹{(expenses + salaries + vendorPay).toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-glass-border">
          <div className="flex items-center gap-2">
            {netProfit >= 0 ? <TrendingUp size={16} className="text-accent" /> : <TrendingDown size={16} className="text-primary" />}
            <span className="text-xs text-muted-foreground">Net Profit</span>
          </div>
          <p className={`text-2xl font-bold font-display mt-1 ${netProfit >= 0 ? 'text-accent' : 'text-primary'}`}>
            ₹{netProfit.toLocaleString()}
          </p>
        </div>
      </GlassCard>

      {/* Breakdown */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Expense Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-2.5 rounded-xl bg-muted/30">
            <span className="text-sm">Raw Material / Vendors</span>
            <span className="text-sm font-bold text-primary">₹{vendorPay.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-muted/30">
            <span className="text-sm">Operating Expenses</span>
            <span className="text-sm font-bold text-primary">₹{expenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-muted/30">
            <span className="text-sm">Staff Salaries</span>
            <span className="text-sm font-bold text-primary">₹{salaries.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-accent/5 border border-accent/20">
            <span className="text-sm font-semibold">Gross Profit</span>
            <span className="text-sm font-bold text-accent">₹{grossProfit.toLocaleString()}</span>
          </div>
        </div>
      </GlassCard>

      {/* Monthly chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Monthly Revenue vs Expenses</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySalesData}>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#51CF66" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#FF6B6B" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Payment methods */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold mb-2">Payment Methods</h3>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentMethodData} cx="50%" cy="50%" innerRadius={20} outerRadius={38} paddingAngle={3} dataKey="value">
                  {paymentMethodData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 mt-2">
            {paymentMethodData.map(p => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} /><span className="text-[10px]">{p.name}</span></div>
                <span className="text-[10px] font-semibold">{p.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold mb-2">Order Types</h3>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={orderTypeData} cx="50%" cy="50%" innerRadius={20} outerRadius={38} paddingAngle={3} dataKey="value">
                  {orderTypeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 mt-2">
            {orderTypeData.map(o => (
              <div key={o.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: o.fill }} /><span className="text-[10px]">{o.name}</span></div>
                <span className="text-[10px] font-semibold">{o.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Cash flow */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Cash Flow Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-xl bg-accent/5">
            <p className="text-xs text-muted-foreground">Cash In</p>
            <p className="text-lg font-bold text-accent">₹{received.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-primary/5">
            <p className="text-xs text-muted-foreground">Cash Out</p>
            <p className="text-lg font-bold text-primary">₹{mockPaidRecords.reduce((s, p) => s + p.amount, 0).toLocaleString()}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default PLReportPage;

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { staffLeaderboard, mockFeedback } from '@/data/mockData';
import { Trophy, Star, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

const badgeColors = ['from-yellow-500 to-yellow-600', 'from-gray-400 to-gray-500', 'from-orange-600 to-orange-700'];
const badgeLabels = ['🥇', '🥈', '🥉'];

const StaffLeaderboardPage: React.FC = () => {
  const chartData = staffLeaderboard.map(s => ({ name: s.name.split(' ')[0], orders: s.orders, sales: s.sales / 1000 }));

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Staff Leaderboard</h2>

      {/* Top performer */}
      {staffLeaderboard[0] && (
        <GlassCard className="p-5 relative overflow-hidden text-center">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-secondary/10 blur-2xl" />
          <Trophy size={32} className="text-secondary mx-auto mb-2" />
          <p className="text-xl font-bold font-display">{staffLeaderboard[0].name}</p>
          <p className="text-xs text-muted-foreground">Top Performer Today</p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <p className="text-lg font-bold">{staffLeaderboard[0].orders}</p>
              <p className="text-[10px] text-muted-foreground">Orders</p>
            </div>
            <div>
              <p className="text-lg font-bold">₹{staffLeaderboard[0].sales.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">Sales</p>
            </div>
            <div>
              <p className="text-lg font-bold flex items-center justify-center gap-1">
                {staffLeaderboard[0].rating} <Star size={12} className="text-secondary fill-secondary" />
              </p>
              <p className="text-[10px] text-muted-foreground">Rating</p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Rankings */}
      <div className="space-y-2">
        {staffLeaderboard.map((staff, i) => (
          <motion.div key={staff.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-3 flex items-center gap-3">
              <div className="text-2xl w-8 text-center">{badgeLabels[i] || `#${i + 1}`}</div>
              <div className="w-11 h-11 rounded-xl gradient-warm flex items-center justify-center font-bold text-sm text-primary-foreground">
                {staff.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{staff.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><ShoppingBag size={10} /> {staff.orders}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><DollarSign size={10} /> ₹{staff.sales.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Star size={10} /> {staff.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-accent">₹{staff.tips}</p>
                <p className="text-[10px] text-muted-foreground">Tips</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Performance chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Orders vs Sales (K)</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="orders" fill="#FF922B" radius={[4, 4, 0, 0]} name="Orders" />
              <Bar dataKey="sales" fill="#51CF66" radius={[4, 4, 0, 0]} name="Sales (K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Average metrics */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Team Averages</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">{Math.round(staffLeaderboard.reduce((s, st) => s + st.orders, 0) / staffLeaderboard.length)}</p>
            <p className="text-[10px] text-muted-foreground">Avg Orders/Day</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/30">
            <p className="text-lg font-bold">{(staffLeaderboard.reduce((s, st) => s + st.rating, 0) / staffLeaderboard.length).toFixed(1)}</p>
            <p className="text-[10px] text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default StaffLeaderboardPage;

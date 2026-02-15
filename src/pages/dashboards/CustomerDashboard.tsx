import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders, mockFeedback, mockMenuItems, mockCustomers } from '@/data/mockData';
import {
  ShoppingBag, DollarSign, Star, TrendingUp, Clock, ChefHat,
  Award, Heart, ArrowUpRight, CalendarDays
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#74C0FC', '#E599F7'];

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  // Find customer data
  const customer = mockCustomers.find(c => c.phone === user.phone) || mockCustomers[0];
  const customerOrders = mockOrders.filter(o => o.customerPhone === customer.phone || true).slice(0, 8);
  const customerFeedback = mockFeedback.filter(f => f.customerPhone === customer.phone || f.customerName === customer.name);

  // Analytics
  const totalSpent = customer.totalSpent;
  const totalOrders = customer.totalOrders;
  const avgOrderValue = Math.round(totalSpent / totalOrders);
  const avgRating = customerFeedback.length > 0
    ? (customerFeedback.reduce((s, f) => s + f.rating, 0) / customerFeedback.length).toFixed(1)
    : '4.5';

  // Monthly spending data
  const monthlySpending = [
    { name: 'Sep', amount: 2800 },
    { name: 'Oct', amount: 3200 },
    { name: 'Nov', amount: 2500 },
    { name: 'Dec', amount: 4100 },
    { name: 'Jan', amount: 3800 },
    { name: 'Feb', amount: 2100 },
  ];

  // Favorite categories
  const categoryBreakdown = [
    { name: 'Main Course', value: 42, fill: CHART_COLORS[0] },
    { name: 'Starters', value: 22, fill: CHART_COLORS[1] },
    { name: 'Breads', value: 16, fill: CHART_COLORS[2] },
    { name: 'Beverages', value: 12, fill: CHART_COLORS[3] },
    { name: 'Desserts', value: 8, fill: CHART_COLORS[4] },
  ];

  // Order frequency by day
  const dayFrequency = [
    { name: 'Mon', orders: 3 },
    { name: 'Tue', orders: 2 },
    { name: 'Wed', orders: 5 },
    { name: 'Thu', orders: 4 },
    { name: 'Fri', orders: 7 },
    { name: 'Sat', orders: 9 },
    { name: 'Sun', orders: 8 },
  ];

  // Top items
  const topItems = [
    { name: 'Butter Chicken', count: 12, amount: 4200 },
    { name: 'Biryani', count: 9, amount: 2700 },
    { name: 'Paneer Tikka', count: 7, amount: 1750 },
    { name: 'Naan', count: 15, amount: 600 },
    { name: 'Masala Chai', count: 10, amount: 600 },
  ];

  // Loyalty info
  const loyaltyPoints = totalOrders * 10 + Math.floor(totalSpent / 100);
  const loyaltyTier = loyaltyPoints > 500 ? 'Gold' : loyaltyPoints > 200 ? 'Silver' : 'Bronze';
  const nextTierPoints = loyaltyPoints > 500 ? 1000 : loyaltyPoints > 200 ? 500 : 200;
  const tierProgress = Math.min((loyaltyPoints / nextTierPoints) * 100, 100);

  const anim = (i: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.05 } });

  return (
    <div className="page-container space-y-4">
      {/* Greeting */}
      <motion.div {...anim(0)}>
        <h2 className="text-lg font-bold font-display">Welcome back, {user.name.split(' ')[0]}! 👋</h2>
        <p className="text-xs text-muted-foreground">Here's your dining activity overview</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Orders" value={totalOrders} icon={ShoppingBag} color="primary" trend={{ value: 12, isPositive: true }} />
        <StatCard label="Total Spent" value={`₹${(totalSpent / 1000).toFixed(1)}K`} icon={DollarSign} color="secondary" />
        <StatCard label="Avg. Order" value={`₹${avgOrderValue}`} icon={TrendingUp} color="accent" />
        <StatCard label="Avg. Rating" value={avgRating} icon={Star} color="info" />
      </div>

      {/* Loyalty Card */}
      <motion.div {...anim(1)}>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-secondary" />
              <h3 className="text-sm font-semibold">Loyalty Rewards</h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/20 text-secondary font-semibold">{loyaltyTier} Member</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{loyaltyPoints} points</span>
            <span>{nextTierPoints} for next tier</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tierProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            Earn 10 points per order + 1 point per ₹100 spent
          </p>
        </GlassCard>
      </motion.div>

      {/* Spending Trend */}
      <motion.div {...anim(2)}>
        <GlassCard className="p-4">
          <h3 className="text-sm font-semibold mb-3">Monthly Spending</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySpending}>
                <defs>
                  <linearGradient id="custSpendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                  formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Spent']}
                />
                <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="url(#custSpendGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Category Breakdown + Order Frequency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <motion.div {...anim(3)}>
          <GlassCard className="p-4">
            <h3 className="text-sm font-semibold mb-3">Favorite Categories</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryBreakdown} innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                    {categoryBreakdown.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                    formatter={(v: number) => [`${v}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {categoryBreakdown.map((cat, i) => (
                <span key={i} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.fill }} />
                  {cat.name}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div {...anim(4)}>
          <GlassCard className="p-4">
            <h3 className="text-sm font-semibold mb-3">Order Frequency</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayFrequency}>
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                  />
                  <Bar dataKey="orders" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Top Ordered Items */}
      <motion.div {...anim(5)}>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Heart size={16} className="text-primary" /> Your Favorites
        </h3>
        <div className="space-y-2">
          {topItems.map((item, i) => (
            <GlassCard key={i} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ChefHat size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Ordered {item.count} times</p>
                </div>
              </div>
              <span className="text-sm font-bold text-secondary">₹{item.amount.toLocaleString()}</span>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div {...anim(6)}>
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Clock size={16} className="text-accent" /> Recent Orders
        </h3>
        <div className="space-y-2">
          {customerOrders.slice(0, 5).map((order, i) => (
            <GlassCard key={order.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">#{order.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    order.status === 'paid' ? 'bg-accent/20 text-accent' :
                    order.status === 'served' ? 'bg-info/20 text-info' :
                    order.status === 'preparing' ? 'bg-secondary/20 text-secondary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <span className="text-sm font-bold">₹{order.total}</span>
              </div>
              <p className="text-xs text-muted-foreground">{order.items.map(i => i.name).join(', ')}</p>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <CalendarDays size={10} />
                {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Reviews Given */}
      {customerFeedback.length > 0 && (
        <motion.div {...anim(7)}>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Star size={16} className="text-secondary" /> Your Reviews
          </h3>
          <div className="space-y-2">
            {customerFeedback.map((fb, i) => (
              <GlassCard key={fb.id} className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={12} className={si < fb.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'} />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{fb.createdAt}</span>
                </div>
                <p className="text-xs text-muted-foreground">{fb.review}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Credit Balance */}
      {customer.credit > 0 && (
        <motion.div {...anim(8)}>
          <GlassCard className="p-4 border border-destructive/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Outstanding Credit</p>
                <p className="text-xl font-bold text-destructive">₹{customer.credit.toLocaleString()}</p>
              </div>
              <ArrowUpRight size={20} className="text-destructive" />
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerDashboard;

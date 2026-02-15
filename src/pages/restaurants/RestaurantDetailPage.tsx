import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { mockRestaurants, mockOrders, mockStaff, mockMenuItems, salesData } from '@/data/mockData';
import { ArrowLeft, MapPin, Phone, CheckCircle, AlertTriangle, Users, ShoppingBag, ChefHat, DollarSign, Calendar, ToggleRight, ToggleLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = mockRestaurants.find(r => r.id === id);

  if (!restaurant) return (
    <div className="page-container flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Restaurant not found</p>
    </div>
  );

  const staffCount = mockStaff.filter(s => s.restaurantId === restaurant.id).length;
  const menuCount = mockMenuItems.filter(m => m.restaurantId === restaurant.id).length;
  const orders = mockOrders.filter(o => o.restaurantId === restaurant.id);
  const todaySales = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-bold font-display">{restaurant.name}</h2>
      </div>

      {/* Header */}
      <GlassCard className="p-5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {restaurant.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {restaurant.isActive ? <CheckCircle size={14} className="text-accent" /> : <AlertTriangle size={14} className="text-secondary" />}
              <span className={`text-xs font-medium ${restaurant.isActive ? 'text-accent' : 'text-secondary'}`}>{restaurant.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={10} /> {restaurant.address}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Phone size={10} /> {restaurant.phone}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-glass-border">
          <div className="flex items-center gap-2">
            {restaurant.isOpen ? <ToggleRight size={20} className="text-accent" /> : <ToggleLeft size={20} className="text-muted-foreground" />}
            <span className="text-xs">{restaurant.isOpen ? 'Open' : 'Closed'}</span>
          </div>
          <span className="text-xs text-muted-foreground">Slug: /{restaurant.slug}</span>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Today's Sales" value={`₹${todaySales.toLocaleString()}`} icon={DollarSign} color="primary" />
        <StatCard label="Orders" value={orders.length} icon={ShoppingBag} color="secondary" />
        <StatCard label="Staff" value={staffCount || 5} icon={Users} color="accent" />
        <StatCard label="Menu Items" value={menuCount || 10} icon={ChefHat} color="info" />
      </div>

      {/* Sales chart */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Today's Sales</h3>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="restSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#8A7E74', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
              <Tooltip contentStyle={{ background: '#1A1614', border: '1px solid #2E2824', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="#FF6B6B" fill="url(#restSales)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Financials */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Financials</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-2.5 rounded-xl bg-muted/30">
            <span className="text-sm">Balance</span>
            <span className="text-sm font-bold">₹{restaurant.balance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-muted/30">
            <span className="text-sm">Due Balance</span>
            <span className={`text-sm font-bold ${restaurant.dueBalance > 5000 ? 'text-primary' : 'text-accent'}`}>₹{restaurant.dueBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-muted/30">
            <span className="text-sm">Subscription</span>
            <span className="text-xs text-muted-foreground">{restaurant.subscriptionStart} → {restaurant.subscriptionEnd}</span>
          </div>
        </div>
      </GlassCard>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'View Orders', path: '/orders' },
          { label: 'Menu Items', path: '/menu' },
          { label: 'Staff', path: '/staff' },
          { label: 'Analytics', path: '/analytics' },
        ].map(item => (
          <motion.button key={item.path} whileTap={{ scale: 0.97 }} onClick={() => navigate(item.path)}
            className="glass-card p-3 text-sm font-medium text-center">{item.label}</motion.button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetailPage;

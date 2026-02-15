import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShoppingBag, DollarSign, Clock, CheckCircle2, Plus } from 'lucide-react';
import { mockOrders } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const WaiterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const myOrders = mockOrders;
  const activeOrders = myOrders.filter(o => o.status !== 'paid').length;
  const totalEarnings = myOrders.filter(o => o.status === 'paid').reduce((s, o) => s + o.total, 0);

  return (
    <div className="page-container space-y-4">
      {/* New order button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/pos')}
        className="w-full gradient-warm rounded-2xl p-4 flex items-center justify-center gap-2 text-primary-foreground font-semibold shadow-lg"
      >
        <Plus size={20} />
        New Order
      </motion.button>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Active Orders" value={activeOrders} icon={ShoppingBag} color="secondary" />
        <StatCard label="Tips Today" value="₹320" icon={DollarSign} color="accent" />
      </div>

      {/* My orders */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">My Orders Today</h3>
        <div className="space-y-2">
          {myOrders.map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/orders/${order.id}`)}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 active:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                  T{order.tableNo}
                </div>
                <div>
                  <p className="text-sm font-medium">Table {order.tableNo}</p>
                  <p className="text-xs text-muted-foreground">{order.items.map(i => i.name).join(', ').substring(0, 30)}...</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">₹{order.total}</p>
                <span className={`status-badge text-[10px] ${
                  order.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                  order.status === 'preparing' ? 'bg-blue-500/20 text-blue-400' :
                  order.status === 'ready' ? 'bg-accent/20 text-accent' :
                  order.status === 'served' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {order.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Table status */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Tables Status</h3>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => {
            const occupied = mockOrders.some(o => o.tableNo === i + 1 && o.status !== 'paid');
            return (
              <motion.div
                key={i}
                whileTap={{ scale: 0.9 }}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold ${
                  occupied ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/30 text-muted-foreground'
                }`}
              >
                {i + 1}
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary/40" /><span className="text-xs text-muted-foreground">Occupied</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-muted/50" /><span className="text-xs text-muted-foreground">Available</span></div>
        </div>
      </GlassCard>
    </div>
  );
};

export default WaiterDashboard;

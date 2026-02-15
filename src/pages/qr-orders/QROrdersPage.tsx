import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockQrStandOrders } from '@/data/mockData';
import { QrCode, Package, CheckCircle, Truck, Clock } from 'lucide-react';

const QROrdersPage: React.FC = () => {
  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock size={16} className="text-secondary" />,
    accepted: <CheckCircle size={16} className="text-blue-400" />,
    shipped: <Truck size={16} className="text-primary" />,
    delivered: <CheckCircle size={16} className="text-accent" />,
  };
  const statusColors: Record<string, string> = {
    pending: 'bg-secondary/20 text-secondary',
    accepted: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-primary/20 text-primary',
    delivered: 'bg-accent/20 text-accent',
  };

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">QR Stand Orders</h2>

      <div className="space-y-2">
        {mockQrStandOrders.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
                    <QrCode size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{order.restaurantName}</p>
                    <p className="text-xs text-muted-foreground">{order.quantity} stands · {order.createdAt}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">₹{order.total.toLocaleString()}</p>
                  <span className={`status-badge text-[10px] ${statusColors[order.status]}`}>{order.status}</span>
                </div>
              </div>
              {order.status === 'pending' && (
                <div className="flex gap-2">
                  <motion.button whileTap={{ scale: 0.95 }} className="flex-1 py-2 rounded-xl bg-accent/20 text-accent text-xs font-medium">Accept</motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} className="flex-1 py-2 rounded-xl bg-primary/20 text-primary text-xs font-medium">Ship</motion.button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QROrdersPage;

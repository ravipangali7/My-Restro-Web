import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockOrders } from '@/data/mockData';
import { ArrowLeft, Clock, User, MapPin, CheckCircle } from 'lucide-react';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrders.find(o => o.id === id);

  if (!order) return (
    <div className="page-container flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Order not found</p>
    </div>
  );

  const steps = ['pending', 'preparing', 'ready', 'served', 'paid'];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-bold font-display">Order #{order.id.slice(-3)}</h2>
      </div>

      {/* Status progress */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                i <= currentStep ? 'gradient-warm text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {i <= currentStep ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className="text-[9px] text-muted-foreground capitalize">{step}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Order info */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-primary" />
          <span>Table {order.tableNo}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User size={14} className="text-secondary" />
          <span>Waiter: {order.waiterName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={14} className="text-accent" />
          <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
        </div>
      </GlassCard>

      {/* Items */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Items</h3>
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-glass-border last:border-0">
              <div>
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">x{item.qty}</p>
              </div>
              <p className="text-sm font-medium">₹{item.price * item.qty}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold gradient-text">₹{order.total}</span>
        </div>
      </GlassCard>

      {/* Actions */}
      {order.status !== 'paid' && (
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.97 }} className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">
            Update Status
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm font-medium">
            Print Bill
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;

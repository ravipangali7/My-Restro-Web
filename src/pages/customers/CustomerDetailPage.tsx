import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatCard } from '@/components/ui/StatCard';
import { mockCustomers, mockOrders, mockFeedback, mockReceivedRecords } from '@/data/mockData';
import { ArrowLeft, Phone, MapPin, ShoppingBag, DollarSign, Star, Clock, CreditCard } from 'lucide-react';

const CustomerDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = mockCustomers.find(c => c.id === id);

  if (!customer) return (
    <div className="page-container flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Customer not found</p>
    </div>
  );

  const customerOrders = mockOrders.slice(0, 3);
  const customerFeedback = mockFeedback.filter(f => f.customerPhone === customer.phone);
  const customerPayments = mockReceivedRecords.filter(r => r.customerId === customer.id);

  const tier = customer.totalOrders >= 50 ? { label: 'VIP', color: 'bg-secondary/20 text-secondary' } :
    customer.totalOrders >= 20 ? { label: 'Regular', color: 'bg-accent/20 text-accent' } :
    { label: 'New', color: 'bg-blue-500/20 text-blue-400' };

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50"><ArrowLeft size={18} /></button>
        <h2 className="text-lg font-bold font-display">Customer Details</h2>
      </div>

      {/* Profile */}
      <GlassCard className="p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center text-xl font-bold text-primary-foreground">
          {customer.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-base font-bold flex items-center gap-2">{customer.name} <span className={`status-badge text-[10px] ${tier.color}`}>{tier.label}</span></p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Phone size={10} /> {customer.phone}</p>
          {customer.address && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin size={10} /> {customer.address}</p>}
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total Orders" value={customer.totalOrders} icon={ShoppingBag} color="primary" />
        <StatCard label="Total Spent" value={`₹${customer.totalSpent.toLocaleString()}`} icon={DollarSign} color="accent" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard variant="stat" className="text-center">
          <p className="text-lg font-bold">₹{Math.round(customer.totalSpent / customer.totalOrders)}</p>
          <p className="text-[10px] text-muted-foreground">Avg Order Value</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <p className={`text-lg font-bold ${customer.credit > 0 ? 'text-primary' : 'text-accent'}`}>₹{customer.credit.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Credit Due</p>
        </GlassCard>
      </div>

      {/* Recent Orders */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold mb-3">Recent Orders</h3>
        <div className="space-y-2">
          {customerOrders.map(order => (
            <div key={order.id} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30" onClick={() => navigate(`/orders/${order.id}`)}>
              <div>
                <p className="text-sm font-medium">Order #{order.id.slice(-3)}</p>
                <p className="text-xs text-muted-foreground">{order.items.length} items · {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹{order.total}</p>
                <span className={`status-badge text-[10px] ${order.status === 'paid' ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Payment History */}
      {customerPayments.length > 0 && (
        <GlassCard className="p-4">
          <h3 className="text-sm font-semibold mb-3">Payment History</h3>
          <div className="space-y-2">
            {customerPayments.map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-accent" />
                  <div>
                    <p className="text-sm">{payment.name}</p>
                    <p className="text-xs text-muted-foreground">{payment.paymentMethod.replace('_', ' ')} · {payment.createdAt}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-accent">₹{payment.amount}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Feedback */}
      {customerFeedback.length > 0 && (
        <GlassCard className="p-4">
          <h3 className="text-sm font-semibold mb-3">Feedback</h3>
          <div className="space-y-2">
            {customerFeedback.map(fb => (
              <div key={fb.id} className="p-2.5 rounded-xl bg-muted/30 space-y-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className={s <= fb.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'} />)}
                </div>
                <p className="text-xs text-muted-foreground">{fb.review}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock size={12} />
        Last visit: {customer.lastVisit}
      </div>
    </div>
  );
};

export default CustomerDetailPage;

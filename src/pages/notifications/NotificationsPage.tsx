import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockNotifications } from '@/data/mockData';
import { Bell, Plus, MessageSquare, Send } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Notifications</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Send
        </motion.button>
      </div>

      <div className="space-y-2">
        {mockNotifications.map((notif, i) => (
          <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notif.type === 'whatsapp' ? 'bg-accent/20' : 'bg-blue-500/20'}`}>
                    <MessageSquare size={14} className={notif.type === 'whatsapp' ? 'text-accent' : 'text-blue-400'} />
                  </div>
                  <span className="text-xs font-medium capitalize">{notif.type}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{notif.createdAt}</p>
              </div>
              <p className="text-sm">{notif.message}</p>
              <p className="text-xs text-muted-foreground mt-2">Sent: {notif.sentCount}/{notif.totalCount}</p>
              <div className="w-full h-1.5 rounded-full bg-muted/50 mt-1 overflow-hidden">
                <div className="h-full rounded-full bg-accent" style={{ width: `${(notif.sentCount / notif.totalCount) * 100}%` }} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={() => setShowForm(false)}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={e => e.stopPropagation()}
              className="w-full max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold font-display">Send Notification</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Type</label>
                  <select className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm">
                    <option value="whatsapp">WhatsApp</option><option value="sms">SMS</option>
                  </select></div>
                <div><label className="text-xs text-muted-foreground">Message</label>
                  <textarea rows={3} className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" /></div>
                <div><label className="text-xs text-muted-foreground">Recipients</label>
                  <p className="text-sm mt-1">All customers (45)</p></div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm flex items-center justify-center gap-2">
                  <Send size={16} /> Send
                </motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPage;

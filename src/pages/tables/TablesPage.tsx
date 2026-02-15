import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockOrders, mockTables } from '@/data/mockData';
import { Plus, Edit, Users, MapPin } from 'lucide-react';

const TablesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('All');
  const floors = ['All', ...new Set(mockTables.map(t => t.floor))];

  const filtered = mockTables.filter(t => selectedFloor === 'All' || t.floor === selectedFloor);

  const tables = filtered.map(t => {
    const tableNum = parseInt(t.name.replace('Table ', ''));
    const order = mockOrders.find(o => o.tableNo === tableNum && o.status !== 'paid');
    return { ...t, order };
  });

  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Tables</h2>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {floors.map(f => (
          <button key={f} onClick={() => setSelectedFloor(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${selectedFloor === f ? 'gradient-warm text-primary-foreground' : 'bg-muted/50 text-muted-foreground'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tables.map(({ id, name, capacity, floor, nearBy, order }) => (
          <motion.div key={id} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <GlassCard className={`p-4 text-center ${order ? 'border-primary/30' : ''}`}>
              <p className="text-2xl font-bold font-display">{name.replace('Table ', '')}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Users size={10} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{capacity}</span>
              </div>
              {order ? (
                <>
                  <span className={`status-badge text-[10px] mt-2 ${
                    order.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                    order.status === 'preparing' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'ready' ? 'bg-accent/20 text-accent' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>{order.status}</span>
                  <p className="text-xs font-medium mt-1">₹{order.total}</p>
                </>
              ) : (
                <p className="text-xs text-accent mt-2">Available</p>
              )}
              <p className="text-[9px] text-muted-foreground mt-1">{nearBy}</p>
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
              <h3 className="text-lg font-bold font-display">Add Table</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Table Name</label>
                  <input placeholder="Table 13" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-muted-foreground">Capacity</label>
                    <input type="number" placeholder="4" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                  <div><label className="text-xs text-muted-foreground">Floor</label>
                    <input placeholder="Ground" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                </div>
                <div><label className="text-xs text-muted-foreground">Near By</label>
                  <input placeholder="Window" className="w-full mt-1 px-3 py-2.5 rounded-xl bg-muted/50 border border-glass-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              </div>
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)}
                  className="flex-1 gradient-warm rounded-xl py-3 font-semibold text-primary-foreground text-sm">Add Table</motion.button>
                <button onClick={() => setShowForm(false)} className="px-6 rounded-xl py-3 bg-muted border border-glass-border text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TablesPage;

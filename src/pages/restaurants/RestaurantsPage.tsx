import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockRestaurants } from '@/data/mockData';
import { Building2, MapPin, Phone, CheckCircle, AlertTriangle, Plus, Edit, ChevronRight } from 'lucide-react';

const RestaurantsPage: React.FC = () => {
  return (
    <div className="page-container space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display">Restaurants</h2>
        <motion.button whileTap={{ scale: 0.95 }}
          className="gradient-warm px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground flex items-center gap-1">
          <Plus size={16} /> Add
        </motion.button>
      </div>

      <div className="space-y-3">
        {mockRestaurants.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center text-lg font-bold text-primary-foreground">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{r.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {r.isActive ? <CheckCircle size={12} className="text-accent" /> : <AlertTriangle size={12} className="text-secondary" />}
                      <span className={`text-xs ${r.isActive ? 'text-accent' : 'text-secondary'}`}>{r.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-muted/50"><Edit size={16} className="text-muted-foreground" /></button>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin size={12} /> {r.address}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone size={12} /> {r.phone}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <p className="text-sm font-bold">₹45K</p><p className="text-[10px] text-muted-foreground">Revenue</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <p className="text-sm font-bold">120</p><p className="text-[10px] text-muted-foreground">Orders</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-muted/30">
                  <p className="text-sm font-bold">8</p><p className="text-[10px] text-muted-foreground">Staff</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;

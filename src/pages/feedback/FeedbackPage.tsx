import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockFeedback } from '@/data/mockData';
import { Star, MessageSquare } from 'lucide-react';

const FeedbackPage: React.FC = () => {
  const avgRating = (mockFeedback.reduce((s, f) => s + f.rating, 0) / mockFeedback.length).toFixed(1);

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Feedback</h2>

      <GlassCard className="p-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
          <Star size={28} className="text-secondary" />
        </div>
        <div>
          <p className="text-2xl font-bold font-display">{avgRating}</p>
          <p className="text-xs text-muted-foreground">Average Rating · {mockFeedback.length} reviews</p>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={14} className={s <= Math.round(Number(avgRating)) ? 'text-secondary fill-secondary' : 'text-muted-foreground'} />
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="space-y-2">
        {mockFeedback.map((fb, i) => (
          <motion.div key={fb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {fb.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{fb.customerName}</p>
                    <p className="text-xs text-muted-foreground">Order #{fb.orderId.slice(-2)} {fb.staffName && `· ${fb.staffName}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} className={s <= fb.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground'} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground pl-13">{fb.review}</p>
              <p className="text-[10px] text-muted-foreground">{fb.createdAt}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;

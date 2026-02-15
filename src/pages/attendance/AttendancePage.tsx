import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { mockAttendance, mockStaff } from '@/data/mockData';
import { Calendar, UserCheck, UserX, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-02-11');
  const activeStaff = mockStaff.filter(s => s.isActive);
  const todayAttendance = mockAttendance.filter(a => a.date === selectedDate);

  const getStatus = (staffId: string) => {
    const record = todayAttendance.find(a => a.staffId === staffId);
    return record?.status || 'unmarked';
  };

  const statusColors = {
    present: 'bg-accent/20 text-accent border-accent/30',
    absent: 'bg-destructive/20 text-destructive border-destructive/30',
    leave: 'bg-secondary/20 text-secondary border-secondary/30',
    unmarked: 'bg-muted/30 text-muted-foreground border-glass-border',
  };

  const stats = {
    present: todayAttendance.filter(a => a.status === 'present').length,
    absent: todayAttendance.filter(a => a.status === 'absent').length,
    leave: todayAttendance.filter(a => a.status === 'leave').length,
  };

  return (
    <div className="page-container space-y-4">
      <h2 className="text-lg font-bold font-display">Attendance</h2>

      {/* Date selector */}
      <GlassCard className="p-3 flex items-center justify-between">
        <button className="p-2 rounded-lg bg-muted/50"><ChevronLeft size={16} /></button>
        <div className="text-center">
          <p className="text-sm font-semibold">{new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
        </div>
        <button className="p-2 rounded-lg bg-muted/50"><ChevronRight size={16} /></button>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard variant="stat" className="text-center">
          <UserCheck size={18} className="text-accent mx-auto mb-1" />
          <p className="text-lg font-bold text-accent">{stats.present}</p>
          <p className="text-[10px] text-muted-foreground">Present</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <UserX size={18} className="text-destructive mx-auto mb-1" />
          <p className="text-lg font-bold text-destructive">{stats.absent}</p>
          <p className="text-[10px] text-muted-foreground">Absent</p>
        </GlassCard>
        <GlassCard variant="stat" className="text-center">
          <Clock size={18} className="text-secondary mx-auto mb-1" />
          <p className="text-lg font-bold text-secondary">{stats.leave}</p>
          <p className="text-[10px] text-muted-foreground">Leave</p>
        </GlassCard>
      </div>

      {/* Staff list with attendance marking */}
      <div className="space-y-2">
        {activeStaff.map((staff, i) => {
          const status = getStatus(staff.id);
          return (
            <motion.div key={staff.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <GlassCard className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{staff.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{staff.role}</p>
                    </div>
                  </div>
                  <span className={`status-badge text-[10px] capitalize ${statusColors[status as keyof typeof statusColors]}`}>
                    {status}
                  </span>
                </div>
                <div className="flex gap-2">
                  {(['present', 'absent', 'leave'] as const).map(s => (
                    <motion.button key={s} whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium capitalize border ${
                        status === s ? statusColors[s] : 'bg-muted/20 text-muted-foreground border-glass-border'
                      }`}>
                      {s}
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendancePage;

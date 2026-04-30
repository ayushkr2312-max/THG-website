import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, CircleDollarSign, Shield } from 'lucide-react';
import { SectionHeading } from './shared';
import { useRef } from 'react';

const VaultSpotlight = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 27, secs: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filled = 28;
  const total = 32;

  return (
    <div className="w-full relative overflow-hidden py-28 bg-zinc-900">
      {/* Sweep animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent skew-x-[-15deg]"
          animate={{ x: ['-200%', '300%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading preText="THE" accentText="VAULT" accentColor="text-yellow-400" subtitle="The headline event. One shot at glory." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 font-bold italic text-sm tracking-widest mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                FEATURED EVENT
              </div>

              <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white mb-6">
                THE GRAND<br/><span className="gradient-text-blue">VAULT FINALS</span>
              </h3>

              <p className="text-zinc-400 text-lg font-medium mb-8 max-w-md leading-relaxed">
                The culmination of Season 3. Sixteen qualified teams battle through a brutal bracket for the largest prize pool in Heist Games history.
              </p>

              {/* Registration bar */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 ui-cut mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-500 font-bold text-sm tracking-widest flex items-center gap-2">
                    <Users size={14} /> ROSTER CAPACITY
                  </span>
                  <span className="text-yellow-400 font-black italic">{filled}/{total} TEAMS</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(filled / total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-2 text-xs text-zinc-600 font-mono">{total - filled} SLOTS REMAINING</div>
              </div>

              {/* Prize display */}
              <div className="bg-zinc-950 border border-yellow-400/20 p-6 ui-cut">
                <div className="text-zinc-500 font-bold text-xs tracking-[0.3em] mb-2 flex items-center gap-2">
                  <CircleDollarSign size={14} className="text-amber-400" /> VAULT CONTENTS
                </div>
                <div className="text-5xl md:text-6xl font-black italic gradient-text-fire countdown-digit">
                  $10,000
                </div>
              </div>
            </motion.div>
          </div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="text-zinc-500 font-bold tracking-[0.3em] text-sm mb-6 flex items-center gap-2">
              <Clock size={14} /> VAULT OPENS IN
            </div>

            <div className="grid grid-cols-4 gap-4 w-full max-w-md">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HRS' },
                { value: timeLeft.mins, label: 'MIN' },
                { value: timeLeft.secs, label: 'SEC' },
              ].map((unit, i) => (
                <div key={i} className="text-center">
                  <div className="bg-zinc-950 border border-zinc-800 ui-cut p-4 md:p-6">
                    <motion.div
                      key={unit.value}
                      initial={{ y: -5, opacity: 0.5 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-4xl md:text-5xl font-black italic text-white countdown-digit"
                    >
                      {String(unit.value).padStart(2, '0')}
                    </motion.div>
                  </div>
                  <div className="mt-2 text-xs font-bold tracking-widest text-zinc-600">{unit.label}</div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 w-full max-w-md py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 font-black italic text-xl ui-cut hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all relative"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Shield size={20} />
                SECURE YOUR SLOT
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VaultSpotlight;

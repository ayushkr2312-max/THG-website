import React, { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trophy, Crosshair, Hexagon, ArrowDown } from 'lucide-react';
import { SectionReveal, FloatingParticles, useCounter, TiltCard } from './shared';

// --- Animated Center Emblem (Holographic feel) ---
const CenterEmblem = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-40">
      {/* Outer slow ring */}
      <motion.div
        className="absolute inset-0 border-[1px] border-yellow-400/10 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 40, ease: 'linear', repeat: Infinity }, scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
      />
      
      {/* Dashed reverse ring */}
      <motion.div
        className="absolute inset-[15%] border-[1px] border-dashed border-amber-500/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
      />

      {/* Center glowing core */}
      <motion.div
        className="absolute inset-[35%] bg-gradient-to-tr from-yellow-400/5 to-amber-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

// --- Shattered Impact Debris ---
const ShatteredDebris = () => {
  const debris = useMemo(() => {
    return Array.from({ length: 132 }).map((_, i) => {
      // Spread evenly vertically
      const top = `${Math.random() * 120 - 10}%`;
      
      // Bias heavily towards the sides to keep the center less cluttered
      let leftPercent;
      const roll = Math.random();
      if (roll < 0.4) {
        // Left zone (-10% to 25%)
        leftPercent = Math.random() * 35 - 10;
      } else if (roll < 0.8) {
        // Right zone (75% to 110%)
        leftPercent = Math.random() * 35 + 75;
      } else {
        // Center zone (25% to 75%) - sparse
        leftPercent = Math.random() * 50 + 25;
      }
      const left = `${leftPercent}%`;
      
      // Randomize sizes, slightly more uniform now that they are spread everywhere
      const size = Math.random() * 40 + 10; 
      
      // Generate jagged shards (triangles and quads)
      const p1 = `${Math.random() * 40},${Math.random() * 40}`;
      const p2 = `${Math.random() * 40 + 60},${Math.random() * 40}`;
      const p3 = `${Math.random() * 100},${Math.random() * 40 + 60}`;
      const p4 = `${Math.random() * 40},${Math.random() * 40 + 60}`;
      const points = Math.random() > 0.4 ? `${p1} ${p2} ${p3}` : `${p1} ${p2} ${p3} ${p4}`;

      // Wall chunk colors (mostly dark zinc, some yellow/white accent pieces)
      const colorRoll = Math.random();
      let color = 'text-zinc-800';
      if (colorRoll > 0.85) color = 'text-yellow-400';
      else if (colorRoll > 0.7) color = 'text-white';
      else if (colorRoll > 0.4) color = 'text-zinc-700';

      const opacity = color.includes('zinc') ? Math.random() * 0.5 + 0.3 : Math.random() * 0.3 + 0.15;

      return {
        id: i,
        top,
        left,
        driftX: Math.random() * 150 - 75,
        driftY: Math.random() * 150 - 75,
        size,
        points,
        color,
        opacity,
        rotateStart: Math.random() * 360,
        rotateDrift: Math.random() * 180 - 90, 
        duration: Math.random() * 15 + 15, 
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {debris.map(d => (
        <motion.svg
          key={d.id}
          width={d.size}
          height={d.size}
          viewBox="0 0 100 100"
          className={`absolute ${d.color}`}
          style={{ top: d.top, left: d.left }}
          initial={{ x: 0, y: 0, rotate: d.rotateStart, opacity: d.opacity }}
          animate={{
            x: [0, d.driftX, 0],
            y: [0, d.driftY, 0],
            rotate: [d.rotateStart, d.rotateStart + d.rotateDrift, d.rotateStart],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <polygon points={d.points} fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  );
};

// --- Centered Hero ---
const Hero = ({ setActiveTab }) => {

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-zinc-950">
      {/* Perspective Grid Background */}
      <div className="absolute inset-[-10%] z-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#facc1515_1px,transparent_1px),linear-gradient(to_bottom,#facc1515_1px,transparent_1px)] bg-[size:64px_64px]" 
             style={{ transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }} />
      </div>

      {/* Ambient glow - Removed as requested */}

      {/* Edge accent glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <FloatingParticles count={30} />
      <ShatteredDebris />
      <CenterEmblem />

      {/* Floating Geometry Elements */}
      <div className="absolute top-[20%] left-[15%] text-yellow-400/10 z-0 hidden lg:block">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}><Hexagon size={120} strokeWidth={0.5} /></motion.div>
      </div>
      <div className="absolute bottom-[25%] right-[15%] text-amber-500/10 z-0 hidden lg:block">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}><Crosshair size={100} strokeWidth={0.5} /></motion.div>
      </div>

      {/* Bottom Left Moving Elements */}
      <div className="absolute bottom-16 left-16 z-0 hidden lg:flex flex-col gap-3 pointer-events-none opacity-60">
        <div className="text-zinc-500 font-mono text-[10px] tracking-widest flex items-center gap-2">
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-yellow-400" />
          SYS_MONITOR
        </div>
        <div className="flex gap-1.5 items-end h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-1.5 bg-zinc-700"
              animate={{ 
                height: ['20%', `${Math.random() * 80 + 20}%`, '20%'],
                backgroundColor: i % 4 === 0 ? ['#3f3f46', '#facc15', '#3f3f46'] : '#3f3f46'
              }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-yellow-400/80 to-transparent"
          animate={{ width: ['0px', '200px', '0px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Bottom Right Moving Elements */}
      <div className="absolute bottom-16 right-16 z-0 hidden lg:flex flex-col items-end gap-2 pointer-events-none opacity-60">
        <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">
          UPLINK_NODE
        </div>
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="h-[1px] bg-zinc-600/60"
            initial={{ width: '10px' }}
            animate={{ 
              width: [`${Math.random() * 20 + 10}px`, `${Math.random() * 80 + 40}px`, `${Math.random() * 20 + 10}px`],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
        ))}
        <motion.div 
          className="h-[2px] bg-yellow-400/60 mt-1"
          animate={{ width: ['20px', '140px', '20px'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center -mt-32">
        
        {/* Origin badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-yellow-400/30 bg-zinc-950/50 backdrop-blur-md shadow-[0_0_20px_rgba(250,204,21,0.1)] relative overflow-hidden group"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
          </span>
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-[11px] uppercase">THE FINALS</span>
        </motion.div>

        {/* Main headline - Centered and massive */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-black italic tracking-normal leading-[0.85] select-none uppercase flex flex-col items-center">
              <span className="text-[3.36rem] sm:text-[3.99rem] md:text-[5.36rem] lg:text-[7.14rem] filter drop-shadow-[0_0_30px_rgba(250,204,21,0.3)] whitespace-nowrap relative shine-text-stroke" data-text="THE HEIST" style={{ fontFamily: "'Kwark', sans-serif", WebkitTextStroke: '2px #facc15', color: 'transparent', wordSpacing: '-0.5em' }}>
                THE HEIST
              </span>
              <span className="text-[3.99rem] sm:text-[5.36rem] md:text-[7.14rem] lg:text-[8.93rem] text-amber-400 mt-[0.63rem] filter drop-shadow-[0_0_30px_rgba(245,158,11,0.2)] relative shine-text-fill" data-text="IS ON">
                IS{' '}
                <motion.span
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ON
                </motion.span>
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 text-base md:text-xl text-zinc-400 font-medium leading-relaxed whitespace-nowrap"
        >
          North America's premier community tournament circuit for <strong className="text-white">THE FINALS</strong>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <TiltCard>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('TOURNAMENTS')}
              className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 font-black italic text-xl ui-cut transition-all hover:shadow-[0_0_40px_rgba(250,204,21,0.5)] flex items-center justify-center gap-3 overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              ENTER THE ARENA
              <ChevronRight className="group-hover:translate-x-1.5 transition-transform w-6 h-6" />
            </motion.button>
          </TiltCard>

          <TiltCard>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('LEADERBOARD')}
              className="group px-10 py-5 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-white font-black italic text-xl ui-cut-reverse transition-all hover:bg-zinc-800 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center gap-3"
            >
              <Trophy className="text-zinc-400 group-hover:text-amber-400 transition-colors w-6 h-6" />
              VIEW STANDINGS
            </motion.button>
          </TiltCard>
        </motion.div>
        
        {/* Scroll indicator down bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-zinc-600 font-mono text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} className="text-yellow-400/50" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Stats Strip ---
const StatsStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const stats = [
    { label: 'PRIZE MONEY PAID', numericEnd: 45000, prefix: '$', suffix: '+' },
    { label: 'TEAMS REGISTERED', numericEnd: 1204, prefix: '', suffix: '' },
    { label: 'TOURNAMENTS HELD', numericEnd: 24, prefix: '', suffix: '' },
    { label: 'COMMUNITY MEMBERS', numericEnd: 3500, prefix: '', suffix: '+' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 border-y-4 border-zinc-950 relative z-20 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-zinc-950/20 text-zinc-950 py-6">
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} inView={isInView} delay={i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
};

const StatItem = ({ stat, inView, delay }) => {
  const count = useCounter(stat.numericEnd, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center text-center px-4 group cursor-default hover:scale-105 transition-transform duration-300"
    >
      <div className="text-3xl md:text-4xl font-black italic countdown-digit">
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-xs md:text-sm font-bold tracking-[0.2em] mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
        {stat.label}
      </div>
    </motion.div>
  );
};

// --- Sponsors ---
const Sponsors = () => (
  <SectionReveal>
    <div className="w-full bg-zinc-950 border-b border-zinc-800 py-12 relative z-10 overflow-hidden">
      <div className="text-center mb-6 text-zinc-600 font-bold tracking-[0.3em] text-sm">OFFICIAL ARENA SPONSORS</div>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-30 hover:opacity-100 transition-opacity duration-700 px-4">
        {['OSPUZE', 'ISEUL-T', 'HOLTOW', 'VAIIYA'].map((name) => (
          <motion.span
            key={name}
            whileHover={{ scale: 1.1, color: '#facc15' }}
            className={`font-black italic text-3xl md:text-5xl text-white cursor-default ${
              name === 'ISEUL-T' ? 'tracking-widest border-2 border-white/30 px-2 hover:border-yellow-400/50' : 'tracking-tighter'
            }`}
          >
            {name}
          </motion.span>
        ))}
      </div>
    </div>
  </SectionReveal>
);

export { Hero, StatsStrip, Sponsors };

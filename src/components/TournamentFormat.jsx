import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Trophy, ChevronRight, Crown, Target, Star, Lock, Shield, ExternalLink, Check, Clock, Swords, Radio } from 'lucide-react';
import { SectionHeading, SectionReveal } from './shared';

const QUALIFIERS = [
  {
    id: 1,
    code: 'Q1',
    name: 'QUALIFIER 1',
    date: 'MAY 3',
    status: 'COMPLETE',
    points: 400,
    teams: 24,
    winner: 'Ospuze Opticals',
    format: 'Cashout 3v3v3v3',
    cta: 'Review Match',
  },
  {
    id: 2,
    code: 'Q2',
    name: 'QUALIFIER 2',
    date: 'MAY 10',
    status: 'COMPLETE',
    points: 400,
    teams: 28,
    winner: 'Vaiiya Visors',
    format: 'Cashout 3v3v3v3',
    cta: 'Review Match',
  },
  {
    id: 3,
    code: 'Q3',
    name: 'QUALIFIER 3',
    date: 'MAY 17',
    status: 'LIVE',
    points: 400,
    teams: 22,
    winner: null,
    format: 'Cashout 3v3v3v3',
    cta: 'Watch Live',
  },
  {
    id: 4,
    code: 'Q4',
    name: 'QUALIFIER 4',
    date: 'MAY 24',
    status: 'OPEN',
    points: 400,
    teams: 0,
    winner: null,
    format: 'Cashout 3v3v3v3',
    cta: 'Register Now',
  },
];

const STANDINGS = [
  { rank: 1, team: 'Ospuze Opticals', q1: 100, q2: 85, q3: 95, q4: null, total: 280, qualified: true },
  { rank: 2, team: 'Vaiiya Visors', q1: 85, q2: 100, q3: 80, q4: null, total: 265, qualified: true },
  { rank: 3, team: 'CNS Syndicate', q1: 70, q2: 75, q3: 100, q4: null, total: 245, qualified: true },
  { rank: 4, team: 'Iseul-T Inc', q1: 90, q2: 60, q3: 70, q4: null, total: 220, qualified: true },
  { rank: 5, team: 'Holtow Heroes', q1: 65, q2: 70, q3: 65, q4: null, total: 200, qualified: true },
  { rank: 6, team: 'Neon Reapers', q1: 55, q2: 65, q3: 60, q4: null, total: 180, qualified: true },
  { rank: 7, team: 'Vault Breakers', q1: 60, q2: 50, q3: 55, q4: null, total: 165, qualified: true },
  { rank: 8, team: 'Phantom Squad', q1: 50, q2: 55, q3: 50, q4: null, total: 155, qualified: true },
  { rank: 9, team: 'Iron Cashout', q1: 45, q2: 45, q3: 45, q4: null, total: 135, qualified: false },
  { rank: 10, team: 'Delta Force', q1: 40, q2: 40, q3: 40, q4: null, total: 120, qualified: false },
];

const STATUS_THEME = {
  COMPLETE: {
    dot: 'bg-yellow-400 border-yellow-400 text-zinc-950',
    badge: 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30',
    card: 'bg-zinc-900 border-zinc-800',
    bar: 'from-yellow-400 to-amber-400',
    cta: 'bg-zinc-800 text-zinc-400 cursor-default',
  },
  LIVE: {
    dot: 'bg-red-500 border-red-500 text-white',
    badge: 'bg-red-500/15 text-red-400 border border-red-500/30',
    card: 'bg-zinc-900 border-red-500/30',
    bar: 'from-red-500 to-amber-400',
    cta: 'bg-red-500 text-white hover:bg-red-400',
  },
  OPEN: {
    dot: 'bg-zinc-900 border-zinc-700 text-zinc-400',
    badge: 'bg-zinc-800 text-zinc-500 border border-zinc-700',
    card: 'bg-zinc-950/70 border-zinc-800/70',
    bar: 'from-zinc-700 to-zinc-700',
    cta: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]',
  },
};

const StatusIcon = ({ status }) => {
  if (status === 'COMPLETE') return <Check size={14} strokeWidth={3} />;
  if (status === 'LIVE') return <Radio size={14} />;
  return <Lock size={13} />;
};

const CommandBoardHeader = ({ qualifiers, lineProgress }) => {
  const liveCount = qualifiers.filter((q) => q.status === 'LIVE').length;
  const completedCount = qualifiers.filter((q) => q.status === 'COMPLETE').length;
  const totalPoints = qualifiers.reduce((sum, q) => sum + q.points, 0);

  const chips = [
    { label: 'QUALIFIERS', value: `${qualifiers.length}` },
    { label: 'COMPLETED', value: `${completedCount}` },
    { label: 'LIVE NOW', value: `${liveCount}` },
    { label: 'SEASON POINTS', value: `${totalPoints}` },
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {chips.map((chip) => (
          <div key={chip.label} className="bg-zinc-950 border border-zinc-800 ui-cut p-3">
            <div className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold">{chip.label}</div>
            <div className="text-xl md:text-2xl font-black italic text-yellow-400">{chip.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 h-[3px] bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${lineProgress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-red-500"
        />
      </div>
    </div>
  );
};

const QualifierNodeCard = ({ qualifier, index, activeId, setActiveId, reduceMotion }) => {
  const theme = STATUS_THEME[qualifier.status];
  const isActive = activeId === qualifier.id;
  const isComplete = qualifier.status === 'COMPLETE';
  const isLive = qualifier.status === 'LIVE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      onMouseEnter={() => setActiveId(qualifier.id)}
      onFocus={() => setActiveId(qualifier.id)}
      className="relative"
    >
      <div className="flex justify-center mb-3 md:mb-4">
        <motion.div
          animate={isActive ? { scale: 1.12 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center ${theme.dot}`}
        >
          <StatusIcon status={qualifier.status} />
          {isLive && !reduceMotion && (
            <span className="absolute inset-0 rounded-full border border-red-400/50 animate-ping" />
          )}
        </motion.div>
      </div>

      <motion.article
        layout
        animate={isActive ? { y: -6 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className={`ui-cut border overflow-hidden transition-all duration-300 ${theme.card} ${isActive ? 'border-yellow-400/45 shadow-[0_0_25px_rgba(250,204,21,0.12)]' : ''}`}
      >
        <div className={`h-1 bg-gradient-to-r ${theme.bar}`} />
        <div className="p-4 md:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-3xl font-black italic ${isLive ? 'text-red-400' : 'text-yellow-400'}`}>{qualifier.code}</span>
            <span className={`text-[10px] font-bold px-2 py-1 tracking-widest ui-cut ${theme.badge}`}>{qualifier.status}</span>
          </div>

          <h4 className="text-white font-black italic text-sm mt-2">{qualifier.name}</h4>
          <p className="text-zinc-500 font-mono text-xs flex items-center gap-1 mt-1">
            <Clock size={10} /> {qualifier.date}
          </p>

          <div className="mt-3 bg-zinc-950/80 border border-zinc-800/60 p-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-zinc-600 font-bold tracking-widest text-[10px]">POINTS</p>
              <p className="text-amber-400 font-black italic">{qualifier.points}</p>
            </div>
            <div>
              <p className="text-zinc-600 font-bold tracking-widest text-[10px]">TEAMS</p>
              <p className="text-white font-black italic">{qualifier.teams || 'TBD'}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-zinc-800/70 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-600 font-bold tracking-wider">MODE</span>
              <span className="text-zinc-300 font-bold italic">{qualifier.format}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-600 font-bold tracking-wider">WINNER</span>
              <span className={`${isComplete ? 'text-yellow-400' : 'text-zinc-500'} font-bold italic`}>
                {qualifier.winner || 'PENDING'}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={isComplete ? {} : { scale: 1.015 }}
            whileTap={isComplete ? {} : { scale: 0.985 }}
            disabled={isComplete}
            className={`w-full mt-4 py-2.5 font-black italic text-sm ui-cut transition-all flex items-center justify-center gap-2 ${theme.cta}`}
          >
            {isComplete ? <><Check size={14} /> COMPLETED</> : isLive ? <><Swords size={14} /> {qualifier.cta.toUpperCase()}</> : <><ExternalLink size={14} /> {qualifier.cta.toUpperCase()}</>}
          </motion.button>
        </div>
      </motion.article>
    </motion.div>
  );
};

const AdvanceFunnel = ({ reduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.45 }}
    className="-mt-3 mb-8 flex flex-col items-center"
  >
    <div className="hidden md:block relative w-full max-w-5xl h-24 mb-2">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none">
        <line x1="125" y1="0" x2="125" y2="18" stroke="#facc15" strokeOpacity="0.6" strokeWidth="1.2" />
        <line x1="375" y1="0" x2="375" y2="18" stroke="#facc15" strokeOpacity="0.6" strokeWidth="1.2" />
        <line x1="625" y1="0" x2="625" y2="18" stroke="#ef4444" strokeOpacity="0.65" strokeWidth="1.2" />
        <line x1="875" y1="0" x2="875" y2="18" stroke="#facc15" strokeOpacity="0.6" strokeWidth="1.2" />

        <motion.line x1="125" y1="18" x2="500" y2="102" stroke="url(#leftFunnel)" strokeWidth="1.35" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} animate={reduceMotion ? {} : { strokeDashoffset: [0, -40] }} />
        <motion.line x1="375" y1="18" x2="500" y2="102" stroke="url(#leftFunnel)" strokeWidth="1.35" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }} animate={reduceMotion ? {} : { strokeDashoffset: [0, -40] }} />
        <motion.line x1="625" y1="18" x2="500" y2="102" stroke="url(#rightFunnel)" strokeWidth="1.35" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} animate={reduceMotion ? {} : { strokeDashoffset: [0, -40] }} />
        <motion.line x1="875" y1="18" x2="500" y2="102" stroke="url(#rightFunnel)" strokeWidth="1.35" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} animate={reduceMotion ? {} : { strokeDashoffset: [0, -40] }} />

        <circle cx="125" cy="0" r="2.6" fill="#facc15" fillOpacity="0.75" />
        <circle cx="375" cy="0" r="2.6" fill="#facc15" fillOpacity="0.75" />
        <circle cx="625" cy="0" r="2.6" fill="#ef4444" fillOpacity="0.75" />
        <circle cx="875" cy="0" r="2.6" fill="#facc15" fillOpacity="0.75" />
        <motion.circle
          cx="500"
          cy="102"
          r="3.5"
          fill="#facc15"
          fillOpacity="0.85"
          animate={reduceMotion ? {} : { opacity: [0.35, 0.95, 0.35], r: [3.5, 5, 3.5] }}
          transition={reduceMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="leftFunnel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="rightFunnel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.35" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <motion.div
      animate={reduceMotion ? {} : { y: [0, -2, 0] }}
      transition={reduceMotion ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="bg-zinc-950 border border-yellow-400/35 px-8 py-3 ui-cut shadow-[0_0_30px_rgba(250,204,21,0.1)]"
    >
      <div className="flex items-center gap-3">
        <Target size={16} className="text-yellow-400" />
        <span className="text-sm md:text-base font-black italic tracking-wider text-white">TOP 8 TEAMS ADVANCE TO FINALS</span>
        <Target size={16} className="text-yellow-400" />
      </div>
    </motion.div>

    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="w-px h-12 mt-2 bg-gradient-to-b from-yellow-400/40 to-red-500/40"
    />
  </motion.div>
);

const GrandFinalsPanel = ({ reduceMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.55 }}
    className="max-w-3xl mx-auto"
  >
    <article className="relative bg-zinc-950 border border-amber-400/30 ui-cut p-7 md:p-9 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-red-500/5 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 ui-cut bg-amber-400/10 border border-amber-400/30">
              <Crown size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-amber-400/60 font-mono">STAGE 05</p>
              <h3 className="text-2xl md:text-3xl font-black italic text-white">
                GRAND <span className="gradient-text-fire">FINALS</span>
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-red-400 border border-red-500/30 px-2 py-1 ui-cut">HIGH RISK</span>
        </div>

        <p className="text-zinc-400 font-medium text-sm md:text-base leading-relaxed max-w-2xl mb-6">
          The top eight squads from the qualifier circuit lock in for a final showdown.
          Double elimination pressure, final-round precision, one trophy left standing.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'TEAMS', value: '8', icon: <Shield size={14} /> },
            { label: 'FORMAT', value: 'Bo7', icon: <Target size={14} /> },
            { label: 'PRIZE', value: '$5K', icon: <Star size={14} /> },
          ].map((item) => (
            <div key={item.label} className="bg-zinc-900 border border-zinc-800 p-3 text-center ui-cut-reverse">
              <div className="flex justify-center text-amber-400 mb-1">{item.icon}</div>
              <div className="text-lg md:text-xl font-black italic text-white">{item.value}</div>
              <div className="text-[10px] text-zinc-500 font-bold tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="w-full py-4 ui-cut bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 font-black italic text-base md:text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all"
        >
          <Trophy size={18} /> ENTER FINALS INTEL
        </motion.button>
      </div>
    </article>
  </motion.div>
);

const StandingsDrawer = ({ open, onToggle }) => (
  <SectionReveal delay={0.25}>
    <div className="mt-14 max-w-4xl mx-auto">
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.005 }}
        className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-5 py-4 flex items-center justify-between ui-cut transition-colors"
      >
        <div className="flex items-center gap-3">
          <Star size={16} className="text-yellow-400" />
          <span className="font-black italic tracking-wide text-white">LIVE QUALIFICATION TABLE</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronRight size={18} className="text-zinc-500 rotate-90" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="bg-zinc-950 border border-t-0 border-zinc-800 overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[10px] font-bold tracking-widest text-zinc-600 border-b border-zinc-800 bg-zinc-900/50">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">TEAM</div>
                  <div className="col-span-1 text-center">Q1</div>
                  <div className="col-span-1 text-center">Q2</div>
                  <div className="col-span-1 text-center">Q3</div>
                  <div className="col-span-1 text-center">Q4</div>
                  <div className="col-span-2 text-center">STATUS</div>
                  <div className="col-span-2 text-right">TOTAL</div>
                </div>

                {STANDINGS.map((team, i) => (
                  <motion.div
                    key={team.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.25 }}
                    className={`grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm ${i === 7 ? 'border-b border-red-500/40' : 'border-b border-zinc-800/30'} ${team.qualified ? 'hover:bg-zinc-900/70' : 'opacity-40'}`}
                  >
                    <div className="col-span-1">
                      <span className={`w-6 h-6 flex items-center justify-center text-xs font-black italic ui-cut ${team.rank === 1 ? 'bg-yellow-400 text-zinc-950' : team.rank <= 3 ? 'bg-zinc-700 text-white' : 'text-zinc-500'}`}>
                        {team.rank}
                      </span>
                    </div>
                    <div className="col-span-3 text-xs font-bold italic text-white truncate">{team.team}</div>
                    <div className="col-span-1 text-center text-xs font-mono text-zinc-500">{team.q1}</div>
                    <div className="col-span-1 text-center text-xs font-mono text-zinc-500">{team.q2}</div>
                    <div className="col-span-1 text-center text-xs font-mono text-zinc-500">{team.q3}</div>
                    <div className="col-span-1 text-center text-xs font-mono text-zinc-500">{team.q4 ?? '—'}</div>
                    <div className="col-span-2 text-center">
                      <span className={`text-[10px] tracking-[0.2em] font-bold px-2 py-1 ui-cut ${team.qualified ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20' : 'text-zinc-500 bg-zinc-800 border border-zinc-700'}`}>
                        {team.qualified ? 'IN' : 'OUT'}
                      </span>
                    </div>
                    <div className={`col-span-2 text-right font-black italic ${team.qualified ? 'text-amber-400' : 'text-zinc-600'}`}>{team.total}</div>
                  </motion.div>
                ))}

                <div className="px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-red-400/70 flex items-center gap-2">
                  <div className="h-px flex-1 bg-red-500/20" />
                  ELIMINATION LINE
                  <div className="h-px flex-1 bg-red-500/20" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </SectionReveal>
);

const TournamentFormat = () => {
  const reduceMotion = useReducedMotion();
  const [showStandings, setShowStandings] = useState(false);
  const [activeQualifier, setActiveQualifier] = useState(
    () => QUALIFIERS.find((q) => q.status === 'LIVE')?.id || QUALIFIERS[0].id,
  );
  const lineProgress = useMemo(() => {
    const completedCount = QUALIFIERS.filter((q) => q.status === 'COMPLETE').length;
    const liveBoost = QUALIFIERS.some((q) => q.status === 'LIVE') ? 0.5 : 0;
    return ((completedCount + liveBoost) / QUALIFIERS.length) * 100;
  }, []);

  return (
    <div className="w-full py-28 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[-120px] w-[360px] h-[360px] border border-yellow-400/10 rounded-full" />
        <div className="absolute -top-24 right-[-60px] w-[240px] h-[240px] border border-amber-400/10 rounded-full" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          preText="THE"
          accentText="HEIST PLAN"
          accentColor="text-yellow-400"
          subtitle="Command board view of the full tournament flow from qualifiers to grand finals."
        />

        <CommandBoardHeader qualifiers={QUALIFIERS} lineProgress={lineProgress} />

        <SectionReveal>
          <div className="relative">
            <div className="hidden md:block absolute top-4 left-[12.5%] right-[12.5%] h-[2px] z-0">
              <div className="absolute inset-0 bg-zinc-800 rounded-full" />
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-red-500"
                initial={{ width: '0%' }}
                whileInView={{ width: `${lineProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              {!reduceMotion && (
                <motion.div
                  className="absolute top-[-2px] w-8 h-[6px] rounded-full blur-sm bg-yellow-400/40"
                  animate={{ left: ['0%', `${lineProgress}%`] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-2 md:pt-0 relative z-10">
              {QUALIFIERS.map((qualifier, index) => (
                <QualifierNodeCard
                  key={qualifier.id}
                  qualifier={qualifier}
                  index={index}
                  activeId={activeQualifier}
                  setActiveId={setActiveQualifier}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            <AdvanceFunnel reduceMotion={reduceMotion} />
            <GrandFinalsPanel reduceMotion={reduceMotion} />
          </div>
        </SectionReveal>

        <StandingsDrawer open={showStandings} onToggle={() => setShowStandings((value) => !value)} />
      </div>
    </div>
  );
};

export default TournamentFormat;

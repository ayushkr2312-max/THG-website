import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, ChevronRight, Crown, Target, Star, Lock, Shield, ExternalLink, Check, Clock, Swords } from 'lucide-react';
import { SectionHeading, SectionReveal } from './shared';

const QUALIFIERS = [
  { id: 1, name: 'QUALIFIER 1', code: 'Q1', date: 'MAY 3', status: 'COMPLETE', pts: '400', winner: 'Ospuze Opticals', teams: 24, color: 'cyan' },
  { id: 2, name: 'QUALIFIER 2', code: 'Q2', date: 'MAY 10', status: 'COMPLETE', pts: '400', winner: 'Vaiiya Visors', teams: 28, color: 'cyan' },
  { id: 3, name: 'QUALIFIER 3', code: 'Q3', date: 'MAY 17', status: 'LIVE', pts: '400', winner: null, teams: 22, color: 'violet' },
  { id: 4, name: 'QUALIFIER 4', code: 'Q4', date: 'MAY 24', status: 'OPEN', pts: '400', winner: null, teams: 0, color: 'violet' },
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

// --- Qualifier Card ---
const QualifierCard = ({ q, isHovered, onHover, onLeave }) => {
  const isComplete = q.status === 'COMPLETE';
  const isLive = q.status === 'LIVE';
  const isOpen = q.status === 'OPEN';

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      layout
      className="relative"
    >
      {/* Node dot on the line */}
      <div className="flex justify-center mb-4 relative z-10">
        <motion.div
          animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
            isComplete ? 'bg-yellow-400 border-yellow-400 text-zinc-950'
            : isLive ? 'bg-red-500 border-red-500 text-white'
            : 'bg-zinc-900 border-zinc-700 text-zinc-500'
          }`}
        >
          {isComplete && <Check size={16} strokeWidth={3} />}
          {isLive && <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
          {isOpen && <Lock size={14} />}
          {isLive && <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-20" />}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        animate={isHovered ? { y: -8, scale: 1.03 } : { y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`border ui-cut transition-all duration-300 overflow-hidden ${
          isHovered ? 'bg-zinc-800 border-yellow-400/50 shadow-[0_0_30px_rgba(250,204,21,0.12)] z-20'
          : isComplete ? 'bg-zinc-900 border-zinc-800'
          : isLive ? 'bg-zinc-900 border-red-500/30'
          : 'bg-zinc-950/60 border-zinc-800/50'
        }`}
      >
        {/* Status bar at top */}
        <div className={`h-1 w-full ${
          isComplete ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
          : isLive ? 'bg-red-500'
          : 'bg-zinc-800'
        }`} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-3xl font-black italic ${
              isComplete ? 'text-yellow-400' : isLive ? 'text-red-400' : 'text-zinc-700'
            }`}>{q.code}</span>
            <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 ui-cut ${
              isComplete ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
              : isLive ? 'bg-red-500/15 text-red-400 border border-red-500/30'
              : 'bg-zinc-800 text-zinc-600 border border-zinc-700'
            }`}>
              {q.status}
            </span>
          </div>

          <h4 className="font-black italic text-white text-sm mb-1">{q.name}</h4>
          <div className="text-zinc-600 font-mono text-xs flex items-center gap-1.5">
            <Clock size={10} /> {q.date}
          </div>

          {/* Points available */}
          <div className="mt-3 flex items-center justify-between bg-zinc-950/80 p-2">
            <span className="text-zinc-600 font-bold text-[10px] tracking-widest">POINTS</span>
            <span className="text-amber-400 font-black italic text-sm">{q.pts} PTS</span>
          </div>

          {/* Expanded details on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 pt-3 border-t border-zinc-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600 font-bold">FORMAT</span>
                    <span className="text-white font-bold italic">Cashout 3v3v3v3</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600 font-bold">TEAMS</span>
                    <span className="text-white font-bold italic">{q.teams > 0 ? `${q.teams} REGISTERED` : 'TBD'}</span>
                  </div>
                  {isComplete && q.winner && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-600 font-bold">WINNER</span>
                      <span className="text-yellow-400 font-bold italic">{q.winner}</span>
                    </div>
                  )}

                  {/* Action button */}
                  <motion.button
                    whileHover={!isComplete ? { scale: 1.02 } : {}}
                    whileTap={!isComplete ? { scale: 0.98 } : {}}
                    className={`w-full mt-2 py-2.5 font-black italic text-sm tracking-wider ui-cut flex items-center justify-center gap-2 transition-all ${
                      isComplete
                        ? 'bg-zinc-800 text-zinc-500 cursor-default'
                        : isLive
                        ? 'bg-red-500 text-white hover:bg-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    }`}
                    disabled={isComplete}
                  >
                    {isComplete ? <><Check size={14} /> COMPLETED</> 
                      : isLive ? <><Swords size={14} /> WATCH LIVE</>
                      : <><ExternalLink size={14} /> REGISTER NOW</>}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---
const TournamentFormat = () => {
  const [hoveredQ, setHoveredQ] = useState(null);
  const [showStandings, setShowStandings] = useState(false);

  // Calculate line progress based on completed qualifiers
  const completedCount = QUALIFIERS.filter(q => q.status === 'COMPLETE').length;
  const lineProgress = ((completedCount + (QUALIFIERS.some(q => q.status === 'LIVE') ? 0.5 : 0)) / QUALIFIERS.length) * 100;

  return (
    <div className="w-full py-28 bg-zinc-900 relative overflow-hidden">
      {/* Background sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-yellow-400/3 to-transparent skew-x-[-15deg]"
          animate={{ x: ['-200%', '400%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading preText="THE" accentText="HEIST PLAN" accentColor="text-yellow-400"
          subtitle="Four qualifiers. One grand final. Only the top 8 make the cut." />

        <SectionReveal>
          <div className="relative">
            {/* ===== PIPELINE TRACK (DESKTOP) ===== */}
            <div className="hidden md:block absolute top-[58px] left-[12.5%] right-[12.5%] h-[3px] z-0">
              {/* Track background */}
              <div className="absolute inset-0 bg-zinc-800 rounded-full" />
              {/* Animated progress fill */}
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: `${lineProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              {/* Animated pulse traveling along the line */}
              <motion.div
                className="absolute top-[-2px] w-8 h-[7px] bg-yellow-400/40 rounded-full blur-sm"
                animate={{ left: ['0%', `${lineProgress}%`] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              />
            </div>

            {/* ===== QUALIFIER CARDS ===== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {QUALIFIERS.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                >
                  <QualifierCard
                    q={q}
                    isHovered={hoveredQ === q.id}
                    onHover={() => setHoveredQ(q.id)}
                    onLeave={() => setHoveredQ(null)}
                  />
                </motion.div>
              ))}
            </div>

            {/* ===== FUNNEL — TOP 8 ADVANCE ===== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-14 flex flex-col items-center"
            >
              {/* Converging dotted lines */}
              <div className="relative w-full max-w-xl h-16 mb-2">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 60" preserveAspectRatio="none">
                  <motion.line x1="60" y1="0" x2="250" y2="55" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.3 }} />
                  <motion.line x1="190" y1="0" x2="250" y2="55" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.4 }} />
                  <motion.line x1="310" y1="0" x2="250" y2="55" stroke="url(#grad2)" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.5 }} />
                  <motion.line x1="440" y1="0" x2="250" y2="55" stroke="url(#grad2)" strokeWidth="1" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.6 }} />
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Badge */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-zinc-950 border-2 border-yellow-400/30 px-10 py-3 flex items-center gap-4 shadow-[0_0_25px_rgba(250,204,21,0.08)] hover:border-yellow-400/50 hover:shadow-[0_0_35px_rgba(250,204,21,0.15)] transition-all cursor-default"
              >
                <Target size={18} className="text-yellow-400" />
                <span className="font-black italic text-white tracking-wider text-sm md:text-base">TOP 8 TEAMS ADVANCE</span>
                <Target size={18} className="text-yellow-400" />
              </motion.div>

              {/* Vertical connector to Grand Finals */}
              <motion.div
                className="w-px h-14 mt-2"
                style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(245,158,11,0.4))' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.8 }}
              />
            </motion.div>

            {/* ===== GRAND FINALS CARD ===== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative bg-zinc-950 border border-amber-400/25 p-8 md:p-10 ui-cut overflow-hidden group hover:border-amber-400/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-red-500/5 pointer-events-none" />
                {/* Sweep */}
                <motion.div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent skew-x-[-15deg] pointer-events-none"
                  animate={{ x: ['-200%', '400%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-400/10 border border-amber-400/20 ui-cut">
                      <Crown size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <div className="text-amber-400/50 font-mono text-[10px] tracking-[0.3em]">THE FINALE</div>
                      <h3 className="text-2xl md:text-3xl font-black italic text-white tracking-tight">
                        THE HEIST GAMES — <span className="gradient-text-fire">GRAND FINALS</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-zinc-400 font-medium leading-relaxed mb-6 max-w-lg text-sm">
                    The 8 highest-ranked teams from all four qualifiers collide in one explosive final bracket.
                    One winner takes it all.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'TEAMS', value: '8', icon: <Shield size={14} /> },
                      { label: 'FORMAT', value: 'Bo7', icon: <Target size={14} /> },
                      { label: 'PRIZE', value: '$5K', icon: <Star size={14} /> },
                    ].map((s, i) => (
                      <div key={i} className="bg-zinc-900 border border-zinc-800 p-3 text-center group/stat hover:border-amber-400/20 transition-colors">
                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">{s.icon}</div>
                        <div className="text-xl font-black italic text-white">{s.value}</div>
                        <div className="text-[10px] font-bold tracking-widest text-zinc-600">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-black italic text-lg ui-cut hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <Trophy size={18} /> LEARN MORE
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionReveal>

        {/* ===== STANDINGS TABLE ===== */}
        <SectionReveal delay={0.3}>
          <div className="mt-16 max-w-3xl mx-auto">
            <motion.button
              onClick={() => setShowStandings(!showStandings)}
              whileHover={{ scale: 1.005 }}
              className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-6 py-4 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Star size={16} className="text-amber-400" />
                <span className="font-black italic text-white tracking-wide">QUALIFICATION STANDINGS</span>
                <span className="text-zinc-600 font-mono text-xs hidden sm:inline">— LIVE POINTS</span>
              </div>
              <motion.div animate={{ rotate: showStandings ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronRight size={18} className="text-zinc-500 rotate-90" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showStandings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="bg-zinc-950 border border-t-0 border-zinc-800 overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[10px] font-bold tracking-widest text-zinc-600 border-b border-zinc-800 bg-zinc-900/50">
                      <div className="col-span-1">#</div>
                      <div className="col-span-3">TEAM</div>
                      <div className="col-span-2 text-center">Q1</div>
                      <div className="col-span-2 text-center">Q2</div>
                      <div className="col-span-2 text-center">Q3</div>
                      <div className="col-span-2 text-right">TOTAL</div>
                    </div>

                    {STANDINGS.map((team, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className={`grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm transition-colors
                          ${team.qualified ? 'hover:bg-zinc-900/80' : 'opacity-35'}
                          ${i === 7 ? 'border-b-2 border-dashed border-red-500/40' : 'border-b border-zinc-800/20'}`}
                      >
                        <div className="col-span-1">
                          <span className={`font-black italic text-xs w-6 h-6 flex items-center justify-center ui-cut ${
                            team.rank === 1 ? 'bg-yellow-400 text-zinc-950'
                            : team.rank <= 3 ? 'bg-zinc-700 text-white'
                            : team.qualified ? 'text-zinc-500' : 'text-zinc-700'
                          }`}>
                            {team.rank}
                          </span>
                        </div>
                        <div className={`col-span-3 font-bold italic text-xs truncate ${team.qualified ? 'text-white' : 'text-zinc-600'}`}>
                          {team.team}
                        </div>
                        <div className="col-span-2 text-center font-mono text-xs text-zinc-500">{team.q1}</div>
                        <div className="col-span-2 text-center font-mono text-xs text-zinc-500">{team.q2}</div>
                        <div className="col-span-2 text-center font-mono text-xs text-zinc-500">{team.q3 || '—'}</div>
                        <div className={`col-span-2 text-right font-black italic text-sm ${team.qualified ? 'text-amber-400' : 'text-zinc-700'}`}>
                          {team.total}
                        </div>
                      </motion.div>
                    ))}

                    {/* Cutoff label */}
                    <div className="px-4 py-2 flex items-center gap-2 text-red-400/50 text-[10px] font-bold tracking-widest">
                      <div className="flex-1 h-px bg-red-500/15" />
                      ELIMINATION LINE
                      <div className="flex-1 h-px bg-red-500/15" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
};

export default TournamentFormat;

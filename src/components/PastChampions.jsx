import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Users, CircleDollarSign, Calendar, ChevronRight, Medal, Swords, Star } from 'lucide-react';
import { SectionHeading, SectionReveal, StaggerContainer, StaggerItem, TiltCard } from './shared';

const SEASONS = [
  {
    id: 1,
    season: 'SEASON 1',
    title: 'THE FIRST HEIST',
    date: 'JAN — FEB 2025',
    champion: 'Ospuze Opticals',
    runnerUp: 'Holtow Heroes',
    mvp: 'VOIDWALKER',
    prize: '$5,000',
    teams: 16,
    matches: 48,
    highlight: 'The inaugural season that started it all. Ospuze dominated from qualifier to finals.',
    color: 'from-yellow-400 to-yellow-500',
  },
  {
    id: 2,
    season: 'SEASON 2',
    title: 'DOUBLE DOWN',
    date: 'MAR — APR 2025',
    champion: 'Vaiiya Visors',
    runnerUp: 'Ospuze Opticals',
    mvp: 'PHANTOM_9',
    prize: '$7,500',
    teams: 24,
    matches: 72,
    highlight: 'Vaiiya dethroned the reigning champs in a legendary 7-game Grand Final.',
    color: 'from-amber-500 to-violet-600',
  },
  {
    id: 3,
    season: 'SEASON 3',
    title: 'THE GRAND VAULT',
    date: 'MAY 2025',
    champion: '???',
    runnerUp: null,
    mvp: null,
    prize: '$10,000',
    teams: 32,
    matches: null,
    highlight: 'The biggest season yet. 32 teams. $10K on the line. Who will crack the vault?',
    color: 'from-amber-400 to-amber-500',
    current: true,
  },
];

const SeasonCard = ({ season, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrent = season.current;

  return (
    <StaggerItem>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={isHovered ? { y: -10 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="h-full"
      >
        <TiltCard className="h-full">
          <div className={`relative bg-zinc-900 border overflow-hidden h-full flex flex-col transition-all duration-500 ${
            isCurrent ? 'border-amber-400/30 hover:border-amber-400/60' : 'border-zinc-800 hover:border-yellow-400/40'
          }`}>
            {/* Top gradient bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${season.color}`} />

            {/* Current season badge */}
            {isCurrent && (
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-amber-400/15 border border-amber-400/30 px-3 py-1 text-amber-400 font-black italic text-[10px] tracking-widest flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                  IN PROGRESS
                </motion.div>
              </div>
            )}

            <div className="p-6 flex-grow flex flex-col">
              {/* Season label */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 ui-cut bg-gradient-to-br ${season.color} text-zinc-950`}>
                  {isCurrent ? <Star size={18} /> : <Trophy size={18} />}
                </div>
                <div>
                  <div className={`font-black italic text-sm tracking-wider bg-gradient-to-r ${season.color} bg-clip-text text-transparent`}>
                    {season.season}
                  </div>
                  <div className="text-zinc-600 font-mono text-[10px] tracking-wider flex items-center gap-1">
                    <Calendar size={9} /> {season.date}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black italic text-white mb-3 tracking-tight">
                {season.title}
              </h3>

              {/* Champion */}
              <div className={`border p-4 mb-4 ui-cut ${
                isCurrent ? 'bg-amber-400/5 border-amber-400/15' : 'bg-yellow-400/5 border-yellow-400/15'
              }`}>
                <div className="text-zinc-600 font-bold text-[10px] tracking-[0.2em] mb-1 flex items-center gap-1.5">
                  <Crown size={10} className={isCurrent ? 'text-amber-400' : 'text-yellow-400'} />
                  {isCurrent ? 'CHAMPION' : 'CHAMPION'}
                </div>
                <div className={`text-xl font-black italic ${
                  isCurrent ? 'text-amber-400' : 'text-yellow-400'
                }`}>
                  {season.champion}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-zinc-950 p-2 text-center">
                  <div className="text-white font-black italic text-lg">{season.teams}</div>
                  <div className="text-zinc-600 font-bold text-[9px] tracking-widest">TEAMS</div>
                </div>
                <div className="bg-zinc-950 p-2 text-center">
                  <div className="text-white font-black italic text-lg">{season.matches || '—'}</div>
                  <div className="text-zinc-600 font-bold text-[9px] tracking-widest">MATCHES</div>
                </div>
                <div className="bg-zinc-950 p-2 text-center">
                  <div className="text-amber-400 font-black italic text-lg">{season.prize}</div>
                  <div className="text-zinc-600 font-bold text-[9px] tracking-widest">PRIZE</div>
                </div>
              </div>

              {/* Expanded details on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pb-2 border-t border-zinc-800 pt-3">
                      {season.runnerUp && (
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600 font-bold flex items-center gap-1"><Medal size={11} /> RUNNER-UP</span>
                          <span className="text-zinc-300 font-bold italic">{season.runnerUp}</span>
                        </div>
                      )}
                      {season.mvp && (
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600 font-bold flex items-center gap-1"><Swords size={11} /> SEASON MVP</span>
                          <span className="text-amber-400 font-bold italic">{season.mvp}</span>
                        </div>
                      )}
                      <p className="text-zinc-500 text-xs font-medium leading-relaxed mt-2 italic">
                        "{season.highlight}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Spacer to push button down */}
              <div className="flex-grow" />

              {/* Action button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-4 py-3 font-black italic text-sm tracking-wider ui-cut flex items-center justify-center gap-2 transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {isCurrent ? (
                  <><ChevronRight size={14} /> VIEW SEASON</>
                ) : (
                  <><Trophy size={14} /> SEASON RECAP</>
                )}
              </motion.button>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </StaggerItem>
  );
};

const PastChampions = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-28 relative z-10 w-full">
      <SectionHeading
        preText="PAST"
        accentText="HEISTS"
        accentColor="text-yellow-400"
        subtitle="Every season writes its own legend. See who cracked the vault."
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
        {SEASONS.map((season, i) => (
          <SeasonCard key={season.id} season={season} index={i} />
        ))}
      </StaggerContainer>

      {/* Bottom stat line */}
      <SectionReveal delay={0.5}>
        <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
          {[
            { value: '3', label: 'SEASONS', color: 'text-yellow-400' },
            { value: '72+', label: 'TEAMS TOTAL', color: 'text-amber-400' },
            { value: '$22.5K', label: 'TOTAL PRIZES', color: 'text-amber-400' },
            { value: '120+', label: 'MATCHES PLAYED', color: 'text-red-400' },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <div className={`text-3xl font-black italic ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.value}
              </div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
};

export default PastChampions;

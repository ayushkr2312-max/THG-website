import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Target, Skull, Flame, Award } from 'lucide-react';
import { SectionHeading, TiltCard, StaggerContainer, StaggerItem } from './shared';

const WANTED_PLAYERS = [
  { alias: 'VOIDWALKER', team: 'Ospuze Opticals', role: 'HEAVY', kills: 847, cashouts: '$124,500', winRate: '82%', bounty: '$2,500', threat: 'EXTREME' },
  { alias: 'PHANTOM_9', team: 'Vaiiya Visors', role: 'MEDIUM', kills: 723, cashouts: '$98,200', winRate: '76%', bounty: '$1,800', threat: 'HIGH' },
  { alias: 'BREACHER', team: 'CNS Syndicate', role: 'LIGHT', kills: 691, cashouts: '$87,400', winRate: '71%', bounty: '$1,200', threat: 'HIGH' },
];

const WantedBoard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-28 relative z-10 w-full">
      <SectionHeading preText="MOST" accentText="WANTED" accentColor="text-red-500" subtitle="The arena's deadliest operators. Study them. Fear them." />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
        {WANTED_PLAYERS.map((player, i) => (
          <StaggerItem key={i}>
            <TiltCard>
              <div className="relative bg-zinc-900 border border-zinc-800 overflow-hidden group hover:border-red-500/50 transition-all duration-500">
                <div className="bg-red-500/10 border-b border-red-500/20 p-3 flex justify-between items-center">
                  <span className="flex items-center gap-2 text-red-400 font-black italic text-sm tracking-widest">
                    <Crosshair size={14} /> WANTED
                  </span>
                  <span className={`text-xs font-bold tracking-widest px-2 py-0.5 ui-cut ${
                    player.threat === 'EXTREME' ? 'bg-red-500 text-white' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}>
                    {player.threat}
                  </span>
                </div>

                <div className="p-6">
                  <div className="w-full aspect-square bg-zinc-950 border border-zinc-800 mb-6 flex items-center justify-center relative overflow-hidden ui-cut">
                    <Skull size={64} className="text-zinc-800 group-hover:text-red-500/30 transition-colors duration-500" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
                      initial={{ y: '-100%' }}
                      whileInView={{ y: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: i * 0.3 }}
                    />
                    <div className="absolute bottom-3 left-3 bg-zinc-950/80 px-2 py-1 text-xs font-bold tracking-widest text-zinc-500">
                      {player.role}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black italic text-white mb-1 group-hover:text-red-400 transition-colors">
                    {player.alias}
                  </h3>
                  <p className="text-zinc-500 font-bold text-sm tracking-widest mb-6">{player.team}</p>

                  <div className="space-y-2">
                    {[
                      { icon: <Target size={14} />, label: 'ELIMINATIONS', value: player.kills.toLocaleString() },
                      { icon: <Flame size={14} />, label: 'CASHOUTS', value: player.cashouts },
                      { icon: <Award size={14} />, label: 'WIN RATE', value: player.winRate },
                    ].map((stat, j) => (
                      <div key={j} className="flex items-center justify-between bg-zinc-950 p-2 text-sm">
                        <span className="flex items-center gap-2 text-zinc-600 font-bold tracking-wider">{stat.icon} {stat.label}</span>
                        <span className="font-black italic text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-800 p-4 flex justify-between items-center bg-zinc-950/50">
                  <span className="text-zinc-600 font-bold text-xs tracking-widest">BOUNTY VALUE</span>
                  <span className="text-amber-400 font-black italic text-xl">{player.bounty}</span>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default WantedBoard;

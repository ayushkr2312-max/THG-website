import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crosshair, Hexagon, ChevronRight, Video } from 'lucide-react';
import { SectionHeading, SectionReveal, StaggerContainer, StaggerItem, TiltCard } from './shared';

const Protocol = () => {
  const steps = [
    { icon: <Users size={40} className="text-yellow-400" />, step: '01', title: 'FORM YOUR SQUAD', desc: "Register your trio in the upcoming 'Active Contracts'. Ensure your loadouts are locked and roles are defined." },
    { icon: <Crosshair size={40} className="text-yellow-400" />, step: '02', title: 'SURVIVE KNOCKOUTS', desc: 'Battle through ruthless multi-team brackets. Only the top squads with the highest cashouts advance.' },
    { icon: <Hexagon size={40} className="text-yellow-400" />, step: '03', title: 'THE GRAND VAULT', desc: 'Reach the broadcasted final round. Defeat the remaining contenders, secure the vault, and claim the prize money.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-28 relative z-10 w-full">
      <SectionHeading preText="THE" accentText="PROTOCOL" accentColor="text-amber-400" subtitle="Master the format. Climb the ranks. Take the vault." />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
        {steps.map((item, i) => (
          <StaggerItem key={i}>
            <TiltCard>
              <div className="bg-zinc-900 border border-zinc-800 p-8 ui-cut hover:border-yellow-400/40 transition-all duration-500 h-full group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ width: '50%', left: '-25%' }}
                  animate={{ x: ['-100%', '400%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                />
                <div className="flex justify-between items-start mb-6 relative">
                  <div className="p-3 bg-zinc-950 ui-cut group-hover:shadow-[0_0_15px_rgba(250,204,21,0.15)] transition-shadow">{item.icon}</div>
                  <span className="text-4xl font-black italic text-zinc-800 group-hover:text-zinc-700 transition-colors">{item.step}</span>
                </div>
                <h3 className="text-2xl font-black italic text-white mb-3 group-hover:text-yellow-400 transition-colors relative">{item.title}</h3>
                <p className="text-zinc-400 font-medium leading-relaxed relative">{item.desc}</p>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="hidden md:flex justify-center items-center mt-8 gap-4 text-zinc-700">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        <span className="font-black italic text-sm tracking-widest text-zinc-600">REPEAT UNTIL CHAMPION</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      </div>
    </div>
  );
};

const LatestIntel = () => {
  const videos = [
    { title: 'GRAND FINALS: Ospuze vs Vaiiya', type: 'FULL MATCH', duration: '45:20' },
    { title: 'Top 10 Cashout Steals - Season 2', type: 'HIGHLIGHTS', duration: '08:15' },
    { title: 'How CNS Syndicate Broke the Meta', type: 'ANALYSIS', duration: '12:30' },
  ];

  return (
    <div className="w-full bg-zinc-900 border-y border-zinc-800 py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-6 gap-4">
          <SectionHeading preText="LATEST" accentText="INTEL" subtitle="Catch up on the most explosive moments from the arena." />
          <motion.button whileHover={{ x: 5 }} className="flex items-center gap-2 font-bold italic text-yellow-400 hover:text-white transition-colors tracking-widest text-sm">
            VIEW ALL BROADCASTS <ChevronRight size={16} />
          </motion.button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
          {videos.map((video, i) => (
            <StaggerItem key={i}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="cursor-pointer group">
                <div className="relative w-full aspect-video bg-zinc-800 ui-cut mb-4 flex items-center justify-center border border-zinc-700 group-hover:border-yellow-400 transition-colors overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10" />
                  <motion.div whileHover={{ scale: 1.2 }} className="relative z-20">
                    <Video size={48} className="text-zinc-600 group-hover:text-yellow-400 transition-colors duration-300" />
                  </motion.div>
                  <div className="absolute bottom-3 right-3 bg-zinc-950 text-white font-bold text-xs px-2 py-1 ui-cut z-20 font-mono">{video.duration}</div>
                  <div className={`absolute top-3 left-3 text-white font-black italic text-xs px-2 py-1 tracking-wider ui-cut z-20 ${
                    video.type === 'FULL MATCH' ? 'bg-red-500' : video.type === 'HIGHLIGHTS' ? 'bg-amber-500 text-zinc-950' : 'bg-violet-600'
                  }`}>
                    {video.type}
                  </div>
                  <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300 z-5" />
                </div>
                <h3 className="text-xl font-black italic text-white group-hover:text-yellow-400 transition-colors leading-tight">{video.title}</h3>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};

export { Protocol, LatestIntel };

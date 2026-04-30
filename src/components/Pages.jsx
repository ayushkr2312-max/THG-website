import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Users, CircleDollarSign, PlayCircle, Calendar, Trophy, Target, Swords, ShieldAlert, Crown, Clock } from 'lucide-react';
import { SectionHeading, StaggerContainer, StaggerItem, TiltCard } from './shared';

const TOURNAMENTS = [
  { id: 1, title: "THE GRAND VAULT", status: "LIVE", prize: "$10,000", date: "NOW", mode: "Cashout 3v3v3v3", teams: 16 },
  { id: 2, title: "QUICK CASH CLASH", status: "UPCOMING", prize: "$2,500", date: "MAY 15", mode: "Quick Cash 3v3v3", teams: 32 },
  { id: 3, title: "BANK IT BRAWL", status: "REGISTRATION", prize: "$5,000", date: "MAY 22", mode: "Bank It 3v3v3v3", teams: 12 },
];

const LEADERBOARD = [
  { rank: 1, team: "Ospuze Opticals", points: 14500, winRate: "78%" },
  { rank: 2, team: "Vaiiya Visors", points: 13200, winRate: "71%" },
  { rank: 3, team: "Iseul-T Inc", points: 12800, winRate: "65%" },
  { rank: 4, team: "Holtow Heroes", points: 11500, winRate: "60%" },
  { rank: 5, team: "CNS Syndicate", points: 10900, winRate: "55%" },
];

const Tournaments = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeading preText="ACTIVE" accentText="CONTRACTS" subtitle="Select your next heist. High risk, high reward." />

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
        {TOURNAMENTS.map((tourney) => (
          <StaggerItem key={tourney.id}>
            <TiltCard>
              <div className="relative bg-zinc-900 border border-zinc-800 hover:border-yellow-400/40 transition-colors ui-cut flex flex-col h-full">
                <div className={`p-4 border-b border-zinc-800 flex justify-between items-center
                  ${tourney.status === 'LIVE' ? 'bg-red-500/10' : ''}
                  ${tourney.status === 'REGISTRATION' ? 'bg-yellow-400/10' : ''}
                `}>
                  <span className={`font-black italic tracking-widest text-sm flex items-center gap-2
                    ${tourney.status === 'LIVE' ? 'text-red-500' : ''}
                    ${tourney.status === 'REGISTRATION' ? 'text-yellow-400' : 'text-zinc-500'}
                  `}>
                    {tourney.status === 'LIVE' && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                    {tourney.status}
                  </span>
                  <span className="text-zinc-400 font-bold flex items-center gap-1 text-sm"><Calendar size={14}/> {tourney.date}</span>
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-black italic mb-4 text-white hover:text-yellow-400 transition-colors">{tourney.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-zinc-300 bg-zinc-950 p-2 ui-cut-reverse">
                      <span className="flex items-center gap-2 text-sm font-bold text-zinc-500"><Gamepad2 size={16}/> MODE</span>
                      <span className="font-bold italic">{tourney.mode}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300 bg-zinc-950 p-2 ui-cut-reverse">
                      <span className="flex items-center gap-2 text-sm font-bold text-zinc-500"><Users size={16}/> CAPACITY</span>
                      <span className="font-bold italic">{tourney.teams} TEAMS</span>
                    </div>
                    <div className="flex items-center justify-between text-amber-400 bg-zinc-950 p-2 ui-cut-reverse border border-amber-400/20">
                      <span className="flex items-center gap-2 text-sm font-bold"><CircleDollarSign size={16}/> PRIZE POOL</span>
                      <span className="font-black italic text-lg">{tourney.prize}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 font-black italic tracking-wider ui-cut transition-all flex items-center justify-center gap-2
                    ${tourney.status === 'REGISTRATION' 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
                      : tourney.status === 'LIVE'
                      ? 'bg-red-500 text-white hover:bg-red-400'
                      : 'bg-zinc-800 text-zinc-400 cursor-not-allowed'}
                  `}>
                    {tourney.status === 'LIVE' ? <><PlayCircle size={18}/> WATCH STREAM</> : 'SECURE SLOT'}
                  </motion.button>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white uppercase inline-block">
          HALL OF FAME
        </h2>
        <p className="text-zinc-400 font-medium mt-4 text-lg">Global standings based on accumulated cashout points.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="bg-zinc-900 border border-zinc-800 ui-cut overflow-hidden"
      >
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50 text-zinc-500 font-bold text-sm tracking-widest">
          <div className="col-span-2 text-center">RANK</div>
          <div className="col-span-6">TEAM NAME</div>
          <div className="col-span-2 text-right">POINTS</div>
          <div className="col-span-2 text-right">WIN %</div>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {LEADERBOARD.map((row, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(39, 39, 42, 0.5)' }}
              className="grid grid-cols-12 gap-4 p-4 items-center transition-colors"
            >
              <div className="col-span-2 flex justify-center">
                <span className={`text-2xl font-black italic flex items-center justify-center w-10 h-10 ui-cut
                  ${row.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-zinc-950' : 
                    row.rank === 2 ? 'bg-zinc-300 text-zinc-950' : 
                    row.rank === 3 ? 'bg-amber-600 text-white' : 'text-zinc-500'}
                `}>
                  {row.rank}
                </span>
              </div>
              <div className="col-span-6 font-bold text-xl italic text-white hover:text-yellow-400 transition-colors cursor-default">{row.team}</div>
              <div className="col-span-2 text-right font-black text-yellow-400 countdown-digit">{row.points.toLocaleString()}</div>
              <div className="col-span-2 text-right font-bold text-zinc-400">{row.winRate}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SCHEDULE_EVENTS = [
  { id: 1, title: "QUALIFIER 1", status: "COMPLETED", date: "APRIL 10 - APRIL 12", format: "Bo1 Ranked Cashout", teams: "All Registered" },
  { id: 2, title: "QUALIFIER 2", status: "COMPLETED", date: "APRIL 17 - APRIL 19", format: "Bo1 Ranked Cashout", teams: "All Registered" },
  { id: 3, title: "QUALIFIER 3", status: "LIVE", date: "APRIL 24 - APRIL 26", format: "Bo1 Ranked Cashout", teams: "All Registered" },
  { id: 4, title: "QUALIFIER 4", status: "UPCOMING", date: "MAY 01 - MAY 03", format: "Bo1 Ranked Cashout", teams: "All Registered" },
  { id: 5, title: "GRAND FINALS", status: "UPCOMING", date: "MAY 15 - MAY 17", format: "Double Elimination", teams: "Top 8 Qualifiers" },
];

const Schedule = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-white uppercase inline-block">
          SEASON SCHEDULE
        </h2>
        <p className="text-zinc-400 font-medium mt-4 text-lg max-w-2xl mx-auto">The definitive timeline for the current circuit. Study the format, track the dates, and prepare for the finals.</p>
      </div>

      {/* Format Overview */}
      <div className="mb-20">
        <SectionHeading preText="TOURNAMENT" accentText="FORMAT" subtitle="Rules of engagement for the current season." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Qualifiers Rules */}
          <TiltCard>
            <div className="bg-zinc-900 border border-zinc-800 p-8 h-full ui-cut relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={120} className="text-yellow-400" />
              </div>
              <h3 className="text-3xl font-black italic text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-zinc-800 text-yellow-400 flex items-center justify-center ui-cut text-sm">01</span>
                QUALIFIERS
              </h3>
              <ul className="space-y-4 text-zinc-300 font-medium relative z-10">
                <li className="flex items-start gap-3 bg-zinc-950/50 p-3 ui-cut-reverse border border-zinc-800/50">
                  <Swords className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span><strong className="text-white">4 Qualifiers</strong> total. All matches are <strong className="text-white">Best of 1 (Bo1)</strong>.</span>
                </li>
                <li className="flex items-start gap-3 bg-zinc-950/50 p-3 ui-cut-reverse border border-zinc-800/50">
                  <Gamepad2 className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>Played in the <strong className="text-white">Ranked Cashout</strong> gamemode.</span>
                </li>
                <li className="flex items-start gap-3 bg-zinc-950/50 p-3 ui-cut-reverse border border-zinc-800/50">
                  <Clock className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>Each team plays <strong className="text-white">4 matches</strong> across <strong className="text-white">11 rounds</strong>.</span>
                </li>
                <li className="flex items-start gap-3 bg-zinc-950/50 p-3 ui-cut-reverse border border-zinc-800/50">
                  <Trophy className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>Points earned through placement. <strong className="text-white text-lg italic">Top 8 teams</strong> qualify to Grand Finals.</span>
                </li>
              </ul>
            </div>
          </TiltCard>

          {/* Grand Finals Rules */}
          <TiltCard>
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-yellow-400/30 p-8 h-full ui-cut relative overflow-hidden group shadow-[0_0_30px_rgba(250,204,21,0.05)] hover:shadow-[0_0_40px_rgba(250,204,21,0.1)] transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown size={120} className="text-yellow-400" />
              </div>
              <h3 className="text-3xl font-black italic text-yellow-400 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-yellow-400 text-zinc-950 flex items-center justify-center ui-cut text-sm">02</span>
                GRAND FINALS
              </h3>
              <ul className="space-y-4 text-zinc-300 font-medium relative z-10">
                <li className="flex items-start gap-3 bg-zinc-950/80 p-3 ui-cut-reverse border border-yellow-400/20">
                  <ShieldAlert className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>Massive <strong className="text-white">Double Elimination Bracket</strong> for the top 8 teams.</span>
                </li>
                <li className="flex items-start gap-3 bg-zinc-950/80 p-3 ui-cut-reverse border border-yellow-400/20">
                  <Gamepad2 className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>All matches played in the <strong className="text-white">Final Round</strong> gamemode.</span>
                </li>
                <li className="flex items-start gap-3 bg-zinc-950/80 p-3 ui-cut-reverse border border-yellow-400/20">
                  <Swords className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>Matches are <strong className="text-white">Best of 1 (Bo1)</strong> leading up to the end.</span>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-yellow-400/20 to-transparent p-3 ui-cut-reverse border border-yellow-400/50">
                  <Crown className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                  <span>The ultimate Grand Final match is <strong className="text-white text-lg italic">Best of 3 (Bo3)</strong>.</span>
                </li>
              </ul>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Events Timeline */}
      <SectionHeading preText="SEASON" accentText="TIMELINE" subtitle="Mark your calendars. The heist waits for no one." />
      <StaggerContainer className="space-y-6">
        {SCHEDULE_EVENTS.map((event) => (
          <StaggerItem key={event.id}>
            <div className={`relative border ui-cut transition-all hover:bg-zinc-800/50
              ${event.title === 'GRAND FINALS' ? 'bg-zinc-900/80 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.1)]' : 'bg-zinc-900 border-zinc-800'}
            `}>
              {/* Status Indicator Bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1
                ${event.status === 'LIVE' ? 'bg-red-500' : ''}
                ${event.status === 'UPCOMING' ? 'bg-yellow-400' : ''}
                ${event.status === 'COMPLETED' ? 'bg-zinc-600' : ''}
              `} />
              
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 ml-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-black italic px-2 py-1 ui-cut tracking-widest
                      ${event.status === 'LIVE' ? 'bg-red-500 text-white animate-pulse' : ''}
                      ${event.status === 'UPCOMING' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/20' : ''}
                      ${event.status === 'COMPLETED' ? 'bg-zinc-800 text-zinc-500' : ''}
                    `}>
                      {event.status}
                    </span>
                    <span className="text-zinc-400 font-bold text-sm flex items-center gap-1.5">
                      <Calendar size={14} /> {event.date}
                    </span>
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-black italic 
                    ${event.title === 'GRAND FINALS' ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500' : 'text-white'}
                  `}>
                    {event.title}
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-8 flex-1 md:justify-end">
                  <div className="bg-zinc-950 p-3 ui-cut-reverse border border-zinc-800/50 flex flex-col justify-center min-w-[160px]">
                    <span className="text-zinc-500 text-xs font-bold mb-1 flex items-center gap-1"><Swords size={12}/> FORMAT</span>
                    <span className="text-zinc-200 font-bold italic">{event.format}</span>
                  </div>
                  <div className="bg-zinc-950 p-3 ui-cut-reverse border border-zinc-800/50 flex flex-col justify-center min-w-[160px]">
                    <span className="text-zinc-500 text-xs font-bold mb-1 flex items-center gap-1"><Users size={12}/> ELIGIBILITY</span>
                    <span className="text-zinc-200 font-bold italic">{event.teams}</span>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

export { Tournaments, Leaderboard, Schedule };

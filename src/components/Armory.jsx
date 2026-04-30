import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Award, Coins, AlertTriangle, BookOpen } from 'lucide-react';
import { SectionHeading, SectionReveal } from './shared';

const RULES = [
  { icon: <Shield size={20} />, title: 'ENTRY REQUIREMENTS', content: 'Teams must consist of exactly 3 players. All players must have a valid THE FINALS account at Level 20 or above. Each team must designate a Team Captain for all communications. Teams must register at least 48 hours before tournament start.', classified: 'CLEARANCE: LEVEL 1' },
  { icon: <BookOpen size={20} />, title: 'MATCH FORMAT', content: 'All matches are played in Cashout mode (3v3v3v3). Group stage is Best-of-3 with 4-team lobbies. Bracket stage is single elimination, Best-of-5. Grand Finals are Best-of-7 with a one-map advantage for upper bracket finalists.', classified: 'CLEARANCE: LEVEL 2' },
  { icon: <Award size={20} />, title: 'SCORING SYSTEM', content: 'Points are awarded based on cashout placement: 1st (100pts), 2nd (70pts), 3rd (40pts), 4th (20pts). Bonus points for total cash earned. Kill bonuses at 2pts per elimination. Season standings aggregate across all registered events.', classified: 'CLEARANCE: LEVEL 2' },
  { icon: <Coins size={20} />, title: 'PRIZE DISTRIBUTION', content: '1st Place: 50% of prize pool. 2nd Place: 25% of prize pool. 3rd-4th Place: 10% each. 5th-8th Place: 1.25% each. Payouts processed within 72 hours via PayPal or bank transfer. All prizes are pre-tax amounts.', classified: 'CLEARANCE: LEVEL 3' },
  { icon: <AlertTriangle size={20} />, title: 'CODE OF CONDUCT', content: 'Zero tolerance for cheating, exploiting, or harassment. All players must use anti-cheat software approved by tournament admins. Stream sniping results in immediate disqualification. Unsportsmanlike conduct is penalized with point deductions or bans at admin discretion.', classified: 'CLASSIFIED' },
];

const Armory = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-28 relative z-10 w-full">
      <SectionHeading preText="THE" accentText="ARMORY" accentColor="text-yellow-400" subtitle="Classified tournament protocols. Know the rules before you breach the vault." />

      <div className="space-y-3">
        {RULES.map((rule, i) => (
          <SectionReveal key={i} delay={i * 0.08}>
            <div className="border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 ui-cut transition-colors ${openIndex === i ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400 group-hover:text-yellow-400'}`}>
                    {rule.icon}
                  </div>
                  <div>
                    <h3 className={`font-black italic text-lg tracking-wide transition-colors ${openIndex === i ? 'text-yellow-400' : 'text-white'}`}>
                      {rule.title}
                    </h3>
                    <span className="text-zinc-700 font-mono text-xs tracking-widest">
                      {openIndex === i ? 'DECLASSIFIED' : rule.classified}
                    </span>
                  </div>
                </div>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={20} className="text-zinc-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-16">
                      <div className="border-l-2 border-yellow-400/30 pl-4">
                        <p className="text-zinc-400 font-medium leading-relaxed">{rule.content}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
};

export default Armory;

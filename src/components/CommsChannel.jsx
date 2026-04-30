import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Quote } from 'lucide-react';
import { SectionReveal } from './shared';

const TESTIMONIALS = [
  { quote: "Best tournament experience in THE FINALS. The production quality is insane.", alias: "GHOSTLINE", team: "OPT" },
  { quote: "From open qualifiers to Grand Finals — THG gave our team a real shot at competing.", alias: "RAZR_X", team: "CNS" },
  { quote: "The cashout format keeps every round intense. No free rides to the top.", alias: "NOVA_8", team: "VVR" },
  { quote: "Prize payouts hit our accounts within 48 hours. Legit operation all around.", alias: "HEXBLADE", team: "HLT" },
  { quote: "Our squad went from unknown to top 5 through Heist Games circuits.", alias: "DRIFT_K", team: "IST" },
  { quote: "The community around THG is what makes it special. Real competition, real respect.", alias: "SIGNAL_0", team: "OPT" },
];

const CommsChannel = () => {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <SectionReveal>
      <div className="w-full py-20 bg-zinc-950 border-y border-zinc-800 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="flex items-center gap-3 text-zinc-600 font-bold tracking-[0.3em] text-sm">
            <Radio size={16} className="text-yellow-400 animate-pulse" />
            INTERCEPTED COMMS — CONTESTANT TRANSMISSIONS
          </div>
        </div>

        <div className="flex gap-6 mb-6 animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => <TestimonialCard key={`a-${i}`} testimonial={t} />)}
        </div>
        <div className="flex gap-6 animate-marquee" style={{ width: 'max-content', animationDirection: 'reverse', animationDuration: '25s' }}>
          {[...doubled].reverse().map((t, i) => <TestimonialCard key={`b-${i}`} testimonial={t} />)}
        </div>

        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
      </div>
    </SectionReveal>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="w-[350px] flex-shrink-0 bg-zinc-900/50 border border-zinc-800 p-6 hover:border-yellow-400/30 transition-colors duration-300 group">
    <Quote size={16} className="text-amber-400/40 mb-3" />
    <p className="text-zinc-300 font-medium leading-relaxed mb-4 text-sm">"{testimonial.quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center text-xs font-black italic text-zinc-500 ui-cut group-hover:bg-yellow-400/10 group-hover:text-yellow-400 transition-all">
        {testimonial.alias[0]}
      </div>
      <div>
        <div className="text-white font-bold italic text-sm">{testimonial.alias}</div>
        <div className="text-zinc-600 font-mono text-xs">[{testimonial.team}]</div>
      </div>
    </div>
  </div>
);

export default CommsChannel;

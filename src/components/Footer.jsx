import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import { SectionReveal } from './shared';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); setEmail(''); }
  };

  return (
    <footer className="relative z-10 mt-auto">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-border-glow" />

      {/* Newsletter */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white mb-4">
                JOIN THE <span className="gradient-text-blue">HEIST</span>
              </h3>
              <p className="text-zinc-400 font-medium mb-8">
                Get tournament announcements, meta reports, and exclusive Intel dropped straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 font-mono text-sm">&gt;</span>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@heistgames.gg"
                    className="w-full bg-zinc-950 border border-zinc-700 text-white font-mono text-sm px-8 py-4 ui-cut focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(250,204,21,0.15)] transition-all placeholder:text-zinc-700"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 font-black italic px-6 py-4 ui-cut hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all flex items-center gap-2"
                >
                  {submitted ? 'ACCESS GRANTED' : <><Send size={16} /> SUBSCRIBE</>}
                </motion.button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 text-zinc-950 flex items-center justify-center font-black italic ui-cut text-sm">HG</div>
                <span className="font-black italic tracking-tighter text-xl">THE HEIST GAMES</span>
              </div>
              <p className="text-zinc-600 text-sm font-medium leading-relaxed">
                The premier independent tournament circuit for THE FINALS. Community-driven, competition-focused.
              </p>
            </div>
            {[
              { title: 'COMPETE', links: ['Active Contracts', 'How to Register', 'Season Calendar', 'Prize Pools'] },
              { title: 'COMMUNITY', links: ['Discord Server', 'Twitter/X', 'Twitch Channel', 'YouTube'] },
              { title: 'RESOURCES', links: ['Rulebook', 'FAQ', 'Contact Admins', 'Report Issues'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-yellow-400 font-bold italic text-sm tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <motion.a whileHover={{ x: 3 }} href="#"
                        className="text-zinc-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-1 group"
                      >
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-600 text-xs font-medium text-center md:text-left space-y-1">
              <p>Not affiliated with Embark Studios or NEXON. This is a community project.</p>
              <p>"The Finals" is a registered trademark of Embark Studios.</p>
            </div>
            <div className="flex gap-4">
              {['DISCORD', 'TWITTER', 'TWITCH'].map(social => (
                <motion.button key={social} whileHover={{ scale: 1.05 }}
                  className="text-zinc-600 hover:text-yellow-400 font-bold italic text-xs tracking-wider transition-colors hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]"
                >{social}</motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Diamond, ChevronRight } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = ['HOME', 'TOURNAMENTS', 'SCHEDULE', 'LEADERBOARD'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed w-full z-40 top-0 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-zinc-950/40 backdrop-blur-md'
      }`}
    >
      {/* Top accent line — animated gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('HOME')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Logo mark */}
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black italic text-lg text-zinc-950 ui-cut transition-all group-hover:shadow-[0_0_25px_rgba(250,204,21,0.4)]">
                HG
              </div>
              {/* Subtle corner accent */}
              <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-amber-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Brand text */}
            <div className="hidden sm:flex flex-col">
              <span className="font-black italic text-xl tracking-tighter leading-tight group-hover:text-yellow-400 transition-colors">
                THE HEIST
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 transition-colors -mt-0.5">
                GAMES
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => setActiveTab(item)}
                whileTap={{ scale: 0.97 }}
                className="relative px-5 py-2.5 font-bold italic tracking-wide text-sm transition-all duration-300 group"
              >
                {/* Active background */}
                {activeTab === item && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/15 to-amber-500/10 border border-yellow-400/25 ui-cut"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover background (when not active) */}
                {activeTab !== item && (
                  <div className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/50 ui-cut transition-colors duration-300" />
                )}

                {/* Text */}
                <span className={`relative z-10 transition-colors duration-300 ${
                  activeTab === item
                    ? 'text-yellow-400'
                    : 'text-zinc-500 group-hover:text-white'
                }`}>
                  {item}
                </span>

                {/* Active bottom indicator */}
                {activeTab === item && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-yellow-400 to-amber-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* CTA button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('TOURNAMENTS')}
              className="ml-4 px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 font-black italic text-sm ui-cut hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all flex items-center gap-1.5"
            >
              <Diamond size={13} />
              COMPETE
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom border — more prominent when scrolled */}
      <div className={`h-px w-full transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-30'}`}>
        <div className="h-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => { setActiveTab(item); setIsOpen(false); }}
                  className={`flex items-center justify-between w-full px-4 py-4 font-bold italic text-lg transition-all ui-cut ${
                    activeTab === item
                      ? 'text-yellow-400 bg-yellow-400/10 border-l-2 border-yellow-400'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {item}
                  <ChevronRight size={16} className={`transition-transform ${activeTab === item ? 'text-yellow-400' : 'text-zinc-700'}`} />
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                onClick={() => { setActiveTab('TOURNAMENTS'); setIsOpen(false); }}
                className="w-full mt-2 px-4 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-950 font-black italic text-lg ui-cut flex items-center justify-center gap-2"
              >
                <Diamond size={16} /> COMPETE NOW
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Ticker = () => (
  <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 text-zinc-950 py-1 overflow-hidden relative flex z-30 mt-20 border-y-2 border-zinc-950">
    <div className="flex whitespace-nowrap animate-marquee font-bold italic tracking-widest text-sm items-center">
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> REGISTRATION FOR NEXT TOURNAMENT OPEN NOW</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> OSPUZE OPTICALS LEAD THE STANDINGS</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> NEW RULESET UPDATE: PATCH 2.6 APPLIED</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> $10,000 GRAND VAULT FINALS THIS WEEKEND</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> REGISTRATION FOR NEXT TOURNAMENT OPEN NOW</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> OSPUZE OPTICALS LEAD THE STANDINGS</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> NEW RULESET UPDATE: PATCH 2.6 APPLIED</span>
      <span className="mx-4 flex items-center gap-2"><Zap size={14} className="fill-current"/> $10,000 GRAND VAULT FINALS THIS WEEKEND</span>
    </div>
  </div>
);

export { Navbar, Ticker };

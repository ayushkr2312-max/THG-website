import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const LOADING_MESSAGES = [
  'ESTABLISHING SECURE CONNECTION...',
  'DECRYPTING TOURNAMENT INTEL...',
  'BREACHING ARENA FIREWALL...',
  'LOADING CONTESTANT DOSSIERS...',
  'SYNCHRONIZING VAULT PROTOCOLS...',
  'ACCESS GRANTED',
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);
    const msgInterval = setInterval(() => {
      setMsgIndex(prev => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, 400);
    return () => { clearInterval(progressInterval); clearInterval(msgInterval); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-[200] p-6"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Diamond shape spinner */}
      <div className="relative w-32 h-32 mb-12">
        <motion.div
          className="absolute inset-0 border border-yellow-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-3 border border-amber-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-6 border border-dashed border-yellow-400/15 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Lock size={32} className="text-yellow-400" />
          </motion.div>
        </div>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-3 bg-yellow-400/40"
            style={{
              top: '50%', left: '50%', transformOrigin: '0 0',
              transform: `rotate(${i * 30}deg) translateY(-60px) translateX(-1px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > (i / 12) * 100 ? 1 : 0.2 }}
          />
        ))}
      </div>

      <div className="w-72 max-w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-400 font-black italic text-sm tracking-widest">VAULT ACCESS</span>
          <span className="text-yellow-400 font-mono text-sm countdown-digit">{Math.min(Math.floor(progress), 100)}%</span>
        </div>
        <div className="w-full h-1 bg-zinc-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-8 h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-500 font-mono text-xs tracking-wider cursor-blink"
          >
            {LOADING_MESSAGES[msgIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import CustomStyles from './components/CustomStyles';
import LoadingScreen from './components/LoadingScreen';
import { Navbar, Ticker } from './components/Navbar';
import { Hero, StatsStrip, Sponsors } from './components/HeroSection';
import PastChampions from './components/PastChampions';
import { LatestIntel } from './components/ContentSections';
import TournamentFormat from './components/TournamentFormat';
import CommsChannel from './components/CommsChannel';
import Armory from './components/Armory';
import Footer from './components/Footer';
import { Tournaments, Leaderboard, Schedule } from './components/Pages';

// --- Home Page ---
const Home = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col w-full">
      <Hero setActiveTab={setActiveTab} />
      <StatsStrip />
      <Sponsors />
      <TournamentFormat />
      <PastChampions />
      <CommsChannel />
      <LatestIntel />
      <Armory />
    </div>
  );
};

// --- App ---
export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col relative bg-zinc-950 text-white selection:bg-yellow-400 selection:text-zinc-950 scanlines noise-overlay">
      <CustomStyles />

      <AnimatePresence mode="wait">
        {!isLoaded && (
          <LoadingScreen
            key="loading"
            onComplete={() => setIsLoaded(true)}
          />
        )}
      </AnimatePresence>

      {isLoaded && (
        <>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <Ticker />
          
          <main className="flex-grow relative z-10 pt-4">
            {activeTab === 'HOME' && <Home setActiveTab={setActiveTab} />}
            {activeTab === 'TOURNAMENTS' && <Tournaments />}
            {activeTab === 'SCHEDULE' && <Schedule />}
            {activeTab === 'LEADERBOARD' && <Leaderboard />}
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

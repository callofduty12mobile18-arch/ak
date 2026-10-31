import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_UNIVERSE_DATA } from './data/universeData';
import { useAudio } from './context/AudioContext';

// Components
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import HeroCountdown from './components/HeroCountdown';
import DailyWhisperCard from './components/DailyWhisperCard';
import StoryInNumbers from './components/StoryInNumbers';
import TimelineView from './components/TimelineView';
import ConstellationView from './components/ConstellationView';
import LettersArchive from './components/LettersArchive';
import TimeCapsuleView from './components/TimeCapsuleView';
import LoveNest from './components/LoveNest';
import ScrapbookView from './components/ScrapbookView';

// Modals
import OpenWhenModal from './components/OpenWhenModal';
import VirtualHugModal from './components/VirtualHugModal';
import AfterDarkModal from './components/AfterDarkModal';
import HeartbeatSyncModal from './components/HeartbeatSyncModal';
import SurpriseGiftBoxModal from './components/SurpriseGiftBoxModal';
import AnniversaryModal from './components/AnniversaryModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('us');
  const [universeData] = useState(() => {
    try {
      const saved = localStorage.getItem('universe_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_UNIVERSE_DATA,
          ...parsed,
          girlfriendBirthday: parsed.girlfriendBirthday || DEFAULT_UNIVERSE_DATA.girlfriendBirthday
        };
      }
    } catch (e) {
      console.warn('Failed to load universe data from storage', e);
    }
    return DEFAULT_UNIVERSE_DATA;
  });

  const { setSongId } = useAudio();

  // Modal States
  const [isAfterDarkOpen, setIsAfterDarkOpen] = useState(false);
  const [isOpenWhenOpen, setIsOpenWhenOpen] = useState(false);
  const [isHugOpen, setIsHugOpen] = useState(false);
  const [isHeartbeatOpen, setIsHeartbeatOpen] = useState(false);
  const [isGiftBoxOpen,    setIsGiftBoxOpen]    = useState(false);
  const [isAnniversaryOpen, setIsAnniversaryOpen] = useState(false);

  // Sync songId from stored universeData
  useEffect(() => {
    if (universeData.youtubeSongId && setSongId) {
      setSongId(universeData.youtubeSongId);
    }
  }, [universeData.youtubeSongId, setSongId]);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="relative min-h-screen text-love-ink selection:bg-love-rose selection:text-white flex flex-col font-sans">
      {/* Dynamic Cherry Blossom & Golden Embers Background */}
      <ParticleBackground />

      {/* Floating Glassmorphic Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAfterDark={() => setIsAfterDarkOpen(true)}
        onOpenHeartbeat={() => setIsHeartbeatOpen(true)}
        onOpenGiftBox={() => setIsGiftBoxOpen(true)}
        onOpenAnniversary={() => setIsAnniversaryOpen(true)}
      />

      {/* Main View Area — pt-14 clears the fixed h-14 navbar */}
      <main className="flex-1 w-full pt-14 pb-16">
        <AnimatePresence mode="wait">
          {activeSection === 'us' && (
            <motion.div
              key="us"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-16"
            >
              <HeroCountdown
                anniversaryDate={universeData.anniversaryDate}
                girlfriendName={universeData.girlfriendName}
                girlfriendBirthday={universeData.girlfriendBirthday}
                onNavigate={(section) => setActiveSection(section)}
                onOpenGiftBox={() => setIsGiftBoxOpen(true)}
              />
              <DailyWhisperCard girlfriendName={universeData.girlfriendName} />
            </motion.div>
          )}

          {activeSection === 'numbers' && (
            <motion.div
              key="numbers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <StoryInNumbers
                girlfriendName={universeData.girlfriendName}
                boyfriendName={universeData.boyfriendName}
              />
            </motion.div>
          )}

          {activeSection === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <TimelineView
                milestones={universeData.milestones}
                girlfriendName={universeData.girlfriendName}
                boyfriendName={universeData.boyfriendName}
              />
            </motion.div>
          )}

          {activeSection === 'scrapbook' && (
            <motion.div
              key="scrapbook"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ScrapbookView
                girlfriendName={universeData.girlfriendName}
                boyfriendName={universeData.boyfriendName}
              />
            </motion.div>
          )}

          {activeSection === 'constellation' && (
            <motion.div
              key="constellation"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ConstellationView />
            </motion.div>
          )}

          {activeSection === 'letters' && (
            <motion.div
              key="letters"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <LettersArchive
                loveLetters={universeData.loveLetters}
                girlfriendName={universeData.girlfriendName}
                boyfriendName={universeData.boyfriendName}
                onOpenOpenWhen={() => setIsOpenWhenOpen(true)}
              />
            </motion.div>
          )}

          {activeSection === 'capsule' && (
            <motion.div
              key="capsule"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <TimeCapsuleView boyfriendName={universeData.boyfriendName} />
            </motion.div>
          )}

          {activeSection === 'nest' && (
            <motion.div
              key="nest"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <LoveNest
                girlfriendName={universeData.girlfriendName}
                adminEmail={universeData.adminEmail}
                onTriggerHug={() => setIsHugOpen(true)}
                onOpenHeartbeat={() => setIsHeartbeatOpen(true)}
                onOpenGiftBox={() => setIsGiftBoxOpen(true)}
                onOpenAnniversary={() => setIsAnniversaryOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,4,8,0.6)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-cormorant italic text-love-muted text-base">
            Crafted with love for {universeData.girlfriendName} by {universeData.boyfriendName}
          </p>
          <p className="type-label text-love-faint">
            July 12, 2025 — to infinity &amp; beyond
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SurpriseGiftBoxModal
        isOpen={isGiftBoxOpen}
        onClose={() => setIsGiftBoxOpen(false)}
        girlfriendName={universeData.girlfriendName}
        boyfriendName={universeData.boyfriendName}
      />

      <AnniversaryModal
        isOpen={isAnniversaryOpen}
        onClose={() => setIsAnniversaryOpen(false)}
        girlfriendName={universeData.girlfriendName}
        boyfriendName={universeData.boyfriendName}
      />

      <OpenWhenModal
        isOpen={isOpenWhenOpen}
        onClose={() => setIsOpenWhenOpen(false)}
        boyfriendName={universeData.boyfriendName}
      />

      <VirtualHugModal
        isOpen={isHugOpen}
        onClose={() => setIsHugOpen(false)}
      />

      <HeartbeatSyncModal
        isOpen={isHeartbeatOpen}
        onClose={() => setIsHeartbeatOpen(false)}
        girlfriendName={universeData.girlfriendName}
        boyfriendName={universeData.boyfriendName}
      />

      <AfterDarkModal
        isOpen={isAfterDarkOpen}
        onClose={() => setIsAfterDarkOpen(false)}
        secretWord={universeData.afterDarkSecret}
      />
    </div>
  );
}

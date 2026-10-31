import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, Moon, Menu, X, Heart, Gift, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const NAV_ITEMS = [
  { id: 'us',            label: 'Us' },
  { id: 'story',         label: 'Our story' },
  { id: 'scrapbook',     label: 'Scrapbook' },
  { id: 'numbers',       label: 'Numbers' },
  { id: 'constellation', label: 'Constellation' },
  { id: 'letters',       label: 'Letters' },
  { id: 'capsule',       label: 'Time capsule' },
  { id: 'nest',          label: 'Love nest' },
];

export default function Navbar({
  activeSection,
  setActiveSection,
  onOpenAfterDark,
  onOpenHeartbeat,
  onOpenGiftBox,
  onOpenAnniversary,
}) {
  const { isPlaying, togglePlay } = useAudio();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = (id) => {
    setActiveSection(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ── Fixed bar ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="glass border-b border-[rgba(255,255,255,0.06)] backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

            {/* Wordmark */}
            <button
              onClick={() => navigate('us')}
              className="shrink-0 flex items-center gap-2.5 group"
              aria-label="Go to home"
            >
              <Heart
                className="w-3.5 h-3.5 text-love-rose fill-love-rose animate-breathe"
                aria-hidden="true"
              />
              <span className="font-cormorant italic text-love-ink font-medium text-lg leading-none tracking-tight group-hover:text-love-gold transition-colors duration-200">
                Shalini's universe
              </span>
            </button>

            {/* Desktop nav tabs */}
            <nav
              className="hidden md:flex items-center gap-0.5 flex-1 justify-center overflow-x-auto"
              aria-label="Site navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={[
                      'relative px-3 py-1.5 rounded text-label font-montserrat transition-colors duration-150 whitespace-nowrap',
                      isActive
                        ? 'text-love-gold font-medium'
                        : 'text-love-muted hover:text-love-ink',
                    ].join(' ')}
                  >
                    {item.label}
                    {/* Single pixel underline — no animated pill */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-px bg-love-gold"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action strip */}
            <div className="flex items-center gap-1.5 shrink-0" role="toolbar" aria-label="Controls">
              {/* Music */}
              <ActionButton
                onClick={togglePlay}
                active={isPlaying}
                label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying
                  ? <Music className="w-3.5 h-3.5" aria-hidden />
                  : <VolumeX className="w-3.5 h-3.5" aria-hidden />
                }
              </ActionButton>

              {/* Heartbeat */}
              <ActionButton onClick={onOpenHeartbeat} label="Heartbeat sync">
                <Heart className="w-3.5 h-3.5 fill-love-rose text-love-rose" aria-hidden />
              </ActionButton>

              {/* Gift — birthday */}
              {onOpenGiftBox && (
                <ActionButton onClick={onOpenGiftBox} label="Birthday gift box">
                  <Gift className="w-3.5 h-3.5 text-love-gold" aria-hidden />
                </ActionButton>
              )}

              {/* Anniversary */}
              {onOpenAnniversary && (
                <ActionButton onClick={onOpenAnniversary} label="Anniversary gift">
                  <Sparkles className="w-3.5 h-3.5 text-love-rose" aria-hidden />
                </ActionButton>
              )}

              {/* After Dark */}
              <ActionButton onClick={onOpenAfterDark} label="After dark">
                <Moon className="w-3.5 h-3.5" aria-hidden />
              </ActionButton>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded text-love-muted hover:text-love-ink transition-colors"
                onClick={() => setIsMobileOpen((v) => !v)}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen
                  ? <X className="w-4 h-4" aria-hidden />
                  : <Menu className="w-4 h-4" aria-hidden />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-lg" />

            {/* Drawer panel */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              className="absolute top-0 left-0 bottom-0 w-72 glass border-r border-[rgba(255,255,255,0.08)] flex flex-col pt-16 pb-8 px-6"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile navigation"
            >
              {/* Section heading */}
              <p className="type-label text-love-faint mb-5">Navigate</p>

              <ul className="flex-1 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => navigate(item.id)}
                        className={[
                          'w-full text-left px-4 py-2.5 rounded text-sm font-montserrat transition-colors duration-150',
                          isActive
                            ? 'text-love-gold bg-[rgba(232,193,106,0.08)] font-medium'
                            : 'text-love-muted hover:text-love-ink',
                        ].join(' ')}
                      >
                        {item.label}
                        {isActive && (
                          <span className="float-right text-love-gold opacity-50" aria-hidden>—</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Bottom bar in drawer */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.07)] flex items-center gap-3">
                <ActionButton onClick={togglePlay} active={isPlaying} label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Music className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </ActionButton>
                <ActionButton onClick={onOpenHeartbeat} label="Heartbeat">
                  <Heart className="w-3.5 h-3.5 fill-love-rose text-love-rose" />
                </ActionButton>
                {onOpenGiftBox && (
                  <ActionButton onClick={onOpenGiftBox} label="Birthday gift">
                    <Gift className="w-3.5 h-3.5 text-love-gold" />
                  </ActionButton>
                )}
                {onOpenAnniversary && (
                  <ActionButton onClick={onOpenAnniversary} label="Anniversary gift">
                    <Sparkles className="w-3.5 h-3.5 text-love-rose" />
                  </ActionButton>
                )}
                <ActionButton onClick={onOpenAfterDark} label="After dark">
                  <Moon className="w-3.5 h-3.5" />
                </ActionButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Shared icon button ─────────────────────────────────────────── */
function ActionButton({ onClick, active = false, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={[
        'w-8 h-8 flex items-center justify-center rounded transition-colors duration-150',
        active
          ? 'text-love-gold bg-[rgba(232,193,106,0.1)] border border-[rgba(232,193,106,0.25)]'
          : 'text-love-muted hover:text-love-ink border border-transparent hover:border-[rgba(255,255,255,0.1)]',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

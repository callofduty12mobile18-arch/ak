import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songId, setSongId] = useState(DEFAULT_UNIVERSE_DATA.youtubeSongId);

  useEffect(() => {
    // Autoplay policy bypass on first user click
    const handleFirstClick = () => {
      setIsPlaying(true);
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, play, pause, songId, setSongId }}>
      {children}
      {/* Persistent Background Audio Engine (Hidden) */}
      <div className="fixed -left-[9999px] top-0 w-1 h-1 overflow-hidden pointer-events-none opacity-0">
        {isPlaying ? (
          <iframe
            title="Romantic Background Audio"
            src={`https://www.youtube.com/embed/${songId}?autoplay=1&enablejsapi=1&loop=1&playlist=${songId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
          />
        ) : null}
      </div>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plus, Sparkles, X, Heart, Calendar, Trash2, RotateCw, Image as ImageIcon, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

// Initial preloaded Polaroid memories
const INITIAL_SCRAPBOOK_PHOTOS = [
  {
    id: 1,
    date: "Our Happy Place",
    title: "You & Me on the Swing",
    caption: "My happiest place in the universe 🌸",
    note: "Sitting beside you on the swing, smiling and talking about everything and nothing. With you, every single ordinary second turns into something golden. I love you so much, Shalu.",
    tapeColor: "from-love-rose to-love-gold",
    tilt: -2.5,
    tag: "Together",
    image: "/photos/couple-swing.jpeg",
    isScratch: false
  },
  {
    id: 2,
    date: "Side by Side",
    title: "Two Hearts, One Soul",
    caption: "Forever looks good on us 🤍",
    note: "Look at us together. I love how naturally we fit, how sweet your smile is, and how peaceful my heart feels whenever you are near. There is nowhere else in this world I'd rather be.",
    tapeColor: "from-purple-400 to-pink-500",
    tilt: 2.5,
    tag: "Together",
    image: "/photos/couple-selfie-bw.jpeg",
    isScratch: false
  },
  {
    id: 3,
    date: "Fingers Intertwined",
    title: "Holding Your Hand",
    caption: "Holding the love of my life 🤝",
    note: "The feeling of your soft fingers laced between mine. A quiet, unbreakable promise that whatever life brings, you will never have to walk a single step alone.",
    tapeColor: "from-amber-400 to-yellow-500",
    tilt: -1.5,
    tag: "Holding Hands",
    image: "/photos/holding-hand-1.jpeg",
    isScratch: false
  },
  {
    id: 4,
    date: "Forever Promised",
    title: "Safe in My Grip",
    caption: "Soft touch, eternal promise 💕",
    note: "\"Naa full ah trust panra unna.\" You placed your hand in mine, and I promised to protect your heart forever. My greatest honor in this lifetime is being yours, Chellam.",
    tapeColor: "from-love-rose to-love-rose-deep",
    tilt: 2,
    tag: "Holding Hands",
    image: "/photos/holding-hand-2.jpeg",
    isScratch: false
  },
  {
    id: 5,
    date: "July 12, 2025",
    title: "Chennai Railway Station",
    caption: "The first look that stopped time 🚂",
    note: "July 12, 2025. Amidst the rush and crowds of Chennai Railway Station, our paths crossed for the very first time. One look at you, and the busy world faded into quiet magic.",
    tapeColor: "from-rose-400 to-pink-500",
    tilt: -3,
    tag: "Milestone",
    image: "/assets/hug-couple.png",
    isScratch: false
  },
  {
    id: 6,
    date: "July 25, 2026",
    title: "Jananayagam Movie Date",
    caption: "Our 1st movie date holding hands 🍿",
    note: "July 25th. Our first movie date together. The movie was Jananayagam, but honestly, I spent half the time looking at your profile smiling in the theater glow. My favorite movie date ever.",
    tapeColor: "from-purple-400 to-indigo-500",
    tilt: 1.5,
    tag: "Dates",
    image: null,
    gradient: "from-purple-950/80 via-love-wine to-purple-900/60",
    isScratch: false
  },
  {
    id: 7,
    date: "Sep 6 & Sep 19, 2026",
    title: "Our Home Visits",
    caption: "Stepping into each other's worlds 🏡",
    note: "September 6 when I first visited your home, and September 19 when you walked into mine. Two unforgettable days when our families and our homes became part of our love story.",
    tapeColor: "from-amber-400 to-orange-500",
    tilt: -2,
    tag: "Dates",
    image: null,
    gradient: "from-amber-950/80 via-love-wine to-yellow-950/60",
    isScratch: false
  },
  {
    id: 8,
    date: "January 23, 2007",
    title: "The Birth of My Miracle",
    caption: "The day an angel arrived 🎂",
    note: "January 23, 2007. The quiet, holy day the universe was blessed with you. 18 years later, you became my entire world, my safe place, and my forever home.",
    tapeColor: "from-love-gold to-amber-500",
    tilt: 3,
    tag: "Birthday",
    image: null,
    gradient: "from-yellow-950/80 via-amber-950 to-love-wine",
    isScratch: false
  },
  {
    id: 9,
    date: "Secret Surprise",
    title: "Scratch to Reveal My Heart",
    caption: "Rub off the golden foil! ✨",
    note: "You uncovered the secret! No matter how many days or miles pass, my love for you only grows deeper, stronger, and more sure. You are my forever girl, Shalini.",
    tapeColor: "from-yellow-400 to-amber-600",
    tilt: -2,
    tag: "Surprise",
    isScratch: true,
    revealed: false
  }
];

export default function ScrapbookView({ girlfriendName, boyfriendName }) {
  const her = girlfriendName || DEFAULT_UNIVERSE_DATA.girlfriendName;
  const him = boyfriendName || DEFAULT_UNIVERSE_DATA.boyfriendName;

  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('scrapbook_photos_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SCRAPBOOK_PHOTOS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('scrapbook_photos_v2', JSON.stringify(photos));
    } catch (e) {}
  }, [photos]);

  const [flippedCards, setFlippedCards] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New photo form state
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newImageBase64, setNewImageBase64] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('scrapbook_photos', JSON.stringify(photos));
    } catch (e) {}
  }, [photos]);

  const toggleFlip = (id, e) => {
    e.stopPropagation();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert to base64 data url
    const reader = new FileReader();
    reader.onload = () => {
      setNewImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePhoto = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      caption: newCaption.trim() || "A moment I treasure 💕",
      note: newNote.trim() || "Every second spent with you is a memory I keep safe in my heart.",
      image: newImageBase64,
      tapeColor: "from-love-rose to-love-gold",
      tilt: (Math.random() * 6 - 3),
      tag: "Custom",
      isScratch: false
    };

    setPhotos(prev => [newEntry, ...prev]);
    confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });

    // Reset form
    setNewTitle("");
    setNewDate("");
    setNewCaption("");
    setNewNote("");
    setNewImageBase64(null);
    setIsAddModalOpen(false);
  };

  const handleDeletePhoto = (id, e) => {
    e.stopPropagation();
    if (confirm("Remove this Polaroid from your scrapbook?")) {
      setPhotos(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleResetScrapbook = () => {
    if (confirm("Reset scrapbook to original milestone memories?")) {
      setPhotos(INITIAL_SCRAPBOOK_PHOTOS);
      localStorage.removeItem('scrapbook_photos');
    }
  };

  const filtered = photos.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'dates') return p.tag === 'Dates' || p.title.toLowerCase().includes('date') || p.title.toLowerCase().includes('home');
    if (activeTab === 'milestone') return p.tag === 'Milestone' || p.tag === 'Birthday' || p.tag === 'Chat Record';
    if (activeTab === 'custom') return p.tag === 'Custom';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-love-rose font-semibold bg-love-rose/10 px-3.5 py-1.5 rounded-full border border-love-rose/20 shadow-sm">
          <Camera className="w-3.5 h-3.5 text-love-gold" />
          <span>Physical Keepsake Gallery</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-playfair font-extrabold text-white tracking-tight">
          The Polaroid Scrapbook
        </h2>
        <p className="text-xs sm:text-sm font-cormorant italic text-love-muted max-w-xl mx-auto">
          Tangible memories pinned to our velvet board. Tap any Polaroid to flip it over and read the handwritten love note on the back.
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-love-rose to-love-gold text-love-dark font-bold text-xs sm:text-sm shadow-lg hover:opacity-95 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Pin Our Photo 📸</span>
          </button>

          <button
            onClick={handleResetScrapbook}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full glass text-love-muted hover:text-white text-xs font-medium border border-white/10 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reset Originals</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
        {[
          { id: 'all', label: `All (${photos.length})` },
          { id: 'dates', label: 'Dates & Visits 🎬' },
          { id: 'milestone', label: 'Milestones 🌟' },
          { id: 'custom', label: 'Our Uploads 📷' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white/20 text-white font-semibold shadow-inner border border-white/30'
                : 'glass text-love-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Polaroid Wall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
        {filtered.map((photo) => {
          const isFlipped = !!flippedCards[photo.id];

          return (
            <div
              key={photo.id}
              className="relative select-none perspective-1000 group"
              style={{ transform: `rotate(${photo.tilt || 0}deg)` }}
            >
              {/* Decorative Washi Tape on Top */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gradient-to-r ${photo.tapeColor || 'from-love-rose to-love-gold'} opacity-85 shadow-md z-20 backdrop-blur-sm transform -rotate-1 rounded-sm border-t border-b border-white/30`}
              />

              {/* 3D Flippable Polaroid Frame */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedPhoto(photo)}
                className="cursor-pointer relative w-full bg-[#fbf9f5] text-[#241209] rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#ece4d8] flex flex-col justify-between min-h-[380px] sm:min-h-[420px]"
              >
                {!isFlipped ? (
                  /* FRONT: Polaroid Photo Frame */
                  <div className="flex flex-col h-full justify-between space-y-4">
                    {/* Square Photo Area */}
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#160a14] border border-[#dfd4c5] shadow-inner flex items-center justify-center group/img">
                      {photo.isScratch ? (
                        /* Scratch to Reveal Card */
                        <ScratchCanvas
                          onReveal={() => {
                            confetti({ particleCount: 60, spread: 90, origin: { y: 0.6 } });
                          }}
                          secretContent={
                            <div className="w-full h-full bg-gradient-to-br from-love-rose/40 via-purple-950 to-love-dark p-6 flex flex-col items-center justify-center text-center space-y-2">
                              <Heart className="w-10 h-10 text-love-rose fill-love-rose animate-bounce" />
                              <span className="text-white font-playfair font-bold text-lg">
                                My Whole Heart Is Yours
                              </span>
                              <p className="text-xs font-cormorant italic text-love-gold">
                                "Una kathalecha en manasu ku savu illa de en kanmani"
                              </p>
                            </div>
                          }
                        />
                      ) : photo.image ? (
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* Atmospheric Graphic Memory Placeholder */
                        <div className={`w-full h-full bg-gradient-to-br ${photo.gradient || 'from-love-wine via-purple-950 to-love-dark'} p-5 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
                          <span className="text-4xl filter drop-shadow-md">
                            {photo.tag === 'Birthday' ? '🎂' : photo.tag === 'Dates' ? '🎬' : '🌸'}
                          </span>
                          <span className="text-white font-playfair font-bold text-base tracking-wide relative z-10">
                            {photo.title}
                          </span>
                          <span className="text-[11px] font-montserrat uppercase tracking-wider text-love-gold font-medium relative z-10">
                            {photo.date}
                          </span>
                        </div>
                      )}

                      {/* Tag pill */}
                      <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-love-gold border border-white/20">
                        {photo.tag}
                      </span>
                    </div>

                    {/* Bottom White Rim: Authentic Handwritten Caption */}
                    <div className="pt-2 text-center space-y-1">
                      <p className="font-caveat text-2xl sm:text-3xl font-bold text-[#3d1a10] leading-tight tracking-wide">
                        {photo.caption}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-[#633a2a] pt-2 border-t border-[#eee5d8] font-montserrat">
                        <span>{photo.date}</span>
                        <button
                          onClick={(e) => toggleFlip(photo.id, e)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 hover:text-rose-950 transition-colors"
                        >
                          <span>Flip to read note</span>
                          <RotateCw className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* BACK: Handwritten Letter on Matte Paper */
                  <div className="flex flex-col h-full justify-between p-2 text-left space-y-4">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#e2d5c2]">
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#8a5744]">
                          {photo.date}
                        </span>
                        <button
                          onClick={(e) => toggleFlip(photo.id, e)}
                          className="p-1 rounded-full bg-black/5 hover:bg-black/10 text-[#3d1a10]"
                          title="Flip back"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-playfair font-bold text-xl text-[#3d1a10] mt-3">
                        {photo.title}
                      </h4>

                      <p className="font-cormorant text-lg sm:text-xl italic text-[#4a261a] leading-relaxed mt-2 whitespace-pre-line">
                        "{photo.note}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e2d5c2] flex items-center justify-between">
                      <span className="font-caveat text-2xl text-rose-950 font-bold">
                        Yours, {him} 💕
                      </span>

                      {photo.tag === 'Custom' && (
                        <button
                          onClick={(e) => handleDeletePhoto(photo.id, e)}
                          className="text-red-600 hover:text-red-800 p-1 transition-colors"
                          title="Delete photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Add New Photo Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card max-w-lg w-full max-h-[92vh] overflow-y-auto rounded-3xl p-5 sm:p-8 border border-white/20 shadow-2xl relative my-auto"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1 mb-6">
                <span className="text-xs uppercase tracking-widest text-love-gold font-semibold">
                  New Polaroid Keepsake
                </span>
                <h3 className="text-2xl font-playfair font-bold text-white">
                  Pin Our Photo
                </h3>
                <p className="text-xs text-love-muted font-cormorant italic">
                  Upload a couple picture from your phone or PC and write a handwritten note for {her}.
                </p>
              </div>

              <form onSubmit={handleCreatePhoto} className="space-y-4">
                {/* Image Upload Box */}
                <div>
                  <label className="text-xs font-semibold text-love-muted uppercase tracking-wider block mb-1.5">
                    Select Picture:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 hover:border-love-rose rounded-2xl p-4 text-center cursor-pointer transition-colors bg-white/5 flex flex-col items-center justify-center gap-2 min-h-[140px]"
                  >
                    {newImageBase64 ? (
                      <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-lg border border-white/20">
                        <img src={newImageBase64} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-xs text-white font-medium opacity-0 hover:opacity-100 transition-opacity">
                          Change
                        </span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-love-gold animate-bounce" />
                        <span className="text-xs text-white font-medium">Click to choose our photo 📸</span>
                        <span className="text-[10px] text-love-muted">JPG, PNG, WEBP (stored securely in browser)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Title & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-love-muted uppercase tracking-wider block mb-1">
                      Moment Title:
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Our Cozy Coffee Date"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-base text-white placeholder-white/40 focus:outline-none focus:border-love-rose"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-love-muted uppercase tracking-wider block mb-1">
                      Date:
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. Sep 22, 2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-base text-white placeholder-white/40 focus:outline-none focus:border-love-rose"
                    />
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div>
                  <label className="text-xs font-semibold text-love-muted uppercase tracking-wider block mb-1">
                    Polaroid Handwritten Caption:
                  </label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Short line written on white border..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-base text-white placeholder-white/40 focus:outline-none focus:border-love-rose"
                  />
                </div>

                {/* Secret Note on Back */}
                <div>
                  <label className="text-xs font-semibold text-love-muted uppercase tracking-wider block mb-1">
                    Secret Note on Back:
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                    placeholder="What I was thinking when I looked at you..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-base text-white placeholder-white/40 focus:outline-none focus:border-love-rose"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-love-rose to-love-gold text-love-dark font-bold text-sm shadow-xl hover:opacity-95 active:scale-98 transition-all"
                  >
                    Pin to Our Scrapbook ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Interactive Scratch-to-Reveal Canvas Component
function ScratchCanvas({ secretContent, onReveal }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = canvas.parentElement.clientWidth);
    const height = (canvas.height = canvas.parentElement.clientHeight);

    // Fill with lustrous rose-gold scratchable coating
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f4a6b8');
    grad.addColorStop(0.5, '#ffd700');
    grad.addColorStop(1, '#e07a97');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative text on scratch coating
    ctx.font = 'bold 15px "Playfair Display", serif';
    ctx.fillStyle = '#2b1018';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Rub with finger to scratch ✨', width / 2, height / 2 - 8);
    ctx.font = 'italic 12px "Montserrat", sans-serif';
    ctx.fillText('Secret Message Underneath', width / 2, height / 2 + 14);

    let isDrawing = false;
    let scratchedPixels = 0;
    const totalPixels = width * height;

    const scratch = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels += Math.PI * 22 * 22 * 0.2;
      if (scratchedPixels > totalPixels * 0.4 && !isRevealed) {
        setIsRevealed(true);
        if (onReveal) onReveal();
      }
    };

    const handleMouseDown = (e) => {
      isDrawing = true;
      scratch(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      scratch(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        scratch(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isRevealed, onReveal]);

  return (
    <div className="relative w-full h-full">
      {secretContent}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
        />
      )}
    </div>
  );
}

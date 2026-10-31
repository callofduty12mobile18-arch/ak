import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Sparkles, Heart, Check, ExternalLink, RotateCcw,
  Crown, Film, Coffee, Star, Sunrise, Clock,
  Lock, Key, AlertCircle, Flame, MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

const BOYFRIEND_PHONE = "918680816568";
const DISPLAY_PHONE   = "+91 8680816568";

// Anniversary-specific coupons — different from birthday
const ANNIVERSARY_COUPONS = [
  {
    id: 'anniv-date-night',
    icon: Star,
    title: 'Exclusive Date Night',
    subtitle: 'Planned entirely by Polonium',
    description: 'One full evening designed by Polonium just for her — dinner, a walk, and all her favourite things. She only has to show up.',
    terms: 'Redeemable any weekend she chooses. No expiry.',
    color: 'from-rose-500/20 to-pink-600/20 border-rose-400/40',
  },
  {
    id: 'anniv-no-phone',
    icon: MessageSquare,
    title: 'Phone-Free Together Day',
    subtitle: 'Just us, no screens',
    description: 'A full day where both phones go away and it is purely the two of them — talking, laughing, and being present with each other.',
    terms: 'Applies to both. Polonium goes first.',
    color: 'from-indigo-500/20 to-purple-600/20 border-indigo-400/40',
  },
  {
    id: 'anniv-breakfast',
    icon: Sunrise,
    title: 'Sunrise Breakfast Surprise',
    subtitle: 'Her favourite meal, made with love',
    description: 'Polonium prepares or arranges her absolute favourite breakfast exactly how she likes it — served with a handwritten note.',
    terms: 'She gets breakfast in bed if possible.',
    color: 'from-amber-500/20 to-yellow-600/20 border-amber-400/40',
  },
  {
    id: 'anniv-movie',
    icon: Film,
    title: 'Re-watch Jananayagam Together',
    subtitle: 'Our first movie date, again',
    description: 'Watch Jananayagam again exactly like their first movie date — side by side, holding hands, making it a tradition.',
    terms: 'Their film. Every anniversary if she wants.',
    color: 'from-purple-500/20 to-violet-600/20 border-purple-400/40',
  },
  {
    id: 'anniv-wish',
    icon: Crown,
    title: 'Anniversary Wish Card',
    subtitle: 'One wish, no limits',
    description: 'One thing Shalini has wanted them to do together — Polonium makes it happen, no questions, no hesitation.',
    terms: 'The biggest wish gets the biggest effort.',
    color: 'from-yellow-500/25 to-amber-600/25 border-yellow-300/50',
  },
];

export default function AnniversaryModal({ isOpen, onClose, girlfriendName = 'Shalini', boyfriendName = 'Polonium' }) {

  const isAnniversaryToday = () => {
    const n = new Date();
    return n.getMonth() === 2 && n.getDate() === 24; // March 24
  };

  const [isUnlocked,    setIsUnlocked]    = useState(isAnniversaryToday);
  const [isOpened,      setIsOpened]      = useState(false);
  const [activeSection, setActiveSection] = useState('coupons');
  const [countdown,     setCountdown]     = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showKey,       setShowKey]       = useState(false);
  const [keyInput,      setKeyInput]      = useState('');
  const [keyError,      setKeyError]      = useState(false);

  const [redeemed, setRedeemed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('redeemed_anniv_coupons_v1') || '{}'); }
    catch { return {}; }
  });
  const [justRedeemed, setJustRedeemed] = useState(null);

  // Countdown to next March 24
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (now.getMonth() === 2 && now.getDate() === 24) {
        setIsUnlocked(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      let next = new Date(now.getFullYear(), 2, 24, 0, 0, 0);
      if (now > next) next = new Date(now.getFullYear() + 1, 2, 24, 0, 0, 0);
      const d = Math.max(0, next - now);
      setCountdown({
        days:    Math.floor(d / 86_400_000),
        hours:   Math.floor((d / 3_600_000) % 24),
        minutes: Math.floor((d / 60_000) % 60),
        seconds: Math.floor((d / 1_000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const playChime = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      if (ctx.state === 'suspended') ctx.resume();
      // Slightly lower, warmer tones for anniversary
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + i * 0.09 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 1.4);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 1.5);
      });
    } catch {}
  };

  const launchConfetti = () => {
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60,  spread: 55, origin: { x: 0.1, y: 0.7 }, colors: ['#d4778d','#e8c16a','#fff','#c084fc'] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 0.9, y: 0.7 }, colors: ['#d4778d','#e8c16a','#fff','#c084fc'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleOpen = () => { setIsOpened(true); playChime(); launchConfetti(); };

  const handleKeySubmit = (e) => {
    e.preventDefault();
    const v = keyInput.trim().toLowerCase();
    // Preview keys: thangam, phone, or '0324' (Mar 24)
    if (['thangam','8680816568','+918680816568','0324'].includes(v)) {
      setIsUnlocked(true); setShowKey(false); setKeyError(false);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.5 } });
    } else {
      setKeyError(true); setTimeout(() => setKeyError(false), 2500);
    }
  };

  const handleRedeem = (coupon) => {
    const updated = {
      ...redeemed,
      [coupon.id]: {
        redeemedAt: new Date().toISOString(),
        formattedDate: new Date().toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        }),
      },
    };
    setRedeemed(updated);
    setJustRedeemed(coupon.id);
    try { localStorage.setItem('redeemed_anniv_coupons_v1', JSON.stringify(updated)); } catch {}
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, colors: ['#e8c16a','#d4778d','#fff'] });
    setTimeout(() => setJustRedeemed(null), 2500);
  };

  const waLink = (coupon) => {
    const msg = `Hey ${boyfriendName}! 💌 I'm redeeming my "${coupon.title}" from our Anniversary Gift! 💞✨`;
    return `https://wa.me/${BOYFRIEND_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#120818] via-[#100614] to-[#0a020b] border border-love-rose/25 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(212,119,141,0.2)] text-white z-10 my-auto overflow-hidden"
        >
          <button onClick={onClose} aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors z-30">
            <X className="w-5 h-5" />
          </button>

          {/* ── LOCKED ─────────────────────────────────────────────── */}
          {!isUnlocked && (
            <div className="py-6 sm:py-10 text-center space-y-6">
              {/* Rose lock icon */}
              <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-love-rose/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-950/80 via-black to-purple-950/80 border-2 border-love-rose/40 flex items-center justify-center shadow-2xl">
                  <Lock className="w-10 h-10 text-love-rose animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="type-label text-love-rose">💞 Anniversary gift · March 24 only</p>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                  Locked until our anniversary
                </h3>
                <p className="type-label text-love-muted max-w-sm mx-auto">
                  Sealed with love by Polonium. Opens exclusively on{' '}
                  <span className="text-love-rose font-medium">March 24</span> every year.
                </p>
              </div>

              {/* Countdown */}
              <div className="max-w-sm mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="type-label text-love-rose flex items-center justify-center gap-1.5 mb-3">
                  <Clock className="w-3.5 h-3.5" /> Unlocks in
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: 'Days',  value: countdown.days },
                    { label: 'Hours', value: String(countdown.hours).padStart(2,'0') },
                    { label: 'Mins',  value: String(countdown.minutes).padStart(2,'0') },
                    { label: 'Secs',  value: String(countdown.seconds).padStart(2,'0') },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-xl sm:text-2xl font-playfair font-bold text-love-rose tabular-nums">{value}</div>
                      <div className="type-label text-love-muted">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="type-label text-love-faint max-w-xs mx-auto">
                Come back on March 24 to unlock 5 anniversary coupons &amp; a love letter 💞
              </p>

              {/* Preview key */}
              <div className="pt-2 border-t border-white/10 max-w-sm mx-auto">
                {!showKey ? (
                  <button onClick={() => setShowKey(true)}
                    className="inline-flex items-center gap-1.5 type-label text-white/40 hover:text-love-rose transition-colors">
                    <Key className="w-3 h-3" /> Polonium preview key
                  </button>
                ) : (
                  <form onSubmit={handleKeySubmit} className="flex items-center gap-2">
                    <input type="password" placeholder="Secret key…" value={keyInput}
                      onChange={e => setKeyInput(e.target.value)} autoFocus
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-love-rose transition-colors" />
                    <button type="submit"
                      className="px-3 py-1.5 rounded-xl bg-love-rose text-white text-xs font-bold hover:bg-love-rose-deep transition-colors">
                      Unlock
                    </button>
                    <button type="button" onClick={() => setShowKey(false)}
                      className="p-1.5 text-white/50 hover:text-white text-xs">✕</button>
                  </form>
                )}
                {keyError && (
                  <p className="type-label text-rose-400 flex items-center justify-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> Incorrect key
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── UNLOCKED ───────────────────────────────────────────── */}
          {isUnlocked && (
            <>
              {/* Header */}
              <div className="text-center space-y-2 mb-6">
                <p className="type-label text-love-rose">💞 Anniversary vault · March 24</p>
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                  {isOpened ? 'Your anniversary treasures ✨' : `Happy anniversary, ${girlfriendName} 💞`}
                </h2>
                <p className="type-label text-love-muted max-w-md mx-auto">
                  {isOpened
                    ? 'Every coupon and word here celebrates the day we became us.'
                    : 'One year of choosing each other, every single day. Tap to unwrap.'}
                </p>
              </div>

              {/* Stage 1 — gift box */}
              {!isOpened && (
                <div className="flex flex-col items-center py-8 space-y-6">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={handleOpen} className="relative cursor-pointer group">
                    {/* Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-love-rose/30 via-purple-600/25 to-love-rose/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
                    {/* Box */}
                    <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl bg-gradient-to-br from-rose-950 via-purple-950 to-[#120818] border-2 border-love-rose/40 shadow-2xl overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent,rgba(0,0,0,0.5))]" />
                      {/* Lid */}
                      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-rose-900 to-purple-950 border-b-2 border-love-rose/40 flex items-center justify-center">
                        <span className="type-label text-love-rose font-medium">For {girlfriendName} · Mar 24</span>
                      </div>
                      {/* Vertical ribbon */}
                      <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-love-rose via-pink-300 to-love-rose shadow-[0_0_15px_rgba(212,119,141,0.7)]" />
                      {/* Horizontal ribbon */}
                      <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-love-rose via-pink-300 to-love-rose shadow-[0_0_15px_rgba(212,119,141,0.7)]" />
                      {/* Seal */}
                      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}
                        className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-love-rose-deep via-love-rose to-pink-300 border-2 border-white/70 shadow-[0_0_25px_rgba(212,119,141,0.8)] flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                        <span className="text-xs font-playfair font-black text-white">S & P</span>
                      </motion.div>
                      <Sparkles className="absolute top-3 right-3 w-5 h-5 text-love-gold animate-pulse" />
                      <Star className="absolute bottom-3 left-3 w-5 h-5 text-love-rose fill-love-rose/40 animate-bounce" />
                    </div>
                  </motion.div>

                  <div className="text-center space-y-2">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleOpen}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-love-rose-deep via-love-rose to-love-gold text-white font-bold text-sm shadow-[0_0_25px_rgba(212,119,141,0.5)] flex items-center gap-2.5 mx-auto">
                      <Heart className="w-5 h-5 fill-white" /> Tap to unwrap our anniversary gift
                    </motion.button>
                    <p className="type-label text-love-faint flex items-center justify-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-love-rose" /> 5 anniversary coupons + a love letter inside
                    </p>
                  </div>
                </div>
              )}

              {/* Stage 2 — contents */}
              {isOpened && (
                <div className="space-y-4">
                  {/* Section tabs */}
                  <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                    {[
                      { id: 'coupons', label: '5 Anniversary coupons', icon: Heart },
                      { id: 'letter',  label: 'Anniversary letter',    icon: Sparkles },
                    ].map(t => (
                      <button key={t.id} onClick={() => setActiveSection(t.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                          activeSection === t.id
                            ? 'bg-love-rose text-white shadow'
                            : 'text-love-muted hover:text-white'}`}>
                        <t.icon className="w-3.5 h-3.5" /> {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Coupons */}
                  {activeSection === 'coupons' && (
                    <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
                      {ANNIVERSARY_COUPONS.map(coupon => {
                        const Icon = coupon.icon;
                        const isR  = !!redeemed[coupon.id];
                        const rData = redeemed[coupon.id];
                        return (
                          <motion.div key={coupon.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className={`relative rounded-2xl p-4 sm:p-5 border bg-gradient-to-r ${coupon.color} overflow-hidden`}>
                            {justRedeemed === coupon.id && (
                              <motion.div initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ duration: 0.9 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-start gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-playfair font-bold text-base text-white">{coupon.title}</h4>
                                    {isR && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                                        <Check className="w-3 h-3" /> Redeemed
                                      </span>
                                    )}
                                  </div>
                                  <p className="type-label text-white/60">{coupon.subtitle}</p>
                                  <p className="font-cormorant italic text-sm text-white/85 leading-relaxed pt-0.5">{coupon.description}</p>
                                  <p className="type-label text-white/40 pt-1">📌 {coupon.terms}</p>
                                </div>
                              </div>
                              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                                {!isR ? (
                                  <button onClick={() => handleRedeem(coupon)}
                                    className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-bold text-white flex items-center gap-1.5 transition-all active:scale-95">
                                    <Sparkles className="w-3.5 h-3.5 text-love-gold" /> Redeem
                                  </button>
                                ) : (
                                  <div className="space-y-1 text-right">
                                    <p className="type-label text-white/45">Claimed {rData?.formattedDate}</p>
                                    <a href={waLink(coupon)} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 text-xs font-medium transition-colors">
                                      Claim on WhatsApp <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Anniversary letter */}
                  {activeSection === 'letter' && (
                    <div className="parchment rounded-2xl p-5 sm:p-7 max-h-[52vh] overflow-y-auto space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2e160e]/20 pb-3">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-700 fill-rose-700" />
                          <span className="type-label font-bold text-[#2e160e]/80">Anniversary letter · March 24, 2026</span>
                        </div>
                        <span className="font-caveat text-sm text-[#2e160e]/60">Forever yours</span>
                      </div>
                      <div className="font-caveat text-xl sm:text-2xl text-[#2e160e] leading-relaxed space-y-3">
                        <p>My beloved {girlfriendName},</p>
                        <p>
                          March 24, 2026. The day our two lives finally collided into one shared heartbeat. From our first messages to the hours we spent holding hands, every single second with you has been the best thing that ever happened to me.
                        </p>
                        <p>
                          You gave me your full trust on April 8th — "Naa full ah trust panra unna" — and I promise you on everything I love that your heart is the safest place on earth in my care.
                        </p>
                        <p>
                          93,105 messages, 310,661 words, 101 days without a single gap. And still, every morning I wake up and the first thing I want to do is talk to you.
                        </p>
                        <p>
                          Happy Anniversary, my Thangam. Here is to a million more laughs, a thousand more late nights, and every single day after this one — together.
                        </p>
                        <p className="text-right pt-2 font-bold">— Always your {boyfriendName} 🌹</p>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <button onClick={() => setIsOpened(false)}
                      className="flex items-center gap-1.5 type-label text-love-rose hover:text-white transition-colors">
                      <RotateCcw className="w-3.5 h-3.5" /> Re-wrap
                    </button>
                    <p className="type-label text-love-gold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Progress saves automatically
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ==========================================================================
   SHALINI'S WONDERLAND - INTERACTIVE LOGIC & SOUND ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Data Store & State Management
    // ==========================================================================
    const DEFAULT_DATA = {
        boyfriendName: "Polonium",
        girlfriendName: "Shalini",
        youtubeSongId: "T6Td7uJ8rRI",
        anniversaryDate: "2026-03-24T18:00", // exact anniversary date!
        adminEmail: "polonium84r@gmail.com",
        loveLetters: [
            "From the moment you walked into my life, everything changed for the better. Your beautiful smile, the sound of your laughter, and the warmth of your kindness make my world a million times brighter. This little digital space is a tiny token of my love.",
            "Every time I think about Chennai Railway Station, my heart skips a beat. Out of all the trains, busy platforms, and travelers in the world, the universe guided me straight to you. You are my favorite destination.",
            "Watching Jananayagam together on our first movie date, my eyes kept drifting away from the screen just to look at your beautiful face. In the dark theater, holding your hand, my heart fell completely in love with you.",
            "I love the simple moments we share—the cozy coffee dates, the inside jokes we laugh at, and the way you hold my hand. Growing old with you is my ultimate dream. Thank you for walking this beautiful path.",
            "If I had a flower for every single time I thought of you, we could walk through our own beautiful garden forever. You are my dream come true, Shalini, today and for all my tomorrows.",
            "Your laugh is my absolute favorite soundtrack. It's like a soft, sweet melody that plays in my head and instantly clears away the heaviest of clouds. Keep laughing, my angel.",
            "I love the way your eyes sparkle when you talk about things you love. It's like watching a whole galaxy of stars glowing just for me. You are absolutely breath-taking.",
            "On stormy days, you are my quiet safe haven. Just the thought of you brings a sense of peace that nothing else in this world can replicate. Thank you for being my anchor.",
            "I fall in love with you all over again, every single day. Even in the simplest moments, like holding your hand in silence, my heart knows it has found its true home.",
            "You make me want to be the best version of myself, just for you. Your kind soul and beautiful mind inspire me to grow, to love deeper, and to cherish every single second.",
            "No matter where life takes us, my heart will always find its way back to you. You are my north star, my guiding light, and the quiet comfort I'll always look for.",
            "I love how sweet and caring you are to everyone around you. You carry a warmth that makes the world a softer, kinder place. I am so proud to stand by your side.",
            "My favorite place in the entire world is standing right next to you. It doesn't matter where we are—as long as I am holding your hand, I have everything I'll ever need.",
            "Shalini, you are my dream come true. You brought colors into my life that I didn't even know existed. Thank you for being my love, my peace, and my absolute favorite person.",
            "I love the cozy comfort of our inside jokes. They are like little secret treasures that only you and I share, a quiet reminder of how wonderfully we fit together.",
            "Your gentle voice has the power to calm my busiest thoughts. It's my favorite sound to wake up to and the sweetest whisper to fall asleep to. You are my peace.",
            "I love dreaming about our future together—cozy coffee mornings, quiet evening walks, and a home filled with endless laughter. Growing old with you is my greatest wish.",
            "Every song on the radio sounds like it was written about you. The lyrics describe a love so deep and beautiful, and every single word points straight to my feelings for you.",
            "You are my favorite adventure, Shalini. Walking through life with you is a journey of discovery, filled with sweet laughter, quiet comfort, and infinite love.",
            "I love all of your perfect imperfections. You are a masterpiece, a beautiful canvas of grace, intelligence, and kindness. I love you exactly as you are.",
            "The warmth of your touch is like a gentle promise. It reassures me, comforts me, and reminds me that I am never alone. You are my safe haven.",
            "You make my life a beautiful wonderland. Every corner of my world is brighter, happier, and filled with magic just because you are in it. I love you.",
            "I love the silent conversations we share—the knowing looks, the gentle squeezes of the hand, and the quiet comfort of just sitting in peace together.",
            "Your kindness is your greatest strength. The way you care for others with such a gentle heart makes me fall in love with you deeper and deeper every single day.",
            "F1 cars might speed down the track, but the acceleration of my love for you beats them all. You are my victory lap, my champion, and my heart's ultimate race.",
            "If I could paint my heart, it would be filled with shades of your beautiful smile. You are the light that paints my world with joy and happiness.",
            "I love the quiet mornings we share—the cozy blankets, the warmth of coffee, and the sweet peace of knowing you are right next to me. You are my home.",
            "Your eyes hold a beautiful depth, like a quiet night sky filled with infinite stars. Looking into them, I see my favorite galaxy and my beautiful future.",
            "I promise to stand by your side through every single storm. I will be your shield, your comfort, and your constant support, today and for all our tomorrows.",
            "I love our cozy winter dates, wrapped in warm sweaters and soft laughter. The cold weather only gives me a better reason to hold you closer and never let go.",
            "You are my quiet peace on stormy days. When the world gets too loud, your gentle presence is the only thing that can bring quiet comfort back to my heart.",
            "Meeting you at the Chennai station was not a coincidence—it was written in the stars. The universe aligned platform paths just to guide me straight to my love.",
            "I love the sweet surprise of your smiles. They break through any cloudy day like bright sunbeams, reminding me of how lucky I am to have you in my life.",
            "I wrote your name on a star in the night sky, a quiet promise that my love for you is infinite, glowing, and will outlast time itself. You are my heaven.",
            "I love the cozy comfort of holding your hand. Our fingers lace together so perfectly, like two pieces of a puzzle that have finally found where they belong.",
            "You are my favorite destination. No matter where we travel, the journey is only beautiful because I am walking it with you. You are my ultimate home.",
            "I love how you hold my heart so gently. I trust you completely, knowing that my feelings, my dreams, and my absolute peace are completely safe in your hands.",
            "Your intelligence and beautiful mind fascinate me. Listening to you speak, share your thoughts, and show your wisdom makes my heart swell with infinite pride.",
            "I promise to fill your days with sweet surprises, quiet comforts, and reasons to smile. You deserve all the happiness in the world, and I want to give it to you.",
            "Tapping the compliment jar or reading these letters is a small reminder that my love for you is active, constant, and grows deeper with every single heartbeat.",
            "I love the simple walks we share, holding hands and chatting about nothing. Those quiet paths are where my happiest memories are built, step by step, with you.",
            "Your laughter is like a gentle summer breeze—warm, sweet, and carrying the quiet comfort of absolute peace. It is the only melody my heart ever wants to hear.",
            "I see a beautiful future in your eyes, filled with quiet mornings, shared coffee cups, cozy rocking chairs, and an infinite love that grows stronger with age.",
            "I love your gentle guidance. Your wisdom, soft heart, and beautiful perspective help me see the world in a brighter, kinder way. Thank you for guiding me.",
            "You are my ultimate victory. Having you in my life makes every other success feel beautiful and complete. You are my heart's greatest and only treasure.",
            "I love the way you lean against me, finding comfort in my embrace. Being your protector, your safe place, and your quiet comfort is my greatest honor.",
            "Every single memory we've shared is etched in gold inside my heart. From Chennai platforms to movie dates, they are the most valuable treasures I'll ever own.",
            "I promise to listen to you, to understand you, and to cherish your quiet thoughts. Your voice is my anchor, and your mind is a beautiful sanctuary I love.",
            "I love the cozy feeling of our coffee dates, holding warm cups and talking for hours. Those quiet, sweet moments are where my heart feels completely at home.",
            "Your smile is my daily dose of happiness. It has the magic to turn the darkest mornings into bright, glowing days, filled with quiet comfort and love.",
            "Knowing you love me is the single greatest gift I have ever received. It makes me stand taller, love deeper, and face the world with a heart full of peace.",
            "September gave us two of our most unforgettable days. On September 6, coming to your home and meeting you in your own world made my heart so full. And on September 19, when you walked into my home for the very first time, having you in my space made my entire universe feel complete.",
            "This is my promise for all our tomorrows: I will love you, protect you, and cherish you with every single beat of my heart. Forever and always, Yours, Polonium."
        ],
        milestones: [
            { id: 1, date: "2025-07-12", title: "First Met in Chennai", text: "July 12, 2025. Amidst the rush of the Chennai Railway Station, our paths crossed for the very first time. One look at you, and the busy world faded into quiet magic." },
            { id: 2, date: "2026-03-24", title: "Our Love Began", text: "The official beginning of our beautiful journey together. The day our hearts decided to beat as one." },
            { id: 3, date: "2026-04-07", title: "The First \"Luv u\"", text: "The day you first let it slip — \"Luv u kuda solala.\" Four little words that changed everything for me." },
            { id: 4, date: "2026-04-08", title: "Full Trust", text: "\"Naa full ah trust panra unna.\" You handed me your whole heart, and I promised to keep it safe forever." },
            { id: 5, date: "2026-05-08", title: "I Said It Back", text: "My turn to say it out loud — \"Luv u 🥺🫂.\" I meant every letter, and I still do, every single day." },
            { id: 6, date: "2026-05-14", title: "Our Most Unstoppable Day", text: "3,084 messages in a single day. We just couldn't stop talking — our busiest, most in-love day ever." },
            { id: 7, date: "2026-06-08", title: "En Kanmani", text: "\"Una kathalecha en manasu ku savu illa de en kanmani.\" Loving you keeps my heart alive, my kanmani." },
            { id: 8, date: "2026-07-14", title: "101 Days & Counting", text: "Still texting you every single day, without a single gap. A hundred-and-one days of us — and this is only the beginning." },
            { id: 9, date: "2026-07-25", title: "First Movie Date", text: "Watching Jananayagam together for our very first movie date. Sitting side by side in the dark, my heart raced, because your hand was in mine." },
            { id: 10, date: "2026-09-06", title: "First Time at Her Home", text: "The very first time I visited your home and met you in your own world. Seeing you there made my whole heart light up." },
            { id: 11, date: "2026-09-19", title: "First Time at My Home", text: "The day you came to my home for the first time. Having you in my space felt like having my entire universe right beside me." }
        ],
        compliments: [
            "Your smile is my absolute favorite sight in the entire world.",
            "You have the most beautiful heart and kindest soul I've ever known.",
            "Just thinking about you makes my hardest days feel completely easy.",
            "I love the way you laugh at my silly jokes, even when they aren't funny.",
            "Every single song on the radio sounds like it was written about you.",
            "You are my safe haven, my peace, and my absolute favorite adventure.",
            "The world is a million times brighter just because you are in it.",
            "I fall in love with you all over again, every single day.",
            "You make me want to be the best version of myself, just for you.",
            "I love all of your perfect imperfections. You are a masterpiece.",
            "No matter where I go, my heart always finds its way back to you.",
            "You are the best thing that has ever been mine.",
            "I love how sweet and caring you are to everyone around you.",
            "My favorite place in the world is standing right next to you.",
            "Shalini, you are my dream come true, today and for all my tomorrows."
        ]
    };

    let appData = {};

    // Load from LocalStorage or Load Defaults
    function loadData() {
        const saved = localStorage.getItem('shalini_universe_v7_data');
        if (saved) {
            try {
                appData = JSON.parse(saved);
                // Backfill compliments if they are missing
                if (!appData.compliments || appData.compliments.length === 0) {
                    appData.compliments = DEFAULT_DATA.compliments;
                }
                if (!appData.youtubeSongId) {
                    appData.youtubeSongId = DEFAULT_DATA.youtubeSongId;
                }
                if (appData.adminEmail === undefined) {
                    appData.adminEmail = DEFAULT_DATA.adminEmail;
                }
                if (!Array.isArray(appData.loveLetters)) {
                    appData.loveLetters = [...DEFAULT_DATA.loveLetters];
                } else if (appData.loveLetters.length < DEFAULT_DATA.loveLetters.length) {
                    // Append newer default letters without overwriting saved ones
                    appData.loveLetters = appData.loveLetters.concat(
                        DEFAULT_DATA.loveLetters.slice(appData.loveLetters.length)
                    );
                }
                if (!appData.loveLetter) {
                    appData.loveLetter = appData.loveLetters[0];
                }
                // Sync custom letter into index 0 of the randomizer loop
                appData.loveLetters[0] = appData.loveLetter;

                // Migrate movie date if cached from previous version
                if (Array.isArray(appData.milestones)) {
                    appData.milestones.forEach(m => {
                        if (m.title === "First Met in Chennai" || (m.text && m.text.includes("Chennai Railway Station"))) {
                            m.date = "2025-07-12";
                            m.title = "First Met in Chennai";
                            m.text = "July 12, 2025. Amidst the rush of the Chennai Railway Station, our paths crossed for the very first time. One look at you, and the busy world faded into quiet magic.";
                        }
                        if (m.title === "First Movie Date" || m.date === "2026-06-12" || (m.text && m.text.includes("F1 movie"))) {
                            m.date = "2026-07-25";
                            m.title = "First Movie Date";
                            m.text = "Watching Jananayagam together for our very first movie date. Sitting side by side in the dark, my heart raced, because your hand was in mine.";
                        }
                    });

                    // Ensure September home visit milestones are present
                    const hasSep6 = appData.milestones.some(m => m.date === "2026-09-06" || m.title === "First Time at Her Home");
                    if (!hasSep6) {
                        appData.milestones.push({
                            id: appData.milestones.length + 1,
                            date: "2026-09-06",
                            title: "First Time at Her Home",
                            text: "The very first time I visited your home and met you in your own world. Seeing you there made my whole heart light up."
                        });
                    }
                    const hasSep19 = appData.milestones.some(m => m.date === "2026-09-19" || m.title === "First Time at My Home");
                    if (!hasSep19) {
                        appData.milestones.push({
                            id: appData.milestones.length + 1,
                            date: "2026-09-19",
                            title: "First Time at My Home",
                            text: "The day you came to my home for the first time. Having you in my space felt like having my entire universe right beside me."
                        });
                    }
                }
                if (Array.isArray(appData.loveLetters)) {
                    appData.loveLetters = appData.loveLetters.map(l => {
                        if (typeof l === 'string' && l.includes("F1 movie")) {
                            return DEFAULT_DATA.loveLetters[2];
                        }
                        return l;
                    });
                }
            } catch (e) {
                appData = { ...DEFAULT_DATA };
            }
        } else {
            appData = { ...DEFAULT_DATA };
            // Ensure first custom letter is preloaded
            appData.loveLetter = DEFAULT_DATA.loveLetters[0];
        }
        saveData();
    }

    function saveData() {
        localStorage.setItem('shalini_universe_v7_data', JSON.stringify(appData));
    }

    loadData();

    // ==========================================================================
    // 2. High-Performance Canvas Particle System (Cherry Blossoms & Embers)
    // ==========================================================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouse = { x: null, y: null, radius: 100 };
    let canvasW = window.innerWidth;
    let canvasH = window.innerHeight;

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasW = window.innerWidth;
        canvasH = window.innerHeight;
        canvas.width = Math.floor(canvasW * dpr);
        canvas.height = Math.floor(canvasH * dpr);
        canvas.style.width = `${canvasW}px`;
        canvas.style.height = `${canvasH}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        particles.forEach((p) => {
            if (p.x > canvasW) p.x = Math.random() * canvasW;
            if (p.y > canvasH) p.y = Math.random() * canvasH;
        });
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', resizeCanvas);
    }

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches[0]) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvasW;
            this.y = Math.random() * -50 - 10;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = Math.random() * 1 - 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            // Type: 0 = Sakura Petal (pink), 1 = Glowing Sparkle (gold)
            this.type = Math.random() > 0.3 ? 0 : 1;
            this.oscillationSpeed = Math.random() * 0.02 + 0.005;
            this.oscillationDistance = Math.random() * 1.5 + 0.5;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.angle += this.oscillationSpeed;
            this.x += Math.sin(this.angle) * this.oscillationDistance + this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Mouse interaction: push away gently
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 4;
                    this.y += Math.sin(angle) * force * 4;
                }
            }

            // Recycle off-screen particles
            if (this.y > canvasH || this.x < -20 || this.x > canvasW + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;

            if (this.type === 0) {
                // Sakura Petal Design
                ctx.fillStyle = '#ff7b93';
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
                ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
                ctx.fill();
            } else {
                // Glowing Gold Star
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffd700';
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(0, -this.size/2);
                    ctx.rotate(Math.PI / 5);
                    ctx.lineTo(0, -this.size/4);
                    ctx.rotate(Math.PI / 5);
                }
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Initialize Particle Pool
    function initParticles() {
        const particleCount = Math.min(65, Math.floor((canvasW * canvasH) / 18000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const p = new Particle();
            p.y = Math.random() * canvasH; // Spread initially
            particles.push(p);
        }
    }
    initParticles();
    window.addEventListener('resize', () => {
        const target = Math.min(65, Math.floor((canvasW * canvasH) / 18000));
        while (particles.length < target) particles.push(new Particle());
        if (particles.length > target) particles.length = target;
    });

    // Trigger Sparkle bursts on click events (e.g. Jar tap or quiz win)
    function spawnSparkleBurst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const p = new Particle();
            p.x = x;
            p.y = y;
            p.speedY = Math.random() * 4 - 2;
            p.speedX = Math.random() * 4 - 2;
            p.opacity = 1;
            p.type = 1; // Pure gold sparkles
            p.size = Math.random() * 6 + 3;
            // Force temporary lifecycle
            p.update = function() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY += 0.05; // gravity
                this.opacity -= 0.02;
                if (this.opacity <= 0) {
                    const idx = particles.indexOf(this);
                    if (idx > -1) particles.splice(idx, 1);
                }
            };
            particles.push(p);
        }
    }

    // Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvasW, canvasH);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);

    // ==========================================================================
    // 3. Background Music Controller Engine
    // ==========================================================================
    let isMusicPlaying = false;
    const musicToggleBtn = document.getElementById('music-toggle');
    const bgYoutubeIframe = document.getElementById('bg-youtube-iframe');

    function extractYoutubeId(urlOrId) {
        if (!urlOrId) return DEFAULT_DATA.youtubeSongId;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = urlOrId.match(regExp);
        return (match && match[2].length === 11) ? match[2] : urlOrId.trim();
    }

    function playBackgroundMusic() {
        if (!bgYoutubeIframe) return;
        const songId = appData.youtubeSongId || DEFAULT_DATA.youtubeSongId;
        bgYoutubeIframe.src = `https://www.youtube.com/embed/${songId}?autoplay=1&enablejsapi=1`;
        isMusicPlaying = true;
        if (musicToggleBtn) {
            musicToggleBtn.classList.add('music-playing');
        }
    }

    function stopBackgroundMusic() {
        if (!bgYoutubeIframe) return;
        bgYoutubeIframe.src = "";
        isMusicPlaying = false;
        if (musicToggleBtn) {
            musicToggleBtn.classList.remove('music-playing');
        }
    }

    function toggleBackgroundMusic() {
        if (isMusicPlaying) {
            stopBackgroundMusic();
            showToast("Background music paused 🔇");
        } else {
            playBackgroundMusic();
            showToast("Playing background music 🔊");
        }
    }

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', toggleBackgroundMusic);
    }


    // ==========================================================================
    // 4. Live Anniversary Count-Up Timer logic
    // ==========================================================================
    function runLiveTimer() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const displayDate = document.getElementById('anniversary-date-display');

        function updateTimer() {
            const startDate = new Date(appData.anniversaryDate);
            const now = new Date();
            let diff = now - startDate;

            // Handle future dates gracefully if she checks countdown to wedding/etc.
            const isFuture = diff < 0;
            if (isFuture) {
                diff = Math.abs(diff);
                document.querySelector('.counter-title').innerText = `Countdown to Our Day! 💖`;
            } else {
                document.querySelector('.counter-title').innerText = `Days of Loving ${appData.girlfriendName}`;
            }

            const sec = 1000;
            const min = sec * 60;
            const hr = min * 60;
            const day = hr * 24;

            const days = Math.floor(diff / day);
            const hours = Math.floor((diff % day) / hr);
            const minutes = Math.floor((diff % hr) / min);
            const seconds = Math.floor((diff % min) / sec);

            daysEl.innerText = String(days).padStart(3, '0');
            hoursEl.innerText = String(hours).padStart(2, '0');
            minutesEl.innerText = String(minutes).padStart(2, '0');
            secondsEl.innerText = String(seconds).padStart(2, '0');

            // Format date string for bottom
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            displayDate.innerText = `Since ${startDate.toLocaleDateString('en-US', options)}`;
        }

        setInterval(updateTimer, 1000);
        updateTimer();
    }
    runLiveTimer();

    // Set romantic greeting based on time of day
    function setGreeting() {
        const hr = new Date().getHours();
        const greetEl = document.getElementById('greeting');
        let txt = `Hello, Beautiful`;
        
        if (hr >= 5 && hr < 12) {
            txt = `Good Morning, Beautiful ☀️`;
        } else if (hr >= 12 && hr < 17) {
            txt = `Good Afternoon, My Angel 🌸`;
        } else if (hr >= 17 && hr < 22) {
            txt = `Good Evening, My Queen 🌹`;
        } else {
            txt = `Sweet Dreams, ${appData.girlfriendName || "Beautiful"} ✨`;
        }
        greetEl.innerText = txt;
    }
    setGreeting();

    // ==========================================================================
    // 5. Navigation & Screen Flow handling
    // ==========================================================================
    // Global listener to trigger music autoplay policy bypass on first interaction
    document.addEventListener('click', () => {
        if (!isMusicPlaying) {
            playBackgroundMusic();
        }
    }, { once: true });

    // Smooth section transition via nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.scroll-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(sec => {
                if (sec.id === targetId || (targetId === 'romance-section' && sec.id === 'romance-section')) {
                    sec.classList.add('active-section');
                } else {
                    sec.classList.remove('active-section');
                }
            });
            if (targetId === 'journey-section') animateChatStats();
            window.scrollTo(0, 0);
        });
    });

    // ==========================================================================
    // 6. The Handwritten Letter Archive Logic
    // ==========================================================================
    const letterModal = document.getElementById('letter-archive-modal');
    const letterCloseBtn = document.getElementById('letter-close-btn');

    function renderArchiveGrid() {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;
        grid.innerHTML = "";

        const letters = appData.loveLetters || DEFAULT_DATA.loveLetters;
        
        letters.forEach((_letter, idx) => {
            const item = document.createElement('div');
            item.className = "archive-envelope-item";
            item.setAttribute('data-letter-idx', idx);

            item.innerHTML = `
                <div class="mini-envelope">
                    <div class="mini-flap"></div>
                    <div class="mini-pocket"></div>
                    <div class="wax-seal">${idx + 1}</div>
                </div>
                <span class="envelope-label">Letter ${idx + 1}</span>
            `;

            // Attach click event listener dynamically
            item.addEventListener('click', (e) => {
                const activeLetters = appData.loveLetters || DEFAULT_DATA.loveLetters;
                const selectedLetter = activeLetters[idx] || activeLetters[0] || "";

                // Set content in the cursive parchment letter
                document.getElementById('archive-letter-title').innerText = `Letter ${idx + 1}`;
                document.getElementById('archive-letter-body').innerHTML = escapeHtml(selectedLetter).replace(/\n/g, '<br>');
                document.getElementById('archive-letter-signature').innerText = appData.boyfriendName || "Polonium";

                // Sparkle burst at click coordinates
                spawnSparkleBurst(e.clientX, e.clientY, 20);

                // Open the letter overlay modal
                letterModal.classList.add('active');
            });

            grid.appendChild(item);
        });
    }
    renderArchiveGrid();

    if (letterCloseBtn) {
        letterCloseBtn.addEventListener('click', () => {
            letterModal.classList.remove('active');
        });
    }

    // Close modal on background overlay click
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            letterModal.classList.remove('active');
        }
    });



    // ==========================================================================
    // 7. Compliment Origami Jar Logic
    // ==========================================================================
    const jar = document.getElementById('compliment-jar');
    const complimentText = document.getElementById('compliment-text');
    let lastCompliments = [];

    jar.addEventListener('click', () => {
        jar.classList.add('shake');
        


        // Spawn gold stars floating out of the jar coordinates
        const rect = jar.getBoundingClientRect();
        spawnSparkleBurst(rect.left + rect.width/2, rect.top + 30, 15);

        // Pick unique compliment
        setTimeout(() => {
            jar.classList.remove('shake');
            
            const pool = appData.compliments.filter(c => !lastCompliments.includes(c));
            const selectPool = pool.length > 0 ? pool : appData.compliments;
            const comp = selectPool[Math.floor(Math.random() * selectPool.length)];
            
            // Track last 4 compliments to avoid immediate duplicates
            lastCompliments.push(comp);
            if (lastCompliments.length > 4) lastCompliments.shift();

            // Reveal scroll card text
            complimentText.style.opacity = 0;
            setTimeout(() => {
                complimentText.innerHTML = `✨ <strong>${escapeHtml(appData.girlfriendName || "Shalini")}</strong>, ${escapeHtml(comp)} ✨`;
                complimentText.style.opacity = 1;
            }, 150);

        }, 400);
    });

    // ==========================================================================
    // 8. Dynamic Timeline & Journey Render
    // ==========================================================================
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        container.innerHTML = "";
        
        // Sort milestones by date ascending
        const sorted = [...appData.milestones].sort((a, b) => new Date(a.date) - new Date(b.date));

        sorted.forEach(m => {
            const node = document.createElement('div');
            node.className = "timeline-node";
            
            const dateStr = new Date(m.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            
            node.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-card glass">
                    <div class="timeline-date">${dateStr}</div>
                    <h3 class="timeline-title">${escapeHtml(m.title)}</h3>
                    <p class="timeline-body">${escapeHtml(m.text)}</p>
                </div>
            `;
            container.appendChild(node);
        });
    }
    renderTimeline();



    // ==========================================================================
    // 10. Starry Wish Board & Floating Stars
    // ==========================================================================
    const wishInput = document.getElementById('wish-input');
    const wishBtn = document.getElementById('wish-submit-btn');
    const wishesList = document.getElementById('wishes-list');
    let loadedWishes = [];

    function loadWishes() {
        const saved = localStorage.getItem('shalini_wishes');
        if (saved) {
            loadedWishes = JSON.parse(saved);
        } else {
            loadedWishes = ["Grow old together 💖", "A cozy woodhouse in the woods 🌲", "Infinite laughters & coffee dates ☕"];
        }
        renderWishes();
    }

    function renderWishes() {
        wishesList.innerHTML = "";
        loadedWishes.forEach(w => {
            const pill = document.createElement('span');
            pill.className = "wish-pill";
            pill.innerText = w;
            wishesList.appendChild(pill);
        });
    }

    wishBtn.addEventListener('click', () => {
        const txt = wishInput.value.trim();
        if (txt === "") return;

        loadedWishes.push(txt);
        if (loadedWishes.length > 20) loadedWishes.shift(); // Max 20 history
        localStorage.setItem('shalini_wishes', JSON.stringify(loadedWishes));
        
        wishInput.value = "";
        renderWishes();

        // Release Floating 3D Star
        createFloatingStar(txt);

        // Send email via FormSubmit if email is configured
        if (appData.adminEmail && appData.adminEmail.trim() !== "") {
            fetch(`https://formsubmit.co/ajax/${appData.adminEmail.trim()}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: "Shalini's Starry Wish Board",
                    wish: txt
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Wish emailed successfully via FormSubmit:", data);
            })
            .catch(err => {
                console.error("Error emailing wish:", err);
            });
        }
    });

    function createFloatingStar(text) {


        const star = document.createElement('div');
        star.className = "floating-wish-star";
        star.innerHTML = `★`;
        
        // Random horizontal positions
        const startX = Math.random() * (window.innerWidth - 100) + 50;
        const startY = window.innerHeight - 80;
        
        const dx = (Math.random() * 400 - 200) + 'px';
        const dy = (-window.innerHeight + 150) + 'px';

        star.style.left = startX + 'px';
        star.style.top = startY + 'px';
        star.style.setProperty('--dx', dx);
        star.style.setProperty('--dy', dy);

        // Attach text bubble inside
        const txtSpan = document.createElement('span');
        txtSpan.className = "floating-wish-text";
        txtSpan.innerText = text;
        star.appendChild(txtSpan);

        document.body.appendChild(star);

        // Sparkle trail
        spawnSparkleBurst(startX, startY, 10);

        // Remove node after animation finishes
        setTimeout(() => {
            star.remove();
        }, 6000);
    }

    loadWishes();

    // ==========================================================================
    // 11. Hidden Configuration Admin Panel Modal
    // ==========================================================================
    const adminModal = document.getElementById('admin-modal');
    const adminTrigger = document.getElementById('admin-trigger');
    const adminClose = document.getElementById('admin-close-btn');
    const adminForm = document.getElementById('admin-form');
    const milestonesEditor = document.getElementById('milestones-editor');
    const addMilestoneBtn = document.getElementById('add-milestone-btn');

    if (adminTrigger) {
        adminTrigger.addEventListener('click', () => {
            // Populate inputs with current app state
            document.getElementById('boyfriend-name-input').value = appData.boyfriendName;
            document.getElementById('girlfriend-name-input').value = appData.girlfriendName;
            document.getElementById('anniversary-date-input').value = appData.anniversaryDate;
            document.getElementById('admin-email-input').value = appData.adminEmail || "";
            document.getElementById('love-letter-input').value = appData.loveLetter;
            document.getElementById('youtube-song-id-input').value = appData.youtubeSongId || DEFAULT_DATA.youtubeSongId;

            renderMilestoneInputs();
            adminModal.classList.add('active');
        });
    }

    adminClose.addEventListener('click', () => {
        adminModal.classList.remove('active');
    });

    // Close on overlay tap
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) adminModal.classList.remove('active');
    });

    // Build lists of editor inputs for milestones
    function renderMilestoneInputs() {
        milestonesEditor.innerHTML = "";
        appData.milestones.forEach((m, idx) => {
            const div = document.createElement('div');
            div.className = "milestone-edit-block";
            div.innerHTML = `
                <button type="button" class="btn-remove-milestone" data-idx="${idx}">&times; Remove</button>
                <div class="form-group-row" style="margin-bottom: 10px;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Date:</label>
                        <input type="date" class="m-date-input" value="${escapeHtml(m.date)}" required>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Title:</label>
                        <input type="text" class="m-title-input" value="${escapeHtml(m.title)}" required>
                    </div>
                </div>
                <div class="form-group" style="margin: 0;">
                    <label>Description:</label>
                    <textarea class="m-desc-input" rows="2" required>${escapeHtml(m.text)}</textarea>
                </div>
            `;
            milestonesEditor.appendChild(div);
        });

        // Add bind to remove buttons
        const rmButtons = milestonesEditor.querySelectorAll('.btn-remove-milestone');
        rmButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'));
                appData.milestones.splice(idx, 1);
                renderMilestoneInputs();
            });
        });
    }

    addMilestoneBtn.addEventListener('click', () => {
        appData.milestones.push({
            id: appData.milestones.length + 1,
            date: new Date().toISOString().split('T')[0],
            title: "New Miracle Moment",
            text: "Describe this beautiful day we shared..."
        });
        renderMilestoneInputs();
    });

    // Save Admin adjustments
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();

        appData.boyfriendName = document.getElementById('boyfriend-name-input').value;
        appData.girlfriendName = document.getElementById('girlfriend-name-input').value;
        appData.anniversaryDate = document.getElementById('anniversary-date-input').value;
        appData.adminEmail = document.getElementById('admin-email-input').value.trim();
        
        appData.loveLetter = document.getElementById('love-letter-input').value;
        if (appData.loveLetters) {
            appData.loveLetters[0] = appData.loveLetter;
        }
        
        const rawSongVal = document.getElementById('youtube-song-id-input').value;
        appData.youtubeSongId = extractYoutubeId(rawSongVal);
        
        if (isMusicPlaying) {
            playBackgroundMusic();
        }

        // Re-read milestone list
        const blocks = milestonesEditor.querySelectorAll('.milestone-edit-block');
        const newMilestones = [];
        blocks.forEach((block, idx) => {
            newMilestones.push({
                id: idx + 1,
                date: block.querySelector('.m-date-input').value,
                title: block.querySelector('.m-title-input').value,
                text: block.querySelector('.m-desc-input').value
            });
        });
        appData.milestones = newMilestones;

        saveData();
        adminModal.classList.remove('active');

        // Force UI components updates
        renderTimeline();
        renderArchiveGrid();
        setGreeting();
        
        initDailyLoveNote();
        showToast("Magical changes saved successfully! ✨");
    });

    document.getElementById('admin-reset-defaults').addEventListener('click', () => {
        if (confirm("Reset everything to romantic defaults?")) {
            appData = { ...DEFAULT_DATA };
            saveData();
            location.reload();
        }
    });



    // ==========================================================================
    // 12. Secret Love Note — Daily Message (365 unique messages)
    // ==========================================================================
    const DAILY_OPENERS = [
        "Today whispers:",
        "Day {day} of the year reminds me:",
        "This morning's secret for you:",
        "A little note for today only:",
        "Unfolding today's love scroll:",
        "Just between us, on this day:",
        "Your daily dose of adoration:",
        "Written in the stars for today:"
    ];

    const DAILY_CLOSERS = [
        " — and I'd choose you again.",
        " Forever yours in every heartbeat.",
        " You are my favorite chapter, always.",
        " With all my love, today and always.",
        " Missing you is just loving you in another form.",
        " Can't wait to hold you closer soon.",
        " You make ordinary days feel like magic.",
        " My heart is yours, no expiration date."
    ];

    function buildDailyMessages() {
        const cores = [
            ...(DEFAULT_DATA.loveLetters || []),
            ...(DEFAULT_DATA.compliments || []),
            "You are the reason I believe in beautiful beginnings.",
            "Every sunrise feels softer because I get to love you.",
            "Your name is the sweetest word my heart knows.",
            "Distance is nothing when someone means everything.",
            "I collect moments with you like precious stars.",
            "You turned my world from grayscale into rose gold.",
            "Loving you is the easiest and bravest thing I've done.",
            "Your voice is my favorite place to rest my thoughts.",
            "I dream in the language of your smile.",
            "You are my calm, my spark, and my forever home.",
            "The best part of my day is always you.",
            "I would relive our Chennai moment a thousand times.",
            "Our coffee dates are chapters I never want to end.",
            "Holding your hand rewires my soul for happiness.",
            "You are poetry written in a language only we speak.",
            "My heart learned new rhythms the day I met you.",
            "You are worth every soft word and every bold promise.",
            "I love you more than yesterday, less than tomorrow.",
            "Your kindness is a lighthouse in my busiest storms.",
            "Every heartbeat spells your beautiful name.",
            "You are the wish I made that actually came true.",
            "With you, even silence feels like a love song.",
            "I am endlessly proud to call you mine, Shalini.",
            "You are the sparkle in my quietest nights.",
            "Loving you feels like coming home every single time."
        ];

        const messages = [];
        for (let d = 0; d < 365; d++) {
            const opener = DAILY_OPENERS[d % DAILY_OPENERS.length].replace("{day}", String(d + 1));
            const core = cores[d % cores.length];
            const closer = DAILY_CLOSERS[(d * 3) % DAILY_CLOSERS.length];
            messages.push(`${opener} ${core}${closer}`);
        }
        return messages;
    }

    const DAILY_MESSAGES = buildDailyMessages();

    function getDayOfYear(date = new Date()) {
        const start = new Date(date.getFullYear(), 0, 0);
        return Math.floor((date - start) / 86400000);
    }

    function initDailyLoveNote() {
        const msgEl = document.getElementById('daily-note-message');
        const dateEl = document.getElementById('daily-note-date');
        if (!msgEl) return;

        const now = new Date();
        const dayIndex = getDayOfYear(now) - 1;
        const message = DAILY_MESSAGES[dayIndex] || DAILY_MESSAGES[0];

        const dateOpts = { weekday: 'long', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', dateOpts);

        msgEl.style.opacity = '0';
        setTimeout(() => {
            msgEl.textContent = message;
            msgEl.style.opacity = '1';
        }, 80);
    }
    initDailyLoveNote();

    // ==========================================================================
    // 13. Love Letter Generator (mood → unique template letter)
    // ==========================================================================
    const LETTER_THEMES = {
        romantic: {
            titles: ["My Dearest {her}", "To the Love of My Life", "For My Beautiful {her}"],
            openings: [
                "When I sit down to write to you, the world grows quiet — because every thought leads back to you.",
                "There are no words grand enough for what you mean to me, yet I must try, because you deserve to hear it again and again.",
                "My heart has been composing this letter since the day we met, and it still hasn't found the ending."
            ],
            bodies: [
                "Your smile is the sunrise I never want to miss. Your laughter is the melody that turns ordinary days into memories I treasure. With you, love is not a feeling I visit — it is the home I live in.",
                "I think of our moments — Chennai, movie nights, coffee cups shared — and I realize that my favorite place in the universe is wherever you are standing beside me.",
                "You have taught me that romance is not only grand gestures, but the gentle way you care, the patience in your eyes, and the warmth of your hand in mine."
            ],
            closings: [
                "I will keep choosing you, in every season, in every mood, in every tomorrow we are lucky enough to share.",
                "Until I can wrap you in my arms again, know that you are loved beyond measure.",
                "Forever and always — today, tomorrow, and every day the stars allow."
            ]
        },
        playful: {
            titles: ["Hey Gorgeous {her} 😊", "Open When You Need a Smile", "Official Notice: You're Amazing"],
            openings: [
                "Consider this your certified, 100% genuine, no-refunds love letter — because you are ridiculously wonderful.",
                "Warning: reading this may cause uncontrollable smiling, random blushing, and an urge to text me back immediately.",
                "If smiles were currency, you'd be the richest person alive — and I'd still be trying to spoil you anyway."
            ],
            bodies: [
                "You make my heart do that silly cartwheel thing, like we're teenagers again — except now I actually know how rare and precious you are.",
                "I love our inside jokes, our teasing, and the way you pretend to be annoyed when you're secretly smiling. You are my favorite chaos in the best possible way.",
                "Honestly? You're my favorite notification, my favorite distraction, and my favorite reason to stay up talking way too late."
            ],
            closings: [
                "Now go be adorable somewhere so I can keep falling for you.",
                "P.S. — You owe me one hug. Interest accrues daily. 💕",
                "Your forever fan and partner-in-crime,"
            ]
        },
        missing: {
            titles: ["Missing You, {her}", "A Letter Across the Distance", "When You're Not Here"],
            openings: [
                "The room feels different when you're not in it — softer somehow, but incomplete, like a song missing its chorus.",
                "I counted the hours today, not because time is slow, but because every hour without you is an hour I wish I could give back to us.",
                "Distance is cruel only because it reminds me how much of my peace lives in your presence."
            ],
            bodies: [
                "I replay your voice in my mind, the way you say my name, the quiet comfort of your messages, and I hold onto the promise that this space between us is temporary.",
                "Missing you is not emptiness — it is proof. Proof that what we have is real, precious, and worth every second of waiting.",
                "I close my eyes and I'm back at the station, at the theater, at your side — and I know with certainty that I'd walk any distance just to see you again."
            ],
            closings: [
                "Until I can hold you again, I'm sending all my love across every mile.",
                "Come back to me soon — my arms remember exactly where you belong.",
                "Counting down to the next time I see your beautiful face,"
            ]
        },
        morning: {
            titles: ["Good Morning, {her} ☀️", "As the Sun Rises", "First Light, First Thought: You"],
            openings: [
                "Before the day begins its noise, I wanted you to be the first gentle thought in your own morning — because you are always the first in mine.",
                "The sun rose today, but my day truly starts when I think of you — warm, bright, and impossible to ignore.",
                "Another morning, another chance to tell you: you are loved, cherished, and deeply adored."
            ],
            bodies: [
                "May your coffee be warm, your heart be light, and your path today be lined with small beautiful surprises — the kind you always deserve.",
                "I hope today treats you kindly, the way you treat everyone around you — with grace, sweetness, and quiet strength.",
                "If today gets heavy, remember: you are not alone. I'm cheering for you from wherever I am, always on your side."
            ],
            closings: [
                "Have a magical day, my love. I'll be thinking of you.",
                "Go shine today — the world is luckier with you in it.",
                "With morning kisses sent across the miles,"
            ]
        },
        apology: {
            titles: ["I'm Sorry, {her}", "From My Heart to Yours", "Please Forgive Me"],
            openings: [
                "I'm writing this because you matter too much for pride to stand in the way of honesty and care.",
                "If I hurt you — even in a small way — I feel it deeply, because your happiness is part of my own.",
                "Love is not only joy and laughter; it is also accountability, humility, and the courage to say I'm sorry."
            ],
            bodies: [
                "You deserve patience, understanding, and gentleness — always. I'm sorry for any moment I fell short of that standard.",
                "I never want to be the reason your beautiful heart feels heavy. I want to be the reason it feels safe, valued, and loved.",
                "Thank you for your grace, your honesty, and the way you help us grow stronger together instead of apart."
            ],
            closings: [
                "I will do better — not just in words, but in actions, every day.",
                "Thank you for loving me even when I'm imperfect.",
                "Humbly, gratefully, and forever yours,"
            ]
        },
        anniversary: {
            titles: ["Happy Anniversary, {her} 🎉", "To Us — Another Beautiful Chapter", "Celebrating Our Love"],
            openings: [
                "Today we celebrate more than a date on the calendar — we celebrate every laugh, every milestone, and every heartbeat we've shared.",
                "Another chapter of us — and I wouldn't trade a single page for anything in the world.",
                "Looking back at our journey fills me with awe; looking forward fills me with hope and excitement."
            ],
            bodies: [
                "From Chennai to movie nights to dreams of tomorrow — our story is my proudest masterpiece, and you are its brightest star.",
                "Every day with you has been a gift: the ordinary moments made sacred, the hard moments made bearable, the beautiful moments made unforgettable.",
                "Here's to the love we've built, the memories we've collected, and the infinite adventures still waiting for us."
            ],
            closings: [
                "Happy anniversary, my love. Here's to forever.",
                "I celebrate you today and every day.",
                "Yours in every chapter yet to come,"
            ]
        },
        future: {
            titles: ["Our Future, {her}", "Dreams We're Building", "To All Our Tomorrows"],
            openings: [
                "When I imagine the future, it is never vague — it has your face, your voice, and your hand in mine.",
                "I don't just dream of tomorrow; I dream of us — steady, warm, and growing stronger with time.",
                "The best plans I've ever made all have one thing in common: you, beside me."
            ],
            bodies: [
                "I see cozy mornings, shared coffee, quiet walks, a home filled with laughter, and a love that deepens with every passing year.",
                "I see us supporting each other through storms, celebrating victories, and choosing each other again and again — on easy days and hard ones.",
                "Whatever the future holds, I know I want to face it with you — building a life that feels like ours in every meaningful way."
            ],
            closings: [
                "The future is brighter because you're in it.",
                "I can't wait to live every tomorrow with you.",
                "Forever planning forever with you,"
            ]
        },
        grateful: {
            titles: ["Thank You, {her}", "Grateful For You", "A Letter of Thanks"],
            openings: [
                "Sometimes love is loud — and sometimes it is a quiet thank you for the way you changed my life.",
                "I don't say it enough: thank you for being you, for choosing us, for the light you bring.",
                "Gratitude feels too small a word for what you mean to me, but it's where I'll start."
            ],
            bodies: [
                "Thank you for your patience, your sweetness, your strength, and the way you make me feel seen and valued.",
                "Thank you for the memories — the station, the dates, the conversations — each one a treasure I carry with me.",
                "Thank you for loving me in a way that makes me want to give you the world, or at least every good thing I can."
            ],
            closings: [
                "I am endlessly thankful for you.",
                "With a heart full of gratitude and love,",
                "Always appreciating you,"
            ]
        }
    };

    let lastGeneratedLetter = null;

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function fillTemplate(str, her, him) {
        return str.replace(/\{her\}/g, her).replace(/\{him\}/g, him);
    }

    function generateLoveLetter(mood) {
        const theme = LETTER_THEMES[mood] || LETTER_THEMES.romantic;
        const her = appData.girlfriendName || "Shalini";
        const him = appData.boyfriendName || "Polonium";

        const title = fillTemplate(pickRandom(theme.titles), her, him);
        const opening = fillTemplate(pickRandom(theme.openings), her, him);
        const body = fillTemplate(pickRandom(theme.bodies), her, him);
        const closing = fillTemplate(pickRandom(theme.closings), her, him);

        const fullBody = `${opening}\n\n${body}\n\n${closing}`;
        return { title, body: fullBody, sign: `Forever Yours,\n${him}` };
    }

    function showGeneratedLetter(letter) {
        lastGeneratedLetter = letter;
        const preview = document.getElementById('generated-letter-preview');
        const regenBtn = document.getElementById('regenerate-letter-btn');

        document.getElementById('generated-letter-title').textContent = letter.title;
        document.getElementById('generated-letter-body').textContent = letter.body;
        document.getElementById('generated-letter-sign').textContent = letter.sign;

        preview.classList.remove('hidden');
        if (regenBtn) regenBtn.hidden = false;
    }

    const generateLetterBtn = document.getElementById('generate-letter-btn');
    const regenerateLetterBtn = document.getElementById('regenerate-letter-btn');
    const moodSelect = document.getElementById('letter-mood-select');

    function runLetterGenerator() {
        const mood = moodSelect ? moodSelect.value : 'romantic';
        const letter = generateLoveLetter(mood);
        showGeneratedLetter(letter);
        showToast("A new love letter has been written for you 💌");
    }

    if (generateLetterBtn) {
        generateLetterBtn.addEventListener('click', runLetterGenerator);
    }
    if (regenerateLetterBtn) {
        regenerateLetterBtn.addEventListener('click', runLetterGenerator);
    }

    // ==========================================================================
    // 14. Print Love Letter (print → Save as PDF)
    // ==========================================================================
    const printLetterRoot = document.getElementById('print-letter-root');

    function printLoveLetter(title, body, signature) {
        if (!printLetterRoot) {
            window.print();
            return;
        }

        const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        printLetterRoot.innerHTML = `
            <div class="print-letter-page">
                <p class="print-letter-meta">Shalini's Wonderland · ${now}</p>
                <h1>${escapeHtml(title)}</h1>
                <div class="print-body">${escapeHtml(body).replace(/\n/g, '<br>')}</div>
                <p class="print-sign">${escapeHtml(signature).replace(/\n/g, '<br>')}</p>
            </div>
        `;

        const afterPrint = () => {
            printLetterRoot.innerHTML = '';
            window.removeEventListener('afterprint', afterPrint);
        };
        window.addEventListener('afterprint', afterPrint);
        window.print();
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    const printLetterBtn = document.getElementById('print-letter-btn');
    if (printLetterBtn) {
        printLetterBtn.addEventListener('click', () => {
            if (!lastGeneratedLetter) {
                showToast("Generate a letter first 💌");
                return;
            }
            printLoveLetter(
                lastGeneratedLetter.title,
                lastGeneratedLetter.body,
                lastGeneratedLetter.sign
            );
        });
    }

    const archivePrintBtn = document.getElementById('archive-print-btn');
    if (archivePrintBtn) {
        archivePrintBtn.addEventListener('click', () => {
            const title = document.getElementById('archive-letter-title').innerText;
            const body = document.getElementById('archive-letter-body').innerText;
            const sign = `Forever Yours,\n${document.getElementById('archive-letter-signature').innerText}`;
            printLoveLetter(title, body, sign);
        });
    }

    // ==========================================================================
    // 15. Virtual Hug Button (pink pulse + exploding hearts)
    // ==========================================================================
    const virtualHugBtn = document.getElementById('virtual-hug-btn');
    const hugOverlay = document.getElementById('hug-overlay');
    const hugHeartsLayer = document.getElementById('hug-hearts-layer');
    const hugScene = document.getElementById('hug-scene');
    const hugBokeh = document.getElementById('hug-bokeh');
    const hugParticles = document.getElementById('hug-float-particles');
    const HUG_HEART_CHARS = ['❤️', '💕', '💖', '💗', '💓', '🩷', '♥️'];
    const HUG_SCENE_MS = 7200;
    let hugSceneTimeout = null;
    let hugEffectsBuilt = false;

    function buildHugCinematicEffects() {
        if (hugEffectsBuilt) return;
        hugEffectsBuilt = true;

        const hugImg = document.querySelector('.hug-artwork');
        if (hugImg && !hugImg.complete) {
            const preload = new Image();
            preload.src = hugImg.src;
        }

        if (hugBokeh) {
            const bokehColors = [
                'rgba(255, 200, 80, 0.9)',
                'rgba(255, 140, 60, 0.85)',
                'rgba(255, 90, 90, 0.8)',
                'rgba(255, 220, 120, 0.9)',
                'rgba(200, 160, 255, 0.5)',
                'rgba(120, 180, 255, 0.45)'
            ];
            for (let i = 0; i < 36; i++) {
                const orb = document.createElement('span');
                orb.className = 'hug-bokeh-orb';
                const size = 6 + Math.random() * 22;
                orb.style.width = `${size}px`;
                orb.style.height = `${size}px`;
                orb.style.left = `${Math.random() * 100}%`;
                orb.style.top = `${Math.random() * 100}%`;
                orb.style.background = bokehColors[i % bokehColors.length];
                orb.style.animationDelay = `${Math.random() * 2.5}s`;
                orb.style.animationDuration = `${2 + Math.random() * 2.5}s`;
                hugBokeh.appendChild(orb);
            }
        }

        if (hugParticles) {
            for (let i = 0; i < 18; i++) {
                const p = document.createElement('span');
                p.className = 'hug-particle';
                p.style.left = `${20 + Math.random() * 60}%`;
                p.style.top = `${35 + Math.random() * 45}%`;
                p.style.setProperty('--p-dur', `${3 + Math.random() * 3}s`);
                p.style.setProperty('--p-delay', `${2.5 + Math.random() * 2}s`);
                p.style.setProperty('--p-y', `${-60 - Math.random() * 80}px`);
                p.style.setProperty('--p-opacity', `${0.35 + Math.random() * 0.5}`);
                hugParticles.appendChild(p);
            }
        }
    }

    function playHugCoupleAnimation() {
        if (!hugScene) return;
        buildHugCinematicEffects();
        if (hugSceneTimeout) clearTimeout(hugSceneTimeout);
        hugScene.classList.remove('active');
        void hugScene.offsetWidth;
        hugScene.classList.add('active');
        hugScene.setAttribute('aria-hidden', 'false');
        hugSceneTimeout = setTimeout(() => {
            hugScene.classList.remove('active');
            hugScene.setAttribute('aria-hidden', 'true');
        }, HUG_SCENE_MS);
    }

    function triggerVirtualHug(e) {
        playHugCoupleAnimation();
        if (hugOverlay) {
            hugOverlay.classList.remove('active');
            void hugOverlay.offsetWidth;
            hugOverlay.classList.add('active');
            setTimeout(() => hugOverlay.classList.remove('active'), 1200);
        }

        document.body.classList.remove('hug-pulse-screen');
        void document.body.offsetWidth;
        document.body.classList.add('hug-pulse-screen');
        setTimeout(() => document.body.classList.remove('hug-pulse-screen'), 1200);

        const cx = e && e.clientX ? e.clientX : window.innerWidth / 2;
        const cy = e && e.clientY ? e.clientY : window.innerHeight / 2;
        const count = 42;

        if (hugHeartsLayer) {
            for (let i = 0; i < count; i++) {
                const heart = document.createElement('span');
                heart.className = 'hug-heart';
                heart.textContent = HUG_HEART_CHARS[i % HUG_HEART_CHARS.length];
                heart.style.left = `${cx}px`;
                heart.style.top = `${cy}px`;

                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
                const dist = 80 + Math.random() * 220;
                heart.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
                heart.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
                heart.style.setProperty('--rot', `${Math.random() * 360 - 180}deg`);
                heart.style.setProperty('--heart-size', `${14 + Math.random() * 22}px`);
                heart.style.setProperty('--heart-duration', `${1.2 + Math.random() * 0.9}s`);

                hugHeartsLayer.appendChild(heart);
                setTimeout(() => heart.remove(), 2200);
            }
        }

        spawnSparkleBurst(cx, cy, 25);
        showToast("Sending you the biggest virtual hug 🤗💕");
    }

    if (virtualHugBtn) {
        virtualHugBtn.addEventListener('click', triggerVirtualHug);
    }

    // ==========================================================================
    // 15b. Our Story in Numbers — real stats from our WhatsApp chats
    //      (computed once from the full export; embedded so it works offline)
    // ==========================================================================
    const CHAT_STATS = {
        firstDateLabel: "October 5, 2024",
        firstDateISO: "2024-10-05",
        totalMessages: 93105,
        totalWords: 310661,
        streakDays: 101,
        lateNightMessages: 3924,
        hugEmojis: 1533,
        laughEmojis: 2842,
        herMessages: 49244,   // Shalu
        himMessages: 43861,   // Shiva
        himInitiates: 171,    // days he texted first
        herInitiates: 87,
        busiestCount: 3084,
        busiestDay: "May 14, 2026",
        monthly2026: [
            { m: "Jan", v: 290 },
            { m: "Feb", v: 4 },
            { m: "Mar", v: 607 },
            { m: "Apr", v: 12026 },
            { m: "May", v: 39080 },
            { m: "Jun", v: 18095 },
            { m: "Jul", v: 9849 }
        ]
    };

    function daysSince(iso) {
        const start = new Date(iso + "T00:00:00");
        const now = new Date();
        return Math.max(0, Math.floor((now - start) / 86400000));
    }

    function formatNum(n) {
        return Math.round(n).toLocaleString('en-US');
    }

    // Count-up animation for a single element
    function animateCount(el, target, duration = 1600) {
        if (!el) return;
        const start = performance.now();
        function frame(now) {
            const p = Math.min(1, (now - start) / duration);
            // easeOutExpo for a satisfying finish
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            el.textContent = formatNum(target * eased);
            if (p < 1) requestAnimationFrame(frame);
            else el.textContent = formatNum(target);
        }
        requestAnimationFrame(frame);
    }

    function buildStatCards() {
        const grid = document.getElementById('stats-grid');
        if (!grid) return;
        const cards = [
            { emoji: "💬", value: CHAT_STATS.totalMessages, label: "Messages exchanged" },
            { emoji: "📝", value: CHAT_STATS.totalWords, label: "Words written to each other" },
            { emoji: "📅", value: daysSince(CHAT_STATS.firstDateISO), label: "Days since your first “Hi”" },
            { emoji: "🔥", value: CHAT_STATS.streakDays, label: "Day talking streak — and counting" },
            { emoji: "🌙", value: CHAT_STATS.lateNightMessages, label: "Messages after midnight" },
            { emoji: "🫂", value: CHAT_STATS.hugEmojis, label: "Times we sent a 🫂 hug" },
            { emoji: "😂", value: CHAT_STATS.laughEmojis, label: "Times we laughed together" },
            { emoji: "💌", value: CHAT_STATS.himInitiates, label: "Days I texted you first" }
        ];
        grid.innerHTML = "";
        cards.forEach(c => {
            const div = document.createElement('div');
            div.className = "stat-card glass";
            div.innerHTML = `
                <span class="stat-emoji">${c.emoji}</span>
                <span class="stat-number" data-target="${c.value}">0</span>
                <span class="stat-label">${escapeHtml(c.label)}</span>
            `;
            grid.appendChild(div);
        });

        // Who-texts-more comparison
        const her = CHAT_STATS.herMessages;
        const him = CHAT_STATS.himMessages;
        const max = Math.max(her, him);
        const herName = appData.girlfriendName || "Shalini";
        const himName = appData.boyfriendName || "Polonium";
        document.getElementById('compare-her-name').textContent = herName;
        document.getElementById('compare-him-name').textContent = himName;
        document.getElementById('compare-her-fill').style.setProperty('--pct', `${(her / max) * 100}%`);
        document.getElementById('compare-him-fill').style.setProperty('--pct', `${(him / max) * 100}%`);
        const winner = her > him ? herName : himName;
        document.getElementById('compare-note').textContent =
            `${winner} sends more — but honestly, every single one is worth reading. 🥰`;

        // 2026 chart
        const chart = document.getElementById('chart-bars');
        if (chart) {
            const cmax = Math.max(...CHAT_STATS.monthly2026.map(x => x.v));
            chart.innerHTML = "";
            CHAT_STATS.monthly2026.forEach(x => {
                const col = document.createElement('div');
                col.className = "chart-col";
                col.innerHTML = `
                    <span class="chart-val">${formatNum(x.v)}</span>
                    <div class="chart-bar" style="--bar-h:${(x.v / cmax) * 100}%"></div>
                    <span class="chart-month">${x.m}</span>
                `;
                chart.appendChild(col);
            });
        }
    }

    let statsAnimated = false;
    function animateChatStats() {
        if (statsAnimated) return;
        statsAnimated = true;
        document.querySelectorAll('#stats-grid .stat-number').forEach(el => {
            animateCount(el, parseInt(el.getAttribute('data-target'), 10));
        });
        animateCount(document.getElementById('compare-her-val'), CHAT_STATS.herMessages, 1800);
        animateCount(document.getElementById('compare-him-val'), CHAT_STATS.himMessages, 1800);
        animateCount(document.getElementById('busiest-count'), CHAT_STATS.busiestCount, 1800);
        // Trigger bar growth
        requestAnimationFrame(() => {
            document.querySelectorAll('#journey-section .compare-fill, #journey-section .chart-bar')
                .forEach(el => el.classList.add('grow'));
        });
    }

    const journeyFirstDateEl = document.getElementById('journey-first-date');
    if (journeyFirstDateEl) journeyFirstDateEl.textContent = CHAT_STATS.firstDateLabel;
    buildStatCards();

    // ==========================================================================
    // 15c. "Words I'll never forget" — real curated lines from our chats
    //      (kept exactly as written; edit this list freely)
    //      who: 'her' = girlfriend, 'him' = boyfriend (names pulled from appData)
    // ==========================================================================
    const MEMORY_QUOTES = [
        { who: 'her', date: "April 7, 2026",  text: "Luv u kuda solala" },
        { who: 'her', date: "April 8, 2026",  text: "Naa full ah trust panra unna" },
        { who: 'her', date: "April 9, 2026",  text: "Aana en manasu full ah unkitta tha iruku naa enna panna" },
        { who: 'her', date: "April 9, 2026",  text: "Kadhal nu illa oru nalla feel" },
        { who: 'him', date: "April 15, 2026", text: "Ne epo enna kuptalum na varuven, unakaga na irupen" },
        { who: 'him', date: "May 8, 2026",    text: "Luv u 🥺🫂" },
        { who: 'her', date: "May 12, 2026",   text: "Kadhal kanna maraikuthu polayae..." },
        { who: 'him', date: "May 20, 2026",   text: "Ne epude iruthalum na una kadhal leypa" },
        { who: 'him', date: "May 28, 2026",   text: "I love you the core 😘🫂" },
        { who: 'him', date: "June 1, 2026",   text: "Una kathalecha en manasu ku savu illa de en kanmani" },
        { who: 'her', date: "June 1, 2026",   text: "Ipo la unna konjitae irukanum nu thonuthu da 🫂" },
        { who: 'him', date: "June 8, 2026",   text: "I love you shalu 🫂" }
    ];

    const quoteCard = document.getElementById('memory-quote-card');
    const quoteTextEl = document.getElementById('memory-quote-text');
    const quoteWhoEl = document.getElementById('memory-quote-who');
    const quoteDateEl = document.getElementById('memory-quote-date');
    const quoteDotsEl = document.getElementById('memory-quote-dots');
    const quotePrevBtn = document.getElementById('memory-quote-prev');
    const quoteNextBtn = document.getElementById('memory-quote-next');

    let quoteIdx = 0;
    let quoteTimer = null;
    const QUOTE_INTERVAL = 6000;

    function speakerName(who) {
        return who === 'her'
            ? (appData.girlfriendName || "Shalini")
            : (appData.boyfriendName || "Polonium");
    }

    function renderMemoryQuoteDots() {
        if (!quoteDotsEl) return;
        quoteDotsEl.innerHTML = "";
        MEMORY_QUOTES.forEach((_q, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'memory-dot' + (i === quoteIdx ? ' active' : '');
            dot.setAttribute('aria-label', `Show memory ${i + 1}`);
            dot.addEventListener('click', () => showMemoryQuote(i, true));
            quoteDotsEl.appendChild(dot);
        });
    }

    function showMemoryQuote(i, userAction) {
        if (!quoteCard || !MEMORY_QUOTES.length) return;
        quoteIdx = (i + MEMORY_QUOTES.length) % MEMORY_QUOTES.length;
        const q = MEMORY_QUOTES[quoteIdx];

        // fade out, swap, fade in
        quoteCard.classList.remove('quote-in');
        quoteCard.classList.add('quote-out');
        setTimeout(() => {
            quoteTextEl.innerHTML = `&ldquo;${escapeHtml(q.text)}&rdquo;`;
            quoteWhoEl.textContent = speakerName(q.who);
            quoteDateEl.textContent = q.date;
            quoteCard.classList.remove('her', 'him');
            quoteCard.classList.add(q.who === 'her' ? 'her' : 'him');
            quoteCard.classList.remove('quote-out');
            quoteCard.classList.add('quote-in');
        }, 220);

        // update dots
        if (quoteDotsEl) {
            [...quoteDotsEl.children].forEach((d, di) =>
                d.classList.toggle('active', di === quoteIdx));
        }

        if (userAction) restartQuoteTimer();
    }

    function nextMemoryQuote() { showMemoryQuote(quoteIdx + 1); }
    function prevMemoryQuote() { showMemoryQuote(quoteIdx - 1); }

    function restartQuoteTimer() {
        if (quoteTimer) clearInterval(quoteTimer);
        quoteTimer = setInterval(nextMemoryQuote, QUOTE_INTERVAL);
    }

    function initMemoryQuotes() {
        if (!quoteCard) return;
        renderMemoryQuoteDots();
        showMemoryQuote(0);
        restartQuoteTimer();

        if (quotePrevBtn) quotePrevBtn.addEventListener('click', () => { prevMemoryQuote(); restartQuoteTimer(); });
        if (quoteNextBtn) quoteNextBtn.addEventListener('click', () => { nextMemoryQuote(); restartQuoteTimer(); });

        // Pause auto-advance while she's reading
        quoteCard.addEventListener('mouseenter', () => { if (quoteTimer) clearInterval(quoteTimer); });
        quoteCard.addEventListener('mouseleave', restartQuoteTimer);
    }
    initMemoryQuotes();

    // ==========================================================================
    // 16. Elegant Toast Notification System
    // ==========================================================================
    const toast = document.getElementById('toast-notification');
    let toastTimeout = null;

    function showToast(msg) {
        toast.innerHTML = msg;
        toast.classList.add('show');
        
        if (toastTimeout) clearTimeout(toastTimeout);
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

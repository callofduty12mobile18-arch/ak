/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic Intimacy palette — restrained, antique
        'love-ink':       '#fbeee9',
        'love-muted':     'rgba(251, 238, 233, 0.50)',
        'love-faint':     'rgba(251, 238, 233, 0.28)',
        'love-rose':      '#d4778d',   // dried rose — deeper, less candy
        'love-rose-deep': '#b55570',   // darker pressed rose
        'love-gold':      '#e8c16a',   // antique gold — not neon
        'love-amber':     '#d4a054',   // warm amber
        'love-wine':      '#4a1024',
        'love-plum':      '#160a14',
        'love-dark':      '#0a0408',
        // Surface system — quieter than before
        'surface':        'rgba(255, 255, 255, 0.035)',
        'surface-raised': 'rgba(255, 255, 255, 0.055)',
        'border-subtle':  'rgba(255, 255, 255, 0.07)',
        'border-mid':     'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        playfair:   ['"Playfair Display"', 'serif'],
        cormorant:  ['"Cormorant Garamond"', 'serif'],
        caveat:     ['Caveat', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        sans:       ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Named scale used throughout — consistent rhythm
        'display':  ['clamp(3.5rem, 10vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'headline': ['clamp(2rem, 5vw, 3.5rem)',  { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'title':    ['clamp(1.4rem, 3vw, 2rem)',  { lineHeight: '1.2' }],
        'body-lg':  ['1.125rem',                  { lineHeight: '1.75' }],
        'label':    ['0.75rem',                   { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'micro':    ['0.6875rem',                 { lineHeight: '1.4' }],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow':  'pulse 5s ease-in-out infinite',
        'float':       'float 5s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'breathe':     'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-7px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.7' },
          '50%':      { opacity: '1' },
        },
      },
      maxWidth: {
        prose: '62ch',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

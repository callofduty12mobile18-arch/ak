/**
 * Good Morning Mail — shared logic
 * --------------------------------------------------------------------------
 * Used by both the Netlify scheduled function (netlify/functions/morning-mail.mjs)
 * and the local test CLI (morning-mail/send.mjs). Emails one random quote taken
 * from the content already living in src/data/universeData.js.
 *
 * Config comes from the environment variable MORNING_MAIL_CONFIG (JSON).
 * Credentials come from GMAIL_USER / GMAIL_APP_PASSWORD.
 */

import { DEFAULT_UNIVERSE_DATA } from '../src/data/universeData.js';

export const DEFAULT_CONFIG = {
  recipientEmail: '',
  recipientName: '',
  senderName: '',
  subjectTemplate: 'Good morning, {name} 🌸',
  sendTimeIST: '06:30',
  includeCompliments: true,
  includeLoveLetters: true,
  includeMemoryQuotes: false,
};

/** Fill blanks from the site's own data so a minimal config still works. */
export function resolveConfig(raw = {}) {
  const cfg = { ...DEFAULT_CONFIG, ...raw };
  return {
    ...cfg,
    recipientEmail: cfg.recipientEmail || DEFAULT_UNIVERSE_DATA.adminEmail,
    recipientName: cfg.recipientName || DEFAULT_UNIVERSE_DATA.girlfriendName,
    senderName: cfg.senderName || DEFAULT_UNIVERSE_DATA.boyfriendName,
    sendTimeIST: cfg.sendTimeIST || '06:30',
    includeCompliments: !!cfg.includeCompliments,
    includeLoveLetters: !!cfg.includeLoveLetters,
    includeMemoryQuotes: !!cfg.includeMemoryQuotes,
  };
}

function parseConfigEnv(env) {
  if (!env.MORNING_MAIL_CONFIG) return {};
  try {
    return JSON.parse(env.MORNING_MAIL_CONFIG);
  } catch (e) {
    throw new Error('MORNING_MAIL_CONFIG is not valid JSON.');
  }
}

export function buildQuotePool(cfg) {
  const pool = [];
  if (cfg.includeCompliments) pool.push(...DEFAULT_UNIVERSE_DATA.compliments);
  if (cfg.includeLoveLetters) pool.push(...DEFAULT_UNIVERSE_DATA.loveLetters);
  if (cfg.includeMemoryQuotes) pool.push(...DEFAULT_UNIVERSE_DATA.memoryQuotes.map((q) => q.text));
  return pool;
}

/**
 * Current time shifted so that its UTC getters read as IST wall-clock
 * (UTC + 5:30). Use getUTCHours() / timeZone:'UTC' on the result.
 */
export function istNow() {
  return new Date(Date.now() + 5.5 * 3_600_000);
}

function renderEmail({ quote, name, sender, dateLabel }) {
  const safe = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0408;">
  <div style="background:#0a0408;padding:36px 16px;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:0 auto;background:#140b12;border:1px solid rgba(232,193,106,0.25);border-radius:16px;overflow:hidden;">
      <div style="padding:30px 32px 22px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <p style="margin:0;color:#e8c16a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Good morning</p>
        <h1 style="margin:10px 0 0;color:#fbeee9;font-size:26px;font-style:italic;font-weight:500;">Good morning, ${safe(name)}</h1>
        <div style="width:56px;height:1px;background:#e8c16a;margin-top:16px;"></div>
      </div>
      <div style="padding:34px 32px;">
        <blockquote style="margin:0;color:#f6d9e0;font-size:20px;font-style:italic;line-height:1.65;">&ldquo;${safe(quote)}&rdquo;</blockquote>
        <p style="margin:22px 0 0;color:rgba(251,238,233,0.5);font-size:13px;font-family:Arial,sans-serif;">&mdash; ${safe(sender)}</p>
      </div>
      <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.08);color:rgba(251,238,233,0.35);font-size:11px;font-family:Arial,sans-serif;">
        <div style="margin-bottom:8px;">
          <a href="https://shaluswonderland.vercel.app/" style="color:#e8c16a;text-decoration:none;">Visit Shalini's Wonderland</a>
        </div>
        ${safe(dateLabel)} &middot; sent with love
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function composeMorningMail(cfg) {
  const pool = buildQuotePool(cfg);
  if (pool.length === 0) {
    throw new Error('Quote pool is empty — enable a source in the morning mail settings.');
  }
  const quote = pool[Math.floor(Math.random() * pool.length)];
  const dateLabel = istNow().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const subject = (cfg.subjectTemplate || 'Good morning, {name}').replace('{name}', cfg.recipientName);
  return {
    quote,
    subject,
    html: renderEmail({ quote, name: cfg.recipientName, sender: cfg.senderName, dateLabel }),
    text: `Good morning, ${cfg.recipientName}\n\n"${quote}"\n\n— ${cfg.senderName}\n${dateLabel}\n\nVisit your wonderland: https://shaluswonderland.vercel.app/`,
  };
}

async function sendViaGmail({ subject, html, text, to, user, pass, senderName }) {
  // Lazy import so --dry-run works without the mailer installed.
  const nodemailer = (await import('nodemailer')).default;
  const transport = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  return transport.sendMail({
    from: `"${senderName}" <${user}>`,
    to,
    subject,
    text,
    html,
  });
}

/**
 * Compose and (unless dry-run) send the morning mail.
 * On Vercel Hobby, this runs once a day via the cron defined in vercel.json.
 */
export async function runMorningMail({ env = process.env, force = false, dryRun = false } = {}) {
  const cfg = resolveConfig(parseConfigEnv(env));
  
  // Note: On Hobby plan, we send whenever the cron triggers because we only get one trigger per day.
  // The sendTimeIST check is primarily for manual 'force' triggers or local testing.
  
  const mail = composeMorningMail(cfg);
  const to = env.MAIL_TO || cfg.recipientEmail;

  if (dryRun) {
    return { sent: false, dryRun: true, to, ...mail };
  }

  const user = env.GMAIL_USER;
  const pass = env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('Missing GMAIL_USER / GMAIL_APP_PASSWORD environment variables.');
  }

  const info = await sendViaGmail({ ...mail, to, user, pass, senderName: cfg.senderName });
  return { sent: true, to, quote: mail.quote, messageId: info.messageId };
}

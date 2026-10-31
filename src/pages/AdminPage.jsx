import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Plus, Trash2, RotateCcw, Save, ArrowLeft, Mail, Copy,
  Check, Eye, RefreshCw, KeyRound, Send, AlertCircle
} from 'lucide-react';
import { DEFAULT_UNIVERSE_DATA } from '../data/universeData';

const UNIVERSE_KEY = 'universe_data';
const MAIL_KEY = 'morning_mail_config';

const DEFAULT_MAIL_CONFIG = {
  recipientEmail: '',
  recipientName: '',
  senderName: '',
  subjectTemplate: 'Good morning, {name} 🌸',
  sendTimeIST: '06:30',
  includeCompliments: true,
  includeLoveLetters: true,
  includeMemoryQuotes: false,
};

function loadUniverse() {
  try {
    const saved = localStorage.getItem(UNIVERSE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_UNIVERSE_DATA,
        ...parsed,
        girlfriendBirthday: parsed.girlfriendBirthday || DEFAULT_UNIVERSE_DATA.girlfriendBirthday,
      };
    }
  } catch (e) {
    console.warn('Failed to load universe data', e);
  }
  return DEFAULT_UNIVERSE_DATA;
}

function loadMailConfig() {
  try {
    const saved = localStorage.getItem(MAIL_KEY);
    if (saved) return { ...DEFAULT_MAIL_CONFIG, ...JSON.parse(saved) };
  } catch (e) {
    console.warn('Failed to load mail config', e);
  }
  return DEFAULT_MAIL_CONFIG;
}

function buildQuotePool(cfg) {
  const pool = [];
  if (cfg.includeCompliments) pool.push(...DEFAULT_UNIVERSE_DATA.compliments);
  if (cfg.includeLoveLetters) pool.push(...DEFAULT_UNIVERSE_DATA.loveLetters);
  if (cfg.includeMemoryQuotes) pool.push(...DEFAULT_UNIVERSE_DATA.memoryQuotes.map((q) => q.text));
  return pool;
}

export default function AdminPage() {
  const [data, setData] = useState(loadUniverse);
  const [mail, setMail] = useState(loadMailConfig);
  const [preview, setPreview] = useState('');
  const [savedAt, setSavedAt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [testMessage, setTestMessage] = useState('');

  const set = (field) => (e) => setData({ ...data, [field]: e.target.value });
  const setMailField = (field) => (e) => setMail({ ...mail, [field]: e.target.value });

  const handleMilestoneChange = (idx, field, value) => {
    const updated = data.milestones.map((m, i) => (i === idx ? { ...m, [field]: value } : m));
    setData({ ...data, milestones: updated });
  };
  const handleAddMilestone = () => {
    setData({
      ...data,
      milestones: [
        ...data.milestones,
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          title: 'New Miracle Moment',
          text: 'Describe this special day we shared...',
        },
      ],
    });
  };
  const handleRemoveMilestone = (idx) =>
    setData({ ...data, milestones: data.milestones.filter((_, i) => i !== idx) });

  // ── The exported config file the GitHub job reads ──────────────────
  const configForExport = () => ({
    recipientEmail: mail.recipientEmail || data.adminEmail,
    recipientName: mail.recipientName || data.girlfriendName,
    senderName: mail.senderName || data.boyfriendName,
    subjectTemplate: mail.subjectTemplate,
    sendTimeIST: mail.sendTimeIST || '06:30',
    includeCompliments: !!mail.includeCompliments,
    includeLoveLetters: !!mail.includeLoveLetters,
    includeMemoryQuotes: !!mail.includeMemoryQuotes,
  });

  const handlePreview = () => {
    const pool = buildQuotePool(mail);
    if (!pool.length) {
      setPreview('No quote sources selected — enable at least one below.');
      return;
    }
    setPreview(pool[Math.floor(Math.random() * pool.length)]);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(configForExport(), null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard unavailable', e);
    }
  };

  const handleSendTestMail = async () => {
    setTestStatus('loading');
    setTestMessage('');
    try {
      const res = await fetch('/api/morning-mail?force=1');
      const result = await res.json();
      if (res.ok && result.sent) {
        setTestStatus('success');
        setTestMessage(`Success! Sent to ${result.to}`);
      } else {
        setTestStatus('error');
        setTestMessage(result.error || result.reason || 'Failed to send');
      }
    } catch (e) {
      setTestStatus('error');
      setTestMessage('Error: Make sure the project is deployed to Vercel.');
    }
    setTimeout(() => setTestStatus(null), 5000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(UNIVERSE_KEY, JSON.stringify(data));
      localStorage.setItem(MAIL_KEY, JSON.stringify(mail));
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      console.warn('Could not save', e);
    }
  };

  const handleReset = () => {
    setData(DEFAULT_UNIVERSE_DATA);
    setMail(DEFAULT_MAIL_CONFIG);
    try {
      localStorage.removeItem(UNIVERSE_KEY);
      localStorage.removeItem(MAIL_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="min-h-screen text-love-ink font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-label font-montserrat text-love-muted hover:text-love-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to the universe
        </a>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 flex items-center gap-3"
        >
          <Settings className="w-5 h-5 text-love-gold" />
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-love-ink">
            Configuration
          </h1>
        </motion.div>
        <div className="gold-rule mt-5" />
        <p className="mt-4 text-sm text-love-muted">
          Everything that shapes her universe lives here. Changes are kept in this browser; the
          good morning mail runs on a Vercel scheduled function (Cron) and reads the config you paste
          into Vercel.
        </p>

        {/* ── The couple ──────────────────────────────────────────── */}
        <Section title="The couple">
          <Grid>
            <Field label="Girlfriend's name" value={data.girlfriendName} onChange={set('girlfriendName')} />
            <Field label="Boyfriend's name" value={data.boyfriendName} onChange={set('boyfriendName')} />
            <Field
              label="Girlfriend's birthday"
              type="date"
              value={data.girlfriendBirthday || '2007-01-23'}
              onChange={set('girlfriendBirthday')}
              hint="Her special day (Jan 23, 2007)."
            />
            <Field
              label="Anniversary date"
              type="datetime-local"
              value={data.anniversaryDate}
              onChange={set('anniversaryDate')}
              hint="Controls the live relationship counter."
            />
            <Field label="Boyfriend's phone" value={data.boyfriendPhone} onChange={set('boyfriendPhone')} />
            <Field label="WhatsApp number" value={data.boyfriendWhatsApp} onChange={set('boyfriendWhatsApp')} hint="Digits only, with country code." />
          </Grid>

          <Field
            label="Background YouTube song ID"
            value={data.youtubeSongId}
            onChange={set('youtubeSongId')}
            hint="The ID after v= in a YouTube link, e.g. T6Td7uJ8rRI."
          />
          <Field
            label="Email for star wishes"
            value={data.adminEmail}
            onChange={set('adminEmail')}
            hint="Wishes released on the Starry Board are emailed here."
          />
          <Field
            label="After-dark secret word"
            value={data.afterDarkSecret}
            onChange={set('afterDarkSecret')}
          />
        </Section>

        {/* ── Good morning mail ───────────────────────────────────── */}
        <Section
          title="Good morning mail"
          icon={<Mail className="w-4 h-4 text-love-gold" />}
        >
          <p className="text-sm text-love-muted">
            A random quote from the content already on the site is emailed every morning from
            your Gmail, sent by a Vercel scheduled function (Cron).
          </p>

          <Grid>
            <Field
              label="Her email (recipient)"
              type="email"
              value={mail.recipientEmail}
              onChange={setMailField('recipientEmail')}
              placeholder={data.adminEmail}
              hint="Leave blank to fall back to the wish email above."
            />
            <Field
              label="Her name in the greeting"
              value={mail.recipientName}
              onChange={setMailField('recipientName')}
              placeholder={data.girlfriendName}
            />
            <Field
              label="Sender display name"
              value={mail.senderName}
              onChange={setMailField('senderName')}
              placeholder={data.boyfriendName}
            />
            <Field
              label="Subject line"
              value={mail.subjectTemplate}
              onChange={setMailField('subjectTemplate')}
              hint="Use {name} for her name."
            />
          </Grid>

          <div>
            <label className="admin-label">Send time (IST)</label>
            <input
              type="time"
              value={mail.sendTimeIST || '06:30'}
              onChange={setMailField('sendTimeIST')}
              className="admin-input"
            />
            <div className="mt-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-400 leading-relaxed">
              <strong>Hobby Plan Note:</strong> Vercel only allows 1 mail per day. 
              The mail will arrive at the time set in your code's <code>vercel.json</code>. 
              To change it permanently, update the cron schedule in your GitHub repository.
            </div>
          </div>

          <div>
            <label className="admin-label">Quote sources</label>
            <div className="space-y-2">
              <Toggle
                label={`Compliments (${DEFAULT_UNIVERSE_DATA.compliments.length})`}
                checked={mail.includeCompliments}
                onChange={(v) => setMail({ ...mail, includeCompliments: v })}
              />
              <Toggle
                label={`Love letters (${DEFAULT_UNIVERSE_DATA.loveLetters.length})`}
                checked={mail.includeLoveLetters}
                onChange={(v) => setMail({ ...mail, includeLoveLetters: v })}
              />
              <Toggle
                label={`Spoken memories (${DEFAULT_UNIVERSE_DATA.memoryQuotes.length})`}
                checked={mail.includeMemoryQuotes}
                onChange={(v) => setMail({ ...mail, includeMemoryQuotes: v })}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={handlePreview} className="admin-btn-ghost">
              <Eye className="w-3.5 h-3.5" /> Preview a quote
            </button>
            <button type="button" onClick={handleCopy} className="admin-btn-ghost">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy config for Vercel'}
            </button>
            <button 
              type="button" 
              onClick={handleSendTestMail} 
              disabled={testStatus === 'loading'}
              className="admin-btn-ghost text-love-gold border-love-gold/30 hover:bg-love-gold/10"
            >
              {testStatus === 'loading' ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              Send Test Mail Now
            </button>
          </div>

          {testStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                testStatus === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                testStatus === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}
            >
              {testStatus === 'error' ? <AlertCircle className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
              {testMessage || (testStatus === 'loading' ? 'Sending...' : '')}
            </motion.div>
          )}

          {preview && (
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-love-faint mb-2">Today's preview</p>
              <p className="font-cormorant italic text-lg text-love-ink leading-relaxed">{preview}</p>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[rgba(232,193,106,0.06)] border border-[rgba(232,193,106,0.2)] space-y-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-love-gold">
              <KeyRound className="w-4 h-4" /> One-time setup on Vercel
            </p>
            <ol className="text-sm text-love-muted space-y-2 list-decimal list-inside">
              <li>Copy the config above with the button.</li>
              <li>
                In Vercel → Project Settings → Environment Variables, add three:
                <span className="block mt-1 font-mono text-xs text-love-ink">
                  GMAIL_USER &nbsp;·&nbsp; GMAIL_APP_PASSWORD &nbsp;·&nbsp; MORNING_MAIL_CONFIG
                </span>
              </li>
              <li>
                Paste the copied JSON into{' '}
                <code className="text-love-ink">MORNING_MAIL_CONFIG</code>, and use a 16-character
                Google App Password for <code className="text-love-ink">GMAIL_APP_PASSWORD</code>.
              </li>
              <li>Redeploy once so the variables take effect — then it sends every morning.</li>
            </ol>
          </div>
        </Section>

        {/* ── Timeline ────────────────────────────────────────────── */}
        <Section
          title={`Memories timeline (${data.milestones.length})`}
          action={
            <button type="button" onClick={handleAddMilestone} className="admin-btn-ghost">
              <Plus className="w-3.5 h-3.5" /> Add moment
            </button>
          }
        >
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {data.milestones.map((m, idx) => (
              <div key={m.id ?? idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveMilestone(idx)}
                  className="absolute top-2.5 right-2.5 text-red-400 hover:text-red-300 p-1"
                  title="Remove milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                  <input
                    type="date"
                    value={m.date}
                    onChange={(e) => handleMilestoneChange(idx, 'date', e.target.value)}
                    className="admin-input"
                  />
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <textarea
                  value={m.text}
                  onChange={(e) => handleMilestoneChange(idx, 'text', e.target.value)}
                  rows={3}
                  className="admin-input"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Actions ─────────────────────────────────────────────── */}
        <div className="sticky bottom-0 mt-10 py-4 flex items-center justify-between gap-3 bg-gradient-to-t from-[#0a0408] via-[#0a0408]/95 to-transparent">
          <button type="button" onClick={handleReset} className="admin-btn-ghost">
            <RotateCcw className="w-3.5 h-3.5" /> Reset defaults
          </button>
          <div className="flex items-center gap-3">
            {savedAt && <span className="text-xs text-love-faint">Saved {savedAt}</span>}
            <button type="button" onClick={handleSave} className="admin-btn-primary">
              {savedAt ? <RefreshCw className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small building blocks ──────────────────────────────────────── */
function Section({ title, icon, action, children }) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 font-playfair text-lg font-semibold text-love-ink">
          {icon}
          {title}
        </h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, type = 'text', value, onChange, hint, placeholder }) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="admin-input"
      />
      {hint && <span className="admin-hint">{hint}</span>}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[rgba(232,193,106,0.3)] transition-colors"
    >
      <span className="text-sm text-love-ink">{label}</span>
      <span
        className={[
          'w-9 h-5 rounded-full relative transition-colors duration-200',
          checked ? 'bg-love-gold' : 'bg-white/15',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 w-4 h-4 rounded-full bg-love-dark transition-all duration-200',
            checked ? 'left-4' : 'left-0.5',
          ].join(' ')}
        />
      </span>
    </button>
  );
}

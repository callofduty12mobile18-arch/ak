import { runMorningMail } from '../morning-mail/mailer.js';

/**
 * Vercel Serverless Function / Cron Job
 * --------------------------------------------------------------------------
 * Triggered by Vercel Cron (defined in vercel.json).
 * 
 * Also supports manual triggers:
 *   /api/morning-mail?force=1  → send now
 *   /api/morning-mail?dry=1    → preview, send nothing
 */
export default async function handler(request, response) {
  // Security check for Vercel Cron (optional but recommended)
  // if (request.headers['x-vercel-cron'] !== '1' && !request.query.force) {
  //   return response.status(401).json({ error: 'Unauthorized' });
  // }

  const { force, dry } = request.query;

  try {
    const result = await runMorningMail({
      force: force === '1',
      dryRun: dry === '1',
    });
    
    return response.status(200).json(result);
  } catch (err) {
    console.error('Morning Mail Error:', err);
    return response.status(500).json({ 
      error: String(err?.message || err) 
    });
  }
}

/**
 * Local test CLI for the Good Morning Mail.
 *
 *   node morning-mail/send.mjs --dry-run --force   # preview, send nothing
 *   node morning-mail/send.mjs --force             # send a real email now
 *
 * Needs the same environment variables as production:
 *   GMAIL_USER, GMAIL_APP_PASSWORD, MORNING_MAIL_CONFIG (optional JSON)
 *
 * PowerShell example:
 *   $env:GMAIL_USER="you@gmail.com"; $env:GMAIL_APP_PASSWORD="abcdefghijklmnop"; node morning-mail/send.mjs --force
 */

import { runMorningMail } from './mailer.js';

const args = process.argv.slice(2);
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');

runMorningMail({ force, dryRun })
  .then((r) => {
    if (r.dryRun) {
      console.log('--- DRY RUN ---');
      console.log('To:      ', r.to);
      console.log('Subject: ', r.subject);
      console.log('Quote:   ', r.quote);
    } else if (r.sent) {
      console.log(`Sent to ${r.to}: ${r.messageId}`);
    } else {
      console.log(r.reason);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

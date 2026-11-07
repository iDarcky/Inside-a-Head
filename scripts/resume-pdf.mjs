// Renders /resume to public/daniel-n-maghis-resume.pdf using the page's own print styles.
// Usage: npm run resume:pdf   (then commit the PDF; the next build ships it)
// Needs Playwright's Chromium once: npx playwright install chromium
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const port = 4329;
const url = `http://localhost:${port}/resume`;
const out = new URL('../public/daniel-n-maghis-resume.pdf', import.meta.url);

const dev = spawn('npx', ['astro', 'dev', '--port', String(port)], { stdio: 'ignore' });
const stop = () => dev.kill('SIGTERM');
process.on('exit', stop);

async function waitForServer(tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Dev server did not answer at ${url}`);
}

try {
  await waitForServer();
  // CHROMIUM_PATH lets you point at an existing Chrome/Chromium instead of Playwright's download.
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage({ colorScheme: 'light' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: out.pathname, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log(`Wrote ${out.pathname}`);
} finally {
  stop();
}

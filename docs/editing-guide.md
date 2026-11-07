# Editing the site — a step-by-step guide

This covers three things: editing from any device (including your phone), turning on free analytics, and refreshing the resume PDF.

---

## 1. Edit from anywhere with Keystatic

Keystatic is the editor at `/keystatic`. Every time you press **Save**, it saves your change to GitHub as a commit, and Vercel rebuilds the site about a minute later. Nothing else to run.

To make that work on the live site, Keystatic needs a small **GitHub App**: a key that lets it write to your repo. You create it once, on your computer. It takes about 10 minutes.

> **Before you start:** the new site must be live first (this branch merged into `main` and deployed), because Keystatic saves to `main`.

### Part A — create the GitHub App (once, on your computer)

1. **Install the tools** if you don't have them: [Node.js 22](https://nodejs.org) (the "LTS" button) and [Git](https://git-scm.com/downloads).
2. **Download the site** and install its packages. Open a terminal (macOS: Terminal; Windows: PowerShell) and run:

   ```bash
   git clone https://github.com/iDarcky/Inside-a-Head.git
   cd Inside-a-Head
   npm install
   ```

3. **Start the site in GitHub mode:**

   ```bash
   # macOS / Linux
   PUBLIC_KEYSTATIC_GITHUB=true npm run dev
   ```

   ```powershell
   # Windows PowerShell
   $env:PUBLIC_KEYSTATIC_GITHUB="true"; npm run dev
   ```

4. **Open** <http://127.0.0.1:4321/keystatic> in your browser. Keystatic shows a **GitHub App setup** screen.
5. **Name the app** (for example `inside-a-head-editor`) and click **Create GitHub App**. GitHub opens and asks you to confirm. Confirm it.
6. GitHub sends you back, and Keystatic writes a file called `.env` in the project folder with four values. **Don't share this file or commit it** (it's already ignored by Git).
7. Keystatic now asks you to **install the app**. Choose **Only select repositories** → `Inside-a-Head` → **Install**.
8. **Test it:** in `/keystatic`, change a word in a logbook entry and press **Save**. On GitHub you'll see a new commit. You can undo it the same way.

### Part B — tell Vercel and GitHub about the live site

9. Open the `.env` file in any text editor. In **Vercel → your Inside a Head project → Settings → Environment Variables**, add each of the four lines as a variable (name on the left of `=`, value on the right):
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
10. On GitHub go to **Settings → Developer settings → GitHub Apps → your app → Edit**. Under **Callback URL**, add:

    ```
    https://insideahead.com/api/keystatic/github/oauth/callback
    ```

    and press **Save changes**.
11. In Vercel, **Deployments → latest → ⋯ → Redeploy**.

### Part C — every day

- Go to **insideahead.com/keystatic**, sign in with GitHub, edit, press **Save**. The site updates in about a minute.
- On your phone, open the same address in the browser and use **Add to Home Screen** to get an icon for it.
- Logbook entries: **Logbook → Create**. Give it a title and date, write, Save.
- Images: drag them into the editor or the image fields; Keystatic stores them in the repo and the site resizes them automatically.

---

## 2. Free analytics (Cloudflare Web Analytics)

Free, no cookies (so no cookie banner), and no limit on how many sites you add, so it can cover The Retro Circuit too.

1. Create a free account at [cloudflare.com](https://dash.cloudflare.com/sign-up).
2. In the dashboard: **Analytics & Logs → Web Analytics → Add a site**, enter `insideahead.com`, and pick the **JS snippet** option (your domain doesn't need to move to Cloudflare).
3. Cloudflare shows a snippet containing `"token": "…"`. Copy just the token.
4. In Vercel, add an environment variable **`PUBLIC_CF_ANALYTICS_TOKEN`** with that token, then redeploy.

The site already includes the snippet; it switches on as soon as the token exists. Visits show up in Cloudflare within a few minutes.

---

## 3. Refreshing the resume PDF

The **Download PDF** button serves `public/daniel-n-maghis-resume.pdf`. It's generated from the resume page itself, so after you change the resume:

```bash
npx playwright install chromium   # first time only
npm run resume:pdf
```

Then commit the new PDF. It's laid out to fit on two A4 pages.

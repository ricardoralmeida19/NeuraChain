# NeuraChain Solutions website

Next.js 16 site for neurachainsolutions.com. One page, plus a small API route that emails form submissions to you.

## Where to edit things

- **All page text** (services, credentials, industries, contact details): `components/content.ts`
- **Page layout and section order:** `app/page.tsx`
- **Colors, fonts, spacing:** `app/globals.css` (colors are the variables at the top)
- **Page title and search description:** `app/layout.tsx`

## Run it on your computer (optional)

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Put it live on neurachainsolutions.com

### 1. Put the code on GitHub
1. Create a free account at github.com if you don't have one.
2. Click **New repository**, name it `neurachain-site`, set it to **Private**, and create it.
3. On the empty repository page, choose **uploading an existing file** and drag in everything from this folder (not `node_modules` or `.next`, if they exist). Commit.

### 2. Deploy on Vercel
1. Sign in at vercel.com with your GitHub account (the free Hobby plan is enough to start; Vercel's terms ask commercial sites to use the Pro plan, so check which applies to you).
2. **Add New → Project**, pick `neurachain-site`, keep the defaults, click **Deploy**.
3. You'll get a working preview address ending in `.vercel.app`. Check the site there before touching your domain.

### 3. Turn on the forms
The assessment and early-access forms send email through Resend (resend.com, free tier covers this volume).
1. Create a Resend account and add `neurachainsolutions.com` as a sending domain. Resend gives you a few DNS records (TXT/MX on a `send` subdomain) to add at Northwest. These don't affect your existing email.
2. Create an API key in Resend.
3. In Vercel → your project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = the key
   - `CONTACT_TO_EMAIL` = the inbox that should receive requests
   - `CONTACT_FROM_EMAIL` = `NeuraChain website <website@neurachainsolutions.com>`
4. Redeploy (Deployments → ⋯ → Redeploy).

Until this is done, the forms show a message telling visitors to email you directly.

### 4. Point your domain at Vercel
1. In Vercel → your project → **Settings → Domains**, add `neurachainsolutions.com` and `www.neurachainsolutions.com`.
2. Vercel shows the exact DNS records to create (typically an **A** record for the bare domain and a **CNAME** for `www`). Copy them from that screen.
3. Log in to your Northwest Registered Agent account, open the domain's **DNS settings**, and:
   - Replace the existing **A** record for `@` with Vercel's value.
   - Replace or add the **CNAME** for `www` with Vercel's value.
   - **Do not change MX, TXT/SPF or DKIM records.** Those run your email.
4. Wait for Vercel's Domains screen to show the domain as valid (minutes to a few hours). Vercel issues the HTTPS certificate automatically.

If Northwest's portal doesn't let you edit DNS records, ask their support to either make the two changes above or set the domain's nameservers to Vercel's (only do the nameserver route after moving your email records into Vercel too).

### 5. Turn off the old placeholder
The current "Good Things are Coming" page is a WordPress site hosted by Northwest. Once the domain points to Vercel it stops showing. You can cancel that website hosting add-on afterwards if you don't use it for anything else.

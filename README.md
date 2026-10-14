# NeuraChain Solutions website

Static website for www.neurachainsolutions.com. Plain HTML, CSS and JavaScript with no build step: whatever is in this repository is what gets published.

## Pages

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Landing page: hero with the NeuraChain leader, five services, how it works, why NeuraChain, contact |
| `/about` | `about.html` | About NeuraChain and the founder |
| `/hex-squad/` | `hex-squad/index.html` | Hex Squad overview: the six sourcing agents (linked from the Strategic Sourcing card) |
| `/hex-squad/bouncer-bo` … `/hex-squad/watchdog-willa` | `hex-squad/*.html` | One page per agent / sourcing phase |
| `/services/lean` … `/services/ai-platform` | `services/*.html` | Simulation page for each of services 2–5 (LEAN, Engineering, Smart Factory, AI Platform), linked from the service cards |
| `/privacy` | `privacy.html` | Privacy Policy (linked in every footer and from the booking form) |
| any missing page | `404.html` | "Page not found" page |

Images and the hero video live in `assets/`. `favicon.svg` is the hexagon logo used as the browser-tab icon. `assets/og.jpg` is the preview image shown when the link is shared on LinkedIn, Slack, WhatsApp and similar.

## Making changes

Edit the HTML file, commit, and push to `main`. The live site updates automatically a minute or two later (GitHub Pages or Vercel, whichever is connected).

Things you may want to change later:
- **Discovery-call form:** every "Book a discovery call" button opens a request form (`assets/book.js`). Right now, submitting it opens the visitor's email app with their answers filled in. To receive submissions directly instead, create a free form endpoint (for example at formspree.io), paste its URL into `FORM_ENDPOINT` at the top of `assets/book.js`, and push.
- **Social media:** the Instagram, LinkedIn, Facebook, X and TikTok icons in the footers are placeholders. To activate one, add `href="https://…"` to its `<a class="soc" …>` tag (in `index.html` and `about.html`) and remove `role="link" aria-disabled="true"`.
- **Calendar link (optional):** if you later use a booking page (Calendly, Google appointment schedule), it can be added to the form's confirmation message in `assets/book.js`.
- **Text:** each page's text is directly in its HTML file.
- **Colors:** the variables at the top of each page's `<style>` block (`--mint`, `--amber`, `--sky`, `--violet`, `--green`).

## Publishing

### Option A: GitHub Pages (simplest, free for a public repository)

1. On GitHub, open this repository → **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, **Branch** to `main` and folder `/ (root)`, then **Save**.
3. After a minute or two the site is live at `https://ricardoralmeida19.github.io/NeuraChain/`. Check it there first.
4. When you're happy, connect the domain:
   - In **Settings → Pages → Custom domain**, enter `www.neurachainsolutions.com` and **Save**. (GitHub adds a small `CNAME` file to the repository; leave it there.)
   - In your domain's DNS settings (Northwest Registered Agent), add or replace:
     - **CNAME** record: host `www` → `ricardoralmeida19.github.io`
     - **A** records for the bare domain (`@`), four of them: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - Remove any other A record for `@` (the old placeholder site).
     - **Do not change MX, TXT/SPF or DKIM records.** Those run your email.
   - Back in **Settings → Pages**, once the DNS check passes (minutes to a few hours), tick **Enforce HTTPS**.

### Option B: Vercel

`vercel.json` is already set up for a static site (no framework, clean URLs). In Vercel: **Add New → Project**, import this repository, keep the defaults and deploy. If a Vercel project was already connected for the earlier Next.js version, open **Settings → Build and Deployment** and set **Framework Preset** to **Other** before redeploying. Then add the domain under **Settings → Domains** and copy the DNS records Vercel shows into Northwest (again, leave MX/TXT records alone).

Use one option or the other, not both, for the domain.

## History

The earlier Next.js version of the site (with the Resend contact form) was replaced by this static site. It is still in the Git history if anything from it is needed again.

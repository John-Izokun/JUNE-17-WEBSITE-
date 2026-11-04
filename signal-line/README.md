# klyvo.ca: Signal & Line

The public site for Signal & Line, live at **https://www.klyvo.ca**. It's built in React, Vite and TypeScript, with one page per market. All 10 sending domains (goldklyvo.info, startklyvo.info, …) 301 to klyvo.ca, so every prospect who checks a sender lands on the home page.

The look is signalandline.com's (cream paper, Charter serif, oxblood accent, mono labels, forest and brass dark sections, no webfonts). It carries the manufacturing desk's documents: the production board, the idle-time calculator, the trademark → call → introduction trio, the floor check, the terms and the sample memo.

signalandline.com itself is a separate static site in `~/signal-and-line/`, hosted on Surge, and was left as it is.

## Pages

| URL | File | Content |
| --- | --- | --- |
| `/` | `index.html` → `src/pages/Home.tsx` | Signal & Line: hero, the markets table, the 4-step routing process, partner results (myoProcess case studies, each linked), the Klyvo manufacturing desk, FAQ, booking |
| `/manufacturing` | `manufacturing.html` → `src/pages/Manufacturing.tsx` | The original klyvo.ca page, re-skinned, with current terms |
| `/nurse-staffing`, `/recruiting`, `/connectivity`, `/construction` | `<slug>.html` → `src/pages/Sector.tsx` | One template. The words are in `src/sectors.ts` |

Old links such as `klyvo.ca/#offer` forward to `/manufacturing#offer` (`src/entries/home.tsx`).

## Change the words

- Email, Cal.com link and the market list (nav, footer, home table): `src/site.ts`
- A market page: its entry in `src/sectors.ts`
- Manufacturing terms and FAQ: `src/pages/Manufacturing.tsx`
- Home FAQ and case studies: `src/pages/Home.tsx`

**Copy rules (from the HQ, don't break them):**
- No price anywhere ("Agreed on the call").
- No invented results. The case studies are labelled as myoProcess partner results and link to their case pages.
- No exclusivity, "not a broker", "no commission" or "five in 60 days" claims.
- None of these words: DTC, Shopify, scraping, Instantly, Apollo, leads, funnel, pipeline.

## Add a market

1. Add it to `MARKETS` in `src/site.ts`.
2. Add its page to `SECTORS` in `src/sectors.ts` (copy an existing entry).
3. Copy `construction.html` to `<slug>.html`. Change the title, description, canonical, og tags and `data-sector`.
4. Add the slug to `PAGES` in `vite.config.ts` and to `public/sitemap.xml`.

## Run and check

```bash
npm install
npm run build          # tsc + vite build, into dist/
npx -y serve@14 dist   # clean URLs like Vercel: /manufacturing serves manufacturing.html
```

## Deploy

GitHub repo `John-Izokun/JUNE-17-WEBSITE-`. `main` auto-deploys to the Vercel project `websiteforklyvolongone-br3m` (Root Directory `signal-line/`). `vercel.json` turns on `cleanUrls`.

1. Clone the repo to a scratch folder.
2. Branch, then copy this folder into its `signal-line/`, leaving out `node_modules`, `dist` and `.claude`.
3. Push, open a PR and squash-merge.
4. Production status shows on the merge commit: `gh api repos/John-Izokun/JUNE-17-WEBSITE-/commits/<sha>/status`.
5. Rollback is a revert PR.

DNS is on Porkbun: the apex A record points to 216.198.79.1 (Vercel), and `www` is a Vercel CNAME. Email records (Google MX, SPF, DMARC) are separate. Don't touch them.

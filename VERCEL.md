# Deploy this example on Vercel

This is a Next.js app. Any Vercel account that can import a GitHub repository can host it. The steps below are the same for a personal account or a team.

## 1. Put the code on GitHub

This repository should be **public** (or private, if your Vercel plan allows private Git repos). Push `main`.

## 2. Import the project in Vercel

1. Open the [Vercel dashboard](https://vercel.com/dashboard) and sign in.
2. Click **Add New… → Project**.
3. Import this GitHub repository. If it does not appear, grant the Vercel GitHub app access to the repository (or the organization that owns it) under GitHub **Settings → Applications → Vercel**.
4. Confirm the framework preset is **Next.js**. Leave the build command and output directory at the Next.js defaults (`next build`, `.next`).
5. Do not add a Tailwind or PostCSS plugin — this app has none.

## 3. Set environment variables

Before the first production deploy, add the variables from `.env.example`. In the Vercel project: **Settings → Environment Variables**. Apply them to Production, Preview, and Development unless you intentionally split them.

| Name | Required for | Notes |
| --- | --- | --- |
| `RULECMS_TOKEN` | All widget pages | The RuleCMS app token. One variable; used for client-side and server pre-fetched fetches. |
| `RULECMS_WIDGET_1_PUBLISHED_KEY` | Widget 1 | Published key from RuleCMS (`{environmentId}---widget-…`). |

When you add another gallery widget, add `RULECMS_WIDGET_<N>_PUBLISHED_KEY` (see `__docs__/RUNBOOK_add-gallery-widget.md`).

After you change env vars, trigger a new deployment so the server layout picks them up.

## 4. Deploy

Click **Deploy**. The production URL is shown when the build finishes. Later pushes to the connected Git branch deploy automatically.

### What you should see

- `/` — gallery homepage and left sidebar (plain CSS, no Tailwind on the host).
- `/widgets/widget-1` — client-side RuleCMS widget, once `RULECMS_TOKEN` and the published key are set.
- `/widgets/widget-1/ssr` — server pre-fetched widget, same two variables.

If credentials are missing, those widget pages show a configuration message instead of failing the build.

## 5. Local check (optional)

```bash
cp .env.example .env.local
# fill in RULECMS_TOKEN and published keys
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Troubleshooting

- **Widget pages say credentials are not configured** — `RULECMS_TOKEN` or the widget published-key var is missing or misspelled. Redeploy after changing them on the host.
- **SSR page shows a fetch error** — the published key or `RULECMS_TOKEN` is wrong, or the widget is unpublished.
- **GitHub repo does not appear in Vercel** — the Vercel GitHub app is not installed on that account or organization, or it is not granted access to this repository.
- **Build fails on Tailwind / PostCSS** — this app must not gain a Tailwind dependency. Host chrome uses `src/app/globals.css` only.

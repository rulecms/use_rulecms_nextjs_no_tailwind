# Runbook: add another RuleCMS widget to this gallery

Agent-facing. Follow this when the user says something like:

- “Add support for one more RuleCMS widget with this widget ID”
- “Add widget 2 with published key …”
- “Embed another RuleCMS widget and give it a page”

They may say **widget ID**. In this codebase the embed identifier is the **published key** (`{environmentId}---widget-…`). If they only send an internal UUID, ask for the published key.

## What “done” means

1. The left sidebar lists the new widget.
2. `/widgets/<slug>` renders it client-side (`RuleCMSWidget`).
3. `/widgets/<slug>/ssr` renders it with `fetchRuleCMSWidget` + `mode="pre-fetched"`.
4. `.env.example` and `VERCEL.md` list the new env var names (blank values — never commit tokens).
5. The host still has **no Tailwind** (no `tailwindcss` dependency, no `tailwind.config.*`, no `@import "tailwindcss"`).

Do not create a new Next.js app. This repo is the gallery.

## Non-negotiables

- Tokens stay in environment variables. Never put real tokens or published keys in git.
- There is **one** app token: `RULECMS_TOKEN`. Do not add `NEXT_PUBLIC_RULECMS_TOKEN` or any second token name unless the user says the widget lives in a different RuleCMS project.
- Do not add Tailwind, PostCSS Tailwind plugins, or host-side utility CSS that copies Tailwind.
- Widget CSS, CSS variables, and Tailwind class resolution stay on the RuleCMS side.
- Routes are generated from `src/lib/gallery-widgets.ts`. You should not need a new `page.tsx` per widget.

## Steps

### 1. Confirm the published key and a label

Ask if missing:

- Published key
- Sidebar label (default `Widget N` where N is the next integer)
- Optional short description

### 2. Append the registry

Edit `src/lib/gallery-widgets.ts`. Copy the `widget-1` object. Example for widget 2:

```ts
{
  slug: 'widget-2',
  label: 'Widget 2',
  description:
    'Second gallery widget. CSS and Tailwind utilities are compiled on the RuleCMS side.',
  publishedKeyEnv: 'RULECMS_WIDGET_2_PUBLISHED_KEY',
},
```

Slug pattern: `widget-<n>`. Keep slugs URL-safe and stable.

The sidebar (`src/components/Sidebar.tsx`) and both routes under `src/app/widgets/[slug]/` read this list. No new route files.

### 3. Add env placeholders (blank)

`.env.example`:

```
RULECMS_WIDGET_2_PUBLISHED_KEY=
```

`VERCEL.md`: add that name to the environment-variable table.

Tell the user to set it in `.env.local` and in Vercel **Settings → Environment Variables**, then redeploy.

### 4. Do not write the published key into source

If the user pasted a key in chat, put it only in `.env.local` (gitignored) when you can, or tell them to paste it into `.env.local` and Vercel themselves. Never commit `.env.local`.

### 5. Verify

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` must run **outside** the agent sandbox (`required_permissions: ["all"]`). See `.cursor/rules/never-build-in-sandbox.mdc`.

Smoke-check:

- Sidebar shows the new label
- `/widgets/widget-N` and `/widgets/widget-N/ssr` exist
- Without env vars, those pages show the credentials callout instead of crashing the build

If a browser is available and `.env.local` is filled in, open both routes and confirm the widget paints (Tailwind utilities resolved inside the widget, host chrome still unstyled by Tailwind).

## What you should not do

- Do not install `tailwindcss` or `@tailwindcss/postcss`.
- Do not copy `use_rulecms_nextjs` host Tailwind styles into this app.
- Do not add demo tokens as source fallbacks (unlike some other public examples).
- Do not introduce `NEXT_PUBLIC_RULECMS_TOKEN` or a second token env var.
- Do not mention a specific Vercel team, Hobby plan, or internal account in user-facing docs.

## Files you will usually touch

| File | Change |
| --- | --- |
| `src/lib/gallery-widgets.ts` | New registry entry |
| `.env.example` | Blank published-key var |
| `VERCEL.md` | Document that var |

You should **not** need to edit `src/app/widgets/[slug]/page.tsx` or `ssr/page.tsx` unless the embed API itself changed.

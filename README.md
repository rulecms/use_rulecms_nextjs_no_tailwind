# RuleCMS widget gallery — Next.js, no Tailwind

A Next.js host that embeds RuleCMS widgets **without any Tailwind configuration on this project**. There is no `tailwindcss` package, no Tailwind PostCSS plugin, and no `tailwind.config`. The left sidebar and homepage use plain CSS.

Widgets are composed in RuleCMS, including layout, CSS variables, and Tailwind-based class names. When a widget runs here, those classes are already resolved into CSS that `@rulecms/widget-react` injects. This app only renders the widgets.

This is a **gallery**. The sidebar opens each widget on its own routes. Start with Widget 1; add more with the [add-widget runbook](__docs__/RUNBOOK_add-gallery-widget.md).

The general Next.js integration demo (host Tailwind, CSR/SSR/SSG/ISR cookbook) is a separate repo: [use_rulecms_nextjs](https://github.com/rulecms/use_rulecms_nextjs).

## Live demo

**[View the live demo](https://use-rulecms-nextjs-no-tailwind.vercel.app/)**

Widget pages show a configuration message until RuleCMS env vars are set on the host.

## Quick start

```bash
git clone https://github.com/rulecms/use_rulecms_nextjs_no_tailwind.git
cd use_rulecms_nextjs_no_tailwind
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see below), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the **left sidebar** to move between the homepage and each widget.

Or skip local setup and use the [live demo](https://use-rulecms-nextjs-no-tailwind.vercel.app/). To deploy your own instance, follow [VERCEL.md](./VERCEL.md).

## Environment variables

This repository does **not** commit tokens or published keys. Copy `.env.example` to `.env.local`.

| Name | Used by |
| --- | --- |
| `NEXT_PUBLIC_RULECMS_TOKEN` | Client-side pages (`/widgets/widget-1`) |
| `RULECMS_TOKEN` | Server pre-fetched pages (`/widgets/widget-1/ssr`) — never expose this to the browser |
| `NEXT_PUBLIC_RULECMS_ENDPOINT` / `RULECMS_ENDPOINT` | Optional; default `https://rulecms.com` |
| `NEXT_PUBLIC_RULECMS_WIDGET_1_PUBLISHED_KEY` | Widget 1 published key |
| `RULECMS_WIDGET_1_PUBLISHED_KEY` | Optional server override; falls back to the public key |

Get an **app token** from RuleCMS project settings and a **published key** by publishing a widget in the composer (`{environmentId}---widget-…`).

## Routes

| Route | What it shows |
| --- | --- |
| `/` | Purpose of this gallery; how to use the sidebar |
| `/widgets/widget-1` | Widget 1, client-side `RuleCMSWidget` |
| `/widgets/widget-1/ssr` | Widget 1, `fetchRuleCMSWidget` on the server then `mode="pre-fetched"` |

## How embedding works

1. Wrap the tree with `RuleCMSWidgetProvider` (`src/app/providers.tsx`) and register `@rulecms/source-components-react` as the default library.
2. Client-side: `<RuleCMSWidget publishedKey={…} />`.
3. Server pre-fetched: `fetchRuleCMSWidget` from `@rulecms/widget-react/server`, then `<RuleCMSWidget mode="pre-fetched" initialData={…} />`.

Gallery entries live in `src/lib/gallery-widgets.ts`. Adding a widget is a registry + env-var change, not a new app.

## Scripts

```bash
npm run dev        # next dev --turbopack
npm run build      # next build --turbopack
npm run start      # next start
npm run lint
npm run typecheck
```

## License

MIT

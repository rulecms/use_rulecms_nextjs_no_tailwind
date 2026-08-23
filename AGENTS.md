# Agent notes

This is a **Next.js gallery** that embeds RuleCMS widgets. The host has **no Tailwind**.

## Add another widget

If the user asks to add a RuleCMS widget (by widget ID / published key), follow:

[`__docs__/RUNBOOK_add-gallery-widget.md`](./__docs__/RUNBOOK_add-gallery-widget.md)

## Deploy

User-facing Vercel steps (generic, no account names): [`VERCEL.md`](./VERCEL.md)

## Builds

Never run `npm run build` inside the tool sandbox. See `.cursor/rules/never-build-in-sandbox.mdc`.

/**
 * Single source of truth for gallery widgets.
 *
 * Adding a widget is: append an entry here, add matching env var names to
 * `.env.example` and `VERCEL.md`. Routes and the sidebar are generated from
 * this list. See `__docs__/RUNBOOK_add-gallery-widget.md`.
 */
export interface GalleryWidget {
  /** URL segment under `/widgets/`, e.g. `widget-1`. */
  slug: string;
  /** Sidebar label and page heading. */
  label: string;
  /** Short purpose shown on the widget pages. */
  description: string;
  /**
   * Client published-key env var (`NEXT_PUBLIC_…`).
   * Read on the server and passed into the client widget as a prop so Next.js
   * does not need a static `process.env.NEXT_PUBLIC_…` reference per widget.
   */
  publishedKeyPublicEnv: string;
  /**
   * Optional server-only published-key env var. Falls back to the public one.
   */
  publishedKeyServerEnv: string;
}

export const galleryWidgets: GalleryWidget[] = [
  {
    slug: 'widget-1',
    label: 'Widget 1',
    description:
      'First gallery widget. Layout, CSS variables, and Tailwind utility classes are defined and compiled on the RuleCMS side. This Next.js host has no Tailwind configuration.',
    publishedKeyPublicEnv: 'NEXT_PUBLIC_RULECMS_WIDGET_1_PUBLISHED_KEY',
    publishedKeyServerEnv: 'RULECMS_WIDGET_1_PUBLISHED_KEY',
  },
];

export function getWidgetBySlug(slug: string): GalleryWidget | undefined {
  return galleryWidgets.find((widget) => widget.slug === slug);
}

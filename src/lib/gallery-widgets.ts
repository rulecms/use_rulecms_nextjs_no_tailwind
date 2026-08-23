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
   * Env var for this widget’s published key. Read on the server and passed
   * into client widgets as a prop.
   */
  publishedKeyEnv: string;
}

export const galleryWidgets: GalleryWidget[] = [
  {
    slug: 'widget-1',
    label: 'Widget 1',
    description:
      'First gallery widget. Layout, CSS variables, and Tailwind utility classes are defined and compiled on the RuleCMS side. This Next.js host has no Tailwind configuration.',
    publishedKeyEnv: 'RULECMS_WIDGET_1_PUBLISHED_KEY',
  },
];

export function getWidgetBySlug(slug: string): GalleryWidget | undefined {
  return galleryWidgets.find((widget) => widget.slug === slug);
}

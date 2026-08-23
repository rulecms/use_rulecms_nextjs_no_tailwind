import Link from 'next/link';
import type { GalleryWidget } from '@/lib/gallery-widgets';

type WidgetMode = 'csr' | 'ssr';

interface WidgetPageHeaderProps {
  widget: GalleryWidget;
  mode: WidgetMode;
}

export function WidgetPageHeader({ widget, mode }: WidgetPageHeaderProps) {
  const csrHref = `/widgets/${widget.slug}`;
  const ssrHref = `/widgets/${widget.slug}/ssr`;

  return (
    <header className="gallery-page-header">
      <p className="gallery-kicker">{widget.label}</p>
      <h1>{mode === 'csr' ? 'Client-side widget' : 'Server pre-fetched widget'}</h1>
      <p className="gallery-lead">{widget.description}</p>
      <nav className="gallery-mode-tabs" aria-label="Rendering mode">
        <Link
          href={csrHref}
          className={mode === 'csr' ? 'gallery-tab gallery-tab-active' : 'gallery-tab'}
        >
          Client-side (CSR)
        </Link>
        <Link
          href={ssrHref}
          className={mode === 'ssr' ? 'gallery-tab gallery-tab-active' : 'gallery-tab'}
        >
          Server pre-fetched (SSR)
        </Link>
      </nav>
    </header>
  );
}

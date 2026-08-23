import type { Metadata } from 'next';
import Link from 'next/link';
import { galleryWidgets } from '@/lib/gallery-widgets';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <article className="gallery-page gallery-copy">
      <p className="gallery-kicker">Example host app</p>
      <h1>Next.js gallery with no Tailwind — widgets bring their own CSS</h1>
      <p className="gallery-lead">
        This project is a Next.js host that does not understand Tailwind. There
        is no Tailwind package, PostCSS plugin, or config file. The chrome
        around the gallery (this page and the left sidebar) is plain CSS.
      </p>
      <p>
        Each RuleCMS widget is composed on the RuleCMS side, including layout,
        CSS variables, and Tailwind-based class names. When the widget compiles
        and runs here, those classes are already resolved into CSS that the
        widget runtime injects. The host only embeds{' '}
        <code>@rulecms/widget-react</code>.
      </p>
      <h2>How to use this app</h2>
      <p>
        Use the <strong>left sidebar</strong> to open each RuleCMS widget. Every
        widget has a dedicated route, plus a client-side view and a server
        pre-fetched view:
      </p>
      <ul>
        {galleryWidgets.map((widget) => (
          <li key={widget.slug}>
            <Link href={`/widgets/${widget.slug}`}>{widget.label}</Link>
            {' — '}
            <Link href={`/widgets/${widget.slug}`}>client-side</Link>
            {' / '}
            <Link href={`/widgets/${widget.slug}/ssr`}>server pre-fetched</Link>
          </li>
        ))}
      </ul>
      <p>
        As more widgets are published in RuleCMS, they are added to this gallery
        the same way: a sidebar entry, a pair of routes, and environment
        variables for that widget’s published key. See{' '}
        <code>__docs__/RUNBOOK_add-gallery-widget.md</code>.
      </p>
      <h2>What this host does not do</h2>
      <ul>
        <li>It does not compile Tailwind.</li>
        <li>It does not define the widget’s CSS variables or utility classes.</li>
        <li>
          It does not ship RuleCMS tokens or published keys. Copy{' '}
          <code>.env.example</code> to <code>.env.local</code> (and set the same
          names on your host when deploying).
        </li>
      </ul>
      <h2>Related example</h2>
      <p>
        The general Next.js integration demo (CSR, SSR, SSG, ISR, with Tailwind
        on the host) is a separate repository:{' '}
        <a href="https://github.com/rulecms/use_rulecms_nextjs">
          use_rulecms_nextjs
        </a>
        . This gallery is specifically the no-Tailwind host.
      </p>
    </article>
  );
}

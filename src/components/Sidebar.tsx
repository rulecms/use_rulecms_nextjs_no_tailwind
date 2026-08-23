'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { galleryWidgets } from '@/lib/gallery-widgets';

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="gallery-nav-toggle"
        aria-expanded={open}
        aria-controls="gallery-sidebar"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>
      {open ? (
        <button
          type="button"
          className="gallery-nav-backdrop"
          aria-label="Close menu"
          onClick={close}
        />
      ) : null}
      <aside
        id="gallery-sidebar"
        className={open ? 'gallery-sidebar gallery-sidebar-open' : 'gallery-sidebar'}
      >
        <div className="gallery-sidebar-brand">
          <Link href="/" onClick={close} className="gallery-brand-link">
            <span className="gallery-brand-mark">RC</span>
            <span>
              <strong>RuleCMS gallery</strong>
              <span className="gallery-brand-sub">Next.js, no Tailwind</span>
            </span>
          </Link>
        </div>
        <nav className="gallery-sidebar-nav" aria-label="Gallery">
          <Link
            href="/"
            onClick={close}
            className={pathname === '/' ? 'gallery-nav-link gallery-nav-link-active' : 'gallery-nav-link'}
          >
            Home
          </Link>
          <p className="gallery-nav-heading">Widgets</p>
          {galleryWidgets.map((widget) => {
            const csrHref = `/widgets/${widget.slug}`;
            const ssrHref = `/widgets/${widget.slug}/ssr`;
            const csrActive = pathname === csrHref;
            const ssrActive = pathname === ssrHref;

            return (
              <div key={widget.slug} className="gallery-nav-group">
                <span className="gallery-nav-group-label">{widget.label}</span>
                <Link
                  href={csrHref}
                  onClick={close}
                  className={
                    csrActive
                      ? 'gallery-nav-link gallery-nav-link-nested gallery-nav-link-active'
                      : 'gallery-nav-link gallery-nav-link-nested'
                  }
                >
                  Client-side
                </Link>
                <Link
                  href={ssrHref}
                  onClick={close}
                  className={
                    ssrActive
                      ? 'gallery-nav-link gallery-nav-link-nested gallery-nav-link-active'
                      : 'gallery-nav-link gallery-nav-link-nested'
                  }
                >
                  Server pre-fetched
                </Link>
              </div>
            );
          })}
        </nav>
        <p className="gallery-sidebar-note">
          Use this sidebar to open each RuleCMS widget. New widgets get a dedicated
          route pair when they are added to the gallery registry.
        </p>
      </aside>
    </>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="gallery-page gallery-copy">
      <p className="gallery-kicker">404</p>
      <h1>Page not found</h1>
      <p className="gallery-lead">
        That route is not in this gallery. Use the sidebar or return{' '}
        <Link href="/">home</Link>.
      </p>
    </article>
  );
}

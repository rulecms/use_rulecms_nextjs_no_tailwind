import type { GalleryWidget } from '@/lib/gallery-widgets';

interface MissingCredentialsProps {
  widget: GalleryWidget;
}

export function MissingCredentials({ widget }: MissingCredentialsProps) {
  return (
    <div className="gallery-callout gallery-callout-warning">
      <h2>Credentials are not configured</h2>
      <p>
        This gallery does not ship tokens or published keys. Copy{' '}
        <code>.env.example</code> to <code>.env.local</code> and set:
      </p>
      <ul>
        <li>
          <code>RULECMS_TOKEN</code>
        </li>
        <li>
          <code>{widget.publishedKeyEnv}</code>
        </li>
      </ul>
      <p>
        For a deployed instance, add the same names in the host platform’s
        environment-variable settings (see <code>VERCEL.md</code>). Restart the
        dev server after changing local env files.
      </p>
    </div>
  );
}

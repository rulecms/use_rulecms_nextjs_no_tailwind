import type { GalleryWidget } from '@/lib/gallery-widgets';

type CredentialMode = 'csr' | 'ssr';

interface MissingCredentialsProps {
  widget: GalleryWidget;
  mode: CredentialMode;
}

export function MissingCredentials({ widget, mode }: MissingCredentialsProps) {
  const tokenEnv = mode === 'ssr' ? 'RULECMS_TOKEN' : 'NEXT_PUBLIC_RULECMS_TOKEN';
  const keyEnv =
    mode === 'ssr' ? widget.publishedKeyServerEnv : widget.publishedKeyPublicEnv;

  return (
    <div className="gallery-callout gallery-callout-warning">
      <h2>Credentials are not configured</h2>
      <p>
        This gallery does not ship tokens or published keys. Copy{' '}
        <code>.env.example</code> to <code>.env.local</code> and set:
      </p>
      <ul>
        <li>
          <code>{tokenEnv}</code>
        </li>
        <li>
          <code>{keyEnv}</code>
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

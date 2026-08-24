import type { GalleryWidget } from './gallery-widgets';

function readEnv(name: string): string {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

/** The one RuleCMS app token. Used for both client-side and server fetches. */
export function getRuleCMSToken(): string {
  return readEnv('RULECMS_TOKEN');
}

export function getPublishedKey(widget: GalleryWidget): string {
  return readEnv(widget.publishedKeyEnv);
}

export function isWidgetConfigured(widget: GalleryWidget): boolean {
  return Boolean(getRuleCMSToken() && getPublishedKey(widget));
}

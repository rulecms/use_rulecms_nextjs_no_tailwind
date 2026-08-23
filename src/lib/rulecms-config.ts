import type { GalleryWidget } from './gallery-widgets';

export const DEFAULT_RULECMS_ENDPOINT = 'https://rulecms.com';

function readEnv(name: string): string {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

export function getClientToken(): string {
  return readEnv('NEXT_PUBLIC_RULECMS_TOKEN');
}

/** Server-only token — never prefix this with NEXT_PUBLIC_. */
export function getServerToken(): string {
  return readEnv('RULECMS_TOKEN');
}

export function getRuleCMSEndpoint(): string {
  return (
    readEnv('RULECMS_ENDPOINT') ||
    readEnv('NEXT_PUBLIC_RULECMS_ENDPOINT') ||
    DEFAULT_RULECMS_ENDPOINT
  );
}

export function getClientPublishedKey(widget: GalleryWidget): string {
  return readEnv(widget.publishedKeyPublicEnv);
}

export function getServerPublishedKey(widget: GalleryWidget): string {
  return readEnv(widget.publishedKeyServerEnv) || getClientPublishedKey(widget);
}

export function isClientConfigured(widget: GalleryWidget): boolean {
  return Boolean(getClientToken() && getClientPublishedKey(widget));
}

export function isServerConfigured(widget: GalleryWidget): boolean {
  return Boolean(getServerToken() && getServerPublishedKey(widget));
}

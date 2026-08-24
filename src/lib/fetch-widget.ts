import {
  fetchRuleCMSWidget,
  type RuleCMSWidgetData,
} from '@rulecms/widget-react/server';
import type { GalleryWidget } from './gallery-widgets';
import { getPublishedKey, getRuleCMSToken } from './rulecms-config';

interface FetchWidgetOptions {
  revalidateSeconds?: number;
  /** Skip Next.js fetch cache — use while iterating in the composer. */
  noStore?: boolean;
}

/** Fetch render-ready widget data on the server. */
export async function fetchGalleryWidget(
  widget: GalleryWidget,
  options: FetchWidgetOptions = {}
): Promise<RuleCMSWidgetData> {
  const { revalidateSeconds, noStore } = options;

  let fetchOptions: RequestInit | undefined;
  if (noStore) {
    fetchOptions = { cache: 'no-store' };
  } else if (revalidateSeconds) {
    fetchOptions = { next: { revalidate: revalidateSeconds } };
  }

  return fetchRuleCMSWidget({
    publishedKey: getPublishedKey(widget),
    token: getRuleCMSToken(),
    fetchOptions,
  });
}

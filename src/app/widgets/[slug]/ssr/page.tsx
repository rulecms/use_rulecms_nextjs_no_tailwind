import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { MissingCredentials } from '@/components/MissingCredentials';
import { RuleCMSWidgetPreFetched } from '@/components/RuleCMSWidgetPreFetched';
import { WidgetPageHeader } from '@/components/WidgetPageHeader';
import { fetchGalleryWidget } from '@/lib/fetch-widget';
import { getWidgetBySlug } from '@/lib/gallery-widgets';
import { getPublishedKey, isWidgetConfigured } from '@/lib/rulecms-config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface WidgetSsrPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WidgetSsrPageProps): Promise<Metadata> {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    return { title: 'Widget' };
  }
  return { title: `${widget.label} (server pre-fetched)` };
}

export default async function WidgetSsrPage({ params }: WidgetSsrPageProps) {
  await connection();
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    notFound();
  }

  if (!isWidgetConfigured(widget)) {
    return (
      <article className="gallery-page gallery-page-wide">
        <WidgetPageHeader widget={widget} mode="ssr" />
        <MissingCredentials widget={widget} />
      </article>
    );
  }

  const publishedKey = getPublishedKey(widget);
  let fetchError: string | null = null;
  let widgetData = null;

  try {
    widgetData = await fetchGalleryWidget(widget, { noStore: true });
  } catch (error) {
    fetchError =
      error instanceof Error
        ? error.message
        : 'Failed to fetch the RuleCMS widget on the server.';
  }

  return (
    <article className="gallery-page gallery-page-wide">
      <WidgetPageHeader widget={widget} mode="ssr" />
      {fetchError || !widgetData ? (
        <div className="gallery-callout gallery-callout-error">
          <h2>Could not load this widget</h2>
          <p>
            The server fetch using <code>fetchRuleCMSWidget</code> failed. Check
            the published key and <code>RULECMS_TOKEN</code>.
          </p>
          {fetchError ? <p>{fetchError}</p> : null}
        </div>
      ) : (
        <div className="gallery-widget-frame">
          <RuleCMSWidgetPreFetched
            publishedKey={publishedKey}
            initialData={widgetData}
          />
        </div>
      )}
    </article>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MissingCredentials } from '@/components/MissingCredentials';
import { RuleCMSWidgetClient } from '@/components/RuleCMSWidgetClient';
import { WidgetPageHeader } from '@/components/WidgetPageHeader';
import { galleryWidgets, getWidgetBySlug } from '@/lib/gallery-widgets';
import { getPublishedKey, isWidgetConfigured } from '@/lib/rulecms-config';

export const dynamicParams = false;

export function generateStaticParams() {
  return galleryWidgets.map((widget) => ({ slug: widget.slug }));
}

interface WidgetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WidgetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    return { title: 'Widget' };
  }
  return { title: `${widget.label} (client-side)` };
}

export default async function WidgetCsrPage({ params }: WidgetPageProps) {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    notFound();
  }

  const configured = isWidgetConfigured(widget);
  const publishedKey = getPublishedKey(widget);

  return (
    <article className="gallery-page gallery-page-wide">
      <WidgetPageHeader widget={widget} mode="csr" />
      {configured ? (
        <div className="gallery-widget-frame">
          <RuleCMSWidgetClient publishedKey={publishedKey} />
        </div>
      ) : (
        <MissingCredentials widget={widget} />
      )}
    </article>
  );
}

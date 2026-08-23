'use client';

import { RuleCMSWidget } from '@rulecms/widget-react';
import type { RuleCMSWidgetData } from '@rulecms/widget-react/server';

interface RuleCMSWidgetPreFetchedProps {
  publishedKey: string;
  initialData: RuleCMSWidgetData;
}

export function RuleCMSWidgetPreFetched({
  publishedKey,
  initialData,
}: RuleCMSWidgetPreFetchedProps) {
  return (
    <RuleCMSWidget
      mode="pre-fetched"
      publishedKey={publishedKey}
      initialData={initialData}
    />
  );
}

'use client';

import { RuleCMSWidget } from '@rulecms/widget-react';

interface RuleCMSWidgetClientProps {
  publishedKey: string;
}

export function RuleCMSWidgetClient({ publishedKey }: RuleCMSWidgetClientProps) {
  return <RuleCMSWidget publishedKey={publishedKey} />;
}

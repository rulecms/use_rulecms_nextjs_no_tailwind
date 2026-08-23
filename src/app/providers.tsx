'use client';

import { ReactNode } from 'react';
import { RuleCMSWidgetProvider } from '@rulecms/widget-react';
import { DEFAULT_RULECMS_ENDPOINT } from '@/lib/rulecms-config';
import { rulecmsLibraries } from '@/lib/rulecms-libraries';

interface RuleCMSProviderProps {
  children: ReactNode;
}

/**
 * Token and endpoint must be static `process.env.NEXT_PUBLIC_*` references.
 * Next.js only inlines those on the client; `process.env[name]` is empty in
 * the browser bundle.
 */
export function RuleCMSProvider({ children }: RuleCMSProviderProps) {
  const appToken = process.env.NEXT_PUBLIC_RULECMS_TOKEN ?? '';
  const endpoint =
    process.env.NEXT_PUBLIC_RULECMS_ENDPOINT || DEFAULT_RULECMS_ENDPOINT;

  return (
    <RuleCMSWidgetProvider
      token={appToken}
      endpoint={endpoint}
      libraries={rulecmsLibraries}
    >
      {children}
    </RuleCMSWidgetProvider>
  );
}

'use client';

import { ReactNode } from 'react';
import { RuleCMSWidgetProvider } from '@rulecms/widget-react';
import { rulecmsLibraries } from '@/lib/rulecms-libraries';

interface RuleCMSProviderProps {
  token: string;
  endpoint: string;
  children: ReactNode;
}

/**
 * Token and endpoint are read on the server from `RULECMS_TOKEN` /
 * `RULECMS_ENDPOINT` and passed in. There is no Next.js-prefixed token.
 */
export function RuleCMSProvider({
  token,
  endpoint,
  children,
}: RuleCMSProviderProps) {
  return (
    <RuleCMSWidgetProvider
      token={token}
      endpoint={endpoint}
      libraries={rulecmsLibraries}
    >
      {children}
    </RuleCMSWidgetProvider>
  );
}

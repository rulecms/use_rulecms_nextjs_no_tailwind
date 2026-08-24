'use client';

import { ReactNode } from 'react';
import { RuleCMSWidgetProvider } from '@rulecms/widget-react';
import { rulecmsLibraries } from '@/lib/rulecms-libraries';

interface RuleCMSProviderProps {
  token: string;
  children: ReactNode;
}

/**
 * Token is read on the server from `RULECMS_TOKEN` and passed in.
 * Do not set `endpoint` — published tokens use widget-cache by default.
 */
export function RuleCMSProvider({ token, children }: RuleCMSProviderProps) {
  return (
    <RuleCMSWidgetProvider token={token} libraries={rulecmsLibraries}>
      {children}
    </RuleCMSWidgetProvider>
  );
}

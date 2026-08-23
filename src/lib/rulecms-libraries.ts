import * as sourceComponents from '@rulecms/source-components-react';
import type { LibraryRegistrationMap } from '@rulecms/widget-react';

/**
 * Component library registrations (required since @rulecms/widget-react v15 —
 * the widget package no longer depends on any concrete component library).
 *
 * The default library is registered eagerly so pre-fetched SSR pages resolve
 * synchronously: server HTML and hydration render identically.
 */
export const rulecmsLibraries: LibraryRegistrationMap = {
  default: sourceComponents,
};

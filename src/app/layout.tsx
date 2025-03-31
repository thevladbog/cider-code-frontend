import type { Metadata } from 'next';

import { App } from '@/components/App';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import '../styles/styles.scss';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import React from 'react';

import '../styles/globals.scss';

export const metadata: Metadata = {
  description: 'Приложение для учета продукции с маркировкой на производстве',
  title: 'CIDER [CODE] | Учет продукции с маркировкой на производстве',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

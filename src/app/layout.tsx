import type { Metadata } from 'next';

import { App, DEFAULT_BODY_CLASSNAME } from '@/components/App';
import React from 'react';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import '../styles/styles.scss';
import '../styles/globals.scss';

export const metadata: Metadata = {
  description: 'Приложение для учета продукции с маркировкой на производстве',
  title: 'CIDER [CODE] | Учет продукции с маркировкой на производстве',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={DEFAULT_BODY_CLASSNAME}>
        <App>{children}</App>
      </body>
    </html>
  );
}

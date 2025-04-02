'use client';

import { useThemeSwitcher } from '@/app/lib/ThemeProvider';
import { Navigation } from '@/components/Breadcrumbs';
import { FooterWrapper } from '@/components/Footer';
import { Button, Icon } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import React from 'react';

import './Wrapper.scss';

const b = block('wrapper');

export type AppProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({ children }) => {
  const { toggleTheme, themeIcon } = useThemeSwitcher();

  return (
    <div className={b()}>
      <div className={b('header')}>
        <div className={b('breadcrumbs')}>
          <Navigation />
        </div>
        <div className={b('theme-button')}>
          <Button size="l" view="outlined" onClick={() => toggleTheme()}>
            <Icon data={themeIcon} />
          </Button>
        </div>
      </div>

      <div className={b('layout')}>
        <div className={b('content')}>{children}</div>
      </div>

      <FooterWrapper />
    </div>
  );
};

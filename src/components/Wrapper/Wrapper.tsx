'use client';

import { useThemeSwitcher } from '@/app/lib/ThemeProvider';
import { FooterWrapper } from '@/components/Footer';
import { Button, Icon } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import React from 'react';

import './Wrapper.scss';

const b = block('wrapper');

const DARK = 'dark';

export type AppProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({ children }) => {
  const { toggleTheme, theme, themeIcon } = useThemeSwitcher();

  const isDark = theme === DARK;

  return (
    <div className={b()}>
      <div className={b('theme-button')}>
        <Button size="l" view="outlined" onClick={() => toggleTheme()}>
          <Icon data={themeIcon} />
        </Button>
      </div>

      <div className={b('layout')}>
        <div className={b('header')}>
          <div className={b('logo')}>
            <div className={b('gravity-logo', { dark: isDark })} />
            <div className={b('next-logo', { dark: isDark })} />
          </div>
        </div>
        <div className={b('content')}>{children}</div>
      </div>

      <FooterWrapper />
    </div>
  );
};

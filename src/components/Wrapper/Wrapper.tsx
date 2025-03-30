'use client';

import { FooterWrapper } from '@/components/Footer';
import { Moon, Sun } from '@gravity-ui/icons';
import { Button, Icon, type Theme } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import React, { useEffect } from 'react';

import './Wrapper.scss';

const b = block('wrapper');

const DARK = 'dark';
const LIGHT = 'light';

export type AppProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem('themeData') ?? DARK;
    setTheme(theme);
  }, []);

  const isDark = theme === DARK;

  return (
    <div className={b()}>
      <div className={b('theme-button')}>
        <Button
          size="l"
          view="outlined"
          onClick={() => {
            setTheme(isDark ? LIGHT : DARK);
            localStorage.setItem('themeData', isDark ? LIGHT : DARK);
            window.dispatchEvent(new Event('storage'));
          }}
        >
          <Icon data={isDark ? Sun : Moon} />
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

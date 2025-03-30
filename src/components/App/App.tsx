'use client';

import { Wrapper } from '@/components/Wrapper';
import { Clock, Mug, Persons, QrCode } from '@gravity-ui/icons';
import { AsideHeader, MenuItem } from '@gravity-ui/navigation';
import { type Theme, ThemeProvider } from '@gravity-ui/uikit';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface AppProps {
  children: React.ReactNode;
}

const DARK = 'dark';

export let DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DARK}`;

export const App: React.FC<AppProps> = ({ children }) => {
  const [compact, setCompact] = useState<boolean>(true);
  const router = useRouter();
  const [themeData, setThemeData] = useState<Theme | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem('themeData') ?? DARK;
    setThemeData(theme);
    DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${theme}`;
  }, []);

  useEffect(() => {
    DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${themeData}`;
  }, [themeData]);

  useEffect(() => {
    function checkThemeData() {
      const item = localStorage.getItem('themeData') as Theme;

      if (item) {
        setThemeData(item);
      }
    }

    window.addEventListener('storage', checkThemeData);

    return () => {
      window.removeEventListener('storage', checkThemeData);
    };
  }, []);

  const toggleCompact = () => {
    setCompact((prevState) => !prevState);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, href: string | undefined) => {
    e.preventDefault();
    router.push(href ?? '/');
  };

  const menuItems: Array<MenuItem> = [
    {
      id: 'shifts',
      title: 'Смены',
      icon: Clock,
      link: '/',
      onItemClick: (item, _, event) => handleClick(event, item.link),
    },
    {
      id: 'products',
      title: 'Продукция',
      icon: Mug,
      link: '/products',
      onItemClick: (item, _, event) => handleClick(event, item.link),
    },
    {
      id: 'users',
      title: 'Пользователи',
      icon: Persons,
      link: '/users',
      onItemClick: (item, _, event) => handleClick(event, item.link),
    },
  ];

  return (
    <ThemeProvider theme={themeData ?? undefined}>
      <AsideHeader
        logo={{ icon: QrCode, text: 'CIDER [CODE]' }}
        compact={compact}
        hideCollapseButton={false}
        headerDecoration={true}
        renderContent={() => <Wrapper>{children}</Wrapper>}
        onChangeCompact={toggleCompact}
        menuItems={menuItems}
      />
    </ThemeProvider>
  );
};

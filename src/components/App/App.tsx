'use client';

import { ThemeProvider } from '@/app/lib/ThemeProvider';
import { Wrapper } from '@/components/Wrapper';
import { Clock, Mug, Persons, Plus, QrCode } from '@gravity-ui/icons';
import { AsideHeader, MenuItem } from '@gravity-ui/navigation';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface AppProps {
  children: React.ReactNode;
}

export const App: React.FC<AppProps> = ({ children }) => {
  const [compact, setCompact] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();

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
      current: pathname === '/',
    },
    {
      id: 'products',
      title: 'Продукция',
      icon: Mug,
      link: '/products',
      onItemClick: (item, _, event) => handleClick(event, item.link),
      current: pathname === '/products',
    },
    {
      id: 'users',
      title: 'Пользователи',
      icon: Persons,
      link: '/users',
      onItemClick: (item, _, event) => handleClick(event, item.link),
      current: pathname === '/users',
    },
    {
      id: 'divider1',
      title: '-',
      type: 'divider',
    },
    {
      id: 'createShift',
      title: 'Новая смена',
      type: 'action',
      icon: Plus,
      afterMoreButton: true,
      onItemClick({ id, title, current }) {
        alert(JSON.stringify({ id, title, current }));
      },
    },
  ];

  return (
    <ThemeProvider>
      <AsideHeader
        logo={{ icon: QrCode, text: 'CIDER [CODE]', onClick: () => router.push('/'), href: '/' }}
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

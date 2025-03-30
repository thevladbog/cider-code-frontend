'use client';

import { Wrapper } from '@/components/Wrapper';
import { Clock, Mug, QrCode } from '@gravity-ui/icons';
import { AsideHeader, MenuItem } from '@gravity-ui/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface AppProps {
  children: React.ReactNode;
}

export const App: React.FC<AppProps> = ({ children }) => {
  const [compact, setCompact] = useState<boolean>(true);
  const router = useRouter();

  const toggleCompact = () => {
    setCompact((prevState) => !prevState);
  };

  const menuItems: Array<MenuItem> = [
    {
      id: 'shifts',
      title: 'Смены',
      icon: Clock,
      link: '/',
      onItemClick: (item) => router.push(item.link ?? '/'),
    },
    {
      id: 'products',
      title: 'Смены',
      icon: Mug,
      link: '/products',
      onItemClick: (item) => router.push(item.link ?? '/'),
    },
  ];

  return (
    <AsideHeader
      logo={{ icon: QrCode, text: 'CIDER [CODE]' }}
      compact={compact}
      hideCollapseButton={false}
      headerDecoration={true}
      renderContent={() => <Wrapper>{children}</Wrapper>}
      onChangeCompact={toggleCompact}
      menuItems={menuItems}
    />
  );
};

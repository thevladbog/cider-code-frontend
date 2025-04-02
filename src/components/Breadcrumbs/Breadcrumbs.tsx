import { Clock, Mug, Persons } from '@gravity-ui/icons';
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsItemProps, Flex, Text } from '@gravity-ui/uikit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function RouterLink({ href, ...rest }: BreadcrumbsItemProps) {
  if (!href) {
    return;
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <div key={href}>
        <BreadcrumbsItem {...rest} />
      </div>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();

  switch (pathname) {
    case '/':
      return (
        <Breadcrumbs itemComponent={RouterLink}>
          <RouterLink href="/">
            <Flex alignItems="center" gap={1}>
              <Clock style={{ minWidth: 16 }} />
              <Text ellipsis variant="inherit">
                Смены
              </Text>
            </Flex>
          </RouterLink>
        </Breadcrumbs>
      );
    case '/users':
      return (
        <Breadcrumbs itemComponent={RouterLink}>
          <RouterLink href="/">
            <Flex alignItems="center" gap={1}>
              <Persons style={{ minWidth: 16 }} />
              <Text ellipsis variant="inherit">
                Пользователи
              </Text>
            </Flex>
          </RouterLink>
        </Breadcrumbs>
      );

    case '/products':
      return (
        <Breadcrumbs itemComponent={RouterLink}>
          <RouterLink href="/">
            <Flex alignItems="center" gap={1}>
              <Mug style={{ minWidth: 16 }} />
              <Text ellipsis variant="inherit">
                Пользователи
              </Text>
            </Flex>
          </RouterLink>
        </Breadcrumbs>
      );
    default:
      return null;
  }
}

import { Clock, Mug, Persons, Plus } from "@gravity-ui/icons";
import { AsideHeader, MenuItem } from "@gravity-ui/navigation";
import {
  Icon,
  ThemeProvider,
  Toaster,
  ToasterProvider,
} from "@gravity-ui/uikit";
import { Wrapper } from "@/components/Wrapper";
import { useThemeStore } from "@/entities/Theme";
import { useLocation, useNavigate } from "@tanstack/react-router";
import React, { ReactNode, useEffect, useState } from "react";
import { Logo, LogoIcon } from "./components/Icons";
import { $api } from "./lib/api";
import { useUserStore } from "./entities/User/useUserStore";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  const [compact, setCompact] = useState<boolean>(true);

  const toaster = new Toaster();

  const { theme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCompact = () => {
    setCompact((prevState) => !prevState);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    href: string | undefined,
  ) => {
    e.preventDefault();
    navigate({
      to: href ?? "/",
    }).then();
  };

  const menuItems: Array<MenuItem> = [
    {
      id: "shifts",
      title: "Смены",
      icon: Clock,
      link: "/",
      onItemClick: (item, _, event) => handleClick(event, item.link),
      current: location.pathname === "/",
    },
    {
      id: "products",
      title: "Продукция",
      icon: Mug,
      link: "/products",
      onItemClick: (item, _, event) => handleClick(event, item.link),
      current: location.pathname === "/products",
    },
    {
      id: "users",
      title: "Пользователи",
      icon: Persons,
      link: "/users",
      onItemClick: (item, _, event) => handleClick(event, item.link),
      current: location.pathname === "/users",
    },
    {
      id: "divider1",
      title: "-",
      type: "divider",
    },
    {
      id: "createShift",
      title: "Новая смена",
      type: "action",
      icon: Plus,
      afterMoreButton: true,
      onItemClick: ({ id, title, current }) => {
        alert(JSON.stringify({ id, title, current }));
      },
    },
  ];

  const setUserData = useUserStore((state) => state.setUserData);

  const { data, isLoading, isError } = $api.useQuery("get", "/user/me");

  useEffect(() => {
    if (data || isLoading) {
      setUserData(isLoading, data?.result);
    }

    if (isError) {
      toaster.add({
        name: "getUserInfo",
        title: "Что-то пошло не так ...",
        content: "Не получилось загрузить пользователя. Вы будете разлогинены!",
        autoHiding: 5000,
        theme: "danger",
        isClosable: true,
      });
    }
  }, [data, isLoading, isError]);

  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider toaster={toaster}>
        <AsideHeader
          logo={{
            icon: LogoIcon,
            text: () => <Icon data={Logo} width={80} />,
            onClick: () => navigate({ to: "/" }),
            href: "/",
          }}
          hideCollapseButton={false}
          headerDecoration={true}
          onChangeCompact={toggleCompact}
          menuItems={menuItems}
          compact={compact}
          renderContent={() => {
            return <Wrapper>{children}</Wrapper>;
          }}
        />
      </ToasterProvider>
    </ThemeProvider>
  );
};

export default App;

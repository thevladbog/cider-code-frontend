import { Clock, Mug, Persons, Plus, QrCode } from "@gravity-ui/icons";
import { AsideHeader, MenuItem } from "@gravity-ui/navigation";
import { ThemeProvider } from "@gravity-ui/uikit";
import { Wrapper } from "@/components/Wrapper";
import { useThemeStore } from "@/entities/Theme";
import { useLocation, useNavigate } from "@tanstack/react-router";
import React, { ReactNode, useState } from "react";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  const [compact, setCompact] = useState<boolean>(true);

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
      onItemClick({ id, title, current }) {
        alert(JSON.stringify({ id, title, current }));
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AsideHeader
        logo={{
          icon: QrCode,
          text: "CIDER [CODE]",
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
    </ThemeProvider>
  );
};

export default App;

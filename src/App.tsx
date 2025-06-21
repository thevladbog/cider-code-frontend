import { Bug, Clock, Mug, Persons, Plus } from "@gravity-ui/icons";
import { AsideHeader, FooterItem, MenuItem } from "@gravity-ui/navigation";
import { Icon, ThemeProvider, ToasterProvider } from "@gravity-ui/uikit";
import { Wrapper } from "@/components/Wrapper";
import { ModalCreateShift } from "@/components/ModalCreateShift";
import { useThemeStore } from "@/entities/Theme";
import { useLocation, useNavigate } from "@tanstack/react-router";
import React, { ReactNode, useEffect, useState } from "react";
import { Logo, LogoIcon } from "./components/Icons";
import { useUserStore } from "./entities/User/useUserStore";
import { useShallow } from "zustand/shallow";
import { CreatedUserDto } from "./lib/types/openapi";
import { toaster } from "./lib/toaster";
import * as Sentry from "@sentry/react";
import { FooterWrapper } from "./components/Footer";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  const [compact, setCompact] = useState<boolean>(true);
  const [authed, setAuthed] = useState<boolean>(false);
  const [isCreateShiftModalVisible, setIsCreateShiftModalVisible] =
    useState<boolean>(false);

  const user = useUserStore((store) => store.data);

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

  const isHiddenAdminMenu =
    user?.role === CreatedUserDto.role.GUEST ||
    user?.role === CreatedUserDto.role.USER;

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
      hidden: isHiddenAdminMenu,
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
      onItemClick: () => {
        setIsCreateShiftModalVisible(true);
      },
      hidden: user?.role === CreatedUserDto.role.GUEST,
    },
  ];

  const userData = useUserStore(useShallow((state) => state.data));

  const feedback = Sentry.getFeedback();

  useEffect(() => {
    setAuthed(Boolean(userData));
  }, [userData]);

  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider toaster={toaster}>
        <AsideHeader
          logo={{
            icon: LogoIcon,
            text: () => <Icon data={Logo} width={80} height={60} />,
            onClick: () => navigate({ to: "/" }),
          }}
          hideCollapseButton={false}
          headerDecoration={true}
          onChangeCompact={toggleCompact}
          menuItems={authed ? menuItems : undefined}
          compact={!compact}
          renderContent={() => {
            return (
              <>
                <Wrapper>{children}</Wrapper>
                <FooterWrapper />
              </>
            );
          }}
          renderFooter={({ compact: compactFooter }) => (
            <>
              <FooterItem
                item={{
                  id: "report-bug",
                  title: "Ошибка?",
                  tooltipText: (
                    <div>
                      <b>Ошибка?</b>
                    </div>
                  ),
                  itemWrapper: (params, makeItem) =>
                    makeItem({
                      ...params,
                      icon: <Icon data={Bug} />,
                    }),
                  onItemClick: async () => {
                    const form = await feedback?.createForm();
                    form?.appendToDom();
                    form?.open();
                  },
                }}
                compact={compactFooter}
              />
            </>
          )}
        />
        <ModalCreateShift
          visible={isCreateShiftModalVisible}
          onClose={() => setIsCreateShiftModalVisible(false)}
        />
      </ToasterProvider>
    </ThemeProvider>
  );
};

export default App;

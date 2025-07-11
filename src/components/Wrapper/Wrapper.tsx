import "./Wrapper.scss";

import type React from "react";

import { Moon, Sun } from "@gravity-ui/icons";
import { Button, Icon, User } from "@gravity-ui/uikit";
import block from "bem-cn-lite";

import { useThemeStore } from "@/entities/Theme";
import { useUserStore } from "@/entities/User/useUserStore";
import { useShallow } from "zustand/shallow";

const b = block("wrapper");

export type AppProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  const [user, logout, isLoading] = useUserStore(
    useShallow((state) => [state.data, state.logout, state.isLogoutLoading]),
  );

  return (
    <div className={b()}>
      <div className={b("theme-button")}>
        {user && (
          <>
            <User
              size="l"
              avatar={{
                text: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
                theme: "brand",
                imgUrl: user.picture ?? "",
              }}
              name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
              description={user.email ?? ""}
            />
            <Button
              size={"l"}
              view="outlined-danger"
              onClick={() => logout()}
              loading={isLoading}
            >
              Выйти
            </Button>
          </>
        )}
        <Button
          size={"l"}
          view={"outlined"}
          onClick={() => {
            return setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          <Icon data={theme === "dark" ? Sun : Moon} />
        </Button>
      </div>
      <div className={b("layout")}>
        <div className={b("content")}>{children}</div>
      </div>

      {/* <FooterWrapper /> */}
    </div>
  );
};

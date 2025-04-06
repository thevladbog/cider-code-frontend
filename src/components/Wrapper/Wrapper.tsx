import "./Wrapper.scss";

import type React from "react";

import { Moon, Sun } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import block from "bem-cn-lite";

import { useThemeStore } from "@/entities/Theme";
import { FooterWrapper } from "@/components/Footer";

const b = block("wrapper");

export type AppProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<AppProps> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className={b()}>
      <div className={b("theme-button")}>
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

      <FooterWrapper />
    </div>
  );
};

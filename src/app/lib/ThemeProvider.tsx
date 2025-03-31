import type { IconProps, Theme } from '@gravity-ui/uikit';

import { Moon, Sun } from '@gravity-ui/icons';
import { ThemeProvider as UIKitThemeProvider } from '@gravity-ui/uikit';
import React, { useEffect } from 'react';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

// eslint-disable-next-line
export type ToggleTheme = (theme?: Theme) => void;

interface ThemeSwitcherContextProps {
  theme: Theme;
  themeIcon: IconProps['data'];
  toggleTheme: ToggleTheme;
}

export const ThemeSwitcherContext = React.createContext<ThemeSwitcherContextProps>({
  theme: DARK_THEME,
  themeIcon: Sun,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: React.PropsWithChildren<object>) {
  const [switcherTheme, setSwitcherTheme] = React.useState<Theme>('');

  const themeIcon = React.useMemo(
    () => (switcherTheme === DARK_THEME ? Sun : Moon),
    [switcherTheme],
  );

  const toggleTheme: ToggleTheme = React.useCallback((theme: Theme | undefined) => {
    if (theme && theme !== LIGHT_THEME && theme !== DARK_THEME) {
      return;
    }

    setSwitcherTheme((prevTheme: Theme) => (prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  }, []);

  useEffect(() => {
    const currentTheme: Theme = localStorage.getItem('theme') ?? DARK_THEME;
    setSwitcherTheme(currentTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', switcherTheme);
  }, [switcherTheme]);

  const contextValue = React.useMemo(
    () => ({
      theme: switcherTheme,
      themeIcon,
      toggleTheme,
    }),
    [switcherTheme, toggleTheme, themeIcon],
  );

  return (
    <UIKitThemeProvider theme={switcherTheme}>
      <ThemeSwitcherContext.Provider value={contextValue}>{children}</ThemeSwitcherContext.Provider>
    </UIKitThemeProvider>
  );
}

export function useThemeSwitcher() {
  return React.useContext(ThemeSwitcherContext);
}

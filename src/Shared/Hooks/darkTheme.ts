import { useState } from "react";

const ENABLE_DARK_THEME = "enableDarkTheme";

const browserDarkThemeEnabled = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getDarkThemeEnabled = (): boolean => {
  let enabled = localStorage.getItem(ENABLE_DARK_THEME);
  if (enabled === null) {
    return browserDarkThemeEnabled();
  }
  return JSON.parse(enabled);
};

const toggleTheme = (): void => {
  const toggledValue = JSON.stringify(!getDarkThemeEnabled());
  localStorage.setItem(ENABLE_DARK_THEME, toggledValue);
};

export const useDarkThemeEnabled = (): {
  darkThemeEnabled: boolean;
  toggleDarkThemeEnabled: () => void;
} => {
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(
    getDarkThemeEnabled()
  );

  const toggleDarkThemeEnabled = (): void => {
    toggleTheme();
    setDarkThemeEnabled(getDarkThemeEnabled());
  };
  return { darkThemeEnabled, toggleDarkThemeEnabled };
};

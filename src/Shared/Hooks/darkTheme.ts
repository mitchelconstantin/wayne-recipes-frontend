import { useState } from "react";

const getDarkThemeEnabled = (): boolean => {
  let enabled = localStorage.getItem("enableDarkTheme");
  if (enabled === null) return false;
  return JSON.parse(enabled);
};

const toggleTheme = (): void => {
  const toggledValue = JSON.stringify(!getDarkThemeEnabled());
  localStorage.setItem("enableDarkTheme", toggledValue);
};

export const useDarkThemeEnabled = (): [boolean, () => void] => {
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(
    getDarkThemeEnabled()
  );

  const toggleDarkThemeEnabled = (): void => {
    toggleTheme();
    setDarkThemeEnabled(getDarkThemeEnabled());
  };
  return [darkThemeEnabled, toggleDarkThemeEnabled];
};

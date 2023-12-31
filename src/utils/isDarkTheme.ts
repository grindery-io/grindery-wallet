export const isDarkTheme = (): boolean => {
  return (
    (window.Telegram?.WebApp?.colorScheme &&
      window.Telegram?.WebApp?.colorScheme === "dark") ||
    process.env.REACT_APP_THEME === "dark" ||
    (typeof window.matchMedia !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

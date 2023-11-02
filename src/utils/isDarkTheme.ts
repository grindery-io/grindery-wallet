export const isDarkTheme = (): boolean => {
  return (
    (window.Telegram?.WebApp?.colorScheme &&
      window.Telegram?.WebApp?.colorScheme === "dark") ||
    process.env.REACT_APP_THEME === "dark" ||
    window.location.href?.split("?")?.[1] === "theme=dark"
  );
};

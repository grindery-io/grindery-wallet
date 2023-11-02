export const expandApp = (): void => {
  if (typeof window.Telegram?.WebApp?.expand !== "undefined") {
    window.Telegram.WebApp.expand();
  }
};

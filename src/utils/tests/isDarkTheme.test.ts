import { isDarkTheme } from "../isDarkTheme";

describe("isDarkTheme", () => {
  it("should return true if Telegram WebApp color scheme is dark", () => {
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        colorScheme: "dark",
      },
    };
    expect(isDarkTheme()).toBe(true);
  });

  it("should return true if REACT_APP_THEME is set to dark", () => {
    process.env.REACT_APP_THEME = "dark";
    expect(isDarkTheme()).toBe(true);
  });

  it("should return true if URL query parameter 'theme' is set to dark", () => {
    window.location.href = "https://example.com?theme=dark";
    expect(isDarkTheme()).toBe(true);
  });

  it("should return false if no dark theme is detected", () => {
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        colorScheme: "light",
      },
    };
    process.env.REACT_APP_THEME = "light";
    window.location.href = "https://example.com?theme=light";
    expect(isDarkTheme()).toBe(false);
  });
});

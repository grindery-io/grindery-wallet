import { isDarkTheme } from "./isDarkTheme";

export const setAppStyles = (): void => {
  if (isDarkTheme()) {
    document.body.style.setProperty("--gr-theme-divider-color", "#393D47");
    document.body.style.setProperty(
      "--gr-theme-button-shadow-color",
      "#344564"
    );
    document.body.style.setProperty(
      "--tg-theme-accent-pale",
      "rgba(98, 188, 249, 0.15)"
    );
  } else {
    document.body.style.setProperty("--gr-theme-divider-color", "#E3E3E8");
    document.body.style.setProperty(
      "--gr-theme-button-shadow-color",
      "#aab8d3"
    );
    document.body.style.setProperty(
      "--tg-theme-accent-pale",
      "rgba(36, 129, 204, 0.1)"
    );
  }

  if (
    !window.Telegram?.WebApp?.colorScheme &&
    window.location.href?.split("?")?.[1] === "theme=dark"
  ) {
    document.body.style.setProperty("--tg-theme-bg-color", "#18222d");
    document.body.style.setProperty("--tg-theme-button-color", "#2ea6ff");
    document.body.style.setProperty("--tg-theme-button-text-color", "#ffffff");
    document.body.style.setProperty("--tg-theme-hint-color", "#b1c3d5");
    document.body.style.setProperty("--tg-theme-link-color", "#62bcf9");
    document.body.style.setProperty("--tg-theme-secondary-bg-color", "#131415");
    document.body.style.setProperty("--tg-theme-text-color", "#ffffff");
  }
};

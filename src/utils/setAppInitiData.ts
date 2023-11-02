import { Telegram } from "@twa-dev/types";
import { STORAGE_KEYS } from "../constants";

export const setAppInitiData = (): void => {
  window.Telegram = window.Telegram?.WebApp?.initData
    ? window.Telegram
    : ({
        WebApp: {
          initData:
            process.env.REACT_APP_DEV_KEY ||
            window.location.href?.split("?")?.[1] ||
            localStorage.getItem(STORAGE_KEYS.INIT_DATA) ||
            "",
        },
      } as Telegram);

  if (window.Telegram?.WebApp?.initData) {
    localStorage.setItem(
      STORAGE_KEYS.INIT_DATA,
      window.Telegram.WebApp.initData
    );
  }
};

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { STORAGE_KEYS } from "./constants";
import { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram?: Telegram;
    telegram?: {
      TelegramClient: any;
      sessions: {
        StringSession: any;
      };
    };
  }
}

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
  localStorage.setItem(STORAGE_KEYS.INIT_DATA, window.Telegram.WebApp.initData);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

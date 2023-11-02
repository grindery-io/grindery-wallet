import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Telegram } from "@twa-dev/types";
import { setAppInitiData } from "./utils/setAppInitiData";

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

setAppInitiData();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

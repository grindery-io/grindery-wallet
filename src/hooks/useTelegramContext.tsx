import { useContext } from "react";
import { TelegramContext } from "../context/TelegramContext";

const useTelegramContext = () => useContext(TelegramContext);

export default useTelegramContext;

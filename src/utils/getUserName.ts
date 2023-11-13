import { ContactType } from "../components/shared/Contact/Contact";
import { TelegramUser, TelegramUserContact } from "../types/Telegram";

export const getUserName = (
  user: TelegramUserContact | TelegramUser | ContactType | null
) => {
  return !!(user as TelegramUserContact)?.firstName
    ? `${(user as TelegramUserContact)?.firstName}${
        !!(user as TelegramUserContact)?.lastName
          ? ` ${(user as TelegramUserContact)?.lastName}`
          : ""
      }`
    : !!(user as TelegramUser)?.userName
    ? (user as TelegramUser)?.userName
    : !!(user as TelegramUser)?.userHandle ||
      !!(user as TelegramUserContact)?.username
    ? "@" +
      ((user as TelegramUserContact)?.username ||
        (user as TelegramUser)?.userHandle)
    : "Unknown user";
};

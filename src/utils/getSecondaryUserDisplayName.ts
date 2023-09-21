import { TelegramUser, TelegramUserContact } from "../context/AppContext";

export const getSecondaryUserDisplayName = (
  secondaryUser: TelegramUserContact | TelegramUser | undefined
): string => {
  if (!secondaryUser) {
    return "Unknown user";
  }

  if ("firstName" in secondaryUser && secondaryUser.firstName) {
    return `${secondaryUser.firstName}${
      "lastName" in secondaryUser && secondaryUser.lastName
        ? " " + secondaryUser.lastName
        : ""
    }`;
  }

  if ("username" in secondaryUser && secondaryUser.username) {
    return `@${secondaryUser.username}`;
  }

  if ("userName" in secondaryUser && secondaryUser.userName) {
    return secondaryUser.userName;
  }

  if ("userHandle" in secondaryUser && secondaryUser.userHandle) {
    return `@${secondaryUser.userHandle}`;
  }

  return "Unknown user";
};

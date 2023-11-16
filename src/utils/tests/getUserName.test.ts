import { ContactType } from "components/shared/Contact/Contact";
import { getUserName } from "../getUserName";
import { TelegramUser, TelegramUserContact } from "types";

describe("getUserName", () => {
  it("should return the full name if available", () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
    };
    expect(getUserName(user as ContactType)).toBe("John Doe");
  });

  it("should return the username if available", () => {
    const user = {
      username: "johndoe",
    };
    expect(getUserName(user as ContactType)).toBe("@johndoe");
  });

  it("should return the user handle if available", () => {
    const user = {
      userHandle: "1234567890",
    };
    expect(getUserName(user as TelegramUser)).toBe("@1234567890");
  });

  it("should return the username if available", () => {
    const user = {
      username: "johndoe",
    };
    expect(getUserName(user as TelegramUserContact)).toBe("@johndoe");
  });

  it("should return 'Unknown user' if no name or username is available", () => {
    expect(getUserName(null)).toBe("Unknown user");
  });
});

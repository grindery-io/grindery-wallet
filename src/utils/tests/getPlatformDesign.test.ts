import { getPlatformDesign } from "../getPlatformDesign";

describe("getPlatformDesign", () => {
  it("should return 'apple' if the platform is macOS or iOS", () => {
    // Mock the Telegram WebApp platform
    // @ts-ignore
    window.Telegram = { WebApp: { platform: "macos" } };
    expect(getPlatformDesign()).toBe("apple");

    // @ts-ignore
    window.Telegram.WebApp.platform = "ios";
    expect(getPlatformDesign()).toBe("apple");
  });

  it("should return 'material' if the platform is not macOS or iOS", () => {
    // Mock the Telegram WebApp platform
    // @ts-ignore
    window.Telegram = { WebApp: { platform: "android" } };
    expect(getPlatformDesign()).toBe("material");

    // @ts-ignore
    window.Telegram.WebApp.platform = "windows";
    expect(getPlatformDesign()).toBe("material");
  });

  it("should return 'apple' if the user agent matches iOS, iPhone OS, iPhone, iPod, iPad, or Mac OS", () => {
    // Mock the user agent
    // @ts-ignore
    window.Telegram.WebApp.platform = undefined;

    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",
      writable: true,
    });
    expect(getPlatformDesign()).toBe("apple");

    // @ts-ignore
    navigator.userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";
    expect(getPlatformDesign()).toBe("apple");
  });

  it("should return 'material' if the user agent does not match iOS, iPhone OS, iPhone, iPod, iPad, or Mac OS", () => {
    // Mock the user agent
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 11; SM-G975U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Mobile Safari/537.36",
      writable: true,
    });
    expect(getPlatformDesign()).toBe("material");

    // @ts-ignore
    navigator.userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";
    expect(getPlatformDesign()).toBe("material");
  });
});

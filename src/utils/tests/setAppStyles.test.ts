import { setAppStyles } from "../setAppStyles";

describe("setAppStyles", () => {
  it("should set light theme styles when isDarkTheme returns false", () => {
    jest.mock("../isDarkTheme", () => false);

    setAppStyles();

    expect(
      document.documentElement.style.getPropertyValue(
        "--gr-theme-divider-color"
      )
    ).toBe("#E3E3E8");
    expect(
      document.documentElement.style.getPropertyValue(
        "--gr-theme-button-shadow-color"
      )
    ).toBe("#aab8d3");
    expect(
      document.documentElement.style.getPropertyValue("--tg-theme-accent-pale")
    ).toBe("rgba(36, 129, 204, 0.1)");
  });

  it("should set dark theme styles when isDarkTheme returns true", () => {
    jest.mock("../isDarkTheme", () => true);

    setAppStyles();

    expect(
      document.documentElement.style.getPropertyValue(
        "--gr-theme-divider-color"
      )
    ).toBe("#E3E3E8");
    expect(
      document.documentElement.style.getPropertyValue(
        "--gr-theme-button-shadow-color"
      )
    ).toBe("#aab8d3");
    expect(
      document.documentElement.style.getPropertyValue("--tg-theme-accent-pale")
    ).toBe("rgba(36, 129, 204, 0.1)");
  });
});

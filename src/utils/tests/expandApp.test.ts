import { expandApp } from "../expandApp";

describe("expandApp", () => {
  it("should call window.Telegram.WebApp.expand if it exists", () => {
    const mockExpand = jest.fn();
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        expand: mockExpand,
      },
    };
    expandApp();
    expect(mockExpand).toHaveBeenCalled();
  });

  it("should not throw an error if window.Telegram.WebApp.expand is undefined", () => {
    // @ts-ignore
    window.Telegram = {};
    expect(() => expandApp()).not.toThrow();
  });
});

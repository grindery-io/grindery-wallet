import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import AccountRecoveryBanner from "./AccountRecoveryBanner";
import { useAppSelector } from "store";

jest.mock("store");

describe("AccountRecoveryBanner", () => {
  const originalWindowTelegram = window.Telegram;
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      user: {
        patchwallet: "123",
        phoneNumber: "",
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        requestContact: jest.fn(),
        close: jest.fn(),
      },
    };
  });

  afterAll(() => {
    window.Telegram = originalWindowTelegram;
  });

  it("requests contact on button click", () => {
    const { getByTestId } = render(<AccountRecoveryBanner />);
    const button = getByTestId("account-recovery-banner-button");

    fireEvent.click(button);

    // @ts-ignore
    expect(window.Telegram.WebApp.requestContact).toHaveBeenCalled();
  });
});

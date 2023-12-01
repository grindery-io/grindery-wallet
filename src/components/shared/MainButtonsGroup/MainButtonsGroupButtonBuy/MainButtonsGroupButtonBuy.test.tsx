import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAppSelector } from "../../../../store";
import MainButtonsGroupButtonBuy from "./MainButtonsGroupButtonBuy";

jest.mock("../../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("MainButtonsGroupButtonBuy", () => {
  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: true },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the button with the correct label", () => {
    render(<MainButtonsGroupButtonBuy label="Buy Tokens" />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText("Buy Tokens")).toBeInTheDocument();
  });

  it("renders the button with the default label when no label is provided", () => {
    render(<MainButtonsGroupButtonBuy />, { wrapper: MemoryRouter });

    expect(screen.getByText("Buy tokens")).toBeInTheDocument();
  });

  it("disables the button when user.patchwallet is false", () => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: false },
    });

    render(<MainButtonsGroupButtonBuy />, { wrapper: MemoryRouter });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("navigates to the /bridge route when clicked", () => {
    render(<MainButtonsGroupButtonBuy />, { wrapper: MemoryRouter });

    const button = screen.getByRole("button");

    button.click();

    expect(mockNavigate).toHaveBeenCalledWith("/buy");
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAppSelector } from "../../../../store";
import MainButtonsGroupButtonSwap from "./MainButtonsGroupButtonSwap";

jest.mock("../../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("MainButtonsGroupButtonSwap", () => {
  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: true },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the button with the correct label", () => {
    render(<MainButtonsGroupButtonSwap label="Swap Tokens" />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText("Swap Tokens")).toBeInTheDocument();
  });

  it("renders the button with the default label when no label is provided", () => {
    render(<MainButtonsGroupButtonSwap />, { wrapper: MemoryRouter });

    expect(screen.getByText("Swap tokens")).toBeInTheDocument();
  });

  it("disables the button when user.patchwallet is false", () => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: false },
    });

    render(<MainButtonsGroupButtonSwap />, { wrapper: MemoryRouter });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("navigates to the /swap route when clicked", () => {
    render(<MainButtonsGroupButtonSwap />, { wrapper: MemoryRouter });

    const button = screen.getByRole("button");

    button.click();

    expect(mockNavigate).toHaveBeenCalledWith("/swap");
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAppSelector } from "../../../../store";
import MainButtonsGroupButtonBridge from "./MainButtonsGroupButtonMainButtonsGroupButtonBridge";

jest.mock("../../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("MainButtonsGroupButtonBridge", () => {
  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: true },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the button with the correct label", () => {
    render(<MainButtonsGroupButtonBridge label="Bridge Tokens" />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText("Bridge Tokens")).toBeInTheDocument();
  });

  it("renders the button with the default label when no label is provided", () => {
    render(<MainButtonsGroupButtonBridge />, { wrapper: MemoryRouter });

    expect(screen.getByText("Bridge tokens")).toBeInTheDocument();
  });

  it("disables the button when user.patchwallet is false", () => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: false },
    });

    render(<MainButtonsGroupButtonBridge />, { wrapper: MemoryRouter });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("navigates to the /bridge route when clicked", () => {
    render(<MainButtonsGroupButtonBridge />, { wrapper: MemoryRouter });

    const button = screen.getByRole("button");

    button.click();

    expect(mockNavigate).toHaveBeenCalledWith("/bridge");
  });
});

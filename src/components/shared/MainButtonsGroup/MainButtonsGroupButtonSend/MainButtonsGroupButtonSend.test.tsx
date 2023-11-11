import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAppSelector } from "../../../../store";
import MainButtonsGroupButtonSend from "./MainButtonsGroupButtonSend";

jest.mock("../../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("MainButtonsGroupButtonSend", () => {
  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: true },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the button with the correct label", () => {
    render(<MainButtonsGroupButtonSend label="Send Tokens" />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText("Send Tokens")).toBeInTheDocument();
  });

  it("renders the button with the default label when no label is provided", () => {
    render(<MainButtonsGroupButtonSend />, { wrapper: MemoryRouter });

    expect(screen.getByText("Send tokens")).toBeInTheDocument();
  });

  it("disables the button when user.patchwallet is false", () => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: false },
    });

    render(<MainButtonsGroupButtonSend />, { wrapper: MemoryRouter });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("navigates to the /send route when clicked", () => {
    render(<MainButtonsGroupButtonSend />, { wrapper: MemoryRouter });

    const button = screen.getByRole("button");
    button.click();

    expect(mockNavigate).toHaveBeenCalledWith("/send");
  });
});

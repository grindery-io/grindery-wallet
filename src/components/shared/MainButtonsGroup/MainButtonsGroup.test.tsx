import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainButtonsGroup from "./MainButtonsGroup";
import { useAppSelector } from "../../../store";
import { MemoryRouter } from "react-router";

jest.mock("../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("MainButtonsGroup", () => {
  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: true },
      debug: {},
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the Send button", () => {
    render(<MainButtonsGroup />, { wrapper: MemoryRouter });

    expect(screen.getByText("Send tokens")).toBeInTheDocument();
  });

  it("renders the Swap button", () => {
    mockedUseAppSelector.mockReturnValue({
      user: { patchwallet: true },
      debug: { enabled: true, features: { SWAP: true } },
    });
    render(<MainButtonsGroup />, { wrapper: MemoryRouter });

    expect(screen.queryByText("Swap tokens")).toBeInTheDocument();
  });
});

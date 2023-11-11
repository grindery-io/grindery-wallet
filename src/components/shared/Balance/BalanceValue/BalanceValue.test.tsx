import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MAIN_TOKEN_ADDRESS } from "../../../../constants";
import BalanceValue from "./BalanceValue";
import { useAppSelector } from "../../../../store";

jest.mock("../../../../store");
jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("BalanceValue", () => {
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  const mockedUseNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
  }));

  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      balance: { value: 123.45 },
      debug: { features: { TOKEN_PRICE: true } },
      tokens: [],
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the balance value with USD when TOKEN_PRICE feature is enabled", () => {
    render(<BalanceValue />);

    expect(screen.getByText("123.45")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("renders the main token balance when TOKEN_PRICE feature is disabled and main token exists", () => {
    const mockedMainToken = { address: MAIN_TOKEN_ADDRESS };
    mockedUseAppSelector.mockReturnValue({
      balance: { value: 123.45 },
      debug: { features: { TOKEN_PRICE: false } },
      tokens: [mockedMainToken],
    });

    render(<BalanceValue />);

    expect(screen.getByText("G1")).toBeInTheDocument();
  });

  it("renders 0.00 when TOKEN_PRICE feature is disabled and main token does not exist", () => {
    mockedUseAppSelector.mockReturnValue({
      balance: { value: 123.45 },
      debug: { features: { TOKEN_PRICE: false } },
      tokens: [],
    });

    render(<BalanceValue />);

    expect(screen.getByText("0.00")).toBeInTheDocument();
    expect(screen.getByText("G1")).toBeInTheDocument();
  });
});

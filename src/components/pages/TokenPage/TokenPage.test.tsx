import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../../store";
import TokenPage from "./TokenPage";
import { TokenType } from "../../shared/Token";

jest.mock("../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

describe("TokenPage", () => {
  const mockedToken: TokenType = {
    price: "0",
    name: "Mocked Token",
    symbol: "MTK",
    address: "0x123456789",
    decimals: 18,
    balance: "1000000000000000000",
    icon: "",
    chain: "137",
  };

  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      tokens: [mockedToken],
      debug: {},
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the TokenView component when a valid token ID is provided", () => {
    render(
      <MemoryRouter initialEntries={[`/tokens/${mockedToken.address}`]}>
        <Routes>
          <Route path="/tokens/:id" element={<TokenPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(mockedToken.name)).toBeInTheDocument();
    expect(screen.getByText(mockedToken.symbol)).toBeInTheDocument();
  });

  it("renders the Loading component when the token is not found", () => {
    render(
      <MemoryRouter initialEntries={[`/tokens/invalid-address`]}>
        <Routes>
          <Route path="/tokens/:id" element={<TokenPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});

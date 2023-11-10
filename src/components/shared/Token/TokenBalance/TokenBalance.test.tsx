import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenBalance, { formatTokenBalance } from "./TokenBalance";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenBalance", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token balance", () => {
    const { getByText } = render(<TokenBalance />);

    expect(getByText("100")).toBeInTheDocument();
  });

  it("renders the token balance in USD", () => {
    const { getByText } = render(<TokenBalance format="usd" />);

    expect(getByText("150")).toBeInTheDocument();
  });
});

describe("formatTokenBalance", () => {
  it("formats the token balance in wei", () => {
    const formattedBalance = formatTokenBalance(
      "wei",
      mockedToken.balance,
      mockedToken.price,
      mockedToken.decimals
    );
    expect(formattedBalance).toBe(mockedToken.balance);
  });

  it("formats the token balance in eth", () => {
    const formattedBalance = formatTokenBalance(
      "eth",
      mockedToken.balance,
      mockedToken.price,
      mockedToken.decimals
    );
    expect(formattedBalance).toBe("100");
  });

  it("formats the token balance in usd", () => {
    const formattedBalance = formatTokenBalance(
      "usd",
      mockedToken.balance,
      mockedToken.price,
      mockedToken.decimals
    );
    expect(formattedBalance).toBe("150");
  });

  it("formats the token balance in short", () => {
    const formattedBalance = formatTokenBalance(
      "short",
      mockedToken.balance,
      mockedToken.price,
      mockedToken.decimals
    );
    expect(formattedBalance).toBe("100");
  });
});

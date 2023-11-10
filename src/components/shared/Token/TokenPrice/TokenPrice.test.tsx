import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenPrice, { formatTokenPrice } from "./TokenPrice";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenPrice", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token price", () => {
    const { getByText } = render(<TokenPrice />);

    expect(getByText(mockedToken.price)).toBeInTheDocument();
  });

  it("renders the token price in short format", () => {
    const { getByText } = render(<TokenPrice format="short" />);

    expect(getByText(`$${mockedToken.price}`)).toBeInTheDocument();
  });
});

describe("formatTokenPrice", () => {
  it("formats the token price in default format", () => {
    const formattedPrice = formatTokenPrice(mockedToken.price, "default");
    expect(formattedPrice).toBe(mockedToken.price);
  });

  it("formats the token price in short format", () => {
    const formattedPrice = formatTokenPrice(mockedToken.price, "short");
    expect(formattedPrice).toBe(`$${mockedToken.price}`);
  });
});

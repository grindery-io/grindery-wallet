import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenPriceUpdated, {
  formatTokenPriceUpdated,
} from "./TokenPriceUpdated";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenPriceUpdated", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token price updated time", () => {
    const { getByText } = render(<TokenPriceUpdated />);

    expect(getByText(mockedToken.priceUpdated)).toBeInTheDocument();
  });

  it("renders 'never' if priceUpdated is falsy", () => {
    mockedUseToken.mockReturnValue({ ...mockedToken, priceUpdated: undefined });
    const { getByText } = render(<TokenPriceUpdated />);

    expect(getByText("never")).toBeInTheDocument();
  });
});

describe("formatTokenPriceUpdated", () => {
  it("formats the token price updated time in default format", () => {
    const formattedPriceUpdated = formatTokenPriceUpdated(
      mockedToken.priceUpdated,
      "default"
    );
    expect(formattedPriceUpdated).toBe(mockedToken.priceUpdated);
  });
});

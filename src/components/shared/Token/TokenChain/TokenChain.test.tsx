import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenChain, { formatTokenChain } from "./TokenChain";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenChain", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token chain name", () => {
    const { getByText } = render(<TokenChain />);

    expect(getByText("Polygon")).toBeInTheDocument();
  });

  it("renders the token chain id", () => {
    const { getByText } = render(<TokenChain format="id" />);

    expect(getByText(mockedToken.chain)).toBeInTheDocument();
  });
});

describe("formatTokenChain", () => {
  it("formats the token chain name", () => {
    const formattedChain = formatTokenChain(mockedToken.chain, "name");
    expect(formattedChain).toBe("Polygon");
  });

  it("formats the token chain id", () => {
    const formattedChain = formatTokenChain(mockedToken.chain, "id");
    expect(formattedChain).toBe(mockedToken.chain);
  });
});

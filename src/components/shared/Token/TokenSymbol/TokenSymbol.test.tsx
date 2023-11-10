import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenSymbol from "./TokenSymbol";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenSymbol", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token symbol", () => {
    const { getByText } = render(<TokenSymbol />);

    expect(getByText(mockedToken.symbol)).toBeInTheDocument();
  });
});

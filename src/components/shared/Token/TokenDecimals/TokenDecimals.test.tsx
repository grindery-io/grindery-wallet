import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenDecimals from "./TokenDecimals";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenDecimals", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token decimals", () => {
    const { getByText } = render(<TokenDecimals />);

    expect(getByText(mockedToken.decimals)).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenName from "./TokenName";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenName", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the token name", () => {
    const { getByText } = render(<TokenName />);

    expect(getByText(mockedToken.name)).toBeInTheDocument();
  });
});

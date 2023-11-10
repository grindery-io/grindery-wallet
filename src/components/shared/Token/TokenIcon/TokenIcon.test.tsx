import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TokenIcon, { DEFAULT_TOKEN_ICON_URL } from "./TokenIcon";
import { useToken } from "../Token";
import { mockedToken } from "../mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenIcon", () => {
  const mockedUseToken = useToken as jest.MockedFunction<typeof useToken>;

  beforeEach(() => {
    mockedUseToken.mockReturnValue(mockedToken);
  });

  afterEach(() => {
    mockedUseToken.mockReset();
  });

  it("renders the default token icon if the icon is not available", () => {
    mockedUseToken.mockReturnValue({
      ...mockedToken,
      icon: "/invalid-icon.png",
    });

    const { container } = render(<TokenIcon />);

    expect(container.querySelector("div")).toHaveStyle({
      backgroundImage: `url(${DEFAULT_TOKEN_ICON_URL[mockedToken.chain]})`,
    });
  });

  it("renders the token icon with the specified size", () => {
    const { container } = render(<TokenIcon size={64} />);

    expect(container.querySelector("div")).toHaveStyle({
      width: "64px",
      minWidth: "64px",
      height: "64px",
    });
  });
});

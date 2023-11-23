import "@testing-library/jest-dom";
import TokenDetailsHeader from "./TokenDetailsHeader";
import { renderWithProviders } from "../../../../utils/testUtils";
import { mockedToken } from "../../Token/mockedToken";
import { DEFAULT_TOKEN_ICON_URL } from "../../Token/TokenIcon/TokenIcon";

describe("TokenDetailsHeader", () => {
  it("renders the token icon", () => {
    const { container } = renderWithProviders(<TokenDetailsHeader />);
    expect(container.querySelector(".token-icon")).toBeInTheDocument();
    expect(container.querySelector(".token-icon")).toHaveStyle({
      backgroundImage: `url(${DEFAULT_TOKEN_ICON_URL[mockedToken.chain]})`,
    });
  });

  it("renders the token name", () => {
    const { getByText } = renderWithProviders(<TokenDetailsHeader />);
    expect(getByText(mockedToken.name)).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import TokenViewHeader from "./TokenViewHeader";
import { renderWithProviders } from "../../../../utils/testUtils";
import { mockedToken } from "../../Token/mockedToken";
import { DEFAULT_TOKEN_ICON_URL } from "../../Token/TokenIcon/TokenIcon";

describe("TokenViewHeader", () => {
  it("renders the token icon", () => {
    const { container } = renderWithProviders(<TokenViewHeader />);
    expect(container.querySelector(".token-icon")).toBeInTheDocument();
    expect(container.querySelector(".token-icon")).toHaveStyle({
      backgroundImage: `url(${DEFAULT_TOKEN_ICON_URL[mockedToken.chain]})`,
    });
  });

  it("renders the token name", () => {
    const { getByText } = renderWithProviders(<TokenViewHeader />);
    expect(getByText(mockedToken.name)).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../utils/testUtils";
import TokensList from "./TokensList";

describe("TokensList", () => {
  it("renders a list of tokens", () => {
    const { getByTestId } = renderWithProviders(<TokensList />);

    expect(getByTestId("tokens-list")).toBeInTheDocument();
    expect(getByTestId("tokens-list-import-button")).toBeInTheDocument();
  });
});

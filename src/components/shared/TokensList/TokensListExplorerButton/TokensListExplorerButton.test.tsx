import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/testUtils";
import TokensListExplorerButton from "./TokensListExplorerButton";

describe("TokensListExplorerButton", () => {
  it("renders a button to see explorer", () => {
    const { getByRole } = renderWithProviders(<TokensListExplorerButton />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("See on Explorer");
  });
});

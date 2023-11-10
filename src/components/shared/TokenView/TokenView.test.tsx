import "@testing-library/jest-dom";
import TokenView from "./TokenView";
import { mockedToken } from "../Token/mockedToken";
import { renderWithProviders } from "../../../utils/testUtils";

describe("TokenView", () => {
  it("renders the token view", () => {
    const { getByText } = renderWithProviders(
      <TokenView token={mockedToken} />
    );
    expect(getByText("Contract address")).toBeInTheDocument();
    expect(getByText("Token symbol")).toBeInTheDocument();
    expect(getByText("Balance")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
  });
});

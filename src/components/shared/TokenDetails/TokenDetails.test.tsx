import "@testing-library/jest-dom";
import TokenDetails from "./TokenDetails";
import { mockedToken } from "../Token/mockedToken";
import { renderWithProviders } from "../../../utils/testUtils";

describe("TokenDetails", () => {
  it("renders the token view", () => {
    const { getByText } = renderWithProviders(
      <TokenDetails token={mockedToken} />
    );
    expect(getByText("Contract address")).toBeInTheDocument();
    expect(getByText("Token symbol")).toBeInTheDocument();
    expect(getByText("Balance")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
  });
});

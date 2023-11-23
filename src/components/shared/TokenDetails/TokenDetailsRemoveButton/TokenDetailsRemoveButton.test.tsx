import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TokenDetailsRemoveButton from "./TokenDetailsRemoveButton";
import { mockedToken } from "../../Token/mockedToken";
import { renderWithProviders } from "../../../../utils/testUtils";

describe("TokenDetailsRemoveButton", () => {
  it("renders the remove button if balance is 0", () => {
    renderWithProviders(
      <TokenDetailsRemoveButton token={{ ...mockedToken, balance: "0" }} />
    );
    expect(screen.getByRole("button")).toHaveTextContent(
      "Remove token from wallet"
    );
  });

  it("doesn't render the remove button if balance is more than 0", () => {
    renderWithProviders(<TokenDetailsRemoveButton token={mockedToken} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

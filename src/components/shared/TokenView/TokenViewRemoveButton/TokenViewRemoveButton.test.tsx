import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TokenViewRemoveButton from "./TokenViewRemoveButton";
import { mockedToken } from "../../Token/mockedToken";
import { renderWithProviders } from "../../../../utils/testUtils";

describe("TokenViewRemoveButton", () => {
  it("renders the remove button if balance is 0", () => {
    renderWithProviders(
      <TokenViewRemoveButton token={{ ...mockedToken, balance: "0" }} />
    );
    expect(screen.getByRole("button")).toHaveTextContent(
      "Remove token from wallet"
    );
  });

  it("doesn't render the remove button if balance is more than 0", () => {
    renderWithProviders(<TokenViewRemoveButton token={mockedToken} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

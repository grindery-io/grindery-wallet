import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TokenDetailsRemoveButton from "./TokenDetailsRemoveButton";
import { mockedToken } from "../../Token/mockedToken";
import { renderWithProviders } from "../../../../utils/testUtils";

describe("TokenDetailsRemoveButton", () => {
  it("renders the remove button if token address is not main or default", () => {
    renderWithProviders(
      <TokenDetailsRemoveButton
        token={{ ...mockedToken, address: "0x123..." }}
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent(
      "Remove token from wallet"
    );
  });

  it("doesn't render the remove button if token address is main or default", () => {
    renderWithProviders(
      <TokenDetailsRemoveButton
        token={{
          ...mockedToken,
          address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        }}
      />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

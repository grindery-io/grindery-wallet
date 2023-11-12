import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/testUtils";
import TokensListImportButton from "./TokensListImportButton";
import { fireEvent } from "@testing-library/react";

describe("TokensListImportButton", () => {
  it("renders a button to import tokens", () => {
    const { getByRole } = renderWithProviders(<TokensListImportButton />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Import tokens");
  });

  it("navigates to the import tokens page when clicked", () => {
    const { getByRole } = renderWithProviders(<TokensListImportButton />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(window.location.pathname).toBe("/tokens/import");
  });
});

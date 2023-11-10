import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TokenViewRemoveButton from "./TokenViewRemoveButton";
import { mockedToken } from "../../Token/mockedToken";
import { renderWithProviders } from "../../../../utils/testUtils";

describe("TokenViewRemoveButton", () => {
  it("renders the remove button", () => {
    renderWithProviders(<TokenViewRemoveButton token={mockedToken} />);
    expect(screen.getByRole("button")).toHaveTextContent(
      "Remove token from wallet"
    );
  });
});

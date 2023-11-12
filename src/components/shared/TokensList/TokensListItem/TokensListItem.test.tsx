import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../../utils/testUtils";
import TokensListItem from "./TokensListItem";
import { mockedToken } from "../../Token/mockedToken";
import { fireEvent } from "@testing-library/react";

describe("TokensListItem", () => {
  it("renders token symbol and balance", () => {
    const { getByText } = renderWithProviders(
      <TokensListItem token={mockedToken} />
    );

    expect(getByText("G1")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
  });

  it("navigates to token details page on click", () => {
    const { getByRole } = renderWithProviders(
      <TokensListItem token={mockedToken} />
    );
    const button = getByRole("button");

    fireEvent.click(button);

    expect(window.location.pathname).toBe(`/tokens/${mockedToken.address}`);
  });

  it("calls onClick prop when provided", () => {
    const onClick = jest.fn();
    const { getByRole } = renderWithProviders(
      <TokensListItem token={mockedToken} onClick={onClick} />
    );

    const listItemButton = getByRole("button");
    listItemButton.click();

    expect(onClick).toHaveBeenCalled();
  });
});

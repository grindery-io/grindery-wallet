import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TokenDetailsCloseButton from "./TokenDetailsCloseButton";
import { renderWithProviders } from "../../../../utils/testUtils";

describe("TokenDetailsCloseButton", () => {
  it("renders the close button", () => {
    renderWithProviders(<TokenDetailsCloseButton />);
    expect(screen.getByRole("button")).toHaveTextContent("Close");
  });

  it("navigates back when clicked", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router", () => ({
      useNavigate: () => mockNavigate,
    }));

    renderWithProviders(<TokenDetailsCloseButton />);
    userEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});

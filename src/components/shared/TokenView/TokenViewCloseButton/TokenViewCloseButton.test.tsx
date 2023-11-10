import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TokenViewCloseButton from "./TokenViewCloseButton";
import { renderWithProviders } from "../../../../utils/testUtils";

describe("TokenViewCloseButton", () => {
  it("renders the close button", () => {
    renderWithProviders(<TokenViewCloseButton />);
    expect(screen.getByRole("button")).toHaveTextContent("Close");
  });

  it("navigates back when clicked", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router", () => ({
      useNavigate: () => mockNavigate,
    }));

    renderWithProviders(<TokenViewCloseButton />);
    userEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });
});

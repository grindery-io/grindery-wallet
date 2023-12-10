import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BottomNavigation from "./BottomNavigation";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../../../store";

jest.mock("../../../store");

describe("BottomNavigation", () => {
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      debug: { enabled: false },
    });
  });

  it("renders the bottom navigation", () => {
    render(
      <BrowserRouter>
        <BottomNavigation />
      </BrowserRouter>
    );
    expect(screen.getByTestId("bottom-navigation")).toBeInTheDocument();
  });

  it("renders the correct tabs", () => {
    render(
      <BrowserRouter>
        <BottomNavigation />
      </BrowserRouter>
    );
    expect(screen.getByText("Tokens")).toBeInTheDocument();
    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Rewards")).toBeInTheDocument();
    expect(screen.getByText("Apps")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
  });

  it("navigates to the correct tab when clicked", () => {
    render(
      <BrowserRouter>
        <BottomNavigation />
      </BrowserRouter>
    );
    userEvent.click(screen.getByText("Contacts"));
    expect(window.location.pathname).toBe("/contacts");
  });
});

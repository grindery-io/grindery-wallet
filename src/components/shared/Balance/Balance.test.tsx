import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useAppSelector } from "../../../store";
import Balance from "./Balance";
import { MemoryRouter } from "react-router";

jest.mock("../../../store");

describe("Balance", () => {
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      balance: {
        shouldUpdate: true,
        value: 123.45,
        cached: false,
        updated: new Date().toString(),
      },
      debug: {},
      tokens: [],
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the BalanceValue component", () => {
    render(
      <MemoryRouter>
        <Balance />
      </MemoryRouter>
    );

    expect(screen.getByTestId("balance-value")).toBeInTheDocument();
  });

  it("renders the BalanceUpdated component", () => {
    render(
      <MemoryRouter>
        <Balance />
      </MemoryRouter>
    );

    expect(screen.getByTestId("balance-updated")).toBeInTheDocument();
  });

  it("sets the opacity to 0.6 when balance is cached", () => {
    mockedUseAppSelector.mockReturnValue({
      balance: { value: 123.45, cached: true },
      debug: {},
      tokens: [],
    });

    render(
      <MemoryRouter>
        <Balance />
      </MemoryRouter>
    );

    expect(screen.getByTestId("balance-container")).toHaveStyle({
      opacity: "0.6",
    });
  });

  it("sets the opacity to 1 when balance is not cached", () => {
    mockedUseAppSelector.mockReturnValue({
      balance: { value: 123.45, cached: false },
      debug: {},
      tokens: [],
    });

    render(
      <MemoryRouter>
        <Balance />
      </MemoryRouter>
    );

    expect(screen.getByTestId("balance-container")).toHaveStyle({
      opacity: "1",
    });
  });
});

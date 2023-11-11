import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import BalanceUpdated from "./BalanceUpdated";
import { useAppSelector } from "../../../../store";

jest.mock("../../../../store");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

describe("BalanceUpdated", () => {
  beforeEach(() => {
    mockedUseAppSelector.mockReturnValue({
      balance: { updated: undefined },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders nothing when balance is not updated", () => {
    render(<BalanceUpdated />);

    expect(screen.queryByText(/updated/i)).not.toBeInTheDocument();
  });

  it("renders the updated time when balance is updated", () => {
    const updated = moment().subtract(5, "minutes").toISOString();
    mockedUseAppSelector.mockReturnValue({
      balance: { updated },
    });

    render(<BalanceUpdated />);

    expect(screen.getByText(/updated/i)).toHaveTextContent(
      `Updated ${moment(updated).fromNow()}.`
    );
  });

  it("renders the update button when balance is updated more than a minute ago", () => {
    const updated = moment().subtract(2, "minutes").toISOString();
    mockedUseAppSelector.mockReturnValue({
      balance: { updated },
    });

    render(<BalanceUpdated />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("does not render the update button when balance is updated less than a minute ago", () => {
    const updated = moment().subtract(30, "seconds").toISOString();
    mockedUseAppSelector.mockReturnValue({
      balance: { updated },
    });

    render(<BalanceUpdated />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

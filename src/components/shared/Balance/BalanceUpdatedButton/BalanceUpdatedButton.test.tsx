import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import BalanceUpdatedButton from "./BalanceUpdatedButton";
import {
  appStoreActions,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";

jest.mock("../../../../store");

describe("BalanceUpdatedButton", () => {
  const mockedDispatch = jest.fn();
  const mockedUseAppDispatch = useAppDispatch as jest.MockedFunction<
    typeof useAppDispatch
  >;
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  beforeEach(() => {
    mockedUseAppDispatch.mockReturnValue(mockedDispatch);
    mockedUseAppSelector.mockReturnValue({
      balance: { loading: false },
    });
  });

  afterEach(() => {
    mockedDispatch.mockReset();
    mockedUseAppDispatch.mockReset();
    mockedUseAppSelector.mockReset();
  });

  it("dispatches setBalance action with loading and shouldUpdate set to true when clicked", () => {
    const { getByRole } = render(<BalanceUpdatedButton />);

    fireEvent.click(getByRole("button"));

    expect(mockedDispatch).toHaveBeenCalledWith(
      appStoreActions.setBalance({
        loading: true,
        shouldUpdate: true,
      })
    );
  });

  it("disables the button when balance is loading", () => {
    mockedUseAppSelector.mockReturnValue({
      balance: { loading: true },
    });

    const { getByRole } = render(<BalanceUpdatedButton />);

    expect(getByRole("button")).toBeDisabled();
  });
});

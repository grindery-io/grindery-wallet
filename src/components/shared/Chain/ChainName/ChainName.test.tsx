import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ChainName from "./ChainName";
import { useChain } from "../Chain";
import { mockedChain } from "../mockedChain";

jest.mock("../Chain", () => ({
  useChain: jest.fn(),
}));

describe("ChainName", () => {
  beforeEach(() => {
    (useChain as jest.Mock).mockReturnValue(mockedChain);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the default format", () => {
    const { getByText } = render(<ChainName />);

    expect(getByText("Polygon")).toBeInTheDocument();
  });

  it("renders the full format", () => {
    const { getByText } = render(<ChainName format="full" />);

    expect(getByText("Polygon mainnet")).toBeInTheDocument();
  });
});

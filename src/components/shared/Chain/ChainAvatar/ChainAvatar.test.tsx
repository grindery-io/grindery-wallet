import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ChainAvatar from "./ChainAvatar";
import { useChain } from "../Chain";
import { mockedChain } from "../mockedChain";

jest.mock("../Chain", () => ({
  useChain: jest.fn(),
}));

describe("ChainAvatar", () => {
  beforeEach(() => {
    (useChain as jest.Mock).mockReturnValue(mockedChain);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the default avatar", () => {
    const { getByAltText } = render(<ChainAvatar />);

    expect(getByAltText("Polygon")).toBeInTheDocument();
  });

  it("renders the first letter of the chain name when there is no logo", () => {
    (useChain as jest.Mock).mockReturnValue({
      ...mockedChain,
      logo: "",
    });
    const { getByText } = render(<ChainAvatar />);

    expect(getByText("P")).toBeInTheDocument();
  });
});

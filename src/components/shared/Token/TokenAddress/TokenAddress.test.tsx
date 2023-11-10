import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useToken } from "../Token";
import TokenAddress from "./TokenAddress";
import { formatTokenAddress } from "./TokenAddress";
import { mockedToken } from "../../../../utils/mockedToken";

jest.mock("../Token", () => ({
  useToken: jest.fn(),
}));

describe("TokenAddress", () => {
  beforeEach(() => {
    (useToken as jest.Mock).mockReturnValue(mockedToken);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the short format by default", () => {
    const { getByText } = render(<TokenAddress />);
    expect(getByText("0xe36B...33d0")).toBeInTheDocument();
  });

  it("renders the full format when specified", () => {
    const { getByText } = render(<TokenAddress format="full" />);
    expect(
      getByText("0xe36BD65609c08Cd17b53520293523CF4560533d0")
    ).toBeInTheDocument();
  });

  it("does not render anything when there is no address", () => {
    (useToken as jest.Mock).mockReturnValue({ address: null });
    const { container } = render(<TokenAddress />);
    expect(container.firstChild).toBeNull();
  });
});

describe("formatTokenAddress", () => {
  it("formats the address in full format", () => {
    const address = "0xe36BD65609c08Cd17b53520293523CF4560533d0";
    const formattedAddress = formatTokenAddress(address, "full");
    expect(formattedAddress).toEqual(address);
  });

  it("formats the address in short format", () => {
    const address = "0xe36BD65609c08Cd17b53520293523CF4560533d0";
    const formattedAddress = formatTokenAddress(address, "short");
    expect(formattedAddress).toEqual("0xe36B...33d0");
  });

  it("returns the address when an invalid format is specified", () => {
    const address = "0xe36BD65609c08Cd17b53520293523CF4560533d0";
    const formattedAddress = formatTokenAddress(address, "invalid" as any);
    expect(formattedAddress).toEqual(address);
  });
});

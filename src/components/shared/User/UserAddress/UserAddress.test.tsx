import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useUser } from "../User";
import UserAddress from "./UserAddress";
import { formatUserAddress } from "./UserAddress";
import { mockedUser } from "../mockedUser";

jest.mock("../User", () => ({
  useUser: jest.fn(),
}));

describe("UserAddress", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockedUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the short format by default", () => {
    const { getByText } = render(<UserAddress />);
    expect(getByText("0xe36B...33d0")).toBeInTheDocument();
  });

  it("renders the full format when specified", () => {
    const { getByText } = render(<UserAddress format="full" />);
    expect(getByText(mockedUser.patchwallet)).toBeInTheDocument();
  });

  it("does not render anything when there is no address", () => {
    (useUser as jest.Mock).mockReturnValue({ address: null });
    const { container } = render(<UserAddress />);
    expect(container.firstChild).toBeNull();
  });
});

describe("formatUserAddress", () => {
  it("formats the address in full format", () => {
    const address = mockedUser.patchwallet;
    const formattedAddress = formatUserAddress(address, "full");
    expect(formattedAddress).toEqual(address);
  });

  it("formats the address in short format", () => {
    const address = mockedUser.patchwallet;
    const formattedAddress = formatUserAddress(address, "short");
    expect(formattedAddress).toEqual("0xe36B...33d0");
  });

  it("returns the address when an invalid format is specified", () => {
    const address = mockedUser.patchwallet;
    const formattedAddress = formatUserAddress(address, "invalid" as any);
    expect(formattedAddress).toEqual(address);
  });
});

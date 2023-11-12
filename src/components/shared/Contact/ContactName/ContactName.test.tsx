import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ContactName from "./ContactName";
import { useContact } from "../Contact";
import { mockedContact } from "../mockedContact";

jest.mock("../Contact", () => ({
  useContact: jest.fn(),
}));

describe("ContactName", () => {
  beforeEach(() => {
    (useContact as jest.Mock).mockReturnValue(mockedContact);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the default format", () => {
    const { getByText } = render(<ContactName />);

    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the username format", () => {
    const { getByText } = render(<ContactName format="username" />);

    expect(getByText("johndoe")).toBeInTheDocument();
  });

  it("renders the first name format", () => {
    const { getByText } = render(<ContactName format="first" />);

    expect(getByText("John")).toBeInTheDocument();
  });

  it("renders the last name format", () => {
    const { getByText } = render(<ContactName format="last" />);

    expect(getByText("Doe")).toBeInTheDocument();
  });
});

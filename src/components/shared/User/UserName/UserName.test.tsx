import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserName from "./UserName";
import { useUser } from "../User";
import { mockedUser } from "../mockedUser";

jest.mock("../User", () => ({
  useUser: jest.fn(),
}));

describe("UserName", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockedUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the default format", () => {
    const { getByText } = render(<UserName />);

    expect(getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the username format", () => {
    const { getByText } = render(<UserName format="username" />);

    expect(getByText("johndoe")).toBeInTheDocument();
  });

  it("renders the first name format", () => {
    const { getByText } = render(<UserName format="first" />);

    expect(getByText("John")).toBeInTheDocument();
  });

  it("renders the last name format", () => {
    const { getByText } = render(<UserName format="last" />);

    expect(getByText("Doe")).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import UserAvatar from "./UserAvatar";
import { useUser } from "../User";
import { mockedUser } from "../mockedUser";
import { STORAGE_KEYS } from "../../../../constants";

jest.mock("../User", () => ({
  useUser: jest.fn(),
}));

jest.mock("../../../../hooks/useAppContext", () => () => ({
  photos: {},
}));

describe("UserAvatar", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockedUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the default avatar", () => {
    const { getByText } = render(<UserAvatar />);

    expect(getByText("JD")).toBeInTheDocument();
  });

  it("renders the contact photo", () => {
    const photo = "https://example.com/photo.jpg";
    localStorage.setItem(
      STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", mockedUser.userTelegramID),
      photo
    );
    (useUser as jest.Mock).mockReturnValue({ ...mockedUser, photo });
    const { getByAltText } = render(<UserAvatar />);

    expect(getByAltText("John Doe")).toHaveAttribute("src", photo);

    localStorage.removeItem(
      STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", mockedUser.userTelegramID)
    );
  });

  it("renders the first letter of the first name when there is no photo", () => {
    (useUser as jest.Mock).mockReturnValue({
      ...mockedUser,
    });
    const { getByText } = render(<UserAvatar />);

    expect(getByText("JD")).toBeInTheDocument();
  });

  it("renders the first letter of the last name when there is no photo", () => {
    (useUser as jest.Mock).mockReturnValue({
      ...mockedUser,
    });
    const { getByText } = render(<UserAvatar />);

    expect(getByText("JD")).toBeInTheDocument();
  });

  it("renders the badge when badgeSize is defined", () => {
    const { getByAltText } = render(<UserAvatar badgeSize={20} />);

    expect(getByAltText("Grindery logo")).toBeInTheDocument();
  });
});

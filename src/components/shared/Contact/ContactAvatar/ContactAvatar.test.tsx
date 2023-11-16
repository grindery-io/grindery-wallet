import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ContactAvatar from "./ContactAvatar";
import { useContact } from "../Contact";
import { mockedContact } from "../mockedContact";
import { STORAGE_KEYS } from "../../../../constants";

jest.mock("../Contact", () => ({
  useContact: jest.fn(),
}));

jest.mock("../../../../hooks/useAppContext", () => () => ({
  photos: {},
}));

describe("ContactAvatar", () => {
  beforeEach(() => {
    (useContact as jest.Mock).mockReturnValue(mockedContact);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the default avatar", () => {
    const { getByText } = render(<ContactAvatar />);

    expect(getByText("JD")).toBeInTheDocument();
  });

  it("renders the contact photo", () => {
    const photo = "https://example.com/photo.jpg";
    localStorage.setItem(
      STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", mockedContact.id),
      photo
    );
    (useContact as jest.Mock).mockReturnValue({ ...mockedContact, photo });
    const { getByAltText } = render(<ContactAvatar />);

    expect(getByAltText("John Doe")).toHaveAttribute("src", photo);

    localStorage.removeItem(
      STORAGE_KEYS.CONTACT_PHOTO.replace("{{id}}", mockedContact.id)
    );
  });

  it("renders the first letter of the first name when there is no photo", () => {
    (useContact as jest.Mock).mockReturnValue({
      ...mockedContact,
      lastName: undefined,
      photo: null,
    });
    const { getByText } = render(<ContactAvatar />);

    expect(getByText("J")).toBeInTheDocument();
  });

  it("renders the first letter of the last name when there is no photo", () => {
    (useContact as jest.Mock).mockReturnValue({
      ...mockedContact,
      photo: null,
    });
    const { getByText } = render(<ContactAvatar />);

    expect(getByText("JD")).toBeInTheDocument();
  });

  it("renders the badge when grinderyUser is true", () => {
    const { getByAltText } = render(<ContactAvatar badgeSize={20} />);

    expect(getByAltText("Grindery logo")).toBeInTheDocument();
  });

  it("does not render the badge when grinderyUser is false", () => {
    (useContact as jest.Mock).mockReturnValue({
      ...mockedContact,
      grinderyUser: false,
    });
    const { queryByAltText } = render(<ContactAvatar badgeSize={20} />);

    expect(queryByAltText("Grindery logo")).not.toBeInTheDocument();
  });
});

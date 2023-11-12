import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Contact, { ContactContext } from "./Contact";
import { mockedContact } from "./mockedContact";

describe("Contact", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Contact contact={mockedContact}>
        <div>Child component</div>
      </Contact>
    );

    expect(getByText("Child component")).toBeInTheDocument();
  });

  it("provides the contact context", () => {
    const { getByText } = render(
      <Contact contact={mockedContact}>
        <ContactContext.Consumer>
          {(value) => (
            <>
              <div>{value.id}</div>
              <div>{value.username}</div>
              <div>{value.phone}</div>
            </>
          )}
        </ContactContext.Consumer>
      </Contact>
    );

    expect(getByText(mockedContact.id)).toBeInTheDocument();
    expect(getByText(mockedContact.username)).toBeInTheDocument();
    expect(getByText(mockedContact.phone)).toBeInTheDocument();
  });
});

import { getContactsList } from "../getContactsList";

describe("getContactsList", () => {
  it("should return the correct contacts list when hasTgSession is false", () => {
    const contactsList = getContactsList({
      hasTgSession: false,
      contactsItems: [],
      socialContactsItems: [],
      socialContactsEnabled: false,
      contactsLoading: false,
      socialContactsLoading: false,
    });

    expect(contactsList).toEqual([
      {
        type: "banner",
        props: {
          key: "requestTgAccess",
          text: "Grant access",
        },
      },
    ]);
  });

  it("should return the correct contacts list when hasTgSession is true and contactsItems is not empty", () => {
    const contactsList = getContactsList({
      hasTgSession: true,
      contactsItems: [
        // @ts-ignore
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          invited: false,
          grinderyUser: true,
        },
        // @ts-ignore
        {
          id: "2",
          firstName: "Jane",
          lastName: "Smith",
          invited: true,
          grinderyUser: false,
        },
      ],
      socialContactsItems: [],
      socialContactsEnabled: false,
      contactsLoading: false,
      socialContactsLoading: false,
    });

    expect(contactsList).toEqual([
      {
        type: "header",
        props: { text: "Telegram contacts" },
      },
      {
        type: "contact",
        props: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          invited: false,
          grinderyUser: true,
        },
      },
      {
        type: "contact",
        props: {
          id: "2",
          firstName: "Jane",
          lastName: "Smith",
          invited: true,
          grinderyUser: false,
        },
      },
    ]);
  });

  // Add more test cases for different scenarios...
});

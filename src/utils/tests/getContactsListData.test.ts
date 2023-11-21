import { getContactsListData } from "../getContactsListData";

describe("getContactsListData", () => {
  it("should return the correct contacts list when hasTgSession is false", () => {
    const contactsList = getContactsListData({
      hasTgSession: false,
      contactsItems: [],
      socialContactsItems: [],
      socialContactsEnabled: false,
      contactsLoading: false,
      socialContactsLoading: false,
    });

    expect(contactsList).toEqual([
      {
        variant: "banner",
        props: {
          key: "requestTgAccess",
          text: "Grant access",
        },
      },
    ]);
  });

  it("should return the correct contacts list when hasTgSession is true and contactsItems is not empty", () => {
    const contactsList = getContactsListData({
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
        variant: "header",
        props: { text: "Telegram contacts" },
      },
      {
        variant: "contact",
        props: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          invited: false,
          grinderyUser: true,
        },
      },
      {
        variant: "contact",
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

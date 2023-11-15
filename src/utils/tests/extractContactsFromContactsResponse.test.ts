import { extractContactsFromContactsResponse } from "../extractContactsFromContactsResponse";

describe("extractContactsFromContactsResponse", () => {
  it("should extract contacts from response", () => {
    const response = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        phone: "+1234567890",
        photo: "https://example.com/johndoe.jpg",
        mutualContact: true,
        deleted: false,
        bot: false,
        verified: true,
        premium: false,
        fake: false,
        scam: false,
        isGrinderyUser: true,
        isInvited: false,
        status: "online",
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        phone: "+0987654321",
        photo: "https://example.com/janedoe.jpg",
        mutualContact: false,
        deleted: true,
        bot: true,
        verified: false,
        premium: true,
        fake: true,
        scam: true,
        isGrinderyUser: false,
        isInvited: true,
        status: "offline",
      },
    ];

    const expectedContacts = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        phone: "+1234567890",
        photo: "https://example.com/johndoe.jpg",
        mutual: true,
        deleted: false,
        bot: false,
        verified: true,
        premium: false,
        fake: false,
        scam: false,
        grinderyUser: true,
        invited: false,
        status: "online",
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        phone: "+0987654321",
        photo: "https://example.com/janedoe.jpg",
        mutual: false,
        deleted: true,
        bot: true,
        verified: false,
        premium: true,
        fake: true,
        scam: true,
        grinderyUser: false,
        invited: true,
        status: "offline",
      },
    ];
    // @ts-ignore
    expect(extractContactsFromContactsResponse(response)).toEqual(
      expectedContacts
    );
  });

  it("should return an empty array if response is empty", () => {
    // @ts-ignore
    const response = [];

    // @ts-ignore
    expect(extractContactsFromContactsResponse(response)).toEqual([]);
  });
});

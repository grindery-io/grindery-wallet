import { filterContactsListDataBySearchQuery } from "../filterContactsListDataBySearchQuery";

describe("filterContactsListDataBySearchQuery", () => {
  it("returns true when search is empty", () => {
    const item = {
      props: {
        userName: "John Doe",
        userHandle: "@johndoe",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
      },
    };
    const search = "";
    const result = filterContactsListDataBySearchQuery(item, search);
    expect(result).toBe(true);
  });

  it("returns true when search matches userName", () => {
    const item = {
      props: {
        userName: "John Doe",
        userHandle: "@johndoe",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
      },
    };
    const search = "John";
    const result = filterContactsListDataBySearchQuery(item, search);
    expect(result).toBe(true);
  });

  it("returns true when search matches userHandle", () => {
    const item = {
      props: {
        userName: "John Doe",
        userHandle: "@johndoe",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
      },
    };
    const search = "@johndoe";
    const result = filterContactsListDataBySearchQuery(item, search);
    expect(result).toBe(true);
  });

  // Add more test cases for other search criteria

  it("returns false when search does not match any criteria", () => {
    const item = {
      props: {
        userName: "John Doe",
        userHandle: "@johndoe",
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
      },
    };
    const search = "Jane";
    const result = filterContactsListDataBySearchQuery(item, search);
    expect(result).toBe(false);
  });
});

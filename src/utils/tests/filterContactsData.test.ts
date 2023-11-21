import { filterContactsData } from "../filterContactsData";

describe("filterContactsData", () => {
  it("should return true if filters include 'invited' and item is an invited contact", () => {
    const item = {
      variant: "contact",
      props: {
        invited: true,
        grinderyUser: false,
      },
    };
    const filters = ["invited"];
    const result = filterContactsData(item, filters);
    expect(result).toBe(true);
  });

  it("should return true if filters include 'invited' and item is a banner with key 'requestTgAccess'", () => {
    const item = {
      variant: "banner",
      props: {
        key: "requestTgAccess",
      },
    };
    const filters = ["invited"];
    const result = filterContactsData(item, filters);
    expect(result).toBe(true);
  });

  // Add more test cases for other filter conditions...

  it("should return false if filters do not match any conditions", () => {
    const item = {
      variant: "contact",
      props: {
        invited: false,
        grinderyUser: false,
      },
    };
    const filters = ["has-wallet"];
    const result = filterContactsData(item, filters);
    expect(result).toBe(false);
  });
});

import { UserProps } from "types";
import { createFilterOption } from "../createFilterOption";

describe("createFilterOption", () => {
  const filterName = "invited";
  const items = [
    { id: 1, invited: true, grinderyUser: false },
    { id: 2, invited: false, grinderyUser: false },
    { id: 3, invited: true, grinderyUser: true },
  ];
  const filters = ["invited"];
  const user: UserProps = {
    userTelegramID: "123",
    patchwallet: "patchwallet",
    _id: "123",
  };
  const dispatch = jest.fn();
  const appStoreActions = { setContacts: jest.fn() };

  it("should return a filter object with the correct properties", () => {
    const filter = createFilterOption(
      "key",
      "label",
      "checkbox",
      filterName,
      items,
      filters,
      user,
      dispatch,
      appStoreActions
    );

    expect(filter).toEqual({
      key: "key",
      label: "label",
      type: "checkbox",
      value: true,
      isActive: true,
      onChange: expect.any(Function),
      count: 1,
    });
  });

  it("should return a filter object with the correct count for 'invited' filter", () => {
    const filter = createFilterOption(
      "key",
      "label",
      "checkbox",
      "invited",
      items,
      filters,
      user,
      dispatch,
      appStoreActions
    );

    expect(filter.count).toBe(1);
  });

  it("should return a filter object with the correct count for 'not-invited' filter", () => {
    const filter = createFilterOption(
      "key",
      "label",
      "checkbox",
      "not-invited",
      items,
      filters,
      user,
      dispatch,
      appStoreActions
    );

    expect(filter.count).toBe(1);
  });

  it("should return a filter object with the correct count for 'has-wallet' filter", () => {
    const filter = createFilterOption(
      "key",
      "label",
      "checkbox",
      "has-wallet",
      items,
      filters,
      user,
      dispatch,
      appStoreActions
    );

    expect(filter.count).toBe(1);
  });

  it("should call appStoreActions.setContacts with the correct arguments when onChange is called with true", () => {
    const filter = createFilterOption(
      "key",
      "label",
      "checkbox",
      filterName,
      items,
      filters,
      user,
      dispatch,
      appStoreActions
    );

    filter.onChange(true);

    expect(appStoreActions.setContacts).toHaveBeenCalledWith({
      filters: ["invited", "invited"],
    });
  });

  it("should call appStoreActions.setContacts with the correct arguments when onChange is called with false", () => {
    const filter = createFilterOption(
      "key",
      "label",
      "checkbox",
      filterName,
      items,
      filters,
      user,
      dispatch,
      appStoreActions
    );

    filter.onChange(false);

    expect(appStoreActions.setContacts).toHaveBeenCalledWith({
      filters: [],
    });
  });
});

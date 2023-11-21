import { ContactsListDataItemVariantType } from "./getContactsListData";

export const filterContactsData = (item: any, filters?: string[]) => {
  let res = false;

  if (
    (filters || []).includes("invited") &&
    ((item.variant === ContactsListDataItemVariantType.CONTACT &&
      item.props?.invited &&
      !item.props?.grinderyUser) ||
      (item.variant === ContactsListDataItemVariantType.BANNER &&
        item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }
  if (
    (filters || []).includes("has-wallet") &&
    ((item.variant === ContactsListDataItemVariantType.CONTACT &&
      item.props?.grinderyUser) ||
      (item.variant === ContactsListDataItemVariantType.BANNER &&
        item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }
  if (
    (filters || []).includes("not-invited") &&
    ((item.variant === ContactsListDataItemVariantType.CONTACT &&
      !item.props?.grinderyUser &&
      !item.props?.invited) ||
      (item.variant === ContactsListDataItemVariantType.BANNER &&
        item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }

  if (
    (filters || []).includes("telegram") &&
    (item.variant === ContactsListDataItemVariantType.CONTACT ||
      (item.variant === ContactsListDataItemVariantType.BANNER &&
        item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }
  if (
    (filters || []).includes("interacted") &&
    item.variant === ContactsListDataItemVariantType.USER &&
    item.props?.score === 1
  ) {
    res = true;
  }

  if (
    (filters || []).includes("might-know") &&
    item.variant === ContactsListDataItemVariantType.USER &&
    item.props?.score < 1
  ) {
    res = true;
  }

  return res;
};

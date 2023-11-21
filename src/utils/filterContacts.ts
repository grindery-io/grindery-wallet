export const filterContacts = (item: any, filters?: string[]) => {
  let res = false;

  if (
    (filters || []).includes("invited") &&
    ((item.type === "contact" &&
      item.props?.invited &&
      !item.props?.grinderyUser) ||
      (item.type === "banner" && item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }
  if (
    (filters || []).includes("has-wallet") &&
    ((item.type === "contact" && item.props?.grinderyUser) ||
      (item.type === "banner" && item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }
  if (
    (filters || []).includes("not-invited") &&
    ((item.type === "contact" &&
      !item.props?.grinderyUser &&
      !item.props?.invited) ||
      (item.type === "banner" && item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }

  if (
    (filters || []).includes("telegram") &&
    (item.type === "contact" ||
      (item.type === "banner" && item.props.key === "requestTgAccess"))
  ) {
    res = true;
  }
  if (
    (filters || []).includes("interacted") &&
    item.type === "user" &&
    item.props?.score === 1
  ) {
    res = true;
  }

  if (
    (filters || []).includes("might-know") &&
    item.type === "user" &&
    item.props?.score < 1
  ) {
    res = true;
  }

  return res;
};

import { Filter } from "../components/shared/SearchBox";
import { UserState } from "../types/State";

/**
 * Create filter option utility function
 * @since 0.3.15
 */
export const createFilterOption = (
  key: string,
  label: string,
  type: "checkbox" | "radio",
  filterName: string,
  items: any[],
  filters: string[] | undefined,
  user: UserState | undefined,
  dispatch: any,
  appStoreActions: any
): Filter => ({
  key,
  label,
  type,
  value: (filters || []).includes(filterName),
  isActive: (filters || []).includes(filterName),
  onChange: (value) => {
    dispatch(
      appStoreActions.setContacts({
        filters: value
          ? [...(filters || []), filterName]
          : (filters || []).filter((filter) => filter !== filterName),
      })
    );
  },
  count: items
    ?.filter((contact) => contact.id !== user?.userTelegramID)
    .filter((contact) => {
      if (filterName === "invited") {
        return contact.isInvited && !contact.isGrinderyUser;
      } else if (filterName === "not-invited") {
        return !contact.isInvited && !contact.isGrinderyUser;
      } else if (filterName === "has-wallet") {
        return contact.isGrinderyUser;
      }
      return false;
    }).length,
});

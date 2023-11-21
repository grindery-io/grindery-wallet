import { ContactType } from "components/shared/Contact/Contact";
import { UserType } from "components/shared/User/User";

export enum ContactsListDataItemVariantType {
  BANNER = "banner",
  PLACEHOLDER = "placeholder",
  HEADER = "header",
  CONTACT = "contact",
  USER = "user",
}

export type ContactsListDataItemType = {
  variant: ContactsListDataItemVariantType;
  props: any;
};

export const getContactsListData = ({
  hasTgSession,
  contactsItems,
  socialContactsItems,
  socialContactsEnabled,
  contactsLoading,
  socialContactsLoading,
}: {
  hasTgSession: boolean;
  contactsItems: ContactType[];
  socialContactsItems: UserType[];
  socialContactsEnabled: boolean;
  contactsLoading: boolean;
  socialContactsLoading: boolean;
}): ContactsListDataItemType[] => {
  return [
    ...(!hasTgSession
      ? [
          {
            variant: ContactsListDataItemVariantType.BANNER,
            props: {
              key: "requestTgAccess",
              text: "Grant access",
            },
          },
        ]
      : []),
    ...((hasTgSession && contactsItems.length > 0) || contactsLoading
      ? [
          {
            variant: ContactsListDataItemVariantType.HEADER,
            props: { text: "Telegram contacts" },
          },
        ]
      : []),
    ...(hasTgSession && contactsItems.length < 1 && contactsLoading
      ? [
          { variant: ContactsListDataItemVariantType.PLACEHOLDER, props: {} },
          { variant: ContactsListDataItemVariantType.PLACEHOLDER, props: {} },
        ]
      : []),
    ...contactsItems
      .map((item) => ({
        variant: ContactsListDataItemVariantType.CONTACT,
        props: item,
      }))
      .sort((a: any, b: any) =>
        a.props.invited === b.props.invited ? 0 : a.props.invited ? -1 : 1
      )
      .sort((a: any, b: any) =>
        a.props.grinderyUser === b.props.grinderyUser
          ? 0
          : a.props.grinderyUser
          ? -1
          : 1
      ),
    ...((socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => item.score === 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length > 0 ||
    (socialContactsEnabled && socialContactsLoading)
      ? [
          {
            variant: ContactsListDataItemVariantType.HEADER,
            props: { text: "People you've interacted with" },
          },
        ]
      : []),
    ...(socialContactsEnabled &&
    socialContactsLoading &&
    socialContactsItems
      .filter((item) => item.score === 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length < 1
      ? [
          { variant: ContactsListDataItemVariantType.PLACEHOLDER, props: {} },
          { variant: ContactsListDataItemVariantType.PLACEHOLDER, props: {} },
        ]
      : []),
    ...(socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => item.score === 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      )
      .map((item) => ({
        variant: ContactsListDataItemVariantType.USER,
        props: item,
      })),
    ...((socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => (item.score || 0) < 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length > 0
      ? [
          {
            variant: ContactsListDataItemVariantType.HEADER,
            props: {
              text: "People you might know",
            },
          },
        ]
      : []),
    ...(socialContactsEnabled &&
    socialContactsLoading &&
    (socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => (item.score || 0) < 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length < 1
      ? [
          {
            variant: ContactsListDataItemVariantType.HEADER,
            props: { text: "People you might know" },
          },
        ]
      : []),
    ...(socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => (item.score || 0) < 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      )
      .map((item) => ({
        variant: ContactsListDataItemVariantType.USER,
        props: item,
      }))
      .sort((a: any, b: any) => (b.props.score || 0) - (a.props.score || 0)),
    ...(socialContactsEnabled &&
    socialContactsLoading &&
    socialContactsItems
      .filter((item) => (item.score || 0) < 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length < 1
      ? [
          { variant: ContactsListDataItemVariantType.PLACEHOLDER, props: {} },
          { variant: ContactsListDataItemVariantType.PLACEHOLDER, props: {} },
        ]
      : []),
  ];
};

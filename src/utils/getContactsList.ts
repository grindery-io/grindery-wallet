import { ContactType } from "components/shared/Contact/Contact";
import { UserType } from "components/shared/User/User";

export type ContactsListDataItemType = {
  type: string;
  props: any;
};

export const getContactsList = ({
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
            type: "banner",
            props: {
              key: "requestTgAccess",
              text: "Grant access",
            },
          },
        ]
      : []),
    ...((hasTgSession && contactsItems.length > 0) || contactsLoading
      ? [{ type: "header", props: { text: "Telegram contacts" } }]
      : []),
    ...(hasTgSession && contactsItems.length < 1 && contactsLoading
      ? [
          { type: "placeholder", props: {} },
          { type: "placeholder", props: {} },
        ]
      : []),
    ...contactsItems
      .map((item) => ({
        type: "contact",
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
      ? [{ type: "header", props: { text: "People you've interacted with" } }]
      : []),
    ...(socialContactsEnabled &&
    socialContactsLoading &&
    socialContactsItems
      .filter((item) => item.score === 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length < 1
      ? [
          { type: "placeholder", props: {} },
          { type: "placeholder", props: {} },
        ]
      : []),
    ...(socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => item.score === 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      )
      .map((item) => ({
        type: "user",
        props: item,
      })),
    ...((socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => (item.score || 0) < 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      ).length > 0
      ? [
          {
            type: "header",
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
      ? [{ type: "header", props: { text: "People you might know" } }]
      : []),
    ...(socialContactsEnabled ? socialContactsItems : [])
      .filter((item) => (item.score || 0) < 1)
      .filter(
        (item) => !contactsItems.map((i) => i.id).includes(item.userTelegramID)
      )
      .map((item) => ({
        type: "user",
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
          { type: "placeholder", props: {} },
          { type: "placeholder", props: {} },
        ]
      : []),
  ];
};

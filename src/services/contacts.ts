import axios from "axios";
import { WALLET_API_URL } from "../constants";
import { UserType } from "components/shared/User/User";

export type GetContactsResponseContactType = {
  CONSTRUCTOR_ID: number;
  SUBCLASS_OF_ID: number;
  className: string;
  classType: string;
  originalArgs: {
    flags: number;
    self: boolean;
    contact: boolean;
    mutualContact: boolean;
    deleted: boolean;
    bot: boolean;
    botChatHistory: boolean;
    botNochats: boolean;
    verified: boolean;
    restricted: boolean;
    min: boolean;
    botInlineGeo: boolean;
    support: boolean;
    scam: boolean;
    applyMinPhoto: boolean;
    fake: boolean;
    botAttachMenu: boolean;
    premium: boolean;
    attachMenuEnabled: boolean;
    flags2: number;
    botCanEdit: boolean;
    closeFriend: boolean;
    storiesHidden: boolean;
    storiesUnavailable: boolean;
    id: string;
    accessHash: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    phone: string;
    photo: {
      flags: number;
      hasVideo: boolean;
      personal: boolean;
      photoId: string;
      strippedThumb: {
        type: "Buffer";
        data: number[];
      };
      dcId: number;
      className: string;
    };
    status: {
      className: string;
    };
    botInfoVersion: null;
    restrictionReason: null;
    botInlinePlaceholder: null;
    langCode: null;
    emojiStatus: null;
    usernames: null;
    storiesMaxId: null;
  };
  flags: number;
  self: boolean;
  contact: boolean;
  mutualContact: boolean;
  deleted: boolean;
  bot: boolean;
  botChatHistory: boolean;
  botNochats: boolean;
  verified: boolean;
  restricted: boolean;
  min: boolean;
  botInlineGeo: boolean;
  support: boolean;
  scam: boolean;
  applyMinPhoto: boolean;
  fake: boolean;
  botAttachMenu: boolean;
  premium: boolean;
  attachMenuEnabled: boolean;
  flags2: number;
  botCanEdit: boolean;
  closeFriend: boolean;
  storiesHidden: boolean;
  storiesUnavailable: boolean;
  id: string;
  accessHash: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  phone: string;
  photo: {
    flags: number;
    hasVideo: boolean;
    personal: boolean;
    photoId: string;
    strippedThumb: {
      type: "Buffer";
      data: number[];
    };
    dcId: number;
    className: string;
  };
  status: {
    className: string;
  };
  botInfoVersion: null;
  restrictionReason: null;
  botInlinePlaceholder: null;
  langCode: null;
  emojiStatus: null;
  usernames: null;
  storiesMaxId: null;
  isGrinderyUser: boolean;
  isInvited: boolean;
};

export type GetContactsResponseType = GetContactsResponseContactType[];

export const getContactsRequest = async () => {
  return await axios.get<GetContactsResponseType>(
    `${WALLET_API_URL}/v2/contacts`,
    {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};

export type GetSocialContactsResponseType = UserType[];

export const getSocialContactsRequest = async (
  controller?: AbortController
) => {
  return await axios.get<GetSocialContactsResponseType>(
    `${WALLET_API_URL}/v2/contacts/social`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    }
  );
};

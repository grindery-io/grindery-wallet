export type TelegramUser = {
  _id: string;
  userTelegramID: string;
  userName: string;
  userHandle: string;
  patchwallet: string;
};

export type TelegramAuthUserInput = {
  phone: string;
  password: string;
  code: string;
};

export type TelegramUserActivity = {
  _id: string;
  TxId: string;
  chainId: string;
  tokenSymbol: string;
  tokenAddress: string;
  senderTgId: string;
  senderWallet: string;
  senderName: string;
  recipientTgId: string;
  recipientWallet: string;
  tokenAmount: string;
  transactionHash: string;
  dateAdded: string;
};

export type TelegramUserReward = {
  _id: string;
  userTelegramID: string;
  responsePath: string;
  amount: string;
  transactionHash: string;
  dateAdded: string;
  walletAddress: string;
  reason: string;
  userHandle: string;
  userName: string;
  message: string;
  parentTransactionHash?: string;
};

export type TelegramUserContact = {
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
  firstName: string;
  lastName: string;
  username: any;
  phone: string;
  photo: TelegramUserContactPhoto;
  status: TelegramUserContactStatus;
  botInfoVersion: any;
  restrictionReason: any;
  botInlinePlaceholder: any;
  langCode: any;
  emojiStatus: any;
  usernames: any;
  storiesMaxId: any;
  className: string;
  isGrinderyUser?: boolean;
  isInvited?: boolean;
};

export type TelegramUserContactPhoto = {
  flags: number;
  hasVideo: boolean;
  personal: boolean;
  photoId: string;
  strippedThumb: TelegramUserContactPhotoStrippedThumb;
  dcId: number;
  className: string;
};

export interface TelegramUserContactPhotoStrippedThumb {
  type: string;
  data: number[];
}

export interface TelegramUserContactStatus {
  className: string;
}

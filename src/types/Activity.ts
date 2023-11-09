export type ActivityType = "transfer" | "swap";

export type Activity = {
  _id: string;
  type: ActivityType;
  userTelegramID: string;
  amount: string;
  chainId: string;
  tokenAddress: string;
  dateAdded: string;
  status?: string;
  transactionHash?: string;
  txId?: string;

  recipientTgId?: string | null;
  recipientWallet: string;
};

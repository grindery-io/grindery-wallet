export enum OrderStatus {
  PENDING = "pending",
  COMPLETE = "complete",
  FAILURE_G1 = "failure_G1",
  FAILURE_USD = "failure_USD",
  WAITING_USD = "waiting_usd",
  PENDING_USD = "pending_usd",
}

export type OrderType = {
  orderId: string;
  quoteId: string;
  tokenAmountG1: string;
  usdFromUsdInvestment: string;
  usdFromG1Investment: string;
  usdFromMvu: string;
  usdFromTime: string;
  equivalentUsdInvested: string;
  gxBeforeMvu: string;
  gxMvuEffect: string;
  gxTimeEffect: string;
  GxUsdExchangeRate: string;
  standardGxUsdExchangeRate: string;
  discountReceived: string;
  gxReceived: string;
  userTelegramID: string;
  status: OrderStatus;
  date?: string;
  dateG1?: string;
  dateUSD?: string;
  transactionHashG1?: string;
  userOpHashG1?: string;
  chainIdUSD?: string;
  tokenAddressUSD?: string;
  tokenAmountUSD?: string;
  transactionHashUSD?: string;
  userOpHashUSD?: string;
};

import { OrderStatus } from "types";

export const mockedOrder = {
  orderId: "mocked-order-id",
  status: OrderStatus.COMPLETE,
  quoteId: "mocked-quote-id",
  tokenAmountG1: "1000.00",
  usdFromUsdInvestment: "1",
  usdFromG1Investment: "1",
  usdFromMvu: "1",
  usdFromTime: "1",
  equivalentUsdInvested: "1",
  gxBeforeMvu: "1",
  gxMvuEffect: "1",
  gxTimeEffect: "1",
  GxUsdExchangeRate: "1",
  standardGxUsdExchangeRate: "1",
  discountReceived: "1",
  gxReceived: "1",
  userTelegramID: "user-telegram-id",
};

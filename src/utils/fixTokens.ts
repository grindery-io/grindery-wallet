import { USDCE_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS } from "../constants";
import { Token } from "../types/State";

export const fixTokens = (token: Token) => {
  if (token.address === USDCE_TOKEN_ADDRESS) {
    token.symbol = "USDCE";
  }
  if (token.address === USDC_TOKEN_ADDRESS) {
    token.logoURI =
      "https://metadata-service.herokuapp.com/api/token/137/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/icon";
  }
  return token;
};

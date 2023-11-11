import { TokenType } from "../components/shared/Token";
import { USDCE_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS } from "../constants";

export const fixTokens = (token: TokenType) => {
  if (token.address === USDCE_TOKEN_ADDRESS) {
    token.symbol = "USDCe";
  }
  if (token.address === USDC_TOKEN_ADDRESS) {
    token.icon =
      "https://metadata-service.herokuapp.com/api/token/137/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/icon";
  }
  return token;
};

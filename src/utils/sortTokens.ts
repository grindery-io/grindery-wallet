import { TokenType } from "../components/shared/Token";
import { GRINDERY_ONE_TOKEN } from "../constants";

const SECOND_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const sortTokens = (tokens: TokenType[]) => {
  return [...tokens].sort((a, b) => {
    const aAddress = a?.address?.toLowerCase() || "";
    const bAddress = b?.address?.toLowerCase() || "";

    if (aAddress === GRINDERY_ONE_TOKEN.address.toLowerCase()) return -1;
    if (bAddress === GRINDERY_ONE_TOKEN.address.toLowerCase()) return 1;

    if (aAddress === SECOND_TOKEN_ADDRESS) return -1;
    if (bAddress === SECOND_TOKEN_ADDRESS) return 1;

    return 0;
  });
};

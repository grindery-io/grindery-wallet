import { TokenType } from "../components/shared/Token";
import { GRINDERY_ONE_TOKEN } from "../constants";

export const sortTokens = (tokens: TokenType[]) => {
  return [
    ...tokens.filter(
      (token) =>
        token.address.toLowerCase() === GRINDERY_ONE_TOKEN.address.toLowerCase()
    ),
    ...tokens.filter(
      (token) =>
        token.address.toLowerCase() ===
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    ),
    ...tokens.filter(
      (token) =>
        token.address.toLowerCase() !==
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" &&
        token.address.toLowerCase() !== GRINDERY_ONE_TOKEN.address.toLowerCase()
    ),
  ];
};

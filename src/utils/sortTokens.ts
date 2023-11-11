import { TokenType } from "../components/shared/Token";
import { mockedToken } from "../components/shared/Token/mockedToken";

export const sortTokens = (tokens: TokenType[]) => {
  return [
    ...tokens.filter(
      (token) =>
        token.address.toLowerCase() === mockedToken.address.toLowerCase()
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
        token.address.toLowerCase() !== mockedToken.address.toLowerCase()
    ),
  ];
};

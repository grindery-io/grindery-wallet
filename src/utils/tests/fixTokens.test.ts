import { TokenType } from "components/shared/Token";
import { fixTokens } from "../fixTokens";
import { mockedToken } from "components/shared/Token/mockedToken";
import { USDCE_TOKEN_ADDRESS, USDC_TOKEN_ADDRESS } from "../../constants";

describe("fixTokens", () => {
  it("should fix the symbol for USDCE token", () => {
    const token: TokenType = {
      ...mockedToken,
      address: USDCE_TOKEN_ADDRESS,
      symbol: "USDC",
      icon: "",
    };
    const expectedToken: TokenType = {
      ...mockedToken,
      address: USDCE_TOKEN_ADDRESS,
      symbol: "USDCe",
      icon: "",
    };
    const result = fixTokens(token);
    expect(result).toEqual(expectedToken);
  });

  it("should fix the icon for USDC token", () => {
    const token: TokenType = {
      ...mockedToken,
      address: USDC_TOKEN_ADDRESS,
      symbol: "USDC",
      icon: "",
    };
    const expectedToken: TokenType = {
      ...mockedToken,
      address: USDC_TOKEN_ADDRESS,
      symbol: "USDC",
      icon: "https://metadata-service.herokuapp.com/api/token/137/0x2791bca1f2de4661ed88a30c99a7a9449aa84174/icon",
    };
    const result = fixTokens(token);
    expect(result).toEqual(expectedToken);
  });

  it("should not modify other tokens", () => {
    const token: TokenType = {
      ...mockedToken,
      address: "0x789",
      symbol: "ABC",
      icon: "https://example.com/icon.png",
    };
    const result = fixTokens(token);
    expect(result).toEqual(token);
  });
});

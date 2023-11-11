import { GetFullBalanceResponseType } from "../../services/balance";
import { extractTokensFromBalanceResponse } from "../extractTokensFromBalanceResponse";

describe("extractTokensFromBalanceResponse", () => {
  it("should return an array of TokenType objects when assets is defined", () => {
    const response = {
      assets: [
        {
          tokenName: "Token 1",
          tokenSymbol: "TKN1",
          tokenDecimals: 18,
          contractAddress: "0x1234567890123456789012345678901234567890",
          thumbnail: "https://example.com/token1.png",
          balanceRawInteger: "1000000000000000000",
          tokenPrice: "1.23",
        },
        {
          tokenName: "Token 2",
          tokenSymbol: "TKN2",
          tokenDecimals: 6,
          contractAddress: "0x0987654321098765432109876543210987654321",
          thumbnail: "https://example.com/token2.png",
          balanceRawInteger: "5000000000000000",
          tokenPrice: "4.56",
        },
      ],
      syncStatus: { timestamp: 1631234567 },
    };
    const result = extractTokensFromBalanceResponse(
      response as GetFullBalanceResponseType
    );
    expect(result).toEqual([
      {
        name: "Token 1",
        symbol: "TKN1",
        decimals: 18,
        address: "0x1234567890123456789012345678901234567890",
        icon: "https://example.com/token1.png",
        chain: "137",
        balance: "1000000000000000000",
        price: "1.23",
        priceUpdated: new Date(1631234567000).toString(),
      },
      {
        name: "Token 2",
        symbol: "TKN2",
        decimals: 6,
        address: "0x0987654321098765432109876543210987654321",
        icon: "https://example.com/token2.png",
        chain: "137",
        balance: "5000000000000000",
        price: "4.56",
        priceUpdated: new Date(1631234567000).toString(),
      },
    ]);
  });
});

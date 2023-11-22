import { CHAINS } from "../constants";
import { TokenType } from "../components/shared/Token";
import { GetFullBalanceResponseType } from "../services/balance";

export const extractTokensFromBalanceResponse = (
  response: GetFullBalanceResponseType
): TokenType[] => {
  return (response.assets || []).map((asset) => ({
    name: asset.tokenName,
    symbol: asset.tokenSymbol,
    decimals: asset.tokenDecimals,
    address:
      asset.contractAddress || "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    icon: asset.thumbnail,
    chain:
      CHAINS.find((chain: any) => chain.name === asset.blockchain)?.id || "137",
    balance: asset.balanceRawInteger,
    price: asset.tokenPrice,
    priceUpdated: response.syncStatus?.timestamp
      ? new Date(response.syncStatus?.timestamp * 1000).toISOString()
      : undefined,
  }));
};

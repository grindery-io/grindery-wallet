import axios from "axios";

export const searchTokensRequest = async (search?: string) => {
  const searchBy = search && search.startsWith("0x") ? "address" : "symbol";
  return await axios.get(
    `https://api.enso.finance/api/v1/baseTokens?chainId=137&${searchBy}=${
      search || ""
    }`
  );
};

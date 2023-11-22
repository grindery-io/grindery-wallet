import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";
import { searchTokensRequest } from "../../../services/tokens";
import TokensSearchList from "./TokensSearchList";
import TokensSearchPlaceholder from "./TokensSearchPlaceholder";
import { selectAppStore, useAppSelector } from "../../../store";
import { fixTokens } from "../../../utils/fixTokens";
import { TokenType } from "../Token/Token";
import { CHAINS } from "../../../constants";

const TokensSearch = () => {
  const { tokens } = useAppSelector(selectAppStore);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<TokenType[]>([]);
  const [loading, setLoading] = useState(false);
  const data = items.filter(
    (item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    searchTokensRequest("polygon", controller)
      .then((res) => {
        const swapTokens: TokenType[] = (res.data || [])
          .map((token) => ({
            name: token.name,
            symbol: token.symbol,
            address: token.address,
            decimals: token.decimals,
            icon: token.thumbnail || "",
            chain:
              CHAINS.find((chain) => chain.name === token.blockchain)?.id ||
              "137",
            balance: "0",
            price: "0",
          }))
          .filter(
            (token) =>
              !tokens
                .map((t) => t.address.toLowerCase())
                .includes(token.address.toLowerCase())
          );
        setItems(swapTokens.map(fixTokens));
        setLoading(false);
      })
      .catch((error) => {
        console.error("searchTokensRequest error", error);
        setItems([]);
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [tokens]);

  return (
    <Box sx={TokensSearchStyles}>
      <SearchBox
        placeholder="Search tokens"
        value={search}
        onChange={(e: string) => {
          setSearch(e);
        }}
      />

      {data && data.length > 0 ? (
        <TokensSearchList items={data} loading={loading} />
      ) : (
        <TokensSearchPlaceholder loading={loading} />
      )}
    </Box>
  );
};

const TokensSearchStyles = {
  width: "100%",
  padding: "0",
  boxSizing: "border-box",
};

export default TokensSearch;

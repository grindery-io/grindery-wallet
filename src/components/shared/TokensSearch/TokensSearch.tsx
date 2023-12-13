import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";
import { searchTokensRequest } from "../../../services/tokens";
import TokensSearchList from "./TokensSearchList";
import TokensSearchPlaceholder from "./TokensSearchPlaceholder";
import { selectAppStore, useAppSelector } from "../../../store";
import { fixTokens } from "../../../utils/fixTokens";
import { TokenType } from "../Token/Token";
import { CHAINS } from "../../../constants";
import TokensSearchChainSelector from "./TokensSearchChainSelector";

const TokensSearch = () => {
  const {
    user,
    tokens,
    debug: { enabled, features },
  } = useAppSelector(selectAppStore);
  const [search, setSearch] = useState("");
  const [chain, setChain] = useState("137");
  const [items, setItems] = useState<TokenType[]>([]);
  const [loading, setLoading] = useState(false);
  const data = items.filter(
    (item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase())
  );
  const selectedChain = CHAINS.find((c) => c.id === chain) || CHAINS[0];

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    searchTokensRequest(selectedChain.name, controller)
      .then((res) => {
        const ankrTokens: TokenType[] = (res.data || [])
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
        setItems(ankrTokens.map(fixTokens));
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
  }, [tokens, selectedChain]);

  return (
    <Box sx={TokensSearchStyles}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {((enabled && features?.MULTICHAIN) || user?.optin_bridge) && (
          <TokensSearchChainSelector
            sx={{
              padding: "16px 0px 6px 16px",
            }}
            selectedChain={selectedChain}
            onChange={(c) => {
              setChain(c.id);
            }}
          />
        )}
        <SearchBox
          sx={
            (enabled && features?.MULTICHAIN) || user?.optin_bridge
              ? {
                  paddingLeft: "4px",
                }
              : undefined
          }
          placeholder="Search tokens"
          value={search}
          onChange={(e: string) => {
            setSearch(e);
          }}
        />
      </Stack>

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

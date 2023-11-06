import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";
import { Token } from "../../../types/State";
import { searchTokensRequest } from "../../../services/tokens";
import TokensSearchList from "./TokensSearchList";
import TokensSearchPlaceholder from "./TokensSearchPlaceholder";
import { selectAppStore, useAppSelector } from "../../../store";

const TokensSearch = () => {
  const {
    tokens: { items: stateItems },
  } = useAppSelector(selectAppStore);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Token[]>([]);
  const data = items.filter(
    (item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase())
  );
  const [loading, setLoading] = useState(false);

  const getTokens = useCallback(async () => {
    setLoading(true);
    try {
      const res = await searchTokensRequest();
      setItems(
        (res.data || []).filter(
          (item: Token) =>
            !stateItems.find(
              (stateItem: Token) =>
                stateItem.id.toLowerCase() === item.id.toLowerCase()
            )
        )
      );
    } catch (error) {
      console.error("getTokens error", error);
      setItems([]);
    }
    setLoading(false);
  }, [stateItems]);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

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

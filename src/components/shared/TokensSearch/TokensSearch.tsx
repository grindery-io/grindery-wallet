import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { debounce } from "lodash";
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
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Token[]>();
  /*
  DEFAULT_TOKENS_RESULTS.filter(
      (item: Token) =>
        !stateItems.find(
          (stateItem: Token) =>
            stateItem.id.toLowerCase() === item.id.toLowerCase()
        )
    )
    */
  const [loading, setLoading] = useState(false);

  const searchTokens = useCallback(async () => {
    setLoading(true);
    try {
      const res = await searchTokensRequest(search);
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
      console.error("getTgActivity error", error);
      setItems([]);
    }
    setLoading(false);
  }, [search, stateItems]);

  const request = debounce((value) => {
    setSearch(value);
  }, 1200);

  const debouncedSearchChange = useCallback(
    (value: string) => request(value),
    [request]
  );

  useEffect(() => {
    searchTokens();
  }, [searchTokens]);
  console.log("stateItems", stateItems);

  return (
    <Box sx={TokensSearchStyles}>
      <SearchBox
        placeholder="Search tokens"
        value={searchInput}
        onChange={(e: string) => {
          debouncedSearchChange(e);
          setSearchInput(e);
        }}
      />

      {items && items.length > 0 ? (
        <TokensSearchList items={items} loading={loading} />
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

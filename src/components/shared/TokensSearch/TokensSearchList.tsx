import React from "react";
import { Box } from "@mui/material";
import { Token } from "../../../types/State";
import TokensSearchListItem from "./TokensSearchListItem";
import Loading from "../Loading";

const TokensSearchList = ({
  loading,
  items,
}: {
  loading: boolean;
  items: Token[];
}) => {
  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ padding: "0 0 10px" }}>
          {items.slice(0, 20).map((item: Token) => (
            <TokensSearchListItem key={item.id} token={item} />
          ))}
        </Box>
      )}
    </Box>
  );
};
export default TokensSearchList;

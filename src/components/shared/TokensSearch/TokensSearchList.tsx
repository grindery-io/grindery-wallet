import React from "react";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import Loading from "../Loading/Loading";
import TokensSearchListItem from "./TokensSearchListItem";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { TokenType } from "../Token/Token";

const TokensSearchList = ({
  loading,
  items,
}: {
  loading: boolean;
  items: TokenType[];
}) => {
  const { height } = useWindowDimensions();
  const visibleItems = items.filter((item) => item.symbol);
  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            "& > div": {
              padding: `0 0 10px`,
              boxSizing: "border-box",
              "& > div": {
                padding: "0 0 10px",
                boxSizing: "border-box",
              },
            },
          }}
        >
          <List
            height={height - 63}
            itemCount={visibleItems.length}
            itemSize={64}
            width="100%"
            itemData={visibleItems.sort((a, b) => {
              const nameA = a.symbol.toUpperCase();
              const nameB = b.symbol.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })}
          >
            {(itemProps: { data: any; index: number; style: any }) => (
              <Box
                sx={itemProps.style}
                key={itemProps.data[itemProps.index].id}
              >
                <TokensSearchListItem token={itemProps.data[itemProps.index]} />
              </Box>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
};
export default TokensSearchList;

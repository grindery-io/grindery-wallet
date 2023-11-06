import React from "react";
import { Box } from "@mui/material";
import { Token } from "../../../types/State";
import { FixedSizeList as List } from "react-window";
import Loading from "../Loading";
import TokensSearchListItem from "./TokensSearchListItem";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const TokensSearchList = ({
  loading,
  items,
}: {
  loading: boolean;
  items: Token[];
}) => {
  const { height } = useWindowDimensions();
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
            itemCount={items.length}
            itemSize={64}
            width="100%"
            itemData={items}
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

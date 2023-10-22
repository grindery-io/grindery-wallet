import React from "react";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import CommunityListItem from "../CommunityListItem/CommunityListItem";

const CommunityListItems = ({ data }: { data: any[] }) => {
  const { height } = useWindowDimensions();

  return (
    <Box textAlign="left" sx={CommunityListItemsStyles}>
      <List
        height={height - 120}
        itemCount={data.length}
        itemSize={69}
        width="100%"
        itemData={data}
      >
        {Renderer}
      </List>
    </Box>
  );
};

const CommunityListItemsStyles = {
  "& > div": {
    padding: 0,
    boxSizing: "border-box",
    "& > div": {
      padding: 0,
      boxSizing: "border-box",
      "& > div:last-child .community": {
        marginBottom: 0,
      },
    },
  },
};

const Renderer = ({
  data,
  index,
  style,
}: {
  data: any;
  index: number;
  style: any;
}) => {
  return (
    <Box sx={style} key={data[index].id}>
      <CommunityListItem community={data[index]} />
    </Box>
  );
};

export default CommunityListItems;

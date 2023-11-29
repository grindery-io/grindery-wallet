import React from "react";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import CommunityListItem from "../CommunityListItem/CommunityListItem";
import { selectAppStore, useAppSelector } from "store";

const CommunityListItems = ({ data }: { data: any[] }) => {
  const { height } = useWindowDimensions();
  const { debug } = useAppSelector(selectAppStore);

  const list = debug.enabled
    ? [
        {
          fields: {
            Link: "https://t.me/+XV7_tpdyuN05OTVh",
            Image:
              "https://cdn4.cdn-telegram.org/file/rCDSnDekSLSiKSHc3JvLWJtzaycLqVXA7poXI5rOkuiel4ns3SaecCg27QFZKtvgc1MpGu30MxL_UEZEubJLSiJbaYAVurszE41ot8WJ8Z0PuLDA7RqwJFnrWxsgXXMYDulganIxkU3JORz8Lxe-RKR7MWBkJ9mezn-zBSa5xcYXwxjVe-YuvIa06oqROwCEHVStG7Kkaap7CKHMJToWUF0GLkAKk8s7fa3Ww-ZEjXWtlX8GQEMbwDdZ_hyljbXsvYsTTO-khGckXxdniFQntBU1mYlatmPUjfDpHOCkEtM2REZFKQ1lPzCsxwYmeh1AQKFAdQdhZZuCn2oI7PD7RQ.jpg",
            Status: "Published",
            Type: "Community",
            Title: "Grindery Priority Support Cases",
            Description:
              "In this group we will manage support cases, please create a new topic for new cases.",
          },
        },
        ...data,
      ]
    : data;

  return (
    <Box textAlign="left" sx={CommunityListItemsStyles}>
      <List
        height={height - 120}
        itemCount={list.length}
        itemSize={69}
        width="100%"
        itemData={list}
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

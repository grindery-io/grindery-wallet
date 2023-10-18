import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { Box, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SearchBox, { Filter } from "../shared/SearchBox";
import Community from "../shared/Community";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../store";

const CommunityPage = () => {
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { community } = useAppSelector(selectAppStore);

  const [search, setSearch] = useState("");

  const uniqueCategories = (community?.items || [])
    .map((c: any) => c.fields.Category)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i);

  const applyFilters = (c: any) => {
    let res = false;
    for (let i = 0; i < uniqueCategories.length; i++) {
      if (
        c.fields.Category === uniqueCategories[i] &&
        (community?.filters || []).includes(uniqueCategories[i])
      ) {
        res = true;
      }
    }

    return res;
  };

  const data = (
    (community?.items || []).filter(
      (c: any) =>
        c.fields.Title?.toLowerCase().includes(search.toLowerCase()) ||
        c.fields.Description?.toLowerCase().includes(search.toLowerCase()) ||
        c.fields.Link?.toLowerCase().includes(search.toLowerCase())
    ) || []
  ).filter((c: any) =>
    (community?.filters || []).length > 0 ? applyFilters(c) : true
  );

  const options: Filter[] = uniqueCategories.map((category: any) => ({
    key: category,
    label: category,
    value: (community?.filters || []).includes(category),
    type: "checkbox",
    isActive: (community?.filters || []).includes(category),
    onChange: (value: any) => {
      dispatch(
        appStoreActions.setCommunity({
          filters: value
            ? [...(community?.filters || []), category]
            : (community?.filters || []).filter(
                (filter) => filter !== category
              ),
        })
      );
    },
    count:
      (community?.items || [])?.filter(
        (c: any) => c.fields.Category === category
      ).length || 0,
  }));

  return (
    <>
      <Box sx={{ width: "100%", padding: "0" }}>
        <SearchBox
          placeholder="Community"
          value={search}
          onChange={(e: string) => {
            setSearch(e);
          }}
          filters={options}
        />
        <Box sx={{ textAlign: "left" }}>
          <>
            {data.length > 0 ? (
              <Box
                sx={{
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
                }}
              >
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
            ) : (
              <Typography
                style={{
                  margin: "50px 20px",
                  textAlign: "center",
                }}
                color="hint"
              >
                Nothing found
              </Typography>
            )}
          </>
        </Box>
      </Box>
      <BottomNavigation />
    </>
  );
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
      <Community data={data[index]} />
    </Box>
  );
};

export default CommunityPage;

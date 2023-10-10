import React, { useState } from "react";
import BottomNavigation from "../shared/BottomNavigation";
import { Box, Typography } from "@mui/material";
import Community from "../shared/Community";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useAppContext from "../../hooks/useAppContext";
import SearchBox, { Filter } from "../shared/SearchBox";
import { FixedSizeList as List } from "react-window";

const AppsPage = () => {
  const { height } = useWindowDimensions();
  const {
    state: { config, communityFilters },
    setState,
  } = useAppContext();

  const [search, setSearch] = useState("");

  const uniqueCategories = config
    ?.filter(
      (c: any) => c.fields.Type === "App" && c.fields.Status === "Published"
    )
    .map((c: any) => c.fields.Category)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i);

  const applyFilters = (c: any) => {
    let res = false;
    for (let i = 0; i < uniqueCategories.length; i++) {
      if (
        c.fields.Category === uniqueCategories[i] &&
        communityFilters.includes(uniqueCategories[i])
      ) {
        res = true;
      }
    }

    return res;
  };

  const data = (
    config
      ?.filter(
        (c: any) => c.fields.Type === "App" && c.fields.Status === "Published"
      )
      .filter(
        (c: any) =>
          c.fields.Title?.toLowerCase().includes(search.toLowerCase()) ||
          c.fields.Description?.toLowerCase().includes(search.toLowerCase()) ||
          c.fields.Link?.toLowerCase().includes(search.toLowerCase())
      ) || []
  ).filter((c: any) => (communityFilters.length > 0 ? applyFilters(c) : true));

  const options: Filter[] = uniqueCategories.map((category: any) => ({
    key: category,
    label: category,
    value: communityFilters.includes(category),
    type: "checkbox",
    isActive: communityFilters.includes(category),
    onChange: (value: any) => {
      setState({
        communityFilters: value
          ? [...communityFilters, category]
          : communityFilters.filter((filter) => filter !== category),
      });
    },
    count:
      config?.filter(
        (c: any) =>
          c.fields.Type === "App" &&
          c.fields.Status === "Published" &&
          c.fields.Category === category
      ).length || 0,
  }));

  return (
    <>
      <div style={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
        <SearchBox
          placeholder="Apps"
          value={search}
          onChange={(e: string) => {
            setSearch(e);
          }}
          filters={options}
        />
        <div style={{ textAlign: "left" }}>
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
        </div>
      </div>
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
    <div style={style} key={data[index].id}>
      <Community data={data[index]} />
    </div>
  );
};

export default AppsPage;

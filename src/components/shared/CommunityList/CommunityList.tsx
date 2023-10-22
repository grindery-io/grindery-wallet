import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchBox, { Filter } from "../../shared/SearchBox";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import CommunityListEmpty from "./CommunityListEmpty";
import CommunityListItems from "./CommunityListItems";

const CommunityList = () => {
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
    <Box sx={CommunityListStyles}>
      <SearchBox
        placeholder="Community"
        value={search}
        onChange={(e: string) => {
          setSearch(e);
        }}
        filters={options}
      />
      {data.length > 0 ? (
        <CommunityListItems data={data} />
      ) : (
        <CommunityListEmpty />
      )}
    </Box>
  );
};

const CommunityListStyles = { width: "100%", padding: "0" };

export default CommunityList;

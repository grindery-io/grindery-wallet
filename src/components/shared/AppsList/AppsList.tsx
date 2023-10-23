import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchBox, { Filter } from "../SearchBox/SearchBox";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import AppsListItems from "./AppsListItems";
import AppsListEmpty from "./AppsListEmpty";

const AppsList = () => {
  const dispatch = useAppDispatch();
  const { apps } = useAppSelector(selectAppStore);

  const [search, setSearch] = useState("");

  const uniqueCategories = (apps?.items || [])
    .map((c: any) => c.fields.Category)
    .filter((v: any, i: any, a: any) => a.indexOf(v) === i);

  const applyFilters = (c: any) => {
    let res = false;
    for (let i = 0; i < uniqueCategories.length; i++) {
      if (
        c.fields.Category === uniqueCategories[i] &&
        (apps?.filters || []).includes(uniqueCategories[i])
      ) {
        res = true;
      }
    }

    return res;
  };

  const data = (
    (apps?.items || []).filter(
      (c: any) =>
        c.fields.Title?.toLowerCase().includes(search.toLowerCase()) ||
        c.fields.Description?.toLowerCase().includes(search.toLowerCase()) ||
        c.fields.Link?.toLowerCase().includes(search.toLowerCase())
    ) || []
  ).filter((c: any) =>
    (apps?.filters || []).length > 0 ? applyFilters(c) : true
  );

  const options: Filter[] = uniqueCategories.map((category: any) => ({
    key: category,
    label: category,
    value: (apps?.filters || []).includes(category),
    type: "checkbox",
    isActive: (apps?.filters || []).includes(category),
    onChange: (value: any) => {
      dispatch(
        appStoreActions.setApps({
          filters: value
            ? [...(apps?.filters || []), category]
            : (apps?.filters || []).filter((filter) => filter !== category),
        })
      );
    },
    count:
      (apps?.items || [])?.filter((c: any) => c.fields.Category === category)
        .length || 0,
  }));

  return (
    <Box sx={AppsListStyles}>
      <SearchBox
        placeholder="Apps"
        value={search}
        onChange={(e: string) => {
          setSearch(e);
        }}
        filters={options}
      />
      {data.length > 0 ? <AppsListItems data={data} /> : <AppsListEmpty />}
    </Box>
  );
};

const AppsListStyles = { width: "100%", padding: "0" };

export default AppsList;

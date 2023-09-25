import React, { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TelegramContact from "./TelegramContact";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { ICONS } from "../../constants";

type Props = {
  onContactClick: (contact: any) => void;
};

const TelegramContacts = ({ onContactClick }: Props) => {
  const { height } = useWindowDimensions();
  const {
    state: { contacts, contactsLoading },
  } = useAppContext();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState(0);

  const data = contacts
    ?.filter(
      (contact: any) =>
        !search ||
        (contact.username &&
          contact.username.toLowerCase().includes(search.toLowerCase())) ||
        (contact.firstName &&
          contact.firstName.toLowerCase().includes(search.toLowerCase())) ||
        (contact.lastName &&
          contact.lastName.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((contact) => {
      if (tab === 0) {
        return true;
      }
      if (tab === 1) {
        return contact.isGrinderyUser;
      }
      if (tab === 2) {
        return false;
      }
      if (tab === 3) {
        return !contact.isGrinderyUser;
      }
      return true;
    });

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  const ItemRenderer = ({
    data,
    index,
    style,
  }: {
    data: any;
    index: number;
    style: any;
  }) => {
    return (
      <div style={style}>
        <TelegramContact
          key={data[index].id}
          contact={data[index]}
          onContactClick={onContactClick}
        />
      </div>
    );
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          padding: "16px 16px 0",
          background: "#fff",
          position: "sticky",
          top: "61px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <InputBase
          name="search_contacts"
          placeholder="Contacts"
          startAdornment={
            <span style={{ marginRight: "8px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{ display: "block" }}
              >
                <path
                  d="M17.7009 16.2963L13.2865 11.8765C15.506 8.98766 15.2841 4.81482 12.6206 2.17284C11.1656 0.716049 9.29128 0 7.39233 0C5.49338 0 3.6191 0.716049 2.16406 2.17284C-0.721353 5.06173 -0.721353 9.75309 2.16406 12.642C3.6191 14.0988 5.49338 14.8148 7.39233 14.8148C8.97068 14.8148 10.549 14.321 11.8561 13.3086L16.2952 17.7037C16.4925 17.9012 16.7391 18 17.0104 18C17.257 18 17.5283 17.9012 17.7256 17.7037C18.0955 17.3333 18.0955 16.6914 17.7009 16.2963ZM7.41699 12.8148C5.96196 12.8148 4.63023 12.2469 3.59444 11.2346C1.4982 9.1358 1.4982 5.7037 3.59444 3.58025C4.60556 2.5679 5.96196 2 7.41699 2C8.87203 2 10.2038 2.5679 11.2395 3.58025C12.2753 4.59259 12.8179 5.95062 12.8179 7.40741C12.8179 8.8642 12.2507 10.1975 11.2395 11.2346C10.2284 12.2716 8.84737 12.8148 7.41699 12.8148Z"
                  fill="#9D9D9D"
                />
              </svg>
            </span>
          }
          endAdornment={
            search && search.length > 0 ? (
              <IconButton
                sx={{ padding: "4px" }}
                onClick={() => {
                  setSearch("");
                }}
                aria-label="clear search input"
              >
                <img src={ICONS.CLOSE} alt="" />
              </IconButton>
            ) : undefined
          }
          fullWidth
          sx={{
            padding: "9px 16px",
            borderRadius: "10px",
            background: "var(--grindery-solids-bleach-grey, #F4F5F7)",
            "& .MuiInputBase-input": {
              padding: 0,
              fontSize: "16px",
              fontFamily: "Geologica",
              lineHeight: "1.5",
            },
          }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {contacts && contacts.length > 0 ? (
        <>
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              margin: "20px 16px 0",
              width: "calc(100% - 32px)",
              boxSizing: "border-box",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              "& .MuiTabs-scroller": {
                background: "var(--grindery-cool-grey-cool-grey-00, #F1F2F4)",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                color: "var(--grindery-solids-black, #0B0D17)",
                fontSize: "14px",
                fontFamily: "Geologica",
                minWidth: "70px",
                "&.Mui-selected": {
                  color: "var(--grindery-solids-action-alert, #8C30F5)",
                },
              },
            }}
          >
            <Tab
              label="All"
              sx={{ textTransform: "initial", fontWeight: "normal" }}
            />
            <Tab
              label="Network"
              sx={{ textTransform: "initial", fontWeight: "normal" }}
            />
            <Tab
              label="Invited"
              sx={{ textTransform: "initial", fontWeight: "normal" }}
            />
            <Tab
              label="Others"
              sx={{ textTransform: "initial", fontWeight: "normal" }}
            />
          </Tabs>
          {tab === 2 ? (
            <div style={{ textAlign: "center", margin: "50px" }}>
              <Typography color="GrayText">Coming soon</Typography>
            </div>
          ) : (
            <Box
              sx={{
                "& > div": {
                  padding: "0 0 10px",
                  boxSizing: "border-box",
                  "& > div": {
                    padding: "0 0 10px",
                    boxSizing: "border-box",
                  },
                },
              }}
            >
              <List
                height={height - 238}
                itemCount={data?.length}
                itemSize={68}
                width="100%"
                itemData={data}
              >
                {ItemRenderer}
              </List>
            </Box>
          )}
        </>
      ) : contactsLoading ? (
        <div style={{ margin: "50px", textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <p style={{ margin: "20px" }}>Your contacts list is empty.</p>
      )}
    </div>
  );
};

export default TelegramContacts;

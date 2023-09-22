import React, { useCallback, useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import {
  CircularProgress,
  InputBase,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TelegramContact from "./TelegramContact";
import axios from "axios";
import { BOT_API_URL } from "../../constants";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";

type Props = {
  onContactClick: (contact: any) => void;
};

const TelegramContacts = ({ onContactClick }: Props) => {
  const { height } = useWindowDimensions();
  const {
    state: { contacts, contactsLoading },
    setState,
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

  const getTgContacts = useCallback(async () => {
    if (!window.Telegram?.WebApp?.initData) {
      return;
    }
    setState({
      contactsLoading: true,
    });
    try {
      const res = await axios.get(`${BOT_API_URL}/v1/telegram/contacts`, {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      });
      setState({
        contacts: res.data || [],
      });
    } catch (error) {
      console.log("getTgContacts error", error);
    }
    setState({
      contactsLoading: false,
    });
  }, [setState]);

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
          contact={data[index]}
          onContactClick={onContactClick}
        />
      </div>
    );
  };

  useEffect(() => {
    getTgContacts();
  }, [getTgContacts]);

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          padding: "16px 0 10px",
          background: "#fff",
          position: "sticky",
          top: "61px",
          width: "100%",
        }}
      >
        <InputBase
          name="search_contacts"
          placeholder="Contacts"
          startAdornment={<span style={{ marginRight: "8px" }}>🔍</span>}
          fullWidth
          sx={{
            padding: "9px 16px",
            borderRadius: "10px",
            background: "#F4F5F7",
            "& .MuiInputBase-input": {
              padding: 0,
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
            sx={{ background: "#FDFBFF", marginBottom: "10px" }}
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
            <List
              height={height - 242}
              itemCount={data?.length}
              itemSize={68}
              width="100%"
              itemData={data}
            >
              {ItemRenderer}
            </List>
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

import React from "react";
import styled from "styled-components";
import { getSecondaryUserDisplayName } from "../../utils/getSecondaryUserDisplayName";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TelegramUserContact } from "../../types/Telegram";

const Wrapper = styled.div`
  border-radius: 10px;
  border: 1px solid var(--grindery-solids-light-grey, #d3deec);
  background: var(--grindery-solids-white, #fff);
  display: flex;
  width: 100%;
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
`;

const SelectedContact = ({
  contact,
  onClear,
}: {
  contact: TelegramUserContact;
  onClear: () => void;
}) => {
  return (
    <Wrapper>
      <div>
        <p style={{ fontSize: "14px", margin: 0, lineHeight: 1.5 }}>
          Recipient
        </p>
        <p
          style={{ fontSize: "14px", margin: 0, lineHeight: 1.5, opacity: 0.6 }}
        >
          {getSecondaryUserDisplayName(contact)} | @{contact.username}
        </p>
      </div>
      <IconButton onClick={onClear} sx={{ marginLeft: "auto" }}>
        <CloseIcon style={{ color: "#000" }} />
      </IconButton>
    </Wrapper>
  );
};

export default SelectedContact;

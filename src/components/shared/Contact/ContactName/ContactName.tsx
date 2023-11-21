import React from "react";
import { Box, SxProps } from "@mui/material";
import {
  ContactFirstNameType,
  ContactIdType,
  ContactLastNameType,
  ContactUsernameType,
  useContact,
} from "../Contact";

export type ContactNameFormat = "default" | "first" | "last" | "username";

export type ContactNameProps = {
  format?: ContactNameFormat;
  sx?: SxProps | React.CSSProperties;
};

export const formatContactName = (
  names: {
    firstName: ContactFirstNameType;
    lastName: ContactLastNameType;
    username: ContactUsernameType;
    id: ContactIdType;
  },
  format: ContactNameFormat
) => {
  switch (format) {
    case "default":
      return `${names.firstName || ""}${
        names.lastName ? " " + names.lastName : ""
      }`;
    case "first":
      return names.firstName || "";
    case "last":
      return names.lastName || "";
    case "username":
      return names.username || names.firstName || names.lastName || names.id;
    default:
      return `${names.firstName} ${names.lastName}`;
  }
};

const ContactName = ({ format = "default", sx }: ContactNameProps) => {
  const { firstName, lastName, username, id } = useContact();

  const name = formatContactName({ firstName, lastName, username, id }, format);

  return name ? (
    <Box sx={sx} component="span">
      {name.replace("undefined", "")}
    </Box>
  ) : null;
};

export default ContactName;

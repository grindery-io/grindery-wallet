import React from "react";
import { Box, SxProps } from "@mui/material";
import {
  ContactFirstNameType,
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
  },
  format: ContactNameFormat
) => {
  switch (format) {
    case "default":
      return `${names.firstName} ${names.lastName}`;
    case "first":
      return names.firstName;
    case "last":
      return names.lastName;
    case "username":
      return names.username;
    default:
      return `${names.firstName} ${names.lastName}`;
  }
};

const ContactName = ({ format = "default", sx }: ContactNameProps) => {
  const { firstName, lastName, username } = useContact();

  const name = formatContactName({ firstName, lastName, username }, format);

  return name ? (
    <Box sx={sx} component="span">
      {name}
    </Box>
  ) : null;
};

export default ContactName;

import React from "react";
import DebugMenuListItem from "./DebugMenuListItem";
import UserAddress from "../UserAddress";

const DebugMenuListItemUserAddress = () => {
  return (
    <DebugMenuListItem
      label="Wallet address"
      value={<UserAddress border={false} avatar={false} />}
    />
  );
};

export default DebugMenuListItemUserAddress;

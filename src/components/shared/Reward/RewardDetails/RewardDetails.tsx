import React from "react";
import { Stack } from "@mui/material";
import { RewardProps } from "../Reward";
import RewardDetailsType from "./RewardDetailsType";
import RewardDetailsAmount from "./RewardDetailsAmount";
import RewardDetailsInvited from "./RewardDetailsInvited";
import RewardDetailsDate from "./RewardDetailsDate";
import RewardDetailsStatus from "./RewardDetailsStatus";
import RewardDetailsHash from "./RewardDetailsHash";

const RewardDetails = (props: RewardProps) => {
  return (
    <Stack
      alignItems="stretch"
      justifyContent="flex-start"
      sx={RewardDetailsStyles}
    >
      <RewardDetailsType {...props} />
      <RewardDetailsAmount {...props} />
      <RewardDetailsInvited {...props} />
      <RewardDetailsDate {...props} />
      <RewardDetailsStatus {...props} />
      <RewardDetailsHash {...props} />
    </Stack>
  );
};

const RewardDetailsStyles = {
  borderRadius: "5px",
  border: "1px solid var(--gr-theme-divider-color)",
  width: "100%",
};

export default RewardDetails;

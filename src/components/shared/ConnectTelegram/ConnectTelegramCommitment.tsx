import React from "react";
import BulletPoints from "../BulletPoints";
import { Box, Tooltip, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const ConnectTelegramCommitment = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: "328px",
          margin: "0 auto",
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Tooltip
          componentsProps={{
            popper: {
              sx: {
                "& .MuiTooltip-tooltip": {
                  maxWidth: "360px",
                  padding: "16px",
                  boxSizing: "border-box",
                  borderRadius: "8px",
                  backgroundColor: "var(--tg-theme-text-color, #000000)",
                  "& *": {
                    color: "var(--tg-theme-bg-color, #ffffff)",
                  },
                },
              },
            },
          }}
          title={
            <Box>
              <Typography sx={{ marginBottom: "16px" }}>
                Our Commitment to Data Security:
              </Typography>
              <BulletPoints
                items={[
                  "Secure Transmission: All your data is securely transmitted and encrypted.",
                  "Explicit Consent: We only collect and store data with your explicit consent.",
                  "No Unsolicited Messaging: We won’t message anyone unless you agree to it first.",
                ]}
              />
            </Box>
          }
        >
          <Typography
            variant="xs"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              cursor: "help",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "8px",
              margin: "0 auto",
              lineHeight: 1.25,
              textDecorationLine: "underline",
            }}
          >
            <LockIcon sx={{ fontSize: "16px" }} />{" "}
            <span>Our Commitment to Data Security</span>
          </Typography>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          marginTop: "8px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: "8px",
          }}
        >
          Our Commitment to Data Security
        </Typography>
        <BulletPoints
          items={[
            "Secure Transmission: All your data is securely transmitted and encrypted.",
            "Explicit Consent: We only collect and store data with your explicit consent.",
            "No Unsolicited Messaging: We won’t message anyone unless you agree to it first.",
          ]}
        />
      </Box>
    </>
  );
};

export default ConnectTelegramCommitment;

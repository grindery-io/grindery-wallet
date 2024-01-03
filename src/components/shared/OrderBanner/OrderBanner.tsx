import React from "react";
import { ButtonBase, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { selectAppStore, useAppSelector } from "store";

const OrderBanner = () => {
  const navigate = useNavigate();
  const {
    order: { details },
  } = useAppSelector(selectAppStore);

  const handleClick = () => {
    if (details) {
      navigate(`/order/${details.orderId}`);
    } else {
      navigate("/order");
    }
  };

  return typeof details !== "undefined" ? (
    <ButtonBase
      onClick={handleClick}
      sx={{ backgroundColor: "var(--gr-theme-color-secondary, #ea5230)" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="nowrap"
        spacing="23px"
        sx={{
          height: "106px",
          maxHeight: "106px",
          width: "100vw",
          padding: "0 20px 0 24px",
          "& img": {
            width: "auto",
            height: "106px",
          },
        }}
      >
        <Typography
          variant="title"
          textAlign="left"
          sx={{
            color: "var(--gr-theme-color-secondary-text, #ffffff)",
            lineHeight: 1.1,
          }}
        >
          Pre-order
          <br />
          GX Now!
        </Typography>
        <img src="/images/preorder-banner.png" alt="" />
      </Stack>
    </ButtonBase>
  ) : null;
};

export default OrderBanner;

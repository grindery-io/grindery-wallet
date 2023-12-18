import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import GXIcon from "components/icons/GXIcon";
import React, { useState } from "react";
import { useNavigate } from "react-router";

type PreOrderBannerProps = {};

const PreOrderBanner = (props: PreOrderBannerProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    navigate("/pre-order");
  };

  return (
    <Box
      sx={{
        position: "relative",
        transform: open ? "translateX(0)" : "translateX(100%)",
        height: open ? "106px" : "0px",
        maxHeight: "106px",
        transition: "all 0.25s ease-in-out",
      }}
    >
      <IconButton
        onClick={handleOpen}
        sx={{
          position: "absolute",
          left: "-58px",
          top: 0,
          width: "58px",
          height: "42px",
          backgroundColor: "var(--gr-theme-color-secondary, #ea5230)",
          padding: "10px 26px 10px 10px",
          borderTopLeftRadius: "21px",
          borderBottomLeftRadius: "21px",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          opacity: open ? 0 : 1,
          transition: "opacity 0.25s ease-in-out",
          "&:hover": {
            backgroundColor: "var(--gr-theme-color-secondary, #ea5230)",
          },
        }}
      >
        <GXIcon />
      </IconButton>
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
    </Box>
  );
};

export default PreOrderBanner;

import React, { useEffect } from "react";
import useBackButton from "hooks/useBackButton";
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const PreOrderIntroPage = () => {
  useBackButton();
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/pre-order/form");
  };

  useEffect(() => {
    setTimeout(() => {
      alert(
        `GX pre-order is in the sandbox mode.\n\nNo real order will be placed, all numbers and prices are fake.`
      );
    }, 500);
  }, []);

  return (
    <>
      <Typography
        variant="title"
        textAlign="center"
        sx={{ padding: "20px 16px 0", lineHeight: 1.2 }}
      >
        <strong>
          How I convert my
          <br />
          G1 into GX?
        </strong>
      </Typography>
      <ButtonBase
        onClick={() => {
          alert("Video coming soon");
        }}
        sx={{
          position: "relative",
          margin: "0 16px 8px",
          width: "calc(100% - 32px)",
          height: 0,
          paddingBottom: "46.10%",
          borderRadius: "8px",
          overflow: "hidden",
          "& img": {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            objectFit: "cover",
            display: "block",
          },
        }}
      >
        <img src="/images/video-placeholder.png" alt="" />
      </ButtonBase>
      <Box
        sx={{
          padding: "0 16px",
          "& ol": {
            margin: 0,
            padding: "0 0 0 20px",
            color: "var(--tg-theme-hint-color, #999999)",
            fontSize: "14px",
            "& li": {
              fontSize: "inherit",
              lineHeight: 1.25,
              padding: "0 0 2px 0",
              "& p": {
                lineHeight: "inherit",
              },
            },
          },
        }}
      >
        <Typography variant="xl" textAlign="center" mb="12px">
          <strong>Things to know 🤓</strong>
        </Typography>
        <ol>
          <li>
            <Typography color="hint" variant="sm">
              Your exchange rate is influenced by your MVU score.
            </Typography>
          </li>
          <li>
            <Typography color="hint" variant="sm">
              Your early discount will start decreasing every 10min. The early
              you convert, the better rate.
            </Typography>
          </li>
          <li>
            <Typography color="hint" variant="sm">
              There is just one pre-order opportunity per user.
            </Typography>
          </li>
        </ol>
      </Box>
      <Box sx={{ width: "100%", marginTop: "auto", padding: "0 16px 20px" }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleNextClick}
          size="large"
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default PreOrderIntroPage;

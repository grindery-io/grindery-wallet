import { Box, styled } from "@mui/material";
import { MAX_WIDTH } from "../../constants";

const Container = styled(Box)({
  width: "100%",
  maxWidth: MAX_WIDTH,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  gap: "16px",
  height: "100%",
  padding: "0px",
  minHeight: "100vh",
  boxSizing: "border-box",
  position: "relative",
  background: "var(--tg-theme-bg-color, #ffffff)",
});

export default Container;

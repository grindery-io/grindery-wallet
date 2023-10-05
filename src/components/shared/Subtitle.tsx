import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Subtitle = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: 300,
  textAlign: "center",
  margin: "0 0 16px",
  color: "var(--tg-theme-text-color, #000000)",
}));

export default Subtitle;

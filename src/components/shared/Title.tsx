import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Title = styled(Typography)(() => ({
  fontSize: "24px !important",
  fontWeight: 700,
  lineHeight: "145%",
  textAlign: "center",
  margin: "0 0 24px",
  color: "var(--tg-theme-text-color, #000000)",
}));

export default Title;

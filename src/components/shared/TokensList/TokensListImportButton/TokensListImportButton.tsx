import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const TokensListImportButton = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ margin: "8px 0 16px", textAlign: "center" }}
      data-testid="tokens-list-import-button"
    >
      <Button
        size="small"
        variant="text"
        color="primary"
        startIcon={
          <AddIcon sx={{ color: "var(--tg-theme-button-color, #2481cc)" }} />
        }
        onClick={() => {
          navigate("/tokens/import");
        }}
      >
        Import tokens
      </Button>
    </Box>
  );
};

export default TokensListImportButton;

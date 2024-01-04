import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import GXIcon from "components/icons/GXIcon";
import OrderAmount from "components/shared/Order/OrderAmount/OrderAmount";
import OrderPrice from "components/shared/Order/OrderPrice/OrderPrice";

export type OrderDetailsGxAmountProps = {
  title?: string;
  icon?: React.ReactNode;
  showGxIcon?: boolean;
};

const OrderDetailsGxAmount = ({
  title,
  icon,
  showGxIcon,
}: OrderDetailsGxAmountProps) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing="8px"
      sx={{
        padding: "24px 16px",
        borderBottom: "1px solid var(--gr-theme-divider-color)",
      }}
      useFlexGap
    >
      {Boolean(icon) && <>{icon}</>}

      {Boolean(title) && (
        <Typography variant="xl">
          <strong>{title}</strong>
        </Typography>
      )}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="nowrap"
          spacing="4px"
          useFlexGap
          mt="4px"
          mb="4px"
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <Typography
            variant="title"
            sx={{
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>
              <OrderAmount format="gx" />
            </strong>
          </Typography>
          {showGxIcon ? (
            <>
              <GXIcon sx={{ width: "20px", height: "20px" }} />
              <Typography
                sx={{
                  width: "24px",
                  minWidth: "24px",
                  maxWidth: "24px",
                }}
              >
                <strong>GX</strong>
              </Typography>
            </>
          ) : (
            <Typography
              variant="title"
              sx={{
                width: "35px",
                minWidth: "35px",
                maxWidth: "35px",
              }}
            >
              <strong>GX</strong>
            </Typography>
          )}
        </Stack>

        <Typography textAlign="center" color="hint" variant="xs" mb="8px">
          Value $<OrderPrice format="total" /> USD or <OrderPrice format="gx" />{" "}
          USD/GX
        </Typography>
      </Box>
    </Stack>
  );
};

export default OrderDetailsGxAmount;

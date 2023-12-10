import React, { useEffect, useState } from "react";
import useBackButton from "hooks/useBackButton";
import { Box, Stack, Typography } from "@mui/material";
import BottomNavigation from "components/shared/BottomNavigation/BottomNavigation";
import { selectAppStore, useAppSelector } from "store";
import UserAddress from "components/shared/UserAddress";
import { getStakedAmountRequest } from "services/staking";
import { STORAGE_KEYS } from "../../constants";
import RefreshIcon from "components/icons/RefreshIcon";

const StakingPage = () => {
  useBackButton();
  const { user } = useAppSelector(selectAppStore);
  const [value, setValue] = useState(
    localStorage.getItem(STORAGE_KEYS.STAKING) || "0.00"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    if (user?.patchwallet) {
      setLoading(true);
      getStakedAmountRequest(controller)
        .then((res) => {
          setValue(res?.data?.amount || "0.00");
          localStorage.setItem(
            STORAGE_KEYS.STAKING,
            res?.data?.amount || "0.00"
          );
        })
        .catch((error) => {
          //
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [user?.patchwallet]);

  return (
    <>
      <Box
        sx={{
          margin: "16px 16px 0",
          "& img": {
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "16px",
          },
        }}
      >
        <img
          src="https://blog.grindery.io/hubfs/your-grinderyai-network-staking-release-b@2x-1.png"
          alt=""
        />
      </Box>
      <Stack
        sx={{ marginTop: "8px" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="8px"
      >
        <Typography
          variant="lg"
          sx={{
            margin: "0",
            textAlign: "center",
            lineHeight: "32px",
          }}
        >
          Staked {value} USD
        </Typography>
        {loading && (
          <Box
            component="span"
            sx={{
              padding: 0,
              color: "var(--tg-theme-hint-color, #999999)",
              "& svg": {
                WebkitAnimation: "spin 0.75s linear infinite",
                MozAnimation: "spin 0.75s linear infinite",
                animation: "spin 0.75s linear infinite",
                display: "block",
                animationPlayState: loading ? "running" : "paused",
              },
            }}
          >
            <RefreshIcon
              sx={{
                color: "var(--tg-theme-hint-color, #999999)",
              }}
            />
          </Box>
        )}
      </Stack>
      <Box
        sx={{
          margin: "0 20px",
          textAlign: "center",
        }}
      >
        <Typography variant="md" sx={{ lineHeight: 1.5, marginBottom: "8px" }}>
          🚀 To increase your stake send any token on Polygon from any external
          wallet to your Grindery Wallet Address
        </Typography>
        <UserAddress border={false} avatar={false} />
      </Box>
      <Box
        sx={{
          margin: "auto 20px 0",
          textAlign: "center",
          "& a": {
            color: "var(--tg-theme-link-color, #2481cc)",
          },
          "& a:hover": {
            color: "var(--tg-theme-link-color, #2481cc)",
          },
        }}
      >
        <Typography variant="sm">
          Learn more about the{" "}
          <a
            href="https://blog.grindery.io/updates/live-now-network-staking-on-polygon"
            target="_blank"
            rel="noreferrer"
          >
            Network Staking
          </a>{" "}
          Program as well as upcoming{" "}
          <a
            href="https://docs.grindery.io/roadmap/progressive-withdrawal-features"
            target="_blank"
            rel="noreferrer"
          >
            withdrawal
          </a>{" "}
          features.
        </Typography>
      </Box>
      <Box sx={{ height: "20px" }} />
      <BottomNavigation />
    </>
  );
};

export default StakingPage;

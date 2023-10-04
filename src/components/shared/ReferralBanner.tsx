import React from "react";
import Banner from "./Banner";
import useAppContext from "../../hooks/useAppContext";
import { BOT_URL } from "../../constants";

const ReferralBanner = () => {
  const {
    state: { user, bannerShown },
    setState,
  } = useAppContext();
  return (
    <Banner
      visible={Boolean(user?.userTelegramID) && bannerShown}
      onClose={() => {
        setState({
          bannerShown: false,
        });
        localStorage.setItem("gr_wallet_banner_referral_closed", "true");
      }}
    >
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
        onClick={() => {
          navigator.clipboard.writeText(
            `${BOT_URL}?start=${user?.userTelegramID}`
          );
          setTimeout(() => {
            if (window.Telegram?.WebApp?.showAlert) {
              window.Telegram?.WebApp?.showAlert("Referral link copied");
            } else {
              window.alert("Referral link copied");
            }
          }, 500);
        }}
      >
        <strong>New referral system</strong>

        <span style={{ color: "var(--flow-blue-primary-blue-20, #99BCFF)" }}>
          Get your referral link now!
        </span>
      </div>
    </Banner>
  );
};

export default ReferralBanner;

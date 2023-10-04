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
      <span>
        New referral system. Get your{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
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
          referral link
        </span>{" "}
        now!
      </span>
    </Banner>
  );
};

export default ReferralBanner;

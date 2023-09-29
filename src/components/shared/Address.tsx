import React from "react";
import useAppContext from "../../hooks/useAppContext";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {};

const Address = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();
  const address = user?.patchwallet;

  return address ? (
    <div style={{ textAlign: "center" }}>
      <span>
        <button
          onClick={() => {
            if (window.Telegram?.WebApp?.openLink) {
              window.Telegram.WebApp.openLink(
                `https://polygonscan.com/token/0xe36bd65609c08cd17b53520293523cf4560533d0?a=${address}`
              );
            } else {
              window.open(
                `https://polygonscan.com/token/0xe36bd65609c08cd17b53520293523cf4560533d0?a=${address}`,
                "_blank"
              );
            }
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            margin: "0 auto",
            border: 0,
            borderRadius: "34px",
            padding: "4px 10px 4px 5px",
            gap: "10px",
            background: "var(--tg-theme-bg-color)",
          }}
        >
          <Jazzicon diameter={18} seed={jsNumberForAddress(address)} />
          <span
            style={{
              color: "var(--tg-theme-text-color)",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "150%",
              fontFamily: "Geologica",
            }}
          >
            {address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4)}
          </span>
          <span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4009 1C15.4009 0.447715 15.8486 0 16.4009 0H23.0009C23.5532 0 24.0009 0.447715 24.0009 1V7.6C24.0009 8.15228 23.5532 8.6 23.0009 8.6C22.4486 8.6 22.0009 8.15228 22.0009 7.6V2H16.4009C15.8486 2 15.4009 1.55228 15.4009 1Z"
                fill="var(--tg-theme-button-color)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.708 0.292893C24.0985 0.683417 24.0985 1.31658 23.708 1.70711L9.04134 16.3738C8.65081 16.7643 8.01765 16.7643 7.62712 16.3738C7.2366 15.9832 7.2366 15.3501 7.62712 14.9596L22.2938 0.292893C22.6843 -0.0976311 23.3175 -0.0976311 23.708 0.292893Z"
                fill="var(--tg-theme-button-color)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.000976562 6.86663C0.000976562 5.50433 1.10534 4.39996 2.46764 4.39996H11.2676C11.8199 4.39996 12.2676 4.84768 12.2676 5.39996C12.2676 5.95225 11.8199 6.39996 11.2676 6.39996H2.46764C2.20991 6.39996 2.00098 6.6089 2.00098 6.86663V21.5333C2.00098 21.791 2.20991 22 2.46764 22H17.1343C17.392 22 17.601 21.791 17.601 21.5333V12.7333C17.601 12.181 18.0487 11.7333 18.601 11.7333C19.1533 11.7333 19.601 12.181 19.601 12.7333V21.5333C19.601 22.8956 18.4966 24 17.1343 24H2.46764C1.10534 24 0.000976562 22.8956 0.000976562 21.5333V6.86663Z"
                fill="var(--tg-theme-button-color)"
              />
            </svg>
          </span>
        </button>
      </span>
    </div>
  ) : null;
};

export default Address;

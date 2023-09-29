import React, { useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import { IconButton } from "@mui/material";
import { default as CustomButton } from "../shared/Button";
import { useNavigate, useParams } from "react-router";
import AppHeader from "../shared/AppHeader";
import Contacts from "../shared/Contacts";
import SelectedContact from "../shared/SelectedContact";
import SelectToken from "../shared/SelectToken";
import useAppContext from "../../hooks/useAppContext";
import SendButtonsGroup from "../shared/SendButtonsGroup";
import SendAmount from "../shared/SendAmount";
import { TelegramUserContact } from "../../types/Telegram";

const SendPage = () => {
  const {
    state: { contacts, user },
  } = useAppContext();
  const [connecting, setConnecting] = useState(false);

  const { id: recipient } = useParams();
  let navigate = useNavigate();
  useBackButton({ path: "/" });
  const [input, setInput] = useState<{
    amount: string;
    recipient: TelegramUserContact | null;
  }>({
    amount: "",
    recipient: recipient
      ? contacts?.find((contact) => contact.id === recipient) || null
      : null,
  });

  return (
    <>
      <AppHeader />

      <div
        style={{
          width: "100%",
          paddingTop: "16px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: "0px",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "0 16px",
            boxSizing: "border-box",
          }}
        >
          <p style={{ margin: 0, textAlign: "center" }}>
            {user?.telegramSession
              ? `Send${!input.recipient ? " to" : ""}`
              : ""}
          </p>
          <IconButton
            sx={{
              position: "absolute",
              right: "16px",
              top: "-1px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1 11L11 1"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1L11 11"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
        </div>
        {!input.recipient ? (
          <Contacts
            onContactClick={(contact) => {
              navigate(`/send/${contact.id}`);
              setInput({
                ...input,
                recipient: contact,
              });
            }}
            placeholder={
              <div style={{ padding: "12px 16px" }}>
                <div style={{ margin: "32px auto 24px" }}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="24" fill="#2AABEE" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.6004 24.0001C21.3342 24.0001 23.5504 21.7839 23.5504 19.0501C23.5504 16.3163 21.3342 14.1001 18.6004 14.1001C15.8666 14.1001 13.6504 16.3163 13.6504 19.0501C13.6504 21.7839 15.8666 24.0001 18.6004 24.0001Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 33.9003C10.5 29.4268 14.1265 25.8003 18.6 25.8003C23.0735 25.8003 26.7 29.4268 26.7 33.9003"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.8723 25.8002C33.109 25.8002 34.9223 23.9869 34.9223 21.7502C34.9223 19.5134 33.109 17.7002 30.8723 17.7002C28.6355 17.7002 26.8223 19.5134 26.8223 21.7502C26.8223 23.9869 28.6355 25.8002 30.8723 25.8002Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.5752 27.6816C30.6091 26.932 32.8809 27.2238 34.6594 28.463C36.4379 29.7022 37.4984 31.7324 37.4996 33.9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    lineHeight: "1.45",
                    margin: "0 0 24px",
                  }}
                >
                  To select a recipient your wallet needs access to your
                  contacts.
                </p>

                <CustomButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  fullWidth
                  sx={{
                    padding: "10px 20px !important",
                    fontSize: "14px",
                    width: "100%",
                  }}
                  disabled={connecting}
                  onClick={() => {
                    setConnecting(true);
                    if (window.Telegram?.WebApp?.openLink) {
                      window.Telegram.WebApp.openLink(
                        `https://wallet-staging.grindery.io/connect/telegram?${
                          window.Telegram?.WebApp?.initData || ""
                        }`
                      );
                    } else {
                      window.open(
                        `https://wallet-staging.grindery.io/connect/telegram?${
                          window.Telegram?.WebApp?.initData || ""
                        }`
                      );
                    }
                  }}
                  value="Grant Access"
                />
                <ul
                  style={{
                    margin: "24px 0 0",
                    padding: 0,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                    gap: "12px",
                  }}
                >
                  {[
                    "Forget about wallet addresses of your contacts",
                    "Send tokens before they setup they own wallet",
                    "Earn rewards by identifying contacts to refer",
                    "Explore your crypto network",
                    "and more to come…",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        margin: "0 20px",
                        padding: "4px 0",
                        fontSize: "14px",
                        fontWeight: 300,
                        listStyleType: "none",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        gap: "12px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_1946_7151)">
                          <path
                            d="M9 0C7.21997 0 5.47991 0.527841 3.99987 1.51677C2.51983 2.50571 1.36628 3.91131 0.685088 5.55585C0.00389957 7.20038 -0.17433 9.00998 0.172937 10.7558C0.520204 12.5016 1.37737 14.1053 2.63604 15.364C3.89472 16.6226 5.49836 17.4798 7.24419 17.8271C8.99002 18.1743 10.7996 17.9961 12.4442 17.3149C14.0887 16.6337 15.4943 15.4802 16.4832 14.0001C17.4722 12.5201 18 10.78 18 9C17.9974 6.61384 17.0484 4.32616 15.3611 2.63889C13.6738 0.951621 11.3862 0.00258081 9 0V0ZM9 16.5C7.51664 16.5 6.0666 16.0601 4.83323 15.236C3.59986 14.4119 2.63856 13.2406 2.07091 11.8701C1.50325 10.4997 1.35473 8.99168 1.64411 7.53682C1.9335 6.08197 2.64781 4.74559 3.6967 3.6967C4.7456 2.64781 6.08197 1.9335 7.53683 1.64411C8.99168 1.35472 10.4997 1.50325 11.8701 2.0709C13.2406 2.63856 14.4119 3.59985 15.236 4.83322C16.0601 6.06659 16.5 7.51664 16.5 9C16.4978 10.9885 15.7069 12.8948 14.3009 14.3009C12.8948 15.7069 10.9885 16.4978 9 16.5Z"
                            fill="#0B0C0E"
                          />
                          <path
                            d="M7.43901 11.5676L5.03009 9.15868C4.88944 9.01808 4.69871 8.93909 4.49984 8.93909C4.30097 8.93909 4.11024 9.01808 3.96959 9.15868C3.82899 9.29933 3.75 9.49006 3.75 9.68893C3.75 9.8878 3.82899 10.0785 3.96959 10.2192L6.37851 12.6281C6.51781 12.7675 6.68319 12.878 6.86522 12.9534C7.04725 13.0288 7.24235 13.0677 7.43938 13.0677C7.63642 13.0677 7.83152 13.0288 8.01355 12.9534C8.19558 12.878 8.36096 12.7675 8.50026 12.6281L13.8483 7.28009C13.9889 7.13944 14.0679 6.94871 14.0679 6.74984C14.0679 6.55097 13.9889 6.36024 13.8483 6.21959C13.7076 6.07899 13.5169 6 13.318 6C13.1191 6 12.9284 6.07899 12.7878 6.21959L7.43901 11.5676Z"
                            fill="#0B0C0E"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1946_7151">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "flex-start",
              gap: "20px",
              flexWrap: "nowrap",
              flex: 1,
              marginTop: "16px",
              padding: "0 16px",
            }}
          >
            {input.recipient && (
              <SelectedContact
                contact={input.recipient}
                onClear={() => {
                  setInput({
                    ...input,
                    recipient: null,
                  });
                }}
              />
            )}
            <SelectToken />
            <SendAmount
              amount={input.amount}
              onChange={(value) => {
                setInput({
                  ...input,
                  amount: value,
                });
              }}
            />
            <SendButtonsGroup input={input} />
          </div>
        )}
      </div>
    </>
  );
};

export default SendPage;

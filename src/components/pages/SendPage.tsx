import React, { useState } from "react";
import useBackButton from "../../hooks/useBackButton";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import SelectToken from "../shared/SelectToken";
import SendButtonsGroup from "../shared/SendButtonsGroup";
import SendAmount from "../shared/SendAmount";
import { TelegramUserContact } from "../../types/Telegram";
import GasMessage from "../shared/GasMessage";
import BulletPoints from "../shared/BulletPoints";
import Title from "../shared/Title";
import Subtitle from "../shared/Subtitle";
import SendRecepient from "../shared/SendRecepient";
import ContactsSelectBanner from "../shared/ContactsSelectBanner";
import SendMessage from "../shared/SendMessage";
import { selectAppStore, useAppSelector } from "../../store";
import ContactsList from "../shared/ContactsList/ContactsList";

const SendPage = () => {
  const {
    user,
    debug,
    contacts: { items: contacts },
  } = useAppSelector(selectAppStore);

  const [connecting, setConnecting] = useState(false);
  const [status, setStatus] = useState<string>("waiting_user_input");

  const { id: recipient } = useParams();
  let navigate = useNavigate();
  useBackButton();
  const [input, setInput] = useState<{
    amount: string;
    recipient: TelegramUserContact | TelegramUserContact[] | null;
    message: string;
  }>({
    amount: "",
    recipient: recipient
      ? contacts?.find((contact) => contact.id === recipient) || null
      : null,
    message: "",
  });
  const [selected, setSelected] = useState<TelegramUserContact[]>([]);

  const [banner, setBanner] = useState(true);

  return (
    <>
      <Box
        sx={{
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
        <Box
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
          <Typography sx={{ textAlign: "center" }}>
            {status === "sending"
              ? "Sending"
              : status === "sent"
              ? "Sent"
              : user?.telegramSession
              ? `Send${!input.recipient ? " to" : ""}`
              : ""}
          </Typography>

          {status !== "sending" && (
            <IconButton
              sx={{
                position: "absolute",
                right: "16px",
                top: "-4px",
                color: "var(--tg-theme-text-color, #000000)",
              }}
              onClick={() => {
                navigate(-1);
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
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1L11 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          )}
        </Box>
        {!input.recipient ? (
          <>
            <ContactsList
              onContactClick={(contact) => {
                navigate(`/send/${contact.id}`);
                setInput({
                  ...input,
                  recipient: contact,
                  amount: "",
                });
              }}
              selected={selected}
              onSelect={(contact) => {
                setSelected(
                  selected.map((contact) => contact.id).includes(contact.id)
                    ? selected.filter((c) => c.id !== contact.id)
                    : [...selected, contact]
                );
              }}
              onSelectConfirm={() => {
                setTimeout(() => {
                  setInput({
                    ...input,
                    recipient: selected.length > 1 ? selected : selected[0],
                    amount: "",
                  });
                }, 100);
              }}
              onSelectCancel={() => {
                setTimeout(() => {
                  setSelected([]);
                }, 100);
              }}
              placeholder={
                <Box sx={{ padding: "12px 16px" }}>
                  <Box sx={{ margin: "32px auto 24px" }}>
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
                  </Box>
                  <Title>
                    To select a recipient your wallet needs access to your
                    contacts.
                  </Title>

                  <Button
                    fullWidth
                    disabled={connecting}
                    onClick={() => {
                      setConnecting(true);
                      setTimeout(() => {
                        if (window.Telegram?.WebApp?.openLink) {
                          window.Telegram.WebApp.openLink(
                            `${
                              window.location.protocol +
                              "//" +
                              window.location.host
                            }/connect/telegram?${
                              window.Telegram?.WebApp?.initData || ""
                            }`
                          );
                        } else {
                          window.open(
                            `${
                              window.location.protocol +
                              "//" +
                              window.location.host
                            }/connect/telegram?${
                              window.Telegram?.WebApp?.initData || ""
                            }`
                          );
                        }
                      }, 500);
                    }}
                  >
                    Grant Access
                  </Button>
                  <BulletPoints
                    style={{
                      marginTop: "24px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "inline-flex",
                    }}
                    items={[
                      "Forget about wallet addresses of your contacts",
                      "Send tokens before they setup they own wallet",
                      "Earn rewards by identifying contacts to refer",
                      "Explore your crypto network",
                      "and more to come…",
                    ]}
                  />
                </Box>
              }
            />

            {debug.features?.BATCH_SENDING && (
              <ContactsSelectBanner
                onClose={() => {
                  setBanner(false);
                }}
                visible={banner && selected.length < 1}
              />
            )}
          </>
        ) : (
          <Box
            sx={{
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
            {status === "sent" && (
              <>
                <Box
                  sx={{
                    margin: "32px auto 24px",
                    textAlign: "center",
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="48" height="48" rx="24" fill="#00B674" />
                    <path
                      d="M19.8003 33.4251C19.466 33.4253 19.1349 33.3595 18.826 33.2314C18.5171 33.1034 18.2365 32.9157 18.0003 32.6791L12.5583 27.2391C12.2771 26.9578 12.1191 26.5764 12.1191 26.1786C12.1191 25.7809 12.2771 25.3994 12.5583 25.1181C12.8396 24.8369 13.2211 24.679 13.6188 24.679C14.0166 24.679 14.398 24.8369 14.6793 25.1181L19.8003 30.2391L33.3483 16.6911C33.6296 16.4099 34.0111 16.252 34.4088 16.252C34.8066 16.252 35.188 16.4099 35.4693 16.6911C35.7505 16.9724 35.9085 17.3539 35.9085 17.7516C35.9085 18.1494 35.7505 18.5308 35.4693 18.8121L21.6003 32.6791C21.3641 32.9157 21.0835 33.1034 20.7746 33.2314C20.4658 33.3595 20.1347 33.4253 19.8003 33.4251Z"
                      fill="white"
                    />
                  </svg>
                </Box>
                <Title style={{ marginBottom: 0 }}>Tokens sent</Title>
                <Subtitle>
                  Tokens have been sent, and you will receive a Telegram
                  notification once the transaction is confirmed on the
                  blockchain.
                </Subtitle>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
            {status === "sending" && (
              <>
                <Box
                  sx={{
                    margin: "50px 20px",
                    textAlign: "center",
                  }}
                >
                  <CircularProgress
                    style={{ color: "var(--tg-theme-button-color, #2481cc)" }}
                  />
                </Box>
              </>
            )}
            {status === "error" && (
              <>
                <Box
                  sx={{
                    margin: "50px 20px",
                    textAlign: "center",
                  }}
                >
                  <Title>Server error. Please, try again later.</Title>
                  <Typography
                    color="hint"
                    variant="sm"
                    sx={{ marginBottom: "20px" }}
                  >
                    Wait for at least 10 seconds before making a new attempt.
                  </Typography>
                  <Button
                    onClick={() => {
                      setStatus("waiting_user_input");
                    }}
                  >
                    Try again
                  </Button>
                </Box>
              </>
            )}
            {status === "waiting_user_input" && (
              <>
                {input.recipient && (
                  <SendRecepient
                    recepient={input.recipient}
                    onClear={() => {
                      setInput({
                        ...input,
                        recipient: null,
                        amount: "",
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
                  recepient={input.recipient}
                />
                <SendMessage
                  message={input.message}
                  onChange={(value) => {
                    setInput({
                      ...input,
                      message: value,
                    });
                  }}
                  recepient={input.recipient}
                />
                <GasMessage />
                <SendButtonsGroup
                  input={input}
                  setStatus={setStatus}
                  status={status}
                />
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default SendPage;

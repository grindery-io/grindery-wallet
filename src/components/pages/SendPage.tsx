import React from "react";
import TelegramContextProvider from "../../context/TelegramContext";
import { useNavigate } from "react-router";
import Button from "../shared/Button";
import Contacts from "../shared/Contacts";
import useAppContext from "../../hooks/useAppContext";

type Props = {};

const SendPage = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();
  const navigate = useNavigate();
  const [recepient, setRecepient] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [recepientSelected, setRecepientSelected] = React.useState(false);

  const renderCancelButton = (hidden = false) => (
    <button
      style={{
        opacity: hidden ? 0 : 1,
        visibility: hidden ? "hidden" : "visible",
      }}
      onClick={
        hidden
          ? undefined
          : () => {
              navigate("/");
            }
      }
    >
      Cancel
    </button>
  );

  return !recepientSelected ? (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: "16px",
        }}
      >
        <div style={{ marginRight: "auto" }}>{renderCancelButton(true)}</div>
        <div>Send to</div>
        <div style={{ marginLeft: "auto" }}>{renderCancelButton()}</div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <input
          value={recepient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRecepient(e.target.value);
          }}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "8px 16px",
          }}
          type="text"
          name="walletAddress"
          placeholder="Type recipient wallet address or select a contact below"
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        {!user?.telegramSession ? (
          <>
            <p>
              Connect your Telegram account to grant Grindery access to your
              contacts list.
            </p>
            <Button
              onClick={() => {
                if (window.Telegram?.WebApp?.openLink) {
                  window.Telegram.WebApp.openLink("https://www.grindery.io");
                }
              }}
              value="Connect Telegram"
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  ) : (
    <>
      <input type="number" placeholder="Amount" />
    </>
  );
};

export default SendPage;

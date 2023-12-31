import React, { useRef } from "react";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import SendTokensInputRecipient from "./SendTokensInputRecipient";
import SendTokensInputToken from "./SendTokensInputToken";
import SendTokensInputAmount from "./SendTokensInputAmount";
import SendTokensInputMessage from "./SendTokensInputMessage";
import SendTokensInputGas from "./SendTokensInputGas";
import SendTokensInputButtons from "./SendTokensInputButtons";

const SendTokensInput = () => {
  const sendRef = useRef(null);
  const dispatch = useAppDispatch();
  const { send } = useAppSelector(selectAppStore);
  const { status, input } = send;
  return (
    <>
      <SendTokensInputRecipient
        recipient={input.recipient}
        onClear={() => {
          dispatch(
            appStoreActions.setSend({
              input: {
                ...input,
                recipient: null,
                amount: "",
              },
            })
          );
        }}
      />

      <SendTokensInputToken />
      <SendTokensInputAmount
        sendRef={sendRef}
        onChange={(value) => {
          dispatch(
            appStoreActions.setSend({
              input: { ...input, amount: value },
            })
          );
        }}
      />
      <SendTokensInputMessage
        message={input.message}
        onChange={(value) => {
          dispatch(
            appStoreActions.setSend({
              input: { ...input, message: value },
            })
          );
        }}
        recepient={input.recipient}
      />
      <SendTokensInputGas />
      <SendTokensInputButtons
        sendRef={sendRef}
        input={input}
        setStatus={(status) => {
          dispatch(appStoreActions.setSend({ status }));
        }}
        status={status}
      />
    </>
  );
};

export default SendTokensInput;

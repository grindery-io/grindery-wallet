import React from "react";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import SendRecepient from "../SendRecepient";
import SelectToken from "../SelectToken";
import SendAmount from "../SendAmount";
import SendMessage from "../SendMessage";
import GasMessage from "../GasMessage";
import SendButtonsGroup from "../SendButtonsGroup";

const SendTokensInput = () => {
  const dispatch = useAppDispatch();
  const { send, contacts } = useAppSelector(selectAppStore);
  const { status, input } = send;
  const recipient = Array.isArray(input.recipient)
    ? contacts.items?.filter((c: any) => (input.recipient || []).includes(c.id))
    : contacts.items?.find((c: any) => c.id === input.recipient);
  return (
    <>
      {input.recipient && (
        <SendRecepient
          recepient={recipient}
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
      )}
      <SelectToken />
      <SendAmount
        amount={input.amount}
        onChange={(value) => {
          dispatch(
            appStoreActions.setSend({
              input: { ...input, amount: value },
            })
          );
        }}
        recepient={recipient}
      />
      <SendMessage
        message={input.message}
        onChange={(value) => {
          dispatch(
            appStoreActions.setSend({
              input: { ...input, message: value },
            })
          );
        }}
        recepient={recipient}
      />
      <GasMessage />
      <SendButtonsGroup
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

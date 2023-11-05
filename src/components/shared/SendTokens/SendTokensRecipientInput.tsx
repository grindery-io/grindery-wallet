import React, { useState } from "react";
import ContactsList from "../ContactsList/ContactsList";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import SendTokensContactsPlaceholder from "./SendTokensContactsPlaceholder";
import ContactsSelectBanner from "../ContactsSelectBanner";

const SendTokensRecipientInput = () => {
  const dispatch = useAppDispatch();
  const { debug, send } = useAppSelector(selectAppStore);
  const { input, selectedContacts } = send;
  const [banner, setBanner] = useState(true);
  return (
    <>
      <ContactsList
        onContactClick={(id) => {
          dispatch(
            appStoreActions.setSend({
              input: {
                recipient: id,
                amount: "",
                message: "",
              },
            })
          );
        }}
        selected={selectedContacts}
        onSelect={(id) => {
          dispatch(
            appStoreActions.setSend({
              selectedContacts: selectedContacts.includes(id)
                ? selectedContacts.filter((c) => c !== id)
                : [...selectedContacts, id],
            })
          );
        }}
        onSelectConfirm={() => {
          dispatch(
            appStoreActions.setSend({
              input: {
                ...input,
                recipient:
                  selectedContacts.length > 1
                    ? selectedContacts
                    : selectedContacts[0],
              },

              selectedContacts: [],
            })
          );
        }}
        onSelectCancel={() => {
          dispatch(
            appStoreActions.setSend({
              selectedContacts: [],
            })
          );
        }}
        placeholder={<SendTokensContactsPlaceholder />}
      />

      {debug.features?.BATCH_SENDING && (
        <ContactsSelectBanner
          onClose={() => {
            setBanner(false);
          }}
          visible={banner && selectedContacts.length < 1}
        />
      )}
    </>
  );
};

export default SendTokensRecipientInput;

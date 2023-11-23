import React, { useState } from "react";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import ContactsSelectBanner from "../ContactsSelectBanner";
import ContactsList from "../ContactsList/ContactsList";
import useWindowDimensions from "hooks/useWindowDimensions";

const SendTokensRecipientInput = () => {
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { debug, send } = useAppSelector(selectAppStore);
  const { input, selectedContacts } = send;
  const [banner, setBanner] = useState(true);
  return (
    <>
      <ContactsList
        height={height - 104}
        onContactClick={(id) => {
          if (selectedContacts.length > 0) {
            dispatch(
              appStoreActions.setSend({
                selectedContacts: selectedContacts.includes(id)
                  ? selectedContacts.filter((c) => c !== id)
                  : [...selectedContacts, id],
              })
            );
          } else {
            dispatch(
              appStoreActions.setSend({
                input: {
                  ...input,
                  recipient: id,
                },
              })
            );
          }
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
        //placeholder={<SendTokensContactsPlaceholder />}
      />

      {debug.enabled && debug.features?.BATCH_SENDING && (
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

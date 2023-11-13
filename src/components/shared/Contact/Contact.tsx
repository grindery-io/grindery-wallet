import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * @description Telegram contact ID
 * @example "123456789"
 */
export type ContactIdType = string;

/**
 * @description Telegram contact first name
 * @example "John"
 */
export type ContactFirstNameType = string | null;

/**
 * @description Telegram contact last name
 * @example "Doe"
 */
export type ContactLastNameType = string | null;

/**
 * @description Telegram contact username
 * @example "johndoe"
 */
export type ContactUsernameType = string | null;

/**
 * @description Telegram contact phone number
 * @example "+123456789"
 */
export type ContactPhoneType = string;

/**
 * @description Telegram contact photo object
 */
export type ContactPhotoType = {
  flags: number;
  hasVideo: boolean;
  personal: boolean;
  photoId: string;
  strippedThumb: {
    type: string;
    data: number[];
  };
  dcId: number;
  className: string;
};

/**
 * @description Is telegram contact mutual
 */
export type ContactMutualType = boolean;

/**
 * @description Is telegram contact deleted
 */
export type ContactDeletedType = boolean;

/**
 * @description Is telegram contact a bot
 */
export type ContactBotType = boolean;

/**
 * @description Is telegram contact verified
 */
export type ContactVerifiedType = boolean;

/**
 * @description Is telegram contact premium
 */
export type ContactPremiumType = boolean;

/**
 * @description Is telegram contact fake
 */
export type ContactFakeType = boolean;

/**
 * @description Is telegram contact scam
 */
export type ContactScamType = boolean;

/**
 * @description Is telegram contact a grindery user
 */
export type ContactGrinderyUserType = boolean;

/**
 * @description Is telegram contact invited
 */
export type ContactInvitedType = boolean;

/**
 * @description Telegram contact status
 */
export type ContactStatusType = {
  className: string;
};

export interface ContactType {
  id: ContactIdType;
  firstName: ContactFirstNameType;
  lastName: ContactLastNameType;
  username: ContactUsernameType;
  phone: ContactPhoneType;
  photo: ContactPhotoType;
  mutual: ContactMutualType;
  deleted: ContactDeletedType;
  bot: ContactBotType;
  verified: ContactVerifiedType;
  premium: ContactPremiumType;
  fake: ContactFakeType;
  scam: ContactScamType;
  grinderyUser: ContactGrinderyUserType;
  invited: ContactInvitedType;
  status: ContactStatusType;
}

export type ContactContextProps = {
  contact: ContactType;
  children: React.ReactNode;
};

export const ContactContext = createContext<ContactType>({} as ContactType);

const Contact = ({ children, contact }: ContactContextProps): JSX.Element => {
  const [state, setState] = useState<ContactType>(contact);

  useEffect(() => {
    setState(contact);
  }, [contact]);

  return (
    <ContactContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);

export default Contact;

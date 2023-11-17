import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserRequest } from "services";
import { STORAGE_KEYS } from "../../../constants";

/**
 * @description User internal id
 * @example "123455"
 */
export type UserIdType = string;

/**
 * @description User telegram id
 * @example "123455"
 */
export type UserTelegramIdType = string;

/**
 * @description User telegram name
 * @example "John Doe"
 */
export type UserNameType = string;

/**
 * @description User telegram username / handle
 * @example "johndoe"
 */
export type UserHandleType = string;

/**
 * @description User patchwallet address
 * @example "0x123455"
 */
export type UserPatchwalletType = string;

/**
 * @description User creation date
 * @example "2021-01-01T00:00:00.000Z"
 */
export type UserDateAddedType = string;

export interface UserType {
  _id: UserIdType;
  userTelegramID: UserTelegramIdType;
  userName: UserNameType;
  userHandle: UserHandleType;
  patchwallet: UserPatchwalletType;
  dateAdded: UserDateAddedType;
}

export type UserContextProps = {
  user?: UserType;
  id?: string;
  children: React.ReactNode;
};

export const UserContext = createContext<UserType | null>(null);

/**
 * Renders a User component.
 * @param {UserContextProps} props - The props for the User component.
 * @returns {JSX.Element} - The User component.
 */
const User = ({ children, user, id }: UserContextProps): JSX.Element => {
  const cachedUserString = id
    ? localStorage.getItem(STORAGE_KEYS.APP_USER.replace("{{id}}", id))
    : null;
  const cachedUser: UserType | null = cachedUserString
    ? JSON.parse(cachedUserString)
    : null;

  const [state, setState] = useState<UserType | null>(user || cachedUser);

  useEffect(() => {
    setState(user || cachedUser);
  }, [user, cachedUser]);

  useEffect(() => {
    const controller = new AbortController();
    if (id && !user && !cachedUser) {
      getUserRequest(id, controller)
        .then((res) => {
          setState(res.data || null);
          localStorage.setItem(
            STORAGE_KEYS.APP_USER.replace("{{id}}", id),
            JSON.stringify(res.data || null)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return () => {
      controller.abort();
    };
  }, [id, user, cachedUser]);

  return (
    <UserContext.Provider
      value={
        state
          ? {
              ...state,
            }
          : null
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default User;

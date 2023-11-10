import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * @description Token full name / title
 * @example "Grindery One"
 */
export type TokenNameType = string;

/**
 * @description Token symbol
 * @example "G1"
 */
export type TokenSymbolType = string;

/**
 * @description Token decimals
 * @example 18
 */
export type TokenDecimalsType = number;

/**
 * @description Token address
 * @example "0xe36BD65609c08Cd17b53520293523CF4560533d0"
 */
export type TokenAddressType = string;

/**
 * @description Token icon url
 * @example "/images/g1-token-red.svg"
 */
export type TokenIconType = string;

/**
 * @description Token chain ID
 * @example "137"
 */
export type TokenChainType = string;

/**
 * @description Token balance in wei
 * @example "0"
 */
export type TokenBalanceType = string;

/**
 * @description Token price in USD
 * @example "0"
 */

export type TokenPriceType = string;

export interface TokenType {
  name: TokenNameType;
  symbol: TokenSymbolType;
  decimals: TokenDecimalsType;
  address: TokenAddressType;
  icon: TokenIconType;
  chain: TokenChainType;
  balance: TokenBalanceType;
  price: TokenPriceType;
}

export type TokenContextProps = {
  token: TokenType;
  children: React.ReactNode;
};

export const TokenContext = createContext<TokenType>({
  name: "Grindery One",
  symbol: "G1",
  decimals: 18,
  address: "0xe36BD65609c08Cd17b53520293523CF4560533d0",
  icon: "/images/g1-token-red.svg",
  chain: "137",
  balance: "0",
  price: "0",
});

/**
 * Renders a Token component.
 * @param {TokenContextProps} props - The props for the Token component.
 * @returns {JSX.Element} - The Token component.
 */
const Token = ({ children, token }: TokenContextProps): JSX.Element => {
  const [state, setState] = useState<TokenType>(token);

  useEffect(() => {
    setState(token);
  }, [token]);

  return (
    <TokenContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);

export default Token;

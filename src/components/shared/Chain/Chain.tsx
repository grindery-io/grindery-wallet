import React, { createContext, useContext, useEffect, useState } from "react";
import { CHAINS } from "../../../constants";

/**
 * @description Chain id
 * @example "137"
 */
export type ChainIdType = string;

/**
 * @description Chain CAIP id
 * @example "eip155:137"
 */
export type ChainCaipIdType = string;

/**
 * @description Chain name
 * @example "polygon"
 */
export type ChainNameType = string;

/**
 * @description Chain logo
 * @example "https://assets.coingecko.com/coins/images/4713/small/matic___polygon.jpg?1612939050"
 */
export type ChainLogoType = string;

/**
 * @description Chain label
 * @example "Polygon"
 */
export type ChainLabelType = string;

/**
 * @description Is testnet
 * @example "testnet"
 */
export type ChainTestnetType = boolean;

export interface ChainType {
  id: ChainIdType;
  caipId: ChainCaipIdType;
  name: ChainNameType;
  logo: ChainLogoType;
  label: ChainLabelType;
  testnet: ChainTestnetType;
}

export type ChainContextProps = {
  chain?: ChainType;
  id?: ChainIdType;
  children: React.ReactNode;
};

export const ChainContext = createContext<ChainType | null>(null);

/**
 * Renders a Chain component.
 * @param {ChainContextProps} props - The props for the Chain component.
 * @returns {JSX.Element} - The Chain component.
 */
const Chain = ({ children, chain, id }: ChainContextProps): JSX.Element => {
  const [state, setState] = useState<ChainType | null>(chain || null);

  useEffect(() => {
    if (chain) {
      setState(chain);
    }
  }, [chain]);

  useEffect(() => {
    if (id && !chain) {
      setState(
        CHAINS.find((chain: ChainType) => chain.id === id) || {
          id: "000",
          caipId: "000",
          name: "unsupported",
          logo: "",
          label: "Unsupported",
          testnet: false,
        }
      );
    }
  }, [id, chain]);

  return (
    <ChainContext.Provider
      value={
        state
          ? {
              ...state,
            }
          : null
      }
    >
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => useContext(ChainContext);

export default Chain;

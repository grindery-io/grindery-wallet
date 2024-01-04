import React, { createContext, useContext } from "react";
import { OrderType } from "types";

export type OrderContextProps = {
  order: OrderType;
  children: React.ReactNode;
};

export const OrderContext = createContext<OrderType | null>(null);

/**
 * Renders a Order component.
 * @param {OrderContextProps} props - The props for the Order component.
 * @returns {JSX.Element} - The Order component.
 */
const Order = ({ children, order }: OrderContextProps): JSX.Element => {
  const state = order;

  return (
    <OrderContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

export default Order;

import React from "react";
import Balance from "../shared/Balance";
import SendButton from "../shared/SendButton";
import Address from "../shared/Address";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <Address />
      <Balance />
      <SendButton />
    </>
  );
};

export default HomePage;

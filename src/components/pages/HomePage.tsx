import React from "react";
import Balance from "../shared/Balance";
import SendButton from "../shared/SendButton";
import Address from "../shared/Address";
import Container from "../shared/Container";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Container>
      <Address />
      <Balance />
      <SendButton />
    </Container>
  );
};

export default HomePage;

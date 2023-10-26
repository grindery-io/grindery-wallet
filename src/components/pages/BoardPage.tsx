import React from "react";
import useBackButton from "../../hooks/useBackButton";
import Board from "../shared/Board/Board";

const BoardPage = () => {
  useBackButton();

  return <Board />;
};

export default BoardPage;

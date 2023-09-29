import React from "react";

type Props = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const Subtitle = ({ children, style }: Props) => {
  return (
    <p
      style={{
        fontSize: "18px",
        fontWeight: 300,
        textAlign: "center",
        margin: "0 0 16px",
        ...(style || {}),
      }}
    >
      {children}
    </p>
  );
};

export default Subtitle;

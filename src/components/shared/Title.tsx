import React from "react";

type Props = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const Title = ({ children, style }: Props) => {
  return (
    <p
      style={{
        fontSize: "24px",
        fontWeight: 700,
        lineHeight: "145%",
        textAlign: "center",
        margin: "0 0 24px",
        ...(style || {}),
      }}
    >
      {children}
    </p>
  );
};

export default Title;

import React from "react";
import logo from "../../assets/images/nexus-logo.svg";
import logoHorizontal from "../../assets/images/nexus-logo-horizontal.svg";
import logoSquare from "../../assets/images/nexus-square.svg";

type Props = {
  variant?: "horizontal" | "square";
};

const Logo = (props: Props) => {
  const { variant } = props;

  const returnSrc = () => {
    switch (variant) {
      case "horizontal":
        return logoHorizontal;
      case "square":
        return logoSquare;
      default:
        return logo;
    }
  };

  return (
    <div>
      <img
        src={returnSrc()}
        alt="Grindery Nexus logo"
        style={{ display: "block", margin: "0 auto", cursor: "pointer" }}
      />
    </div>
  );
};

export default Logo;

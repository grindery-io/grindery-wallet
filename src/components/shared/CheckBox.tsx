import React from "react";
import { ICONS } from "../../constants";

type Props = {
  checked: boolean;
  onChange: (a: boolean) => void;
  style?: any;
};

const CheckBox = (props: Props) => {
  const { checked, onChange, style } = props;
  return (
    <div
      onClick={() => {
        onChange(!checked);
      }}
      style={{ cursor: "pointer", ...style }}
    >
      <img
        src={checked ? ICONS.CHECKBOX_CHECKED : ICONS.CHECKBOX_EMPTY}
        alt={checked ? "filled checkbox icon" : "empty checkbox icon"}
        style={{ display: "block" }}
      />
    </div>
  );
};

export default CheckBox;

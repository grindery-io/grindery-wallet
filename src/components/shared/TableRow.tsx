import React from "react";

type Props = {
  label?: string | React.ReactNode;
  value?: string | React.ReactNode;
  icon?: string | React.ReactNode;
  first?: boolean;
  onValueClick?: () => void;
};

const TableRow = ({ label, value, icon, first, onValueClick }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: "16px",
        padding: "10px 16px",
        borderTop: !first
          ? "1px solid var(--grindery-cool-grey-cool-grey-10, #E3E3E8)"
          : "none",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "125%",
          margin: 0,
          padding: 0,
          color: "var(--grindery-cool-grey-cool-grey-60, #666E7F)",
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "nowrap",
          gap: "4px",
        }}
        onClick={onValueClick}
      >
        <strong style={{ fontSize: "12px" }}>{value}</strong>
        {icon}
      </div>
    </div>
  );
};

export default TableRow;

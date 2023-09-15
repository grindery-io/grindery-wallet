import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "grindery-ui";
import { ICONS } from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import { set } from "lodash";

type Props = {};

const Address = (props: Props) => {
  const {
    state: { user },
  } = useAppContext();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const address = user?.patchwallet;

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  }, [copied]);

  return address ? (
    <div style={{ textAlign: "center" }}>
      <Tooltip
        title={copied ? "Copied" : "Copy address"}
        open={open || copied}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <span>
          <CopyToClipboard
            text={address}
            onCopy={() => {
              setCopied(true);
            }}
          >
            <button
              onClick={() => {}}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "auto",
                margin: "0 auto",
                border: "1px solid rgb(220, 220, 220)",
                borderRadius: "34px",
                padding: "7px 12px 7px 8px",
                gap: "16px",
              }}
            >
              <span
                style={{
                  color: "rgb(20, 20, 22)",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "150%",
                }}
              >
                {address.substring(0, 6) +
                  "..." +
                  address.substring(address.length - 4)}
              </span>
              <span>
                <img src={ICONS.COPY} alt="" />
              </span>
            </button>
          </CopyToClipboard>
        </span>
      </Tooltip>
    </div>
  ) : null;
};

export default Address;

import React from "react";
import { SxProps, Stack, Tooltip } from "@mui/material";
import { useToken } from "../Token";
import Chain from "components/shared/Chain/Chain";
import ChainName, {
  ChainNameFormat,
} from "components/shared/Chain/ChainName/ChainName";
import ChainAvatar from "components/shared/Chain/ChainAvatar/ChainAvatar";

export type TokenChainProps = {
  format?: ChainNameFormat;
  withIcon?: boolean;
  onlyIcon?: boolean;
  iconSize?: number;
  sx?: SxProps | React.CSSProperties;
};

const TokenChain = ({
  format,
  withIcon,
  onlyIcon,
  iconSize,
  sx,
}: TokenChainProps) => {
  const { chain } = useToken();
  return chain ? (
    <Chain id={chain}>
      <Stack
        sx={sx}
        component="span"
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="4px"
        useFlexGap
      >
        {!onlyIcon && <ChainName format={format} />}
        {withIcon && !onlyIcon && <ChainAvatar size={iconSize} />}
        {onlyIcon && (
          <Tooltip title={<ChainName format={format} />}>
            <span>
              <ChainAvatar size={iconSize} />
            </span>
          </Tooltip>
        )}
      </Stack>
    </Chain>
  ) : null;
};

export default TokenChain;

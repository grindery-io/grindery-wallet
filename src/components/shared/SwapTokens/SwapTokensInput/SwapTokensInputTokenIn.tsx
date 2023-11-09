import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../../store";
import TokenIcon from "../../TokenIcon";
import TokensListItem from "../../TokensList/TokensListItem";
import SearchBox from "../../SearchBox/SearchBox";
import { TransitionProps } from "@mui/material/transitions";
import { Token } from "../../../../types/State";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { debounce } from "lodash";
import { formatBalance } from "../../../../utils/formatBalance";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SwapTokensInputTokenIn = ({ allTokens }: { allTokens: Token[] }) => {
  const { height } = useWindowDimensions();
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const {
    swap: { input },
    debug: { features },
  } = useAppSelector(selectAppStore);
  const [open, setOpen] = useState(false);
  const selectedToken = allTokens.find(
    (token) => token.address === input.tokenIn
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const request = debounce((value) => {
    dispatch(
      appStoreActions.setSwap({
        input: {
          ...input,
          amountIn: value,
        },
      })
    );
  }, 1200);

  const debouncedSearchChange = useCallback(
    (value: string) => request(value),
    [request]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing="16px"
      useFlexGap
      sx={{
        padding: "10px 10px 10px 20px",
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
      }}
    >
      <Box>
        <Button
          onClick={handleOpen}
          variant="text"
          color="primary"
          startIcon={
            selectedToken ? (
              <TokenIcon
                url={selectedToken.logoURI}
                size={20}
                key={selectedToken.id}
              />
            ) : undefined
          }
          endIcon={<ArrowDropDownIcon />}
          sx={{
            padding: "2px 2px 2px 6px",
            marginLeft: "-4px",
            color: selectedToken
              ? "var(--tg-theme-text-color, #000000)"
              : undefined,
            borderRadius: "12px",
            "& .MuiButton-endIcon": {
              marginLeft: "4px !important",
            },
          }}
        >
          {selectedToken?.symbol || "Select a token"}
        </Button>
        <Dialog
          TransitionComponent={Transition}
          fullScreen
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "0px",
              //borderRadius: "10px",
              //width: "80%",
              //maxHeight: height - 100,
              background: "var(--tg-theme-bg-color, #ffffff)",
              //border: "1px solid var(--gr-theme-divider-color)",
            },
          }}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle
            sx={{
              padding: "12px",
            }}
          >
            <SearchBox
              placeholder="Search token"
              value={search}
              onChange={(value) => {
                setSearch(value);
              }}
              sx={{
                padding: "0",
              }}
            />
          </DialogTitle>
          <Divider sx={{ marginLeft: 0 }} />
          <DialogContent
            sx={{
              padding: "0",
            }}
          >
            <List
              height={height - 66}
              itemCount={
                (allTokens || [])
                  .filter((token) =>
                    token.symbol.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter((token) => token.address !== input.tokenOut).length
              }
              itemSize={48}
              width="100%"
              itemData={(allTokens || [])
                .filter((token) =>
                  token.symbol.toLowerCase().includes(search.toLowerCase())
                )
                .filter((token) => token.address !== input.tokenOut)}
            >
              {(itemProps: { data: any; index: number; style: any }) => (
                <Box
                  sx={{ ...itemProps.style, padding: "0 8px" }}
                  key={itemProps.data[itemProps.index].id}
                >
                  <TokensListItem
                    key={itemProps.data[itemProps.index].address}
                    passive
                    token={itemProps.data[itemProps.index]}
                    onClick={() => {
                      dispatch(
                        appStoreActions.setSwap({
                          input: {
                            ...input,
                            tokenIn: itemProps.data[itemProps.index].address,
                          },
                        })
                      );
                      handleClose();
                    }}
                  />
                </Box>
              )}
            </List>
          </DialogContent>
        </Dialog>
        <Typography
          variant="xs"
          sx={{ marginTop: "4px", lineHeight: 1.5 }}
          color="hint"
        >
          Balance: {selectedToken?.balance || 0}
        </Typography>
      </Box>
      <Stack
        sx={{ marginLeft: "auto", flex: 1 }}
        direction="column"
        alignItems="flex-end"
        justifyContent="center"
      >
        <InputBase
          sx={{
            width: "100%",
            "& input": {
              textAlign: "right",
              fontSize: "24px",
              fontWeight: "bold",
            },
          }}
          inputProps={{
            type: "number",
            min: 0,
            max: 100,
            sx: {
              padding: 0,
              color: "var(--tg-theme-text-color, #000000)",
            },
            name: "amountIn",
          }}
          placeholder="0"
          //value={input.amountIn}
          onChange={(e) => {
            debouncedSearchChange(e.target.value);
          }}
        />
        {features?.TOKEN_PRICE && (
          <Typography variant="xs" color="hint">
            {
              formatBalance(
                (selectedToken?.price || 0) * (parseFloat(input.amountIn) || 0)
              ).formatted
            }{" "}
            USD
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default SwapTokensInputTokenIn;

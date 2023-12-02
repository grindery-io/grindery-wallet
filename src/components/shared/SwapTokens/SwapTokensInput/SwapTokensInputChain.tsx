import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
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
import DialogSelect from "../../DialogSelect/DialogSelect";
import { CHAINS } from "../../../../constants";
import Chain from "components/shared/Chain/Chain";
import ChainAvatar from "components/shared/Chain/ChainAvatar/ChainAvatar";
import ChainName from "components/shared/Chain/ChainName/ChainName";

const SwapTokensInputChain = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const {
    swap: { input },
  } = useAppSelector(selectAppStore);
  const [open, setOpen] = useState(false);
  const selectedChain = CHAINS.find((c) => c.id === input.chainId) || CHAINS[0];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return selectedChain ? (
    <>
      <Chain chain={selectedChain}>
        <ButtonBase
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
            padding: "10px 15px 10px 20px",
            width: "100%",
            borderRadius: "10px",
            backgroundColor: "var(--tg-theme-secondary-bg-color, #efeff3)",
            height: "auto",
            flex: "unset",
            marginBottom: "20px",
          }}
          onClick={handleOpen}
        >
          <Box textAlign="left">
            <Stack
              direction="row"
              spacing="8px"
              justifyContent="flex-start"
              alignItems="center"
            >
              <ChainAvatar size={20} />
              <Typography fontWeight="bold" variant="sm">
                <ChainName />
              </Typography>
            </Stack>
            <Typography variant="xs" color="hint" mt="8px">
              Blockchain
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <ArrowDropDownIcon
              sx={{ color: "var(--tg-theme-text-color, #000000)" }}
            />
          </Box>
        </ButtonBase>
      </Chain>
      <DialogSelect
        open={open}
        onClose={handleClose}
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Search blockchain",
        }}
        items={(CHAINS || [])
          .filter((c) => !c.testnet)
          .filter(
            (c) =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.label.toLowerCase().includes(search.toLowerCase())
          )}
        itemSize={48}
        item={(itemProps: { data: any; index: number; style: any }) => (
          <Box
            sx={{ ...itemProps.style, padding: "0 8px" }}
            key={itemProps.data[itemProps.index].id}
          >
            <Chain chain={itemProps.data[itemProps.index]}>
              <ListItemButton
                sx={{ borderRadius: "8px", padding: "8px" }}
                onClick={() => {
                  dispatch(
                    appStoreActions.setSwap({
                      input: {
                        ...input,
                        chainId: itemProps.data[itemProps.index].id,
                      },
                    })
                  );
                  handleClose();
                }}
              >
                <ListItemAvatar sx={{ minWidth: "unset", marginRight: "8px" }}>
                  <ChainAvatar size={32} />
                </ListItemAvatar>
                <ListItemText primary={<ChainName />} />
              </ListItemButton>
            </Chain>
          </Box>
        )}
      />
    </>
  ) : null;
};

export default SwapTokensInputChain;

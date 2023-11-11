import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";
import { TransitionProps } from "@mui/material/transitions";
import { FixedSizeList as List } from "react-window";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type DialogSelectProps = {
  open: boolean;
  onClose: () => void;
  items: any[];
  item: (itemProps: {
    data: any;
    index: number;
    style: any;
  }) => React.ReactNode;
  search?: {
    value: string;
    onChange: (value: string) => void;
  };
};

const DialogSelect = (props: DialogSelectProps) => {
  const { open, onClose, items, search, item } = props;
  const { height } = useWindowDimensions();

  useEffect(() => {
    const callback = () => {
      onClose();
    };
    if (
      window.Telegram?.WebApp?.BackButton &&
      window.Telegram.WebApp.BackButton.isVisible &&
      open
    ) {
      window.Telegram.WebApp.BackButton.onClick(callback);
    }

    if (
      window.Telegram?.WebApp?.BackButton &&
      window.Telegram.WebApp.BackButton.isVisible &&
      !open
    ) {
      window.Telegram.WebApp.BackButton.offClick(callback);
    }

    return () => {
      if (
        window.Telegram?.WebApp?.BackButton &&
        window.Telegram.WebApp.BackButton.isVisible
      ) {
        window.Telegram.WebApp.BackButton.offClick(callback);
      }
    };
  }, [open, onClose]);

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "0px",
          background: "var(--tg-theme-bg-color, #ffffff)",
        },
      }}
      open={open}
      onClose={onClose}
    >
      {search && (
        <>
          <DialogTitle
            sx={{
              padding: "12px",
            }}
          >
            <SearchBox
              placeholder="Search token"
              value={search.value}
              onChange={(value: string) => {
                search.onChange(value);
              }}
              sx={{
                padding: "0",
              }}
            />
          </DialogTitle>
          <Divider sx={{ marginLeft: 0 }} />
        </>
      )}

      <DialogContent
        sx={{
          padding: "0",
        }}
      >
        <List
          height={height - (search ? 66 : 0)}
          itemCount={items.length}
          itemSize={48}
          width="100%"
          itemData={items}
        >
          {item}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSelect;

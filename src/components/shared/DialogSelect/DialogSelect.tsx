import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";
import { TransitionProps } from "@mui/material/transitions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { FixedSizeList } from "react-window";

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
  }) => React.ReactElement;
  itemSize: number;
  search?: {
    value: string;
    onChange: (value: string) => void;
  };
};

const DialogSelect = (props: DialogSelectProps) => {
  const { open, onClose, items, search, item, itemSize } = props;
  const { height } = useWindowDimensions();

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
        <FixedSizeList
          height={height - (search ? 66 : 0)}
          itemCount={items.length}
          itemSize={itemSize}
          width="100%"
          itemData={items}
        >
          {item}
        </FixedSizeList>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSelect;

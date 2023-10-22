import React from "react";
import { STORAGE_KEYS } from "../../../constants";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import DebugMenuListItem from "./DebugMenuListItem";
import StyledSwitch from "../StyledSwitch";

const DebugMenuListItemMode = () => {
  const dispatch = useAppDispatch();
  const { debug } = useAppSelector(selectAppStore);

  return (
    <DebugMenuListItem
      label="Debug Mode"
      value={
        <StyledSwitch
          checked={debug.enabled}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              appStoreActions.setDebug({
                enabled: event.target.checked,
              })
            );

            localStorage.setItem(
              STORAGE_KEYS.DEBUG,
              event.target.checked ? "true" : "false"
            );
          }}
        />
      }
    />
  );
};

export default DebugMenuListItemMode;

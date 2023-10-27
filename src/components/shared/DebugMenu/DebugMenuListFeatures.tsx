import React from "react";
import { Divider } from "@mui/material";
import { EXPERIMENTAL_FEATURES, STORAGE_KEYS } from "../../../constants";
import {
  appStoreActions,
  selectAppStore,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import DebugMenuListItem from "./DebugMenuListItem";
import StyledSwitch from "../StyledSwitch";
import DebugMenuListFeaturesWebVersion from "./DebugMenuListFeaturesWebVersion";

const DebugMenuListFeatures = () => {
  const dispatch = useAppDispatch();
  const { debug } = useAppSelector(selectAppStore);

  return (
    <>
      {Object.keys(EXPERIMENTAL_FEATURES).map((key, index) => (
        <React.Fragment key={key}>
          <DebugMenuListItem
            label={
              EXPERIMENTAL_FEATURES[key as keyof typeof EXPERIMENTAL_FEATURES]
            }
            value={
              <StyledSwitch
                edge="end"
                checked={debug.features?.[key]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    appStoreActions.setDebugFeatures({
                      [key]: event.target.checked,
                    })
                  );
                  localStorage.setItem(
                    STORAGE_KEYS.EXPERIMENTAL_FEATURES.replace("{{key}}", key),
                    event.target.checked ? "true" : "false"
                  );
                }}
              />
            }
          />
          <Divider />
        </React.Fragment>
      ))}
      <DebugMenuListFeaturesWebVersion />
    </>
  );
};

export default DebugMenuListFeatures;

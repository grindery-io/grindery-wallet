import React from "react";
import { Stack, Typography } from "@mui/material";

type ConvertTokensOutputProps = {};

const ConvertTokensOutput = (props: ConvertTokensOutputProps) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ margin: "16px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        style={{
          marginBottom: "8px",
          color: "var(--tg-theme-text-color, #000000)",
        }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.602056 6.44593L1.90748 5.1405L8.00002 11.233L14.0925 5.1405L15.398 6.44593L8.00002 13.8439L0.602056 6.44593Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.92308 0.23077V11.3077H7.07692V0.23077H8.92308Z"
          fill="currentColor"
        />
      </svg>
      <Typography color="hint" mb="8px">
        <strong>You get</strong>
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="8px"
      >
        <Typography variant="title">
          <strong>2,883</strong>
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing="4px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <g clip-path="url(#clip0_2163_73)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.5002 9.99992C20.5002 15.5191 16.0194 19.9999 10.5002 19.9999C4.981 19.9999 0.500196 15.5191 0.500196 9.99992C0.500196 4.48072 4.981 -8.39233e-05 10.5002 -8.39233e-05C16.0194 -8.39233e-05 20.5002 4.48072 20.5002 9.99992Z"
                fill="#0B0C0E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.2485 7.59984L13.0728 6.42415C12.8386 6.18995 12.8384 5.80976 13.0727 5.57547C13.3068 5.34142 13.687 5.34153 13.9212 5.57573L15.097 6.75142L16.2727 5.5754C16.5069 5.34144 16.887 5.34144 17.1212 5.57565C17.3553 5.80985 17.3553 6.18994 17.1213 6.42399L15.9456 7.60001L17.1213 8.77571C17.3555 9.00991 17.3554 9.38999 17.1212 9.62395C16.8871 9.85833 16.5068 9.85823 16.2726 9.62403L15.0969 8.44834L13.9212 9.62402C13.6872 9.85841 13.3069 9.85831 13.0727 9.62411C12.8385 9.3899 12.8386 9.00982 13.0726 8.77543L14.2485 7.59984Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.87198 13.3379L10.0309 11.9461C10.4412 11.7351 10.8208 11.4486 11.1482 11.0877C12.6091 9.477 12.4763 6.994 10.8516 5.54173C9.22678 4.08946 6.72533 4.21788 5.2644 5.82855C3.80348 7.43923 3.9363 9.92223 5.56107 11.3745C5.93015 11.7044 6.34447 11.9527 6.78155 12.1206C5.86155 12.8596 5.63424 14.1844 6.29307 15.1915C6.92656 16.1598 8.16351 16.5046 9.19495 16.0553C9.27153 16.0334 9.34596 15.9992 9.41535 15.9521L9.49784 15.8962C9.50913 15.8892 9.52039 15.882 9.5316 15.8748L12.0577 14.1598C12.3834 13.9588 12.8126 14.0527 13.0224 14.3734C13.1544 14.5751 13.1685 14.819 13.0818 15.0254C13.633 14.5851 13.7877 13.8162 13.449 13.1994C13.0624 12.4954 12.1741 12.2358 11.4649 12.6196C11.4358 12.6353 11.4065 12.6516 11.3772 12.6685C11.341 12.6855 11.3056 12.7056 11.2714 12.7287L11.2117 12.7693C11.1929 12.7813 11.1741 12.7936 11.1552 12.8061L8.6291 14.5211C8.30344 14.7221 7.87417 14.6281 7.66437 14.3074C7.45199 13.9828 7.54494 13.5487 7.87198 13.3379ZM9.65138 6.72685C10.5841 7.56655 10.6603 9.00222 9.82168 9.93352C8.98303 10.8648 7.54708 10.9391 6.61438 10.0994C5.68168 9.25966 5.60543 7.82398 6.44408 6.89269C7.28272 5.96139 8.71868 5.88714 9.65138 6.72685Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2163_73">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <Typography>
            <strong>GX</strong>
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="xs" color="hint" mt="6px">
        U$ 102
      </Typography>
    </Stack>
  );
};

export default ConvertTokensOutput;

import React from "react";
import styled, { css } from "styled-components";
import { Button as Grinderybutton } from "grindery-ui";
import { SCREEN } from "../../constants";

interface ButtonWrapperProps {
  readonly hideIconBorder?: boolean;
  readonly align: "left" | "right" | "center";
  readonly fullWidth: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  & .MuiButton-root {
    padding: 12px 35px !important;
  }
  ${(props) =>
    props.hideIconBorder &&
    css`
      & .MuiButton-startIcon > img {
        background: none;
        border: none;
        padding: 0;
      }
    `}
  & .MuiButton-root {
    white-space: nowrap;
    border-radius: 10px;
  }
  @media (min-width: ${SCREEN.TABLET}) {
    ${(props) =>
      props.align === "left" &&
      css`
        text-align: left;
        & .MuiButton-root {
          margin-left: 0;
          margin-right: auto;
        }
      `}

    ${(props) =>
      props.align === "right" &&
      css`
        text-align: right;
        & .MuiButton-root {
          margin-left: auto;
          margin-right: 0;
        }
      `}

        ${(props) =>
      props.align === "center" &&
      css`
        text-align: center;
        & .MuiButton-root {
          margin-left: auto;
          margin-right: auto;
        }
      `}

    & .MuiButton-root {
      padding-left: 60px;
      padding-right: 60px;
      width: auto;
    }

    ${(props) =>
      props.fullWidth &&
      css`
        & .MuiButton-root {
          width: 100% !important;
        }
      `}
  }
`;

type Props = {
  onClick?: () => void;
  value: string;
  icon?: string;
  loading?: boolean;
  hideIconBorder?: boolean;
  variant?: string;
  color?: string;
  disabled?: boolean;
  align?: "left" | "right" | "center";
  fullWidth?: boolean;
  size?: "small";
};

const Button = (props: Props) => {
  const {
    onClick,
    value,
    icon,
    loading,
    variant,
    color,
    disabled,
    hideIconBorder = false,
    align = "center",
    fullWidth = false,
    size,
  } = props;
  return (
    <ButtonWrapper
      hideIconBorder={hideIconBorder}
      align={align}
      fullWidth={fullWidth}
    >
      <Grinderybutton
        size={size}
        onClick={onClick}
        value={value}
        icon={icon}
        loading={loading}
        variant={variant}
        color={color}
        disabled={disabled}
      />
    </ButtonWrapper>
  );
};

export default Button;

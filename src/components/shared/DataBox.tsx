import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

type Props = {
  size?: "large" | "small";
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  BottomLeftComponent?: React.ReactNode;
  BottomRightComponent?: React.ReactNode;
  CenterComponent?: React.ReactNode;
};

const DataBox = (props: Props) => {
  const {
    size = "small",
    LeftComponent,
    CenterComponent,
    RightComponent,
    BottomLeftComponent,
    BottomRightComponent,
    style = {},
    onClick,
  } = props;

  return (
    <Wrapper
      style={{
        ...style,
        border: "1px solid #D3DEEC",
        borderRadius: size === "small" ? "5px" : "10px",
        padding: size === "small" ? "var(--data-box-spacing)" : "15px",
        cursor: !onClick ? "default" : "pointer",
      }}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
      }}
      tabIndex={onClick ? 0 : undefined}
    >
      {size === "small" && (
        <Row>
          {!!LeftComponent && (
            <div
              style={{
                marginRight: "auto",
              }}
            >
              {LeftComponent}
            </div>
          )}
          {!!CenterComponent && (
            <div
              style={{
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              {CenterComponent}
            </div>
          )}
          {!!RightComponent && (
            <div
              style={{
                marginLeft: "auto",
              }}
            >
              {RightComponent}
            </div>
          )}
        </Row>
      )}
      {size === "large" && (
        <>
          <Row>
            {!!LeftComponent && (
              <div
                style={{
                  marginRight: "auto",
                }}
              >
                {LeftComponent}
              </div>
            )}
            {!!CenterComponent && (
              <div
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                {CenterComponent}
              </div>
            )}
            {!!RightComponent && (
              <div
                style={{
                  marginLeft: "auto",
                }}
              >
                {RightComponent}
              </div>
            )}
          </Row>
          <div
            style={{
              marginTop:
                !!BottomLeftComponent || !!BottomRightComponent ? 10 : 0,
            }}
          >
            <Row>
              {!!BottomLeftComponent && (
                <div
                  style={{
                    marginRight: "auto",
                  }}
                >
                  {BottomLeftComponent}
                </div>
              )}

              {!!BottomRightComponent && (
                <div
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {BottomRightComponent}
                </div>
              )}
            </Row>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default DataBox;

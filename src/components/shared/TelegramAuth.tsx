import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";
import AlertBox from "../shared/AlertBox";
import useAppContext from "../../hooks/useAppContext";
import BulletPoints from "./BulletPoints";
import Subtitle from "./Subtitle";
import Title from "./Title";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const Form = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 100%;
  padding: 12px 32px;
  box-sizing: border-box;

  & p.error {
    color: #ff5858;
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  & label {
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    font-family: "Geologica";
    color: #0b0d17;
    font-weight: bold;
  }

  & input {
    width: 100%;
    background: #f4f5f7;
    border-radius: 6px;
    padding: 7px 15px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    min-height: 44px;
    font-family: Geologica;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #0b0d17;
    text-align: center;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  & p {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #0b0d17;
    text-align: center;

    &.error {
      color: #ff5858;
    }
  }
`;

const ButtonWrapper = styled.div`
  margin: 24px 0 0;

  & > div {
    margin: 0;
  }

  & button {
    font-size: 14px;
    padding: 10px 20px !important;
    width: 100% !important;
    box-sizing: border-box;
  }
`;

const TelegramAuth = () => {
  const {
    state: {
      input: { code, phone, password },
      operationId,
      loading,
      error,
    },
    handleInputChange,
    submitPhoneAndPassword,
    submitPhoneCode,
  } = useAppContext();

  return (
    <Container>
      <>
        <div>
          <div
            style={{
              margin: "32px auto 24px",
              textAlign: "center",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1907_19935)">
                <path
                  d="M24 -0.0917969C17.6362 -0.0917969 11.5275 2.43833 7.03125 6.93758C2.53125 11.4368 0 17.5456 0 23.9082C0 30.2708 2.53125 36.3796 7.03125 40.8788C11.5275 45.3781 17.6362 47.9082 24 47.9082C30.3638 47.9082 36.4725 45.3781 40.9688 40.8788C45.4688 36.3796 48 30.2708 48 23.9082C48 17.5456 45.4688 11.4368 40.9688 6.93758C36.4725 2.43833 30.3638 -0.0917969 24 -0.0917969Z"
                  fill="url(#paint0_linear_1907_19935)"
                />
                <path
                  d="M10.8638 23.6541C17.8613 20.6061 22.5262 18.5965 24.8587 17.6256C31.5262 14.8533 32.9099 14.3718 33.8137 14.3556C34.0124 14.3523 34.4549 14.4014 34.7437 14.635C34.9837 14.8319 35.0512 15.0981 35.085 15.2849C35.115 15.4716 35.1563 15.8973 35.1225 16.2295C34.7625 20.0245 33.1988 29.2338 32.4038 33.4844C32.07 35.283 31.4062 35.886 30.765 35.9448C29.37 36.0731 28.3124 35.0238 26.9624 34.1391C24.8512 32.7543 23.6587 31.8925 21.6075 30.5414C19.2375 28.9799 20.775 28.1215 22.125 26.719C22.4775 26.3519 28.6199 20.7663 28.7362 20.2596C28.7512 20.1963 28.7662 19.96 28.6237 19.8355C28.485 19.7106 28.2786 19.7534 28.1286 19.7871C27.9149 19.8351 24.5436 22.0656 18.0036 26.4783C17.0474 27.136 16.1811 27.4566 15.4011 27.4398C14.5461 27.4214 12.8962 26.9553 11.67 26.557C10.17 26.0684 8.97369 25.81 9.07869 24.9801C9.13119 24.5481 9.72753 24.106 10.8638 23.6541Z"
                  fill="white"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1907_19935"
                  x1="24"
                  y1="-0.0917969"
                  x2="24"
                  y2="47.9082"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2AABEE" />
                  <stop offset="1" stopColor="#229ED9" />
                </linearGradient>
                <clipPath id="clip0_1907_19935">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <Title>Sign in with Telegram</Title>
          <div>
            <Subtitle>Features you will get access to by signing in:</Subtitle>
            <BulletPoints
              items={[
                "Send crypto via contact names, not wallet addresses",
                "Spot unjoined network members, invite & earn rewards",
                "Receive alerts for new joiners & instantly trade tokens",
                "Access wallet both in and out of Telegram",
                "Explore even more features coming up",
              ]}
            />
          </div>
        </div>
        <Form>
          <InputGroup>
            <label style={{ color: "var(--tg-theme-text-color, #000000)" }}>
              Phone number
            </label>
            <input
              type="phone"
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("phone", event.target.value);
              }}
              disabled={loading || Boolean(operationId)}
              placeholder="12345678901"
              style={{
                background: "var(--tg-theme-secondary-bg-color, #efeff3)",
                color: "var(--tg-theme-text-color, #000000)",
                border: "none",
                outline: "none",
              }}
            />
            <span
              style={{
                textAlign: "center",
                color: "var(--tg-theme-hint-color, #999999)",
                fontSize: "12px",
              }}
            >
              In the international format
            </span>
          </InputGroup>

          <InputGroup
            style={{
              marginTop: "16px",
            }}
          >
            <label style={{ color: "var(--tg-theme-text-color, #000000)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("password", event.target.value);
              }}
              disabled={loading || Boolean(operationId)}
              style={{
                background: "var(--tg-theme-secondary-bg-color, #efeff3)",
                color: "var(--tg-theme-text-color, #000000)",
                border: "none",
                outline: "none",
              }}
            />
          </InputGroup>

          <InputGroup
            style={{
              height: operationId ? "109px" : "0px",
              marginTop: operationId ? "16px" : "0px",
            }}
          >
            <label style={{ color: "var(--tg-theme-text-color, #000000)" }}>
              Code
            </label>
            <input
              type="number"
              value={code}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("code", event.target.value);
              }}
              disabled={loading}
              style={{
                background: "var(--tg-theme-secondary-bg-color, #efeff3)",
                color: "var(--tg-theme-text-color, #000000)",
                border: "none",
                outline: "none",
              }}
            />
            <span
              style={{
                textAlign: "center",
                color: "var(--tg-theme-hint-color, #999999)",
                fontSize: "12px",
              }}
            >
              Please check your{" "}
              <a
                href="https://telegram.me/+42777"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--tg-theme-link-color, #2481cc)" }}
              >
                Telegram app
              </a>
              .
              <br />
              You should receive an authorization code.
            </span>
          </InputGroup>

          {error && (
            <AlertBox color="error">
              <p
                style={{
                  fontSize: "14px",
                  color: "inherit",
                  marginTop: "2px",
                }}
              >
                {error}
              </p>
            </AlertBox>
          )}

          <ButtonWrapper>
            <Button
              color="secondary"
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor:
                  "var(--tg-theme-button-color, #2481cc) !important",
                color: "var(--tg-theme-button-text-color, #ffffff)",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    "var(--tg-theme-button-color, #2481cc) !important",
                  color: "var(--tg-theme-button-text-color, #ffffff)",
                  boxShadow: "none",
                  opacity: 1,
                },
              }}
              loading={loading}
              disabled={loading}
              onClick={!operationId ? submitPhoneAndPassword : submitPhoneCode}
              value={loading ? "Loading" : "Submit"}
            />
          </ButtonWrapper>
        </Form>
        <div>
          <Subtitle>Our Commitment to Data Security:</Subtitle>
          <BulletPoints
            items={[
              "Secure Transmission: All your data is securely transmitted and encrypted.",
              "Explicit Consent: We only collect and store data with your explicit consent.",
              "No Unsolicited Messaging: We won’t message anyone unless you agree to it first.",
            ]}
          />
        </div>
      </>
    </Container>
  );
};

export default TelegramAuth;

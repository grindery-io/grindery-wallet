import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";
import AlertBox from "../shared/AlertBox";
import useAppContext from "../../hooks/useAppContext";

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

const Title = styled.h3`
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 145%;
  margin: 24px 0;
  padding: 0;
`;

const Subtitle = styled.h5`
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin: 0 0 16px;
  padding: 0;
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
            <ul
              style={{
                margin: "0",
                padding: 0,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
                gap: "12px",
              }}
            >
              {[
                "Send crypto via contact names, not wallet addresses",
                "Spot unjoined network members, invite & earn rewards",
                "Receive alerts for new joiners & instantly trade tokens",
                "Access wallet both in and out of Telegram",
                "Explore even more features coming up",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    margin: "0 20px",
                    padding: "4px 0",
                    fontSize: "14px",
                    fontWeight: 300,
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    gap: "12px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1946_7151)">
                      <path
                        d="M9 0C7.21997 0 5.47991 0.527841 3.99987 1.51677C2.51983 2.50571 1.36628 3.91131 0.685088 5.55585C0.00389957 7.20038 -0.17433 9.00998 0.172937 10.7558C0.520204 12.5016 1.37737 14.1053 2.63604 15.364C3.89472 16.6226 5.49836 17.4798 7.24419 17.8271C8.99002 18.1743 10.7996 17.9961 12.4442 17.3149C14.0887 16.6337 15.4943 15.4802 16.4832 14.0001C17.4722 12.5201 18 10.78 18 9C17.9974 6.61384 17.0484 4.32616 15.3611 2.63889C13.6738 0.951621 11.3862 0.00258081 9 0V0ZM9 16.5C7.51664 16.5 6.0666 16.0601 4.83323 15.236C3.59986 14.4119 2.63856 13.2406 2.07091 11.8701C1.50325 10.4997 1.35473 8.99168 1.64411 7.53682C1.9335 6.08197 2.64781 4.74559 3.6967 3.6967C4.7456 2.64781 6.08197 1.9335 7.53683 1.64411C8.99168 1.35472 10.4997 1.50325 11.8701 2.0709C13.2406 2.63856 14.4119 3.59985 15.236 4.83322C16.0601 6.06659 16.5 7.51664 16.5 9C16.4978 10.9885 15.7069 12.8948 14.3009 14.3009C12.8948 15.7069 10.9885 16.4978 9 16.5Z"
                        fill="#0B0C0E"
                      />
                      <path
                        d="M7.43901 11.5676L5.03009 9.15868C4.88944 9.01808 4.69871 8.93909 4.49984 8.93909C4.30097 8.93909 4.11024 9.01808 3.96959 9.15868C3.82899 9.29933 3.75 9.49006 3.75 9.68893C3.75 9.8878 3.82899 10.0785 3.96959 10.2192L6.37851 12.6281C6.51781 12.7675 6.68319 12.878 6.86522 12.9534C7.04725 13.0288 7.24235 13.0677 7.43938 13.0677C7.63642 13.0677 7.83152 13.0288 8.01355 12.9534C8.19558 12.878 8.36096 12.7675 8.50026 12.6281L13.8483 7.28009C13.9889 7.13944 14.0679 6.94871 14.0679 6.74984C14.0679 6.55097 13.9889 6.36024 13.8483 6.21959C13.7076 6.07899 13.5169 6 13.318 6C13.1191 6 12.9284 6.07899 12.7878 6.21959L7.43901 11.5676Z"
                        fill="#0B0C0E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1946_7151">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Form>
          <InputGroup>
            <label>Phone number</label>
            <input
              type="phone"
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("phone", event.target.value);
              }}
              disabled={loading || Boolean(operationId)}
              placeholder="12345678901"
            />
            <span
              style={{ textAlign: "center", opacity: 0.5, fontSize: "12px" }}
            >
              In the international format
            </span>
          </InputGroup>

          <InputGroup
            style={{
              marginTop: "16px",
            }}
          >
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("password", event.target.value);
              }}
              disabled={loading || Boolean(operationId)}
            />
          </InputGroup>

          <InputGroup
            style={{
              height: operationId ? "109px" : "0px",
              marginTop: operationId ? "16px" : "0px",
            }}
          >
            <label>Code</label>
            <input
              type="number"
              value={code}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("code", event.target.value);
              }}
              disabled={loading}
            />
            <span
              style={{ textAlign: "center", opacity: 0.5, fontSize: "12px" }}
            >
              Please check your{" "}
              <a
                href="https://telegram.me/+42777"
                target="_blank"
                rel="noreferrer"
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
              sx={{ width: "100%" }}
              loading={loading}
              disabled={loading}
              onClick={!operationId ? submitPhoneAndPassword : submitPhoneCode}
              value={loading ? "Loading" : "Submit"}
            />
          </ButtonWrapper>
        </Form>
        <div>
          <Subtitle>Our Commitment to Data Security:</Subtitle>
          <ul
            style={{
              margin: "0",
              padding: 0,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "flex-start",
              gap: "12px",
            }}
          >
            {[
              "Secure Transmission: All your data is securely transmitted and encrypted.",
              "Explicit Consent: We only collect and store data with your explicit consent.",
              "No Unsolicited Messaging: We won’t message anyone unless you agree to it first.",
            ].map((item) => (
              <li
                key={item}
                style={{
                  margin: "0 20px",
                  padding: "4px 0",
                  fontSize: "14px",
                  fontWeight: 300,
                  listStyleType: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  gap: "12px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1946_7151)">
                    <path
                      d="M9 0C7.21997 0 5.47991 0.527841 3.99987 1.51677C2.51983 2.50571 1.36628 3.91131 0.685088 5.55585C0.00389957 7.20038 -0.17433 9.00998 0.172937 10.7558C0.520204 12.5016 1.37737 14.1053 2.63604 15.364C3.89472 16.6226 5.49836 17.4798 7.24419 17.8271C8.99002 18.1743 10.7996 17.9961 12.4442 17.3149C14.0887 16.6337 15.4943 15.4802 16.4832 14.0001C17.4722 12.5201 18 10.78 18 9C17.9974 6.61384 17.0484 4.32616 15.3611 2.63889C13.6738 0.951621 11.3862 0.00258081 9 0V0ZM9 16.5C7.51664 16.5 6.0666 16.0601 4.83323 15.236C3.59986 14.4119 2.63856 13.2406 2.07091 11.8701C1.50325 10.4997 1.35473 8.99168 1.64411 7.53682C1.9335 6.08197 2.64781 4.74559 3.6967 3.6967C4.7456 2.64781 6.08197 1.9335 7.53683 1.64411C8.99168 1.35472 10.4997 1.50325 11.8701 2.0709C13.2406 2.63856 14.4119 3.59985 15.236 4.83322C16.0601 6.06659 16.5 7.51664 16.5 9C16.4978 10.9885 15.7069 12.8948 14.3009 14.3009C12.8948 15.7069 10.9885 16.4978 9 16.5Z"
                      fill="#0B0C0E"
                    />
                    <path
                      d="M7.43901 11.5676L5.03009 9.15868C4.88944 9.01808 4.69871 8.93909 4.49984 8.93909C4.30097 8.93909 4.11024 9.01808 3.96959 9.15868C3.82899 9.29933 3.75 9.49006 3.75 9.68893C3.75 9.8878 3.82899 10.0785 3.96959 10.2192L6.37851 12.6281C6.51781 12.7675 6.68319 12.878 6.86522 12.9534C7.04725 13.0288 7.24235 13.0677 7.43938 13.0677C7.63642 13.0677 7.83152 13.0288 8.01355 12.9534C8.19558 12.878 8.36096 12.7675 8.50026 12.6281L13.8483 7.28009C13.9889 7.13944 14.0679 6.94871 14.0679 6.74984C14.0679 6.55097 13.9889 6.36024 13.8483 6.21959C13.7076 6.07899 13.5169 6 13.318 6C13.1191 6 12.9284 6.07899 12.7878 6.21959L7.43901 11.5676Z"
                      fill="#0B0C0E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1946_7151">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    </Container>
  );
};

export default TelegramAuth;

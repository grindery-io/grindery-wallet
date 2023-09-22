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
  gap: 24px;
  max-width: 320px;
  margin: 20px auto;
  padding: 24px;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  margin: 25px 0 10px;
  padding: 0;
`;

const Subtitle = styled.h5`
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin: 0;
  padding: 0;
`;

const Form = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
  margin: 20px auto;

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
  margin: 16px 0 0;

  & > div {
    margin: 0;
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
        <Title>Sign in with Telegram</Title>
        <Subtitle>
          Use Telegram credentials to grant Grindery access to your contacts
          list.
        </Subtitle>
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
            />
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
              height: operationId ? "69px" : "0px",
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
      </>
    </Container>
  );
};

export default TelegramAuth;

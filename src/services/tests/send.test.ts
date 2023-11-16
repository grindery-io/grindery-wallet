import axios from "axios";
import { sendTokensRequest } from "../send";
import { WALLET_API_URL } from "../../constants";

jest.mock("axios");

describe("sendTokensRequest", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call axios.post with the correct arguments", async () => {
    const mockResponse = {
      data: {
        transactionHash: "0x123",
      },
    };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce(mockResponse);

    const recipientTgId = "123";
    const amount = "1";
    const message = "Test message";
    const recipientHandle = "test_handle";
    const recipientName = "Test User";
    const withConfirmation = true;

    const result = await sendTokensRequest(
      recipientTgId,
      amount,
      message,
      recipientHandle,
      recipientName,
      withConfirmation
    );

    expect(axios.post).toHaveBeenCalledWith(
      `${WALLET_API_URL}/v2/send`,
      {
        recipientTgId,
        amount,
        message,
        recipientHandle,
        recipientName,
        withConfirmation,
      },
      {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should call axios.post with the correct arguments when optional parameters are not provided", async () => {
    const mockResponse = {
      data: {
        transactionHash: "0x123",
      },
    };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce(mockResponse);

    const recipientTgId = "123";
    const amount = "1";

    const result = await sendTokensRequest(recipientTgId, amount);

    expect(axios.post).toHaveBeenCalledWith(
      `${WALLET_API_URL}/v2/send`,
      {
        recipientTgId,
        amount,
      },
      {
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });
});

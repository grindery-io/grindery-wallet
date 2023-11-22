import axios from "axios";
import { getBalanceRequest, getFullBalanceRequest } from "../balance";
import { WALLET_API_URL } from "../../constants";

jest.mock("axios");

describe("getFullBalanceRequest", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call axios.get with the correct arguments", async () => {
    const mockResponse = {
      data: {
        assets: [],
        syncStatus: { timestamp: 1631234567 },
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockResponse
    );

    const controller = new AbortController();
    const result = await getFullBalanceRequest("polygon", controller);

    expect(axios.get).toHaveBeenCalledWith(
      `${WALLET_API_URL}/v2/balance/`,
      expect.objectContaining({
        signal: controller.signal,
        headers: {
          Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
        },
      })
    );
    expect(result).toEqual(mockResponse);
  });
});

describe("getBalanceRequest", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call axios.post with the correct arguments", async () => {
    const mockResponse = {
      data: {
        balance: "100",
      },
    };
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce(mockResponse);

    const controller = new AbortController();
    const result = await getBalanceRequest(
      "0x123",
      "0x456",
      "matic",
      controller
    );

    expect(axios.post).toHaveBeenCalledWith(
      `${WALLET_API_URL}/v2/balance/`,
      {
        userAddress: "0x123",
        contractAddress: "0x456",
        chainId: "matic",
      },
      {
        signal: controller.signal,
      }
    );
    expect(result).toEqual(mockResponse);
  });
});

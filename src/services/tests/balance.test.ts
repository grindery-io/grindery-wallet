import axios from "axios";
import { getFullBalanceRequest } from "../balance";
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
      `${WALLET_API_URL}/v2/balance/?chain=polygon`,
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

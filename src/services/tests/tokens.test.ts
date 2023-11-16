import axios from "axios";
import { getTokensPriceRequest } from "../tokens";
import { WALLET_API_URL } from "../../constants";

jest.mock("axios");

describe("getTokensPriceRequest", () => {
  it("should call axios.get with the correct URL and headers", async () => {
    const token = "test-token";
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        initData: token,
      },
    };

    await getTokensPriceRequest();

    expect(axios.get).toHaveBeenCalledWith(
      `${WALLET_API_URL}/v2/tokens/price?symbol=undefined`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it("should return the response data", async () => {
    const responseData = {
      status: {
        timestamp: "2022-01-01T00:00:00.000Z",
        error_code: 0,
        error_message: null,
        elapsed: 10,
        credit_count: 1,
        notice: null,
      },
      data: {
        BTC: [
          {
            id: 1,
            name: "Bitcoin",
            symbol: "BTC",
            slug: "bitcoin",
            num_market_pairs: 10000,
            date_added: "2009-01-03T00:00:00.000Z",
            tags: [
              {
                slug: "store-of-value",
                name: "Store of Value",
                category: "asset",
              },
            ],
            max_supply: 21000000,
            circulating_supply: 18700000,
            total_supply: 21000000,
            is_active: 1,
            infinite_supply: false,
            platform: null,
            cmc_rank: 1,
            is_fiat: 0,
            self_reported_circulating_supply: null,
            self_reported_market_cap: null,
            tvl_ratio: null,
            last_updated: "2022-01-01T00:00:00.000Z",
            quote: {
              USD: {
                price: 50000,
                volume_24h: 1000000,
                volume_change_24h: 0.1,
                percent_change_1h: 0.5,
                percent_change_24h: 1.2,
                percent_change_7d: 3.4,
                percent_change_30d: 5.6,
                percent_change_60d: 7.8,
                percent_change_90d: 9.0,
                market_cap: 935000000000,
                market_cap_dominance: 0.4,
                fully_diluted_market_cap: 1050000000000,
                tvl: null,
                last_updated: "2022-01-01T00:00:00.000Z",
              },
            },
          },
        ],
      },
    };
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getTokensPriceRequest();

    expect(result.data).toEqual(responseData);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    // @ts-ignore
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getTokensPriceRequest()).rejects.toThrow(errorMessage);
  });
});

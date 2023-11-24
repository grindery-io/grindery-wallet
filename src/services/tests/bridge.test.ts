import axios from "axios";
import { searchBridgeTokensRequest } from "../bridge";

jest.mock("axios");

describe("searchBridgeTokensRequest", () => {
  it("should call axios.get with the correct URL and options", async () => {
    const chainIds = "137";
    const controller = new AbortController();

    await searchBridgeTokensRequest(chainIds, controller);

    expect(axios.get).toHaveBeenCalledWith(
      `https://li.quest/v1/tokens?chains=${chainIds}`,
      {
        signal: controller.signal,
      }
    );
  });

  it("should return the response data", async () => {
    const responseData = {
      data: [
        {
          id: "1",
          name: "Token 1",
          symbol: "TKN1",
        },
        {
          id: "2",
          name: "Token 2",
          symbol: "TKN2",
        },
      ],
    };

    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await searchBridgeTokensRequest();

    expect(result.data).toEqual(responseData);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    // @ts-ignore
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(searchBridgeTokensRequest()).rejects.toThrow(errorMessage);
  });
});

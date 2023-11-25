import axios from "axios";
import { getBridgeTokensRequest, getBridgeConnectionsRequest } from "../bridge";

jest.mock("axios");

describe("getBridgeTokensRequest", () => {
  it("should call axios.get with the correct URL and options", async () => {
    const chainIds = "137";
    const controller = new AbortController();

    await getBridgeTokensRequest(chainIds, controller);

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

    const result = await getBridgeTokensRequest();

    expect(result.data).toEqual(responseData);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    // @ts-ignore
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getBridgeTokensRequest()).rejects.toThrow(errorMessage);
  });
});

describe("getBridgeConnectionsRequest", () => {
  it("should call axios.get with the correct URL and options", async () => {
    const fromChain = "ETH";
    const toChain = "BSC";
    const fromToken = "ETH-TKN";
    const toToken = "BSC-TKN";
    const controller = new AbortController();

    await getBridgeConnectionsRequest({
      fromChain,
      toChain,
      fromToken,
      toToken,
      controller,
    });

    const expectedURL = `https://li.quest/v1/connections?fromChain=${fromChain}&toChain=${toChain}&fromToken=${fromToken}&toToken=${toToken}`;
    expect(axios.get).toHaveBeenCalledWith(expectedURL, {
      signal: controller.signal,
    });
  });

  it("should return the response data", async () => {
    const responseData = {
      data: [
        {
          id: "1",
          name: "Connection 1",
          status: "active",
        },
        {
          id: "2",
          name: "Connection 2",
          status: "inactive",
        },
      ],
    };

    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getBridgeConnectionsRequest({});

    expect(result.data).toEqual(responseData);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    // @ts-ignore
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getBridgeConnectionsRequest({})).rejects.toThrow(errorMessage);
  });
});

import axios from "axios";
import { getConfigRequest } from "../config";
import { WALLET_API_URL } from "../../constants";

jest.mock("axios");

describe("getConfigRequest", () => {
  it("should call axios.get with the correct arguments", async () => {
    const mockData = { data: {} };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockData
    );

    await getConfigRequest();

    expect(axios.get).toHaveBeenCalledWith(`${WALLET_API_URL}/v2/config`, {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    });
  });

  it("should return the response data", async () => {
    const mockData = { data: { foo: "bar" } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockData
    );

    const response = await getConfigRequest();

    expect(response.data).toEqual(mockData.data);
  });

  it("should throw an error if the request fails", async () => {
    const mockError = new Error("Request failed");
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(
      mockError
    );

    await expect(getConfigRequest()).rejects.toThrow(mockError);
  });
});

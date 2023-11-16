import axios from "axios";
import { getMeRequest } from "../me";
import { WALLET_API_URL } from "../../constants";

jest.mock("axios");

describe("getMeRequest", () => {
  it("should call axios.get with the correct URL and headers", async () => {
    const token = "test-token";
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        initData: token,
      },
    };

    await getMeRequest();

    expect(axios.get).toHaveBeenCalledWith(`${WALLET_API_URL}/v2/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it("should return the response data", async () => {
    const responseData = { name: "John Doe", email: "john.doe@example.com" };
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getMeRequest();

    expect(result.data).toEqual(responseData);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    // @ts-ignore
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getMeRequest()).rejects.toThrow(errorMessage);
  });
});

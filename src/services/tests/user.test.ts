import axios from "axios";
import { getUserRequest } from "../user";

jest.mock("axios");

describe("getUserRequest", () => {
  const userId = "123";
  const initData = "test-init-data";
  const controller = new AbortController();

  beforeEach(() => {
    jest.clearAllMocks();
    window.Telegram = {
      // @ts-ignore
      WebApp: {
        initData,
      },
    };
  });

  it("should call axios.get with the correct arguments", async () => {
    const expectedUrl = `https://wallet-api.grindery.io/v2/user?id=${userId}`;
    const expectedHeaders = {
      Authorization: `Bearer ${initData}`,
    };

    await getUserRequest(userId, controller);

    expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
      signal: controller.signal,
      headers: expectedHeaders,
    });
  });

  it("should not include Authorization header if window.Telegram.WebApp.initData is undefined", async () => {
    // @ts-ignore
    window.Telegram.WebApp.initData = undefined;

    await getUserRequest(userId, controller);

    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      signal: controller.signal,
      headers: {
        Authorization: "Bearer ",
      },
    });
  });

  it("should return the response from axios.get", async () => {
    const expectedResponse = { data: { name: "John Doe" } };
    // @ts-ignore
    axios.get.mockResolvedValueOnce(expectedResponse);

    const response = await getUserRequest(userId, controller);

    expect(response).toEqual(expectedResponse);
  });

  it("should throw an error if axios.get throws an error", async () => {
    const expectedError = new Error("Request failed");
    // @ts-ignore
    axios.get.mockRejectedValueOnce(expectedError);

    await expect(getUserRequest(userId, controller)).rejects.toThrow(
      expectedError
    );
  });
});

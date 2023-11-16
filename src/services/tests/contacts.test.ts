import axios from "axios";
import { getContactsRequest } from "../contacts";
import { WALLET_API_URL } from "../../constants";

jest.mock("axios");

describe("getContactsRequest", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call axios.get with the correct arguments", async () => {
    const mockResponse = {
      data: {
        contacts: [
          {
            name: "John Doe",
            address: "0x123",
          },
          {
            name: "Jane Smith",
            address: "0x456",
          },
        ],
      },
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      mockResponse
    );

    const result = await getContactsRequest();

    expect(axios.get).toHaveBeenCalledWith(`${WALLET_API_URL}/v2/contacts`, {
      headers: {
        Authorization: "Bearer " + window.Telegram?.WebApp?.initData,
      },
    });
    expect(result).toEqual(mockResponse);
  });
});

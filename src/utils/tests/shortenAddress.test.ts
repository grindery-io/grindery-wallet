import { shortenAddress } from "../shortenAddress";

describe("shortenAddress", () => {
  it("should shorten a 42-character address to 10 characters", () => {
    const address = "0x1234567890123456789012345678901234567890";
    const expected = "0x1234...7890";
    const result = shortenAddress(address);
    expect(result).toEqual(expected);
  });

  it("should shorten a 40-character address to 10 characters", () => {
    const address = "0x123456789012345678901234567890123456789";
    const expected = "0x1234...6789";
    const result = shortenAddress(address);
    expect(result).toEqual(expected);
  });

  it("should shorten a 10-character address to 10 characters", () => {
    const address = "0x1234567890";
    const expected = "0x1234...7890";
    const result = shortenAddress(address);
    expect(result).toEqual(expected);
  });

  it("should shorten a 5-character address to 5 characters", () => {
    const address = "0x12345";
    const expected = "0x12345";
    const result = shortenAddress(address);
    expect(result).toEqual(expected);
  });
});

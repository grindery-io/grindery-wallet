import { formatBalance } from "../formatBalance";

describe("formatBalance", () => {
  it("should format a balance of 0", () => {
    const balance = 0;
    const expected = {
      formatted: "0",
      full: 0,
      hasHiddenPart: false,
    };
    const result = formatBalance(balance);
    expect(result).toEqual(expected);
  });

  it("should format a balance of 1234", () => {
    const balance = 1234;
    const expected = {
      formatted: "1,234",
      full: 1234,
      hasHiddenPart: false,
    };
    const result = formatBalance(balance);
    expect(result).toEqual(expected);
  });

  it("should format a balance of 1234.56", () => {
    const balance = 1234.56;
    const expected = {
      formatted: "1,234.56",
      full: 1234.56,
      hasHiddenPart: false,
    };
    const result = formatBalance(balance);
    expect(result).toEqual(expected);
  });

  it("should format a balance of 1234.5678", () => {
    const balance = 1234.5678;
    const expected = {
      formatted: "1,234.57",
      full: 1234.5678,
      hasHiddenPart: true,
    };
    const result = formatBalance(balance);
    expect(result).toEqual(expected);
  });

  it("should format a balance of '1234.5678'", () => {
    const balance = "1234.5678";
    const expected = {
      formatted: "1,234.57",
      full: 1234.5678,
      hasHiddenPart: true,
    };
    const result = formatBalance(balance);
    expect(result).toEqual(expected);
  });

  it("should format a balance of '1234,5678'", () => {
    const balance = "1234,5678";
    const expected = {
      formatted: "1,234",
      full: 1234,
      hasHiddenPart: false,
    };
    const result = formatBalance(balance);
    expect(result).toEqual(expected);
  });
});

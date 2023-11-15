import { getLocalStorageSize } from "../getLocalStorageSize";

describe("getLocalStorageSize", () => {
  it("should return a string", () => {
    expect(typeof getLocalStorageSize()).toBe("string");
  });

  it("should return a value in MB", () => {
    expect(getLocalStorageSize()).toMatch(/\d+\.\d+ MB/);
  });

  it("should return a value greater than or equal to 0 MB", () => {
    const size = parseFloat(getLocalStorageSize());
    expect(size).toBeGreaterThanOrEqual(0);
  });
});

import { GRINDERY_ONE_TOKEN } from "../../constants";
import { sortTokens } from "../sortTokens";

describe("sortTokens", () => {
  const SECOND_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  it("should sort tokens correctly", () => {
    const tokens = [
      { address: "0x3333333333333333333333333333333333333333" },
      { address: SECOND_TOKEN_ADDRESS },
      GRINDERY_ONE_TOKEN,
      { address: "0x4444444444444444444444444444444444444444" },
    ];

    // @ts-ignore
    const sortedTokens = sortTokens(tokens);

    expect(sortedTokens).toEqual([
      GRINDERY_ONE_TOKEN,
      { address: SECOND_TOKEN_ADDRESS },
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ]);
  });

  it("should sort tokens with GRINDERY_ONE_TOKEN correctly", () => {
    const tokens = [
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ];

    // @ts-ignore
    const sortedTokens = sortTokens([...tokens, GRINDERY_ONE_TOKEN]);

    expect(sortedTokens).toEqual([
      GRINDERY_ONE_TOKEN,
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ]);
  });

  it("should sort tokens with SECOND_TOKEN_ADDRESS correctly", () => {
    const tokens = [
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ];

    const sortedTokens = sortTokens([
      // @ts-ignore
      ...tokens,
      // @ts-ignore
      { address: SECOND_TOKEN_ADDRESS },
    ]);

    expect(sortedTokens).toEqual([
      { address: SECOND_TOKEN_ADDRESS },
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ]);
  });

  it("should sort tokens with GRINDERY_ONE_TOKEN and SECOND_TOKEN_ADDRESS correctly", () => {
    const tokens = [
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ];

    const sortedTokens = sortTokens([
      // @ts-ignore
      ...tokens,
      // @ts-ignore
      { address: SECOND_TOKEN_ADDRESS },
      // @ts-ignore
      GRINDERY_ONE_TOKEN,
    ]);

    expect(sortedTokens).toEqual([
      GRINDERY_ONE_TOKEN,
      { address: SECOND_TOKEN_ADDRESS },
      { address: "0x3333333333333333333333333333333333333333" },
      { address: "0x4444444444444444444444444444444444444444" },
    ]);
  });
});

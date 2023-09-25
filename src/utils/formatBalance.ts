export const formatBalance = (balance: number = 0) => {
  return {
    formatted: balance?.toFixed(2).replace(/[.,]00$/, ""),
    full: balance,
    hasHiddenPart: balance.toString().split(".")?.[1]?.length > 2,
  };
};

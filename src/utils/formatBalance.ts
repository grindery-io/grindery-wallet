export const formatBalance = (balance: number | string = 0) => {
  const balanceNumber = parseFloat(balance.toString());
  return {
    formatted: parseFloat(
      (balanceNumber || 0).toFixed(2).replace(/[.,]00$/, "")
    ).toLocaleString(),
    full: balanceNumber,
    hasHiddenPart: balanceNumber.toString().split(".")?.[1]?.length > 2,
  };
};

export const shortenAddress = (address: string): string => {
  return address.length > 10
    ? address.substring(0, 6) + "..." + address.substring(address.length - 4)
    : address;
};

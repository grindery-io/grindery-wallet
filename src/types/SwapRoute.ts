export type SwapRoute = {
  route: {
    action: string;
    protocol: string;
    tokenIn: string[];
    tokenOut: string[];
    positionInId: string[];
    positionOutId: string[];
  }[];
  gas: number;
  amountOut: string;
  priceImpact: number;
  createdAt: number;
  tx: any;
};

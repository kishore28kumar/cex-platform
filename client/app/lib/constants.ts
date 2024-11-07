import { Connection } from "@solana/web3.js";
import axios from "axios";
import { console } from "inspector";

let LAST_UPDATED: number | null = null;
let prices: {
  [key: string]: {
    price: string;
  };
};
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // every 60s
export let SUPPORTED_TOKENS: {
  name: string;
  mint: string;
  native: boolean;
  price: string;
}[] = [
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1"
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1"

  },
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: false,
    price: "180",
  },
];

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL
  ) {
    try {
      const response = await axios.get(
        "https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112,"
      );
      const prices = response.data;
      LAST_UPDATED = new Date().getTime();
    } catch (error) {
      console.log(error);
    }
  }
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.name],
  }));
}

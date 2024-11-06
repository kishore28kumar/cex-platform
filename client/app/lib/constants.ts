import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED : number | null = null;
let prices: {[key: string]:{
    price: string;
}}
const TOKEN_PRICE_REFRESH_INTERVAL = 60*1000; // every 60s
export let SUPPORTED_TOKENS: {
    name: string;
    mint: string;
    native: boolean;
}[] = [{
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false
},{
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false
},{
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: false
}]

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
    if(!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL){
        const response = await axios.get("https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112,")
        const prices = response.data;
        LAST_UPDATED =  new Date().getTime();
    }
    return SUPPORTED_TOKENS.map(s => ({
        ...s,
        price:  prices[s.name]
    }))
}
import { NextRequest } from "next/server";
import {getAccount, getAssociatedTokenAddress} from "@solana/spl-token"
import { connection, SUPPORTED_TOKENS } from "@/app/lib/constants";
import { PublicKey } from "@solana/web3.js";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") as unknown as string;
  const balances = await Promise.all(SUPPORTED_TOKENS.map(token => getAccountBalance(token,address))
  // ata => associated token account
  // pda => program derived address
}

function getAccountBalance(token: {
  name: string;
  mint: string;
}, address: string){
  const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address))
  const account = await getAccount(connection,ata);
  
}
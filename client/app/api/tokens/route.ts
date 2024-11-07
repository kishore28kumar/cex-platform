import { NextRequest, NextResponse } from "next/server";
import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { connection, getSupportedTokens } from "@/app/lib/constants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") as unknown as string;
  const SupportedTokens = await getSupportedTokens();
  const balances = await Promise.all(
    SupportedTokens.map((token) => getAccountBalance(token, address))
  );
  // ata => associated token account
  // pda => program derived address
  return NextResponse.json({
    tokens: SupportedTokens.map((token, index) => ({
      ...token,
      balance: balances[index],
    })),
  });
}

async function getAccountBalance(
  token: {
    name: string;
    mint: string;
    native: boolean;
  },
  address: string
) {
  if (token.native) {
    let balance = await connection.getBalance(new PublicKey(address));
    return balance / LAMPORTS_PER_SOL;
  }
  const ata = await getAssociatedTokenAddress(
    new PublicKey(token.mint),
    new PublicKey(address)
  );
  try {
    const account = await getAccount(connection, ata);
    const mint = await getMint(connection, new PublicKey(token.mint));
    return Number(account.amount) / 10 ** mint.decimals;
  } catch (error) {
    return 0;
  }
}

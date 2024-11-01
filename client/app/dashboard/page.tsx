import { getServerSession } from "next-auth";
import { ProfileCard } from "../components/ProfileCard";
import db from "@/app/db";
import { authConfig } from "../lib/auth"

async function getBalance() {
  const session = await getServerSession(authConfig);
  db.solWallet.findFirst({
    where: {
      userID: session?.user?.uid
    }
  });
}

export default async function () {
  return (
    <div>
      <ProfileCard />
    </div>
  );
}

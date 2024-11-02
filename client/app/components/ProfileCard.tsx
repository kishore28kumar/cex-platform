"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useEffect, useState } from "react";

export const ProfileCard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const route = useRouter();

  if (session.status == "loading") {
    return <div>Loading...</div>;
  }

  if (!session.data?.user) {
    route.push("/");
    return null;
  }

  return (
    <div className="pt-4 px-4 flex justify-center">
      <div className="max-w-3xl bg-white w-full rounded shadow p-12 text-3xl font-bold">
        <Greeting
          image={session.data?.user?.image ?? ""}
          name={session.data?.user?.name ?? ""}
        />
        <Assets publicKey={publicKey} />
      </div>
    </div>
  );
};

function Greeting({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex items-center">
      <img className="rounded-full h-20 w-20" src={image} alt="" />
      <div className="text-3xl font-bold pl-3">Welcome Back, {name}!</div>
    </div>
  );
}

function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () =>{
        clearTimeout(timeout);
      } 
    }
  }, [copied]);
  return (
    <div className="text-xl text-slate-400 pt-3">
      Account Assets
      <br />
      <div className="flex justify-between">
        <div></div>
        <div>
          <PrimaryButton
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
            }}
          >
            {copied ? "Copied" : "Your Wallet Address"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

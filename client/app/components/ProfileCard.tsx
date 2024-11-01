"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const ProfileCard = () => {
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
        <Assets />
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

function Assets() {
  return <div className="text-xl text-slate-400 pt-3">Account Assets</div>;
}

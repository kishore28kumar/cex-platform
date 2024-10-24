"use client";
import { useSession } from "next-auth/react";

export default function () {
  const session = useSession();
  return <div className="pt-4 px-4 flex justify-center">
    <div className="max-w-xl bg-white w-full rounded">Welcome back</div>
    </div>;
}

"use client";
import { signIn, useSession } from "next-auth/react"
import { PrimaryButton, SecondaryButton } from "./Button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const session = useSession();
  const route = useRouter();

  return (
    <div>
      <div className="text-6xl font-bold flex justify-center">
        The crypto of tomorrow, <span className="text-blue-500">today</span>
      </div>
      <div className="flex justify-center text-2xl font-medium pt-6 text-blue-500">
        Create a frictionless wallet with just a Google Account.
      </div>
      <div className=" flex justify-center pt-6 ">
        {session.data?.user ? <SecondaryButton
          onClick={() => route.push('./dashboard')}
        >
          Go to Dashboard
        </SecondaryButton>:<SecondaryButton
          onClick={() => signIn('google')}
        >
          Login with Google
        </SecondaryButton>}
      </div>
    </div>
  );
};

export default Hero;

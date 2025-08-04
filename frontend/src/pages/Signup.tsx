import { SignUp } from "@clerk/clerk-react";

const CLERK_SIGNIN_URL = import.meta.env.VITE_CLERK_SIGNIN_URL;

export default function Signup() {

  return (
    <div className="flex h-[700px] w-full mt-7 mb-14 justify-center items-center">
      <header>
        <SignUp path="/signup" routing="path" signInUrl={CLERK_SIGNIN_URL}/>
      </header>
    </div>
  );
}
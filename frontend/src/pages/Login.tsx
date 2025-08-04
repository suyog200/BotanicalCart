import { SignIn } from "@clerk/clerk-react";

const CLERK_SIGN_UP_URL = import.meta.env.VITE_CLERK_SIGNUP_URL;

export default function Login() {

  return (
    <div className="flex h-[700px] w-full mt-7 mb-14 justify-center items-center">
      {/* Clerk sign-in component can be used here */}
      <header>
        <SignIn path="/login" routing="path" signUpUrl={CLERK_SIGN_UP_URL}/>
      </header>
    </div>
  );
}

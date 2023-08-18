import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Link href={"/"}>Home</Link>
      <ClerkSignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </>
  );
}

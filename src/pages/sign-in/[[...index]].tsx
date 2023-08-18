import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <>
      <ClerkSignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </>
  );
}

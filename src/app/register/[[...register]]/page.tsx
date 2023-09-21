"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const { isLoaded, signUp } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded || password != confirm) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div>
      {!pendingVerification && (
        <form className="bg-white rounded-xl w-72 flex flex-col gap-4 p-6 mt-4">
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" className="bg-transparent border-b border-b-neutral-200" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="bg-transparent border-b border-b-neutral-200" />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input onChange={(e) => setConfirm(e.target.value)} id="confirm-password" name="confirm-password" type="password" className="bg-transparent border-b border-b-neutral-200" />
          </div>
          <button className="self-start bg-black text-white px-2 py-1 rounded-md" onClick={handleSubmit}>Register</button>
        </form>
      )}
      {pendingVerification && (
        <div>
          <form className="bg-white rounded-xl w-72 flex flex-col gap-4 p-6 mt-4">
            <label htmlFor="code">
              Check your email for a confirmation code
            </label>
            <input
              value={code}
              placeholder="Code..."
              name="code"
              id="code"
              onChange={(e) => setCode(e.target.value)}
              className="bg-transparent border-b border-b-neutral-200"
            />
            <button className="self-start bg-black text-white px-2 py-1 rounded-md" onClick={onPressVerify}>
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
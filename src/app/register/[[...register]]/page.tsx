"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RegisterAuthForm = {
  emailAddress: string,
  password: string,
  confirm: string,
  error: string
}

export default function Register() {
  const { isLoaded, signUp } = useSignUp();
  const [authForm, setAuthForm] = useState<RegisterAuthForm>({ emailAddress: "", password: "", confirm: "", error: "" });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAuthForm({ ...authForm, error: "" });
    if (!isLoaded) {
      return;
    }
    if (authForm.password != authForm.confirm) {
      setAuthForm({ ...authForm, error: "Passwords must match" });
      return;
    }

    try {
      await signUp.create({
        emailAddress: authForm.emailAddress,
        password: authForm.password
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setAuthForm({ ...authForm, error: err.errors[0].message });
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
      setAuthForm({ ...authForm, error: err.errors[0].message });
    }
  };

  return (
    <div>
      {!pendingVerification && (
        <form className="bg-white dark:bg-neutral-700 rounded-xl w-72 flex flex-col gap-4 p-6 mt-4">
          <div style={{
            display: authForm.error ? "block" : "none"
          }} className="bg-red-600 text-white px-4 rounded-md">Error: {authForm.error}</div>
          <div>
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setAuthForm({ ...authForm, emailAddress: e.target.value })} id="email" name="email" type="email" className="bg-transparent border-b border-b-neutral-200" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} id="password" name="password" type="password" className="bg-transparent border-b border-b-neutral-200" />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input onChange={(e) => setAuthForm({ ...authForm, confirm: e.target.value })} id="confirm-password" name="confirm-password" type="password" className="bg-transparent border-b border-b-neutral-200" />
          </div>
          <button className="self-start bg-blue-400 dark:bg-blue-500 text-white px-2 py-1 rounded-md" onClick={handleSubmit}>Register</button>
        </form>
      )}
      {pendingVerification && (
        <div>
          <form className="bg-white dark:bg-neutral-700 rounded-xl w-72 flex flex-col gap-4 p-6 mt-4">
            <div style={{
              display: authForm.error ? "block" : "none"
            }} className="bg-red-600 text-white px-4 rounded-md">Error: {authForm.error}</div>
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
            <button className="self-start bg-blue-400 dark:bg-blue-500 text-white px-2 py-1 rounded-md" onClick={onPressVerify}>
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
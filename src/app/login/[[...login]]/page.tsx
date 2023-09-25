"use client"

import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type LoginAuthForm = {
  emailAddress: string,
  password: string,
  error: string
}

export default function LogIn() {
  const logIn = useSignIn();
  const user = useUser();
  const router = useRouter();
  const [authForm, setAuthForm] = useState<LoginAuthForm>({ emailAddress: "", password: "", error: "" });
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/dashboard")
    }
  }, [router, user.isSignedIn])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logIn.signIn?.create({
      identifier: authForm.emailAddress,
      password: authForm.password
    }).then((res) => {
      if (res.status === "complete") {
        if (typeof window != "undefined") {
          window.location.assign("/dashboard");
        }
      }
    }).catch((err: any) => {
      console.log(`Err: ${err}}`)
      setAuthForm({ ...authForm, error: err.errors[0].message });
    });
  }

  return (
    <main>
      {
        !user.isSignedIn ? (
          <form className="flex flex-col gap-4 bg-white w-64 p-4 rounded-xl mt-4" onSubmit={handleSubmit}>
            <div style={{
              display: authForm.error ? "block" : "none"
            }} className="bg-red-600 text-white px-4 rounded-md">Error: {authForm.error}</div>
            <label>Email
              <input type="email" name="email" id="email" onChange={(event) => {
                setAuthForm({ ...authForm, emailAddress: event.currentTarget.value })
              }} className="bg-transparent border-b border-b-neutral-200" />
            </label>
            <label className="pb-4">Password
              <input type="password" name="password" id="password" onChange={(event) => {
                setAuthForm({ ...authForm, password: event.currentTarget.value })
              }} className="bg-transparent border-b border-b-neutral-200" />
            </label>
            <button className="bg-blue-400 text-white w-20 px-2 py-1 rounded-md" type="submit">Login</button>
          </form>
        ) : null
      }
    </main>
  )
}
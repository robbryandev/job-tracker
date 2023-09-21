"use client"

import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogIn() {
  const logIn = useSignIn();
  const user = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/dashboard")
    }
  }, [user.isSignedIn])
  return (
    <main>
      {
        !user.isSignedIn ? (
          <form className="flex flex-col gap-4 bg-white w-64 p-4 rounded-xl mt-4" onSubmit={() => {
            logIn.signIn?.create({
              identifier: email,
              password
            })
          }}>
            <label>Email
              <input type="email" name="email" id="email" onChange={(event) => {
                setEmail(event.currentTarget.value)
              }} className="bg-transparent border-b border-b-neutral-200" />
            </label>
            <label className="pb-4">Password
              <input type="password" name="password" id="password" onChange={(event) => {
                setPassword(event.currentTarget.value)
              }} className="bg-transparent border-b border-b-neutral-200" />
            </label>
            <button className="bg-black text-white w-20 px-2 py-1 rounded-md" type="submit">Login</button>
          </form>
        ) : null
      }
    </main>
  )
}
"use client"
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useAuth();
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/dashboard")
    }
  }, [])
  return (
    <>
      <main>
        <h3>Main</h3>
      </main>
    </>
  )
}

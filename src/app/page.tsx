"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const user = useAuth();
  const scale = 0.35;
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/dashboard")
    }
  }, [])
  return (
    <>
      <main className="flex flex-col-reverse md:flex-row justify-center gap-16 md:gap-0">
        <div id="hero-msg" className="w-full md:w-2/5 md:min-h-[90%] flex flex-col justify-center">
          <div className="self-end mr-20 relative bottom-10 space-y-4">
            <h1 className="md:font-bold">Empowering Your Career Journey, One Job at a Time.</h1>
            <h1>Your Path to Success Starts Here.</h1>
            <h2>Start tracking today</h2>
            <div className="flex flex-row gap-4 mt-8">
              <Link href={"/login"} className="font-medium">LogIn</Link>
              <Link href={"/register"} className="font-semibold">Register</Link>
            </div>
          </div>
        </div>
        <div id="hero-img" className="md:min-h-[90vh] w-3/5 md:w-2/5 flex flex-col justify-center">
          <Image src={"/seeker.webp"} alt="job seeker" width={1600 * scale} height={1067 * scale} />
        </div>
      </main>
    </>
  )
}

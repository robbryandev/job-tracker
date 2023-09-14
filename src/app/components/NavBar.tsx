"use client"
import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const user = useAuth();
  const path = usePathname();
  return (
    <nav className='space-x-10'>
      {
        user.isSignedIn ? (
          <>
            <UserButton afterSignOutUrl='/' />
            {
              path == "/dashboard" ? (
                <Link href={"/"}>Home</Link>
              ) : (
                <Link href={"/dashboard"}>Dashboard</Link>
              )
            }
          </>
        ) : (
          <>
            <Link href={"/register"}>Register</Link>
            <Link href={"/login"}>LogIn</Link>
          </>
        )
      }
    </nav>
  )
}
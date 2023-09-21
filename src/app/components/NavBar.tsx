"use client"

import { useAuth, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const user = useAuth();
  const { signOut } = useClerk();
  const path = usePathname();
  return (
    <nav className='space-x-10'>
      {
        user.isSignedIn ? (
          <>
            <button onClick={() => {
              signOut()
            }}>Logout</button>
            {path != "/dashboard" && <Link href={"/dashboard"}>Dashboard</Link>}
          </>
        ) : (
          <>
            {path != "/register" && <Link href={"/register"}>Register</Link>}
            {path != "/login" && <Link href={"/login"}>LogIn</Link>}
          </>
        )
      }
    </nav>
  )
}
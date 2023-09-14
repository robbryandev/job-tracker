import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from './components/NavBar'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Tracker',
  description: 'simple web app for tracking applications',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className + " px-10"}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

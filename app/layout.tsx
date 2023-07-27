import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './redux/provider'
import { ApolloWrapper } from '@/lib/apollo-wrapper'
import { SessionProvider } from 'next-auth/react'
import { NextAuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

interface Iprops {
  session: any,
  children: React.ReactNode
}


export default function RootLayout({
  children, session
} : Iprops) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            <NextAuthProvider session={session}>
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
            </NextAuthProvider>
        </Providers>
        </body>
    </html>
  )
}

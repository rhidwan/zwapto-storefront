import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { NextAuthProvider } from "./providers";
import Navbar2 from "@/components/navbar/Navbar2";
import Footer from "../components/footer/Footer";

import { Session } from "next-auth";
import { cookies, headers } from "next/headers";

import "swiper/css";
import "swiper/css/pagination";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import Modal from "@/components/Modal/Modal";
import ResNavbar from "@/components/navbar/ResNavbar";
import ResFilter from "@/components/FilterBar/ResFilter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swojon | Bangladesh's trusted marketplace",
  description:
    "Swojon is the perfect place to declutter your home and make some extra money, or to find the perfect used item at a fraction of the price of new",
};

interface Iprops {
  session: any;
  children: React.ReactNode;
}

async function getSession(cookie: string): Promise<Session | null> {
  // console.log(process.env.NEXT_PUBLIC_BACKEND_AUTH_URL)
  // console.log("cookies", cookie)
  // try{
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_AUTH_URL}/session`, {
  //     headers: {
  //       Cookie: cookies().toString(),
  //     },
  //     credentials: 'include'
  //     });

  //   const session = await response.json();
  //   console.log("Got Session", session);
  //   return Object.keys(session).length > 0 ? session : null;
  // } catch {
  return null;
  // }
}

export default async function RootLayout({ children }: Iprops) {
  // const router = useRouter();
  // const { pathname, query } = router;

  // const params = query.params;
  // const headersList = headers();
  // const activePath = headersList.get("x-invoke-path");

  // console.log("Current URL", activePath);

  const session: Session | null = await getSession(
    headers().get("cookie") ?? ""
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextAuthProvider session={session}>
            <ApolloWrapper>
              <div className="min-h-[30vh] relative">
                <ResNavbar />
                <ResFilter />
                {children}
              </div>

              <Modal />

              <Footer />
            </ApolloWrapper>
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}

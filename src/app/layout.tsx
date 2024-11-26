import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs";


import { UserButton } from "@clerk/nextjs";
import Header from "./components/header";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jubileusz",
  description: "Ckziu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <ClerkProvider afterSignOutUrl="/sign-in" publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-screen h-[13vh] flex justify-between items-center">
 

          <div className="w-full h-full">
            <Header />
          </div>

          <div className="absolute top-0 right-0 m-4">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '50px', 
                      height: '50px',
                    },
                  },
                }}
              />
            </div>
        </div>
        <div className="absolute bottom-0 left-0 text-gray-600 lg:text-xl md:text-l sm:text-sm text-sm">
          <h1>Created by Mateusz Zwierzchowski</h1>
        </div>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

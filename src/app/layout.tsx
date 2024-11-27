import type { FC, ReactNode } from "react"
import { siteMetadata } from "@/lib/config"
import type { Metadata } from "next";
import { ContextProviders } from "@/components/providers/ContextProviders"
import "./globals.css";
import LexifyLogo from "@/components/LexifyLogo"

export const metadata: Metadata = siteMetadata 

interface RootLayoutProps {
  children: Readonly<ReactNode>
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body id="app" className="antialiased">
        <div className="flex p-4 items-center">
          <LexifyLogo width={30} height={30} /> 
        <h1 className="ml-2 text-xl">Lexify</h1>
        </div>
        <ContextProviders>
          {children}
        </ContextProviders>
      </body>
    </html>
  );
}

export default RootLayout

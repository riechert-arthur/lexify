import type { FC, ReactNode } from "react"
import { siteMetadata } from "@/lib/config"
import type { Metadata } from "next";
import { ContextProviders } from "@/components/providers/ContextProviders"
import "./globals.css";

export const metadata: Metadata = siteMetadata 

interface RootLayoutProps {
  children: Readonly<ReactNode>
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <ContextProviders>
          {children}
        </ContextProviders>
      </body>
    </html>
  );
}

export default RootLayout

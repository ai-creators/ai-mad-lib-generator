import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Ai Madlib Generator",
  description:
    "Create hilarious Mad Libs with AI! Get creative with our AI-powered Mad Libs generator. Simply enter a prompt, and let the AI fill in the blanks. Hours of laughter await!",
  icons: [{ rel: "icon", url: "https://chat.openai.com/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

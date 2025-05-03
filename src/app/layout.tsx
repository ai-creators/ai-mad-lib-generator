import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "~/env";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "./auth-provider";

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
    <AuthProvider>
      <html
        lang="en"
        className={`${GeistSans.variable}`}
        suppressHydrationWarning
      >
        <body suppressHydrationWarning>
          <TRPCReactProvider>
            <Providers>{children}</Providers>
          </TRPCReactProvider>
        </body>
        {/* <CookieConsent /> */}
        <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID ?? ""} />
        <SpeedInsights />
      </html>
    </AuthProvider>
  );
}

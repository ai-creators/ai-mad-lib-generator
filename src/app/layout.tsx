import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "~/env";
import { AuthProvider } from "./auth-provider";
import CookieConsent from "./_features/compliance/cookie-consent";

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
<<<<<<< HEAD
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css"></link>
        <body>
=======
        <body suppressHydrationWarning>
>>>>>>> 5c1a912 (Co-authored-by: Anthony McLamb <admclamb@users.noreply.github.com>)
          <TRPCReactProvider>
            <Providers>{children}</Providers>
          </TRPCReactProvider>
        </body>
        <CookieConsent />
        <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID ?? ""} />
      </html>
    </AuthProvider>
  );
}

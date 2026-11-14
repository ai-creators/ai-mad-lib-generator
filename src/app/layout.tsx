import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Providers from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "~/env";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nunito_Sans } from "next/font/google";
import { cn } from "~/lib/utils";
import GoogleAdsense from "./_features/google-ads/google-adsense";

const nunitoSansHeading = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Ai Madlib Generator",
  description:
    "Create hilarious Mad Libs with AI! Get creative with our AI-powered Mad Libs generator. Simply enter a prompt, and let the AI fill in the blanks. Hours of laughter await!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        "font-sans",
        nunitoSansHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
        <GoogleAdsense pId={env.GOOGLE_ADSENSE_ID ?? ""} />
      </body>
      <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID ?? ""} />
      <SpeedInsights />
    </html>
  );
}

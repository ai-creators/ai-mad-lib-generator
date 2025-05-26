"use client";

import "~/styles/globals.css";
import { type ReactNode } from "react";
import { ThemeProvider } from "~/app/_features/theme/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { ContentRatingProvider } from "~/app/_features/content-rating/content-rating";
import { Toaster } from "sonner";
import { FeatureToggleProvider } from "./_features/feature-toggle/feature-toggle.context";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ContentRatingProvider>
          <FeatureToggleProvider>
            {children}
            <Toaster />
          </FeatureToggleProvider>
        </ContentRatingProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}

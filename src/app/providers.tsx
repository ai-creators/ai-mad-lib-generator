"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "~/app/_features/theme/theme-provider";
import { Toaster } from "sonner";
import { FeatureToggleProvider } from "./_features/feature-toggle/feature-toggle.context";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FeatureToggleProvider>
        {children}
        <Toaster />
      </FeatureToggleProvider>
    </ThemeProvider>
  );
}

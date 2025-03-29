"use client";

import "~/styles/globals.css";
import { type ReactNode } from "react";
import { ThemeProvider } from "~/app/_features/theme/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { ContentRatingProvider } from "~/app/_features/content-rating/content-rating";
import { Toaster } from "sonner";

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
          {children}
          <Toaster />
        </ContentRatingProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}

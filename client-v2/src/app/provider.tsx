"use client";

import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { queryConfig } from "@/lib/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactNode, Suspense, useState } from "react";

type AppProviderProps = {
  children?: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <PageLoader />
        </div>
      }
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Suspense>
  );
};

export default AppProvider;

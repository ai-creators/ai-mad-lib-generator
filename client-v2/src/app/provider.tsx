"use client";

import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { ErrorBoundary } from "react-error-boundary";
import { queryConfig } from "@/lib/react-query";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, Suspense, useState } from "react";
import MainErrorFallback from "@/components/errors/main-error-fallback/main-error-fallback";

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
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {process.env.DEV && <ReactQueryDevtools />}

          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;

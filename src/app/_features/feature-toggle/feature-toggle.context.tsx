"use client";

import { createContext, useContext } from "react";
import { api } from "~/trpc/react";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type Feature = inferProcedureOutput<
  AppRouter["featureToggle"]["getAvailableFeatures"]
>[number];

type FeatureToggleContextType = {
  isPending: boolean;
  isFeatureEnabled: (featureName: string) => boolean;
};

const FeatureToggleContext = createContext<FeatureToggleContextType>({
  isPending: true,
  isFeatureEnabled: () => false,
});

export function FeatureToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: features = [], isPending } =
    api.featureToggle.getAvailableFeatures.useQuery();

  const isFeatureEnabled = (featureName: string) => {
    return features.some(
      (feature) => feature.name === featureName && feature.isOn,
    );
  };

  return (
    <FeatureToggleContext.Provider
      value={{
        isPending,
        isFeatureEnabled,
      }}
    >
      {children}
    </FeatureToggleContext.Provider>
  );
}

export const useFeatureToggle = () => {
  const context = useContext(FeatureToggleContext);

  if (!context) {
    throw new Error(
      "useFeatureToggle must be used within FeatureToggleProvider",
    );
  }

  return context;
};

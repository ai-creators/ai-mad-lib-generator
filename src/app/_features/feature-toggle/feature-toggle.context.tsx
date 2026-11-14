"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { api } from "~/trpc/react";

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

  const isFeatureEnabled = useCallback(
    (featureName: string) =>
      features.some(
        (feature) => feature.name === featureName && feature.isOn,
      ),
    [features],
  );

  const value = useMemo(
    () => ({ isPending, isFeatureEnabled }),
    [isPending, isFeatureEnabled],
  );

  return (
    <FeatureToggleContext.Provider value={value}>
      {children}
    </FeatureToggleContext.Provider>
  );
}

export const useFeatureToggle = () => useContext(FeatureToggleContext);

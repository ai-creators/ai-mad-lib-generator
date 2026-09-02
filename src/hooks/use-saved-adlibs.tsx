import * as React from "react";
import { getItem, setItem } from "~/hooks/use-storage";
import { SavesConstants } from "~/app/_features/saves/saves-constants";

function readSavedIds(): string[] {
  try {
    const raw = getItem(SavesConstants.SAVED_ADLIB_IDS);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function useSavedAdlibs() {
  const [savedIds, setSavedIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSavedIds(readSavedIds());
  }, []);

  const isSaved = React.useCallback(
    (adlibId: string) => savedIds.includes(adlibId),
    [savedIds],
  );

  const toggleSaved = React.useCallback((adlibId: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(adlibId)
        ? prev.filter((id) => id !== adlibId)
        : [...prev, adlibId];
      setItem(SavesConstants.SAVED_ADLIB_IDS, JSON.stringify(next));
      return next;
    });
  }, []);

  return { savedIds, isSaved, toggleSaved };
}

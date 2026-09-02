import * as React from "react";
import { getItem, setItem } from "~/hooks/use-storage";
import { ReactionsConstants } from "~/app/_features/reactions/reactions-constants";

function reactionKey(adlibId: string, reactionType: string): string {
  return `${adlibId}:${reactionType}`;
}

function readReactedKeys(): string[] {
  try {
    const raw = getItem(ReactionsConstants.REACTED_ADLIB_KEYS);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((key): key is string => typeof key === "string")
      : [];
  } catch {
    return [];
  }
}

export function useReactedAdlibs() {
  const [reactedKeys, setReactedKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    setReactedKeys(readReactedKeys());
  }, []);

  const hasReacted = React.useCallback(
    (adlibId: string, reactionType: string) =>
      reactedKeys.includes(reactionKey(adlibId, reactionType)),
    [reactedKeys],
  );

  const markReacted = React.useCallback(
    (adlibId: string, reactionType: string) => {
      setReactedKeys((prev) => {
        const key = reactionKey(adlibId, reactionType);
        if (prev.includes(key)) return prev;
        const next = [...prev, key];
        setItem(ReactionsConstants.REACTED_ADLIB_KEYS, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  return { hasReacted, markReacted };
}

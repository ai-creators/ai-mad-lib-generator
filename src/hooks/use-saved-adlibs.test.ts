import { beforeEach, describe, expect, it } from "vitest";
import { useSavedAdlibsStore } from "./use-saved-adlibs";

describe("useSavedAdlibsStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useSavedAdlibsStore.setState({ savedIds: [] });
  });

  it("starts with no saved adlibs", () => {
    expect(useSavedAdlibsStore.getState().savedIds).toEqual([]);
    expect(useSavedAdlibsStore.getState().isSaved("adlib-1")).toBe(false);
  });

  it("toggles an adlib on, then off", () => {
    const { toggleSaved } = useSavedAdlibsStore.getState();

    toggleSaved("adlib-1");
    expect(useSavedAdlibsStore.getState().isSaved("adlib-1")).toBe(true);

    toggleSaved("adlib-1");
    expect(useSavedAdlibsStore.getState().isSaved("adlib-1")).toBe(false);
  });

  it("persists saved ids to localStorage", () => {
    useSavedAdlibsStore.getState().toggleSaved("adlib-1");

    const raw = localStorage.getItem("SAVED_ADLIB_IDS");
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!) as { state: { savedIds: string[] } };
    expect(parsed.state.savedIds).toEqual(["adlib-1"]);
  });

  it("keeps other saved ids when toggling one off", () => {
    const { toggleSaved } = useSavedAdlibsStore.getState();

    toggleSaved("adlib-1");
    toggleSaved("adlib-2");
    toggleSaved("adlib-1");

    expect(useSavedAdlibsStore.getState().savedIds).toEqual(["adlib-2"]);
  });
});

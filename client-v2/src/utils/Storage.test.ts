import { describe, test, expect, beforeEach } from "vitest";
import storage from "./Storage";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem(key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("Should correctly set and get an item", () => {
    const key = "testKey";
    const value = { data: "testData" };
    storage.set(key, value);
    expect(storage.get(key)).toEqual(value);
  });

  test("Should correctly remove an item", () => {
    const key = "testKey";
    storage.set(key, { data: "toBeRemoved" });
    storage.remove(key);
    expect(storage.get(key)).toBeNull();
  });

  test("Should correctly remove multiple items", () => {
    const keys = ["testKey1", "testKey2"];
    keys.forEach((key) => storage.set(key, { data: `dataFor-${key}` }));
    storage.removeMultiple(keys);
    keys.forEach((key) => expect(storage.get(key)).toBeNull());
  });
});

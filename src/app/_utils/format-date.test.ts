import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatDateToMinutes } from "./format-date";

describe("formatDateToMinutes", () => {
  const now = new Date("2026-06-15T12:00:00.000Z");

  beforeEach(() => {
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows minutes old when under an hour has passed", () => {
    const date = new Date(now.getTime() - 5 * 60 * 1000);

    expect(formatDateToMinutes(date)).toBe("Jun 15 (5 minutes old)");
  });

  it("shows hours old when under a day has passed", () => {
    const date = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    expect(formatDateToMinutes(date)).toBe("Jun 15 (3 hours old)");
  });

  it("shows month and day when under 6 months has passed", () => {
    const date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    expect(formatDateToMinutes(date)).toBe("Jun 13");
  });

  it("shows month, day, and year once 6 months or more has passed", () => {
    const date = new Date("2025-01-01T12:00:00.000Z");

    expect(formatDateToMinutes(date)).toBe("Jan 1, 2025");
  });
});

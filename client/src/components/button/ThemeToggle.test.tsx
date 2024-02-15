import { describe, test, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "@/context/themeProvider";

describe("ThemeToggle", () => {
  const setTheme = vi.fn();
  test("Should set theme to light when Light is clicked", async () => {
    render(
      <ThemeProvider value={{ setTheme }}>
        <ThemeToggle />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Light"));
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  test("Should set theme to dark when Dark is clicked", async () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByText("Dark"));
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  test("Should set theme to system when System is clicked", async () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByText("System"));
    expect(setThemeMock).toHaveBeenCalledWith("system");
  });
});

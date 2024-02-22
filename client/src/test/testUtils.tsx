import { ReactElement } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Theme, ThemeProvider } from "@/context/themeProvider";
import { MockThemeProvider } from "./mocks/MockThemeProvider";

export const renderWithThemeContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MockThemeProvider>{children}</MockThemeProvider>
    ),
    ...options,
  });

export function renderWithRouter(
  ui: ReactElement,
  { initialRoutes = ["/"], initialIndex = 0, theme = "system" as Theme } = {}
) {
  return {
    ...render(
      <MemoryRouter initialEntries={initialRoutes} initialIndex={initialIndex}>
        <ThemeProvider defaultTheme={theme}>{ui}</ThemeProvider>
      </MemoryRouter>
    ),
  };
}

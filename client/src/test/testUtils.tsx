import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Theme, ThemeProvider } from "@/context/themeProvider";

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

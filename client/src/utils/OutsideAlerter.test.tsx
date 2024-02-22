import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OutsideAlerter from "./OutsideAlerter";

describe("OutsideAlerter", () => {
  test("Should call executable when clicking outside of the component", async () => {
    const executableMock = vi.fn();
    render(
      <div data-testid="outside">
        <OutsideAlerter executable={executableMock}>
          <p>Inside</p>
        </OutsideAlerter>
      </div>
    );

    fireEvent.mouseDown(document);
    expect(executableMock).toHaveBeenCalled();
  });

  test("Should not call executable when clicking inside of the component", async () => {
    const executableMock = vi.fn();
    const { getByTestId } = render(
      <OutsideAlerter executable={executableMock}>
        <p data-testid="inside">Inside</p>
      </OutsideAlerter>
    );

    fireEvent.mouseDown(getByTestId("inside"));
    expect(executableMock).not.toHaveBeenCalled();
  });
});

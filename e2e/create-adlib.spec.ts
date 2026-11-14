import { expect, test, type Page } from "@playwright/test";

async function createAdlib(page: Page, path: string) {
  const promptText = "A cat and funny robot take a walk";

  const createAdlibResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/api/trpc/adlib.create") &&
      res.request().method() === "POST",
  );
  const getAdlibPlayResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/api/trpc/adlib.getAdlibByIdPlay") &&
      res.request().method() === "GET",
  );

  await page.goto(path);

  await page.locator("[data-cy=prompt-input]").fill(promptText);
  await page.locator("[data-cy=prompt-submit-btn]").click();

  expect((await createAdlibResponse).status(), {
    message: "adlib.create failed",
  }).toBe(200);
  expect((await getAdlibPlayResponse).status(), {
    message: "adlib.getAdlibByIdPlay failed",
  }).toBe(200);

  await expect(page.locator("[data-cy=adlib-play-description]")).toHaveText(
    `${promptText}...`,
    { timeout: 20_000 },
  );
}

test.describe("Create Adlib", () => {
  test("generates on the home page, and redirects to the adlib play page", async ({
    page,
  }) => {
    await createAdlib(page, "/");
  });

  test("generates on the create page, and redirects to the adlib play page", async ({
    page,
  }) => {
    await createAdlib(page, "/create");
  });
});

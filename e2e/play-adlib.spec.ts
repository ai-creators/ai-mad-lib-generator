import { expect, test, type Page } from "@playwright/test";

const ANSWERS = ["fluffy", "blue", "quickly", "on the moon"];

async function answerAndGenerate(page: Page) {
  const inputs = page.locator("[data-cy=adlib-answer-input]");
  await expect(inputs.first()).toBeVisible();

  const count = await inputs.count();
  for (let index = 0; index < count; index++) {
    const value = ANSWERS[index] ?? `answer-${index + 1}`;
    await inputs.nth(index).scrollIntoViewIfNeeded();
    await inputs.nth(index).fill(value);
  }

  const saveAdlibResult = page.waitForResponse(
    (res) =>
      res.url().includes("/api/trpc/adlib.saveAdlibResult") &&
      res.request().method() === "POST",
  );

  await page.locator("[data-cy=generate-story-btn]").click();

  expect((await saveAdlibResult).status()).toBe(200);

  await page.locator("[data-cy=adlib-result-actions]").click();
}

test.describe("Play Adlib", () => {
  test("allows navigating from the home page and playing", async ({ page }) => {
    const getPaginated = page.waitForResponse((res) =>
      res.url().includes("/api/trpc/adlib.getPaginated"),
    );

    await page.goto("/");

    expect((await getPaginated).status()).toBe(200);

    await page.locator("[data-cy=go-to-adlib-link]").first().click();
    await page.locator("[data-cy=play-adlib-btn]").click();

    await answerAndGenerate(page);
  });

  test("allows searching and then playing the adlib", async ({ page }) => {
    const getPaginated = page.waitForResponse((res) =>
      res.url().includes("/api/trpc/adlib.getPaginated"),
    );

    await page.goto("/");

    expect((await getPaginated).status()).toBe(200);

    const firstTitle = (
      await page.locator("[data-cy=browse-feed-card-title]").first().innerText()
    ).trim();

    const searchResults = page.waitForResponse((res) =>
      res.url().includes("/api/trpc/adlib.getPaginated"),
    );

    await page.locator("[data-cy=search-adlib-input]").fill(firstTitle);
    await page.locator("[data-cy=search-adlib-submit-btn]").click();

    expect((await searchResults).status()).toBe(200);

    await expect(
      page.locator("[data-cy=browse-feed-card-title]").first(),
    ).toContainText(firstTitle);

    const getAdlibById = page.waitForResponse((res) =>
      res.url().includes("/api/trpc/adlib.getAdlibById"),
    );

    await page.locator("[data-cy=go-to-adlib-link]").first().click();

    expect((await getAdlibById).status()).toBe(200);

    const getAdlibByIdPlay = page.waitForResponse((res) =>
      res.url().includes("/api/trpc/adlib.getAdlibByIdPlay"),
    );

    await page.locator("[data-cy=play-adlib-btn]").click();

    expect((await getAdlibByIdPlay).status()).toBe(200);

    await answerAndGenerate(page);
  });
});

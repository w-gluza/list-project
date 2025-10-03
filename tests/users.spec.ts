import { test, expect } from "@playwright/test";

test("shows users table with mocked data", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByText("Adam Lovelace")).toBeVisible();
  await expect(page.getByText("Grace Hopper")).toBeVisible();
});

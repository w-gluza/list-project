import { test, expect } from "@playwright/test";

test("check table visibility", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("table")).toBeVisible();
});

test("renders correct table headers", async ({ page }) => {
  await page.goto("/");

  const headers = page.locator("thead th");
  const expected = ["First Name", "Last Name", "Country", "Age", "Actions"];
  await expect(headers).toHaveCount(expected.length);

  for (const [i, text] of expected.entries()) {
    await expect(headers.nth(i)).toHaveText(text);
  }
});

test("renders users table with expected row", async ({ page }) => {
  await page.goto("/");

  const table = page.locator("table");
  await expect(table).toBeVisible();

  // find the row that has both “James” and “Lovelace”
  const row = table
    .locator("tbody tr")
    .filter({ hasText: "James" })
    .filter({ hasText: "Lovelace" });

  await expect(row).toHaveCount(1);

  // verify cells by column order
  const cells = row.locator("td");
  await expect(cells.nth(0)).toHaveText("James");
  await expect(cells.nth(1)).toHaveText("Lovelace");
  await expect(cells.nth(2)).toHaveText("UK");
  await expect(cells.nth(3)).toHaveText("30");
  await expect(
    cells.nth(4).getByRole("button", { name: /edit/i })
  ).toBeVisible();
});

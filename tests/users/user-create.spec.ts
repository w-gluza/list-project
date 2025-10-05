import { test, expect } from "@playwright/test";

test("opens create user modal", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /add user/i }).click();

  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(modal.getByText(/add user/i)).toBeVisible();
});

test("creates a new user via modal", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /add user/i }).click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();

  const first = modal.getByLabel(/first name/i);
  const last = modal.getByLabel(/last name/i);
  await first.fill("Newman");
  await first.press("Tab");

  await last.fill("Person");
  await last.press("Tab");

  const countryTrigger = modal.getByLabel(/country/i);
  await countryTrigger.click();
  const listbox = page.getByRole("listbox");
  await listbox.getByRole("option", { name: /(US)/i }).click();
  await expect(countryTrigger).toContainText(/(US)/i);

  const age = modal.getByLabel(/age/i);
  await age.fill("42");
  await age.press("Tab");

  const submit = page.locator('button[type="submit"]');
  await expect(submit).toBeEnabled();
  await submit.click();

  await expect(modal).toBeHidden();

  const row = page
    .locator("tbody tr")
    .filter({ hasText: "Newman" })
    .filter({ hasText: "Person" });

  await expect(row).toHaveCount(1);
  const cells = row.locator("td");
  await expect(cells.nth(2)).toHaveText(/(US)/i);
  await expect(cells.nth(3)).toHaveText("42");
});

test("create modal: disables Create button for too short name", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: /add user/i }).click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();

  // Fill invalid short name (triggers yup min(5))
  const first = modal.getByLabel(/first name/i);
  await first.fill("Ana");
  await first.press("Tab");
  const last = modal.getByLabel(/last name/i);
  await last.fill("Smith");
  await last.press("Tab");

  const countryTrigger = modal.getByLabel(/country/i);
  await countryTrigger.click();
  const listbox = page.getByRole("listbox");
  await listbox.getByRole("option", { name: /^US$/i }).click();

  const age = modal.getByLabel(/age/i);
  await age.fill("42");
  await age.press("Tab");

  await expect(modal.getByRole("alert")).toContainText("Min 5 characters");

  const create = page.locator('button[type="submit"]');
  await expect(create).toBeDisabled();

  await first.fill("Anabel");
  await first.press("Tab");
  await expect(modal.getByRole("alert")).toHaveCount(0);
  await expect(create).toBeEnabled();

  await modal.getByRole("button", { name: /close/i }).click();
  await expect(modal).toBeHidden();
});

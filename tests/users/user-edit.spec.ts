import { test, expect } from "@playwright/test";

test("opens edit user modal", async ({ page }) => {
  await page.goto("/");
  const editButton = page.getByRole("button", { name: /edit/i });
  await editButton.first().click();

  const modal = page.getByRole("dialog"); // Radix Dialog uses role="dialog"
  await expect(modal).toBeVisible();

  await expect(modal.getByText(/edit user/i)).toBeVisible();
  await expect(modal.getByRole("button", { name: /close/i })).toBeVisible();

  await modal.getByRole("button", { name: /close/i }).click();
  await expect(modal).toBeHidden();
});

test("edits user age to 45", async ({ page }) => {
  await page.goto("/");

  const row = page
    .locator("tbody tr")
    .filter({ hasText: "James" })
    .filter({ hasText: "Lovelace" });

  const editButton = row.getByRole("button", { name: /edit/i });
  await editButton.click();

  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(modal.getByText(/edit user/i)).toBeVisible();

  // Happy path
  // Age 45 passes all validations
  const ageInput = modal.getByLabel(/age/i);
  await ageInput.fill("45");

  await modal.getByRole("button", { name: /save/i }).click();
  await expect(modal).toBeHidden();

  const updatedRow = page
    .locator("tbody tr")
    .filter({ hasText: "James" })
    .filter({ hasText: "Lovelace" });

  await expect(updatedRow.locator("td").nth(3)).toHaveText("45");
});

test("disables Save button when Grace Hopper age is invalid", async ({
  page,
}) => {
  await page.goto("/");

  const row = page
    .locator("tbody tr")
    .filter({ hasText: "Grace" })
    .filter({ hasText: "Hopper" });

  const editButton = row.getByRole("button", { name: /edit/i });
  await editButton.click();

  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(modal.getByText(/edit user/i)).toBeVisible();

  const ageInput = modal.getByLabel(/age/i);
  await ageInput.fill("7");

  const saveButton = modal.getByRole("button", { name: /save/i });
  await expect(saveButton).toBeDisabled();
  await modal.getByRole("button", { name: /close/i }).click();
  await expect(modal).toBeHidden();
});

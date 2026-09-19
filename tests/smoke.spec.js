import { expect, test } from "@playwright/test";

test("loads the hotel dashboard", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Showing 40 of 40 properties")).toBeVisible();
  await expect(page.getByRole("button", { name: /View details/ })).toHaveCount(40);
});

test("filters hotels by city", async ({ page }) => {
  await page.goto("/");

  await page.locator("#test-city").click();
  await page.getByRole("button", { name: "Show suggestions" }).click();
  await page.getByText("Chicago, IL", { exact: true }).last().click();
  await page.locator("button").filter({ hasText: "Apply Filters" }).click();

  await expect(page.getByText("Showing 4 of 40 properties")).toBeVisible();
  await expect(page.getByText("The Grand Luminary")).toBeVisible();
});

test("opens a routed hotel detail view", async ({ page }) => {
  await page.goto("/hotels/hotel-01");

  await expect(page).toHaveURL(/\/hotels\/hotel-01$/);
  await expect(page.getByRole("dialog")).toContainText("The Grand Luminary");
  await expect(page.getByText("Room Availability & Nightly Rates")).toBeVisible();
});

test("submits a reservation checkout request", async ({ page }) => {
  await page.goto("/hotels/hotel-01");

  await page.getByRole("button", { name: "Reserve" }).first().click();
  await expect(page).toHaveURL(/\/hotels\/hotel-01\/reserve\?/);
  await expect(page.getByRole("heading", { name: "Complete your stay" })).toBeVisible();

  await page.getByLabel("Guest name").fill("Jordan Smith");
  await page.getByLabel("Email address").fill("jordan@example.com");
  await page.getByRole("button", { name: "Submit reservation request" }).click();

  await expect(page.getByRole("heading", { name: "Reservation request received" })).toBeVisible();
  await expect(page.getByText(/Jordan Smith/)).toBeVisible();
});

test("shows reservation validation errors", async ({ page }) => {
  await page.goto(
    "/hotels/hotel-01/reserve?room=room-01a&start=2026-07-10&end=2026-07-12"
  );

  await page.getByRole("button", { name: "Submit reservation request" }).click();

  await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  await expect(page.getByText("Enter a valid email address")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Complete your stay" })).toBeVisible();
});
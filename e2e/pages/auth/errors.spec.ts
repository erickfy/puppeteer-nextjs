
import { test, expect } from "@playwright/test";

const randomUser = {
  username: "noone",
  password: "noone"
}

test("User doesn't exist", async ({ page }) => {

  await page.goto("/");
  await page.locator('#username').fill(randomUser.username)
  await page.locator('#password').fill(randomUser.password)
  await page.click('#continue')

  await page.waitForLoadState('domcontentloaded')

  await expect(page).toHaveURL("/");
  await expect(page.getByText('El usuario no existe!')).toBeVisible()
});


test("User doesn't log in, then he'll see route protected", async ({ page }) => {

  await page.goto("/instagram");
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveURL("/protected");
  await expect(page.getByText('Inesperado?')).toBeVisible()
});
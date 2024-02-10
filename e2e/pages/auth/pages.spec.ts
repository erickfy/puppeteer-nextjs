// import factory, { TypeUsers } from "@/e2e/mocks/factory";
import mockServer from "@/e2e/mocks/mockServer";
import { test, expect } from "@playwright/test";

// const currentUser: TypeUsers = 'johan'

// test.beforeAll(async () => {
//   await createUser(currentUser)
//   mockServer.listen()
// })

// test.afterEach(() => {
//   mockServer.resetHandlers()
// })

// test.afterAll(async () => {
//   mockServer.close()
//   await deleteUser(currentUser)
// })

test("navigation from login to signup page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'About Page' and click on it
  await page.getByText("Registrarme").click();
  // await page.click("text=Registrarme");

  // The new url should be "/about" (baseURL is used there)
  await expect(page).toHaveURL("/sign-up");
  // The new page should contain an h1 with "About Page"
  await expect(page.getByRole("heading", { level: 3 })).toContainText(
    "Registro",
  );
  await expect(page.locator("h3")).toContainText("Registro");
});

// test.only("Login User", async ({ page }) => {

//   const user = factory.users[currentUser]

//   await page.goto("/");
//   await page.locator('#username').fill(user.username)
//   await page.locator('#password').fill(user.password)
//   await page.click('#continue')

//   await page.waitForLoadState('networkidle')

//   await expect(page).toHaveURL("/instagram");
//   // await expect(page.getByRole("heading", { level: 3 })).toContainText(
//   //   "Registro",
//   // );
// });



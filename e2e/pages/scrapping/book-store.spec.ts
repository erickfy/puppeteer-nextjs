import { mockUsers } from "@/e2e/constants";
import { db } from "@/lib/db";
import { test, expect } from "@playwright/test";

/**
 * @description
 * https://playwright.dev/docs/locators#locate-by-alt-text
 * https://playwright.dev/docs/api/class-locator#locator-evaluate-all
 */

test.only("Scrapping @BookStore", async ({ page }) => {

    // USER
    const clientUser = mockUsers['johan']
    const identificator = 'book-store'

    await page.goto('/');
    await page.locator('#username').fill(clientUser.username)
    await page.locator('#password').fill(clientUser.password)
    await page.click('#continue')

    await page.waitForLoadState('networkidle')

    // INIT ROUTE
    await expect(page).toHaveURL(`/instagram`);


    // CLICK TO TOOLBAR ROUTE
    await page.click(`#${identificator}-route`)
    await page.waitForLoadState('networkidle')


    // ROUTE EXPECTED
    await expect(page).toHaveURL(`/${identificator}`);
    await expect(page.getByText('Realiza una busqueda')).toBeVisible()


    // INPUT SEARCH
    const search = clientUser.searchs.bookStore[0]

    // IT WAS NECCESARY TO ADD VALUES (AUNQUE NO SEA VISIBLE EL INPUT CON SR-ONLY DE TAILWIND)
    await page.locator(`#${identificator}`).fill(clientUser.id)
    await page.click(`#${identificator}-submit`)

    await page.waitForLoadState('domcontentloaded')


    const buttonSelector = `#${identificator}-dialog`;
    await page.waitForSelector(buttonSelector, { state: "visible" });
    await page.click(buttonSelector);
    await page.waitForLoadState('networkidle')


    // IMAGE CARD
    await expect(page.getByText('Imagen de la Tienda de Libros')).toBeVisible()

    const images = page.locator('img');
    const imageAlt = `description ${identificator} image`

    const altValues = await images.evaluateAll((imgs) => imgs.map(img => img.getAttribute('alt')));

    // CHECK IMAGE WITH ATRIBUTE ALT
    expect(altValues).toContain(imageAlt);
    await page.getByAltText(imageAlt).click();

});
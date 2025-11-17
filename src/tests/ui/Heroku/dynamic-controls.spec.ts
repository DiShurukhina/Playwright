import test, { expect } from "@playwright/test";

//   Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

test.describe('[Heroku App] [Dynamic controls]', () => {
    const baseUrl = 'https://the-internet.herokuapp.com/';
    test('Awaits for dynamic controls', async ({page}) => {
        await page.goto(baseUrl);
        await page.getByRole('link', {name: 'Dynamic Controls'}).click();
        await page.getByRole('button', {name: 'Remove'}).waitFor({state: 'visible'});
        await expect(page.getByRole('heading', {name: 'Dynamic Controls'})).toBeVisible();
        await page.getByRole('checkbox').check();
        await page.getByRole('button', {name: 'Remove'}).click();
        await expect(page.locator('div#loading')).toBeVisible();
        await page.getByRole('checkbox').waitFor({state: 'hidden'});
        await page.getByRole('button', {name: 'Add'}).waitFor({state: 'visible'});
        await expect(page.locator('p#message')).toHaveText("It's gone!");
        await page.getByRole('button', {name: 'Add'}).click();
        await page.getByRole('checkbox').waitFor({state: 'visible'});
        await expect(page.locator('p#message')).toHaveText("It's back!");
    })
})
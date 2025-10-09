import test, { expect } from "@playwright/test";

test.describe("Smoke tests for page [demo-registration-form]", () => {
  const validUserData = {
    firstName: "Darth",
    lastName: 'Vader',
    address: 'Mustafar, Fortress Vader',
    email: 'darth@vader.com', 
    phone: '+35799487695',
    country: 'UK',
    gender: 'female',
    hobbies: ['Travelling', 'Gaming'],
    language: 'English',
    skills: ['JavaScript', 'Python'],
    dateOfBirth: {
        year: '1986',
        month: 'May',
        day: '14',
    },
    password: 'Password123',
  };
  const baseUrl = 'https://anatoly-karpovich.github.io/demo-registration-form/';

  test("Should register with valid data", async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('#firstName').fill(validUserData.firstName);
    await page.locator('#lastName').fill(validUserData.lastName);
    await page.locator('#address').fill(validUserData.address);
    await page.locator('#email').fill(validUserData.email);
    await page.locator('#phone').fill(validUserData.phone);
    await page.selectOption('#country', validUserData.country);
    await page.locator('input[type="radio"][name="gender"][value="female"]').check();
    for(const hobbie of validUserData.hobbies) {
      await page.locator(`input[class="hobby"][value=${hobbie}]`).check()
    };
    await page.locator('#language').fill(validUserData.language);
    await page.selectOption('#skills', validUserData.skills);
    await page.selectOption('#year', validUserData.dateOfBirth.year);
    await page.selectOption('#month', validUserData.dateOfBirth.month);
    await page.selectOption('#day', validUserData.dateOfBirth.day);
    await page.locator('#password').fill(validUserData.password);
    await page.locator('#password-confirm').fill(validUserData.password);
    await page.getByRole('button', {name: 'Submit'}).click();
    await expect(page.locator("h2.text-center")).toHaveText("Registration Details");
    await expect(page.locator('#fullName')).toHaveText(`${validUserData.firstName} ${validUserData.lastName}`);
    await expect(page.locator('#address')).toHaveText(`${validUserData.address}`);
    await expect(page.locator('#email')).toHaveText(`${validUserData.email}`);
    await expect(page.locator('#phone')).toHaveText(`${validUserData.phone}`);
    await expect(page.locator('#country')).toHaveText(`${validUserData.country}`);
    await expect(page.locator('#gender')).toHaveText(`${validUserData.gender}`);
    await expect(page.locator('#language')).toHaveText(`${validUserData.language}`);
    await expect(page.locator('#skills')).toHaveText(`${validUserData.skills.join(', ')}`);
    await expect(page.locator('#hobbies')).toHaveText(`${validUserData.hobbies.join(', ')}`);
    await expect(page.locator('#dateOfBirth')).toHaveText(`${validUserData.dateOfBirth.day} ${validUserData.dateOfBirth.month} ${validUserData.dateOfBirth.year}`);
    await expect(page.getByRole('button', {name: 'Back to Form'})).toBeVisible();
  })
});

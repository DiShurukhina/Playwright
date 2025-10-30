//Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') =>
// { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }
// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

import {expect, test } from "@playwright/test";
import { expectedTable } from "./testdata";
import getTableRow from "./getTableRow";
const baseUrl = "https://the-internet.herokuapp.com/tables";

test.describe("[Heroku] [Tables]", () => {
  for (const expectedRow of expectedTable) {
    test("Test for func" + expectedRow.Email, async ({ page }) => {
      await page.goto(baseUrl);
      const rowData = await getTableRow(page, expectedRow.Email);
      await expect(expectedRow).toEqual(rowData);
    });
  }
});


import { Page} from "@playwright/test";

export default async function getTableRow(
  page: Page,
  email: string
): Promise<Record<string, string>> {
  const table = page.locator("#table2");

  const headersLocators = await table.locator("th").all();
  headersLocators.pop();
  const headers = await Promise.all(
    headersLocators.map((el) => el.innerText())
  );

  const emailTdLocator = table
    .locator("tbody td.email")
    .filter({ hasText: email });
  const row = emailTdLocator.locator("xpath=parent::tr");

  const cellLocators = row.locator("td").filter({ hasNot: page.locator("a") });
  const cells = await cellLocators.allInnerTexts();

  return headers.reduce<Record<string, string>>((result, header, i) => {
    result[header] = cells[i] ?? "";
    return result;
  }, {});
}

import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/salesPortal/tags";
import { test, expect } from "fixtures";

test.describe("[Sales Portal] [Customers]", async() => {
    let id = "";
    let token = "";

    test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });

    test("Create new customer with services", {tag: [TAGS.UI, TAGS.CUSTOMERS, TAGS.REGRESSION, TAGS.SMOKE]}, async ({ addNewCustomerUIService, customersListPage }) => {
        token = await customersListPage.getAuthToken();
        await addNewCustomerUIService.open();
        const createdCustomer = await addNewCustomerUIService.create()
        id = createdCustomer._id;
        await customersListPage.waitForOpened();
        await expect.soft(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
        await expect.soft(customersListPage.tableRowByEmail(createdCustomer.email)).toBeVisible();
    });
});
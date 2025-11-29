import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { TAGS } from "data/salesPortal/tags";
import { test, expect } from "fixtures";


test.describe("[Sales Portal] [Products]", () => {
    test("Delete", {tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],}, async ({ productsListUIService, homeUIService, productsApiService, productsListPage, productsApi}) => {
        const token = await productsListPage.getAuthToken();
        const createdProduct = await productsApiService.create(token);
        await homeUIService.homePage.open();
        await homeUIService.openModule("Products");
        await productsListUIService.deleteProduct(createdProduct.name);
        const deleted = await productsApi.getById(createdProduct._id, token);
        expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
        await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();
    });
});
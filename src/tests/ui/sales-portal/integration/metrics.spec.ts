import { metricsCases, mockedMetricsData } from "data/salesPortal/metrics/metricsCases";
import { test, expect } from "fixtures";

test.describe("[Integration] [Home] [Metrics]", () => {
    test.beforeEach(async ({ loginAsAdmin, mock, homePage }) => {
        await mock.metrics({
            Metrics: mockedMetricsData,
            IsSuccess: true,
            ErrorMessage: null
        });
        await loginAsAdmin();
        await homePage.waitForOpened();
    });

    for(const {testName, metricData, expectedData} of metricsCases) {
        test(testName, async({ homePage }) => {
            const data = metricData(homePage);
            await expect(data).toHaveText(expectedData);
        });
    }
})
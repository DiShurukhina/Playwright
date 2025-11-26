import { HomePage } from "ui/pages/home.page";
import { generateMetricsData } from "./generateMetricsData";
import numeral from "numeral";

export const mockedMetricsData = generateMetricsData();

export const metricsCases = [
    {
        testName: "Orders This Year",
        metricData: (page: HomePage) => page.totalOrdersCount,
        expectedData: mockedMetricsData.orders.totalOrders.toString(),
    },
    {
        testName: "Total Revenue",
        metricData: (page: HomePage) => page.totalRevenue,
        expectedData: numeral(mockedMetricsData.orders.totalRevenue.toString()).format("$0.0a"),
    },
    {
        testName: "Avg Order Value",
        metricData: (page: HomePage) => page.avgOrderValue,
        expectedData: numeral(mockedMetricsData.orders.averageOrderValue.toString()).format("$0.0a"),
    },
    {
        testName: "New Customers Count",
        metricData: (page: HomePage) => page.newCustomersCount,
        expectedData: mockedMetricsData.customers.totalNewCustomers.toString(),
    },
    {
        testName: "Canceled Orders Count",
        metricData: (page: HomePage) => page.canceledOrdersCount,
        expectedData: mockedMetricsData.orders.totalCanceledOrders.toString(),
    }
]

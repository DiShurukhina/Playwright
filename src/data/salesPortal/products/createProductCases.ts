import { faker } from "@faker-js/faker";
import { generateProductData } from "./generateProductData";
import _ from "lodash";
import { IProduct } from "../types/product.types";

export const positiveCases = [
    {
        testName: "Create product with 3 character length",
        productData: generateProductData({name: faker.string.alphanumeric({ length: 3})}),
    },
    {
        testName: "Create product with 40 character length",
        productData: generateProductData({name: faker.string.alphanumeric({ length: 40})}),
    },
    {
        testName: "Create product with 1 space in name",
        productData: generateProductData({name: "Test product"}),
    },
    {
        testName: "Create product with min price = 1",
        productData: generateProductData({price: 1}),
    },
    {
        testName: "Create product with max price = 99999",
        productData: generateProductData({price: 99999}),
    },
    {
        testName: "Create product with min amount = 0",
        productData: generateProductData({amount: 1}),
    },
    {
        testName: "Create product with max amount = 999",
        productData: generateProductData({amount: 999}),
    },
    {
        testName: "Create product with empty notes = 0",
        productData: generateProductData({notes: ""}),
    },
    {
        testName: "Create product with max anotes = 250",
        productData: generateProductData({notes: faker.string.alphanumeric({ length: 250})}),
    },
    {
        testName: "Create product without notes",
        productData: _.omit(generateProductData(), "notes"),
    },
];

export const negativeCases = [
    {
        testName: "NOT Create product with 2 character length",
        productData: generateProductData({name: faker.string.alphanumeric({ length: 2})}),
    },
    {
        testName: "NOT Create product with 41 character length",
        productData: generateProductData({name: faker.string.alphanumeric({ length: 41})}),
    },
    {
        testName: "NOT Create product with empty name",
        productData: generateProductData({name: ""}),
    },
    {
        testName: "NOT Create product with special characters in name",
        productData: generateProductData({ name: faker.string.alphanumeric({ length: 15 }) + "!@#$%^&*()<>~" }),
    },
    {
        testName: "NOT Create product without name",
        productData: _.omit(generateProductData(), "name"),
    },
    {
        testName: "NOT Create product with invalid data type name",
        productData: generateProductData({name: 123} as unknown as IProduct),
    },
    {
        testName: "NOT Create product with 2 spaces in name",
        productData: generateProductData({name: "Test  product"}),
    },
    {
        testName: "NOT Create product with price = 0",
        productData: generateProductData({price: 0}),
    },
    {
        testName: "NOT Create product with price = 100000",
        productData: generateProductData({price: 100000}),
    },
    {
        testName: "NOT Create product with negative price = -10",
        productData: generateProductData({price: -10}),
    },
    {
        testName: "NOT Create product without price",
        productData: _.omit(generateProductData(), "price"),
    },
    {
        testName: "NOT Create product with invalid data type price",
        productData: generateProductData({price: "123"} as unknown as IProduct),
    },
    {
        testName: "NOT Create product with negative amount = -1",
        productData: generateProductData({amount: -1}),
    },
    {
        testName: "NOT Create product with amount = 1000",
        productData: generateProductData({amount: 1000}),
    },
    {
        testName: "NOT Create product without amount",
        productData: _.omit(generateProductData(), "amount"),
    },
    {
        testName: "NOT Create product with invalid data type amount",
        productData: generateProductData({amount: "123"} as unknown as IProduct),
    },
    {
        testName: "NOT Create product with manufacturer",
        productData: _.omit(generateProductData(), "manufacturer"),
    },
    {
        testName: "NOT Create product with invalid data type manufacturer",
        productData: generateProductData({manufacturer: "123"} as unknown as IProduct),
    },
    {
        testName: "NOT Create product with notes 251 character length",
        productData: generateProductData({ notes: faker.string.alphanumeric({ length: 251 })}),
    },
    {
        testName: "NOT Create product with < symbol in notes ",
        productData: generateProductData({ notes: "Test < notes"}),
    },
    {
        testName: "NOT Create product with > symbol in notes ",
        productData: generateProductData({ notes: "Test > notes"}),
    },
];
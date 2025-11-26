import { test as ui } from "./pages.fixture";
import { test as api } from "./api.fixture";
import { test as mock } from "./mock.fixture";
import { test as login } from "./login.fixture";
import { mergeTests, expect } from "@playwright/test";

const test = mergeTests(ui, api, mock, login);

export { test, expect };
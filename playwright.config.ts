import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./tests/e2e", fullyParallel:false, retries:process.env.CI ? 2 : 0,
  use:{ baseURL:"http://127.0.0.1:3000", trace:"retain-on-failure", screenshot:"only-on-failure" },
  projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}}],
});

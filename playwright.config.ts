import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./tests/e2e", fullyParallel:false, retries:process.env.CI ? 2 : 0,
  use:{ baseURL:"http://127.0.0.1:3100", trace:"retain-on-failure", screenshot:"only-on-failure" },
  webServer:{command:"npm run build && npm run start -- --port 3100",url:"http://127.0.0.1:3100",reuseExistingServer:false,timeout:120000},
  projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}}],
});

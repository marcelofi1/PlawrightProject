import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 5000,
  },
  use: {
    trace: 'on',
    launchOptions: {
      headless: false,
      slowMo: 50,
    },
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
      },
    },
    {
      name: 'Mobile Android - Pixel 5',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Android - Samsung Galaxy S20',
      use: {
        browserName: 'chromium',
        ...devices['Galaxy S20'],
      },
    },
  ],
});
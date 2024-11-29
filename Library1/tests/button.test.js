import { test, expect } from '@playwright/test';

test('Validate button padding', async ({ page }) => {
  await page.goto('http://localhost:4100/components-doc/buttons');

  await page.waitForLoadState('load');
  await page.waitForSelector('#button-contained-default');

  const element = await page.$('#button-contained-default');
  if (element) {
    const paddingTop = await element.evaluate(el => getComputedStyle(el).paddingTop);
    const paddingRight = await element.evaluate(el => getComputedStyle(el).paddingRight);
    const paddingBottom = await element.evaluate(el => getComputedStyle(el).paddingBottom);
    const paddingLeft = await element.evaluate(el => getComputedStyle(el).paddingLeft);

    expect(paddingTop).toBe('6px');
    expect(paddingRight).toBe('16px');
    expect(paddingBottom).toBe('6px');
    expect(paddingLeft).toBe('16px');
  } else {
    throw new Error('Element not found');
  }
});
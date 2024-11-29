import { test, expect, devices } from '@playwright/test';
import { ai } from '@zerostep/playwright';

// Configuración para pruebas en escritorio 
test.describe('Desktop tests', () => {
  test('Validate padding of element on desktop', async ({ page }) => {
    await page.goto('http://localhost:4100/');
    //await ai('Select the element with specific padding');

    const element = await page.$('.MuiCardHeader-root css-1klzsa-MuiCardHeader-root');
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
      throw new Error("No se encuentra")
    }

  });
});

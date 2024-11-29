const { devices, chromium, firefox, webkit } = require('playwright');
const percySnapshot = require('@percy/playwright');
const config = require('./config');

async function primaryMediumFilledChipValidation(url, browserType = 'chromium', deviceType = null) {
  const browserOptions = {
    chromium,
    firefox,
    webkit
  };

  if (!browserOptions[browserType]) {
    throw new Error(`Browser not supported: ${browserType}`);
  }

  const browser = await browserOptions[browserType].launch();
  const context = deviceType ? await browser.newContext(devices[deviceType]) : await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });
  const variantId = 'chip-primary-text-medium';
  const element = await page.$('[variant-id="chip-primary-text-medium"]');

  const resultados = [];

  if (element) {
    const styles = config.styles[variantId];
    if (!styles) {
      throw new Error(`No configuration found for: ${variantId}`);
    }

    const backgroundColor = await element.evaluate(el => getComputedStyle(el).backgroundColor);
    const borderBottomColor = await element.evaluate(el => getComputedStyle(el).borderBottomColor);
    const textDecorationColor = await element.evaluate(el => getComputedStyle(el).textDecorationColor);
    const borderRadius = await element.evaluate(el => getComputedStyle(el).borderRadius);

    const validatedStyles = (
      backgroundColor === styles.default.backgroundColor &&
      borderBottomColor === styles.default.borderBottomColor &&
      textDecorationColor === styles.default.textDecorationColor &&
      borderRadius === styles.default.borderRadius
    );

    resultados.push({
      test: 'validateButton',
      resultado: validatedStyles ? 'Successful' : 'Failed',
      detalles: `Background: ${backgroundColor}, Border: ${borderBottomColor}, Text: ${textDecorationColor}, Border-radius: ${borderRadius}`
    });

  await percySnapshot(page, `validateButton-${variantId}`);
    } else {
    resultados.push({
      test: 'validateButton',
      resultado: 'Failed',
      detalles: 'Item not found'
    });
  }

  await browser.close();
  imprimirResultados(resultados);
}

function imprimirResultados(resultados) {
  console.log(`
| TEST                    | RESULT         | DETAILS                         |
|---------------------------|-------------------|----------------------------------|
${resultados.map(r => `| ${r.test} | ${r.resultado} | ${r.detalles} |`).join('\n')}
    `);
}

 module.exports = { primaryMediumFilledChipValidation };
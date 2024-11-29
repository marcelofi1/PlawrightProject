const { devices, chromium, firefox, webkit } = require('playwright');
const percySnapshot = require('@percy/playwright');
const config = require('./config');

async function secondaryContainedButtonValidation(url, browserType = 'chromium', deviceType = null) {
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
  const variantId = 'button-secondary-contained-large';
  const element = await page.$('[variant-id="button-secondary-contained-large"]');

  const resultados = [];

  if (element) {
    const styles = config.styles[variantId];
    if (!styles) {
      throw new Error(`No configuration found for: ${variantId}`);
    }

    const paddingSize = styles.default.padding;
    const padding = config.padding[paddingSize];

    const backgroundColor = await element.evaluate(el => getComputedStyle(el).backgroundColor);
    const borderBottomColor = await element.evaluate(el => getComputedStyle(el).borderBottomColor);
    const textDecorationColor = await element.evaluate(el => getComputedStyle(el).textDecorationColor);
    const borderRadius = await element.evaluate(el => getComputedStyle(el).borderRadius);

    const paddingTop = await element.evaluate(el => getComputedStyle(el).paddingTop);
    const paddingRight = await element.evaluate(el => getComputedStyle(el).paddingRight);
    const paddingBottom = await element.evaluate(el => getComputedStyle(el).paddingBottom);
    const paddingLeft = await element.evaluate(el => getComputedStyle(el).paddingLeft);

    const estiloValido = (
      backgroundColor === styles.default.backgroundColor &&
      borderBottomColor === styles.default.borderBottomColor &&
      textDecorationColor === styles.default.textDecorationColor &&
      borderRadius === styles.default.borderRadius &&
      paddingTop === padding.paddingTop &&
      paddingRight === padding.paddingRight &&
      paddingBottom === padding.paddingBottom &&
      paddingLeft === padding.paddingLeft
    );

    resultados.push({
      test: 'validateButton',
      resultado: estiloValido ? 'Successful' : 'Failed',
      detalles: `Background: ${backgroundColor}, Border: ${borderBottomColor}, Text: ${textDecorationColor}, Padding: ${paddingTop}, ${paddingRight}, ${paddingBottom}, ${paddingLeft}, Border-radius: ${borderRadius}`
    });

    page.screenshot({ path: 'before-hover-state.png' });

    // Simulate hover state
    await element.hover();

    page.screenshot({ path: 'hover-state.png' });

    const hoverBackgroundColor = await element.evaluate(el => getComputedStyle(el).backgroundColor);
    const hoverBorderBottomColor = await element.evaluate(el => getComputedStyle(el).borderBottomColor);
    const hoverTextDecorationColor = await element.evaluate(el => getComputedStyle(el).textDecorationColor);

    const hoverValido = (
      hoverBackgroundColor === styles.hover.backgroundColor &&
      hoverBorderBottomColor === styles.hover.borderBottomColor &&
      hoverTextDecorationColor === styles.hover.textDecorationColor
    );

    resultados.push({
      test: 'validateButtonHover',
      resultado: hoverValido ? 'Successful' : 'Failed',
      detalles: `Hover Background: ${hoverBackgroundColor}, Hover Border: ${hoverBorderBottomColor}, Hover Text: ${hoverTextDecorationColor}`
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
|-------------------------|----------------|---------------------------------|
${resultados.map(r => `| ${r.test} | ${r.resultado} | ${r.detalles} |`).join('\n')}
    `);
}

module.exports = { secondaryContainedButtonValidation };
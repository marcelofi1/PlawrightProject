const { primaryMediumFilledChipValidation } = require('../src/validations/primaryMediumFilledChipValidation');

(async () => {
  try {
    const url = 'http://localhost:5173/components-doc/chips';
    await primaryMediumFilledChipValidation(url, 'chromium', 'Desktop');
  } catch (error) {
    console.error('Error during validation:', error);
  }
})();
const { secondaryContainedButtonValidation } = require('../src/validations/secondaryContainedButtonValidation');

(async () => {
  try {
    const url = 'http://localhost:3000/';
    await secondaryContainedButtonValidation(url, 'chromium');
  } catch (error) {
    console.error('Error during validation:', error);
  }
})();
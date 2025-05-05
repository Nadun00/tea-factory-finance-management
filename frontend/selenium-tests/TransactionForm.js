const { Builder, By, until } = require('selenium-webdriver');

(async function TransactionForm() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Load your running app
    await driver.get('http://localhost:3000/information'); // Change this if needed

    // Wait for the element you want to test
    // Example: checking for a heading or button with specific ID or tag
    const element = await driver.findElement(By.tagName('h2')); // or use By.id('info-title')

    const text = await element.getText();
    console.log('Transaction page heading is:', text);
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.quit();
  }
})();

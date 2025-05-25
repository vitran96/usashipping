import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function scrapeCostcoMenu(): Promise<void> {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false, // Set to true in production
    defaultViewport: null,
    args: ['--window-size=1920,1080'],
  });

  try {
    const page = await browser.newPage();

    // Add user agent to appear more like a regular browser
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    );

    // Enable request interception to bypass some anti-bot measures
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (['image', 'stylesheet', 'font'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    console.log('Navigating to Costco...');
    await page.goto('https://www.costco.com', { waitUntil: 'networkidle2', timeout: 50_000 });

    // Wait for the navigation menu to load
    console.log('Waiting for menu elements to load...');
    await page.waitForSelector('nav ul li:nth-child(1) ul li', { timeout: 20_000 });

    // Hover over the menu items to trigger their display
    console.log('Extracting menu categories...');

    // Extract all top-level menu categories
    const menuCategories = await page.evaluate(() => {
      const categories: { name: string }[] = [];
      // TODO: for unknown reason, this get more li elements than expected
      const menuItems = document.querySelectorAll('nav ul li:nth-child(1) ul li');
      // const menuItems = menu.querySelectorAll('nav ul li:nth-child(1) ul li');

      menuItems.forEach(item => {
        const categoryLink = item.querySelector('button');
        if (categoryLink && categoryLink.textContent) {
          categories.push({
            name: categoryLink.textContent.trim(),
            // url: categoryLink.href,
            // subcategories: [],
          });
        }
      });

      return categories;
    });

    console.log(`Found ${menuCategories.length} main categories`);

    // TODO: create folder
    // Save the data to a JSON file
    await fs.writeFile('out/costco-menu.json', JSON.stringify(menuCategories, null, 2));
    console.log('Menu data saved to costco-menu.json');
  } catch (error) {
    console.error('Error scraping Costco:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

scrapeCostcoMenu();

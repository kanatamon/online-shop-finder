import 'babel-polyfill';
import * as functions from 'firebase-functions';
import puppeteer from 'puppeteer';

const IG_URL = 'https://www.instagram.com/explore/tags/lipstick/?hl=en';

const extractItems = () => {
  const extractedElements = document.querySelectorAll('.v1Nh3.kIKUG._bz0w');
  const items = [];
  for (let element of extractedElements) {
    const imageUrl = element.querySelector('img').src;
    const igUrl = element.querySelector('a').href;
    items.push({
      imageUrl,
      igUrl,
    });
  }
  return items;
}

const scrapeInfiniteScrollItems = async (
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000,
) => {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      const viewedItems = await page.evaluate(extractItems);
      items = viewedItems
        // Filter only new items.
        .filter(viewedItem => {
          return !items.find(item => item.imageUrl === viewedItem.imageUrl);
        })
        .concat(items);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
  } catch(e) { }
  return items;
}

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Navigate to the demo page.
  await page.goto(IG_URL);

  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page, extractItems, 100);
  
  // Close the browser.
  await browser.close();
  
  response.send(items);
});
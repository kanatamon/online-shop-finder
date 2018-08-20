const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const IG_URL = 'https://www.instagram.com/explore/tags/กระโปงสวยๆ/';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const extractItems = () => {
  const extractedElements = document.querySelectorAll('.v1Nh3.kIKUG._bz0w');
  const items = [];
  for (let element of extractedElements) {
    const {
      src: imageUrl,
      alt: caption,
    } = element.querySelector('img');
    const igUrl = element.querySelector('a').href;
    items.push({
      caption,
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

app.get('/', async (request, response) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  // Navigate to the demo page.
  await page.goto(IG_URL);

  // Scroll and extract items from the page.
  items = await scrapeInfiniteScrollItems(page, extractItems, 100);
  
  // Close the browser.
  await browser.close();
  
  response.send(items);
});

app.listen(5000, () => console.log('Example app listening on port 5000!'))

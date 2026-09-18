const puppeteer = require('puppeteer');
const http = require('http');

async function runBenchmark() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  let imageRequests = 0;
  let totalImageBytes = 0;

  page.on('response', async (response) => {
    const request = response.request();
    if (request.resourceType() === 'image') {
      imageRequests++;
      try {
        const buffer = await response.buffer();
        totalImageBytes += buffer.length;
      } catch (e) {
        // Ignore
      }
    }
  });

  const start = Date.now();
  await page.goto('http://localhost:4321/la-juste-nuance-site/', { waitUntil: 'load' });
  const end = Date.now();

  console.log(`Load time: ${end - start}ms`);
  console.log(`Image requests: ${imageRequests}`);
  console.log(`Total image bytes: ${(totalImageBytes / 1024).toFixed(2)} KB`);

  await browser.close();
}

runBenchmark().catch(console.error);

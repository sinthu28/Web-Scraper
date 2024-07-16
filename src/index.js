const { webkit } = require('playwright');

(async () => {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    await page.goto("https://playwright.dev/");
    await page.screenshot({path:"web.png"});
    await browser.close();
})()
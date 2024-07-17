const Browser = require('./scraper/browser')
const Navigation = require('./scraper/navigation')

async function main() {
    const browser = new Browser();
    await browser.init();
    setTimeout(async ()=>{
        console.log("Wait for loading...");
        const page = browser.page;
        const navigatorObj = new Navigation(page)

        const url = 'https://example.com/products';

        await navigatorObj.navigateToUrl(url)
        await page.screenshot({path:"exapmle.jpg"})
        await browser.close()
    }, 2000)
};
main()
const Browser = require('./Browser/browser')

async function main() {
    const browser = new Browser();
    await browser.init();
    setTimeout(async ()=>{
        console.log("Wait for loading...");
        await browser.close()
    }, 2000)
};
main()
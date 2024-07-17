
const { chromium } = require('playwright');

class Browser {
    constructor(){
        this.browser = null;
        this.page = null;
    }

    async init(){
        this.browser = await chromium.launch({
            headless: false
        });
        this.page = await this.browser.newPage();
    }
         
    async close(){
        await this.browser.close();
        console.log("Browser closed !!")
    }
}

module.exports = Browser;

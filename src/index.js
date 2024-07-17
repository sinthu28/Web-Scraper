const Browser = require('./scraper/browser')
const Navigation = require('./scraper/navigation')
const PageScrollModels = require('./scraper/scrollModels')

async function main() {
    const browserObj = new Browser();

    try{
        await browserObj.init();

        const page = browserObj.page
        const navigationObj = new Navigation(page);
        const URL = 'https://www.amazon.com/s?k=makeup&s=review-rank&crid=10TM4L41CICQ0&qid=1721238608&sprefix=make%2Caps%2C366&ref=sr_st_review-rank&ds=v1%3AT4PcIWfJki%2BQPhf%2FUYOdR6TY8eGnA3ma3HwjEmX9tG4'

        await navigationObj.navigateToUrl(URL);
        
        const scrollModelsObj = new PageScrollModels(page)
        await scrollModelsObj.model__1()
        console.log("Scroll Executed !")
    }
    
    catch(err){
        console.log("Error: ", err)
    }

    finally{
        await browserObj.close();
    }
};
main()
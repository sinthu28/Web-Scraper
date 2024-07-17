
const Browser = require('./scraper/browser');
const Navigation = require('./scraper/navigation');
const PageScrollModels = require('./scraper/scrollModels');

async function main() {
    const browserObj = new Browser();

    try {
        await browserObj.init();

        const page = browserObj.page;
        const navigationObj = new Navigation(page);
        const URL = 'https://www.aliexpress.com/w/wholesale-New-in-Tops-%26-Tees.html?isFromCategory=y&categoryUrlParams=%7B%22q%22%3A%22New+in+Tops+%26+Tees%22%2C%22s%22%3A%22qp_nw%22%2C%22osf%22%3A%22category_navigate%22%2C%22sg_search_params%22%3A%22%22%2C%22guide_trace%22%3A%22b0a2231d-29f8-46a7-af22-b3c816e0f80d%22%2C%22scene_id%22%3A%2237749%22%2C%22searchBizScene%22%3A%22openSearch%22%2C%22recog_lang%22%3A%22en%22%2C%22bizScene%22%3A%22category_navigate%22%2C%22guideModule%22%3A%22category_navigate_vertical%22%2C%22postCatIds%22%3A%22200000343%2C200001813%22%2C%22scene%22%3A%22category_navigate%22%7D&g=y&SearchText=New+in+Tops+%26+Tees&sortType=total_tranpro_desc';

        await navigationObj.navigateToUrl(URL);

        const scrollModelsObj = new PageScrollModels(page);
        await scrollModelsObj.model__1();

        /*
            {Extraction Code should be implemented}
        */

        await navigationObj.takeScreenshot('screenshots/page_1.png');

        let pageCount = 1;

        while (await navigationObj.navigateNextPage()) {
            pageCount++;
            await scrollModelsObj.model__1();
            await navigationObj.takeScreenshot(`screenshots/page_${pageCount}.png`);
        }
        
        console.log("Screenshots Saved!!");
    } catch (err) {
        console.log("Error: ", err);
    } finally {
        await browserObj.close();
    }
};

main();

const { chromium } = require('playwright');
const fs = require('fs');

async function scrollAndExtract(page, menClothes) {
    await page.waitForSelector('.list--galleryWrapper--29HRJT4');
    
    // Function to scroll down using the mouse wheel
    async function scrollDown() {
        let lastScrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        while (true) {
            await page.mouse.wheel(0, 900);
            await page.waitForTimeout(800); // Adjust timeout as necessary
            const newScrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
            if (newScrollHeight === lastScrollHeight) 
                break;
            lastScrollHeight = newScrollHeight;
        }
    }

    // Function to extract product titles
    async function extractTitles() {
        const productHandles = await page.$$('.list--galleryWrapper--29HRJT4 > .search-item-card-wrapper-gallery');
        for (const product of productHandles) {
            let title = "Null";
            try {
                title = await product.$eval('div > div > a > div.multi--content--11nFIBL > div.multi--title--G7dOCj3 > h3', el => el.textContent.trim());
            } catch (err) {
                console.log(`Error extracting title: ${err}`);
            }
            if (title !== "Null") {
                menClothes.push({ title });
            }
        }
    }

    await scrollDown();
    await extractTitles();
}

async function scrollAutomation() {
    const browser = await chromium.launch({
        headless: false,  // Set to true for production use
    });
    const page = await browser.newPage();
    await page.goto("https://www.aliexpress.com/w/wholesale-New-in-Tops-%26-Tees.html?isFromCategory=y&categoryUrlParams=%7B%22q%22%3A%22New+in+Tops+%26+Tees%22%2C%22s%22%3A%22qp_nw%22%2C%22osf%22%3A%22category_navigate%22%2C%22sg_search_params%22%3A%22%22%2C%22guide_trace%22%3A%22b0a2231d-29f8-46a7-af22-b3c816e0f80d%22%2C%22scene_id%22%3A%2237749%22%2C%22searchBizScene%22%3A%22openSearch%22%2C%22recog_lang%22%3A%22en%22%2C%22bizScene%22%3A%22category_navigate%22%2C%22guideModule%22%3A%22category_navigate_vertical%22%2C%22postCatIds%22%3A%22200000343%2C200001813%22%2C%22scene%22%3A%22category_navigate%22%7D&g=y&SearchText=New+in+Tops+%26+Tees&sortType=total_tranpro_desc");
    
    let menClothes = [];

    // Loop until there are no more pages to navigate
    try {
        while (true) {
            await scrollAndExtract(page, menClothes);

            // Check if the next page button is disabled
            const nextButtonDisabled = await page.$('.comet-pagination-next.comet-pagination-disabled');
            if (nextButtonDisabled) {
                break;
            }

            // Click the next page button and wait for navigation and content to load
            const nextPageButton = await page.$('.comet-pagination-next:not(.comet-pagination-disabled)');
            if (nextPageButton) {
                await Promise.all([
                    nextPageButton.click(),
                    page.waitForNavigation({ waitUntil: 'networkidle' }),
                    scrollAndExtract(page, menClothes)
                ]);
            } else {
                break;
            }
        }
    } catch (error) {
        console.log(`Error in scrollAutomation: ${error}`);
    } finally {
        // Save as JSON in local file
        const jsonString = JSON.stringify(menClothes, null, 2);
        fs.writeFile('New_Arrivals_Men.json', jsonString, (err) => {
            if (err) {
                console.log(`Error Occurred: ${err}`);
            } else {
                console.log('Successfully Created !!');
            }
        });

        await browser.close();
    }
}

scrollAutomation();

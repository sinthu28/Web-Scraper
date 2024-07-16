const { chromium } = require('playwright');

async function scrollAutomation(){
    const browser = await chromium.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.aliexpress.com/w/wholesale-New-in-Tops-%26-Tees.html?isFromCategory=y&categoryUrlParams=%7B%22q%22%3A%22New+in+Tops+%26+Tees%22%2C%22s%22%3A%22qp_nw%22%2C%22osf%22%3A%22category_navigate%22%2C%22sg_search_params%22%3A%22%22%2C%22guide_trace%22%3A%22b0a2231d-29f8-46a7-af22-b3c816e0f80d%22%2C%22scene_id%22%3A%2237749%22%2C%22searchBizScene%22%3A%22openSearch%22%2C%22recog_lang%22%3A%22en%22%2C%22bizScene%22%3A%22category_navigate%22%2C%22guideModule%22%3A%22category_navigate_vertical%22%2C%22postCatIds%22%3A%22200000343%2C200001813%22%2C%22scene%22%3A%22category_navigate%22%7D&g=y&SearchText=New+in+Tops+%26+Tees&sortType=total_tranpro_desc");
    await page.waitForTimeout(2000)

    var scrollAttempt = 1
    let menClothes = []

    while (scrollAttempt > 0){
        //scroll decrement manual
        await page.evaluate(()=>window.scrollBy(0,900))
        await page.waitForTimeout(500)
        scrollAttempt--;
    }
    const productHandle = await page.$$('.list--galleryWrapper--29HRJT4 > .search-item-card-wrapper-gallery')
        for(const product of productHandle){
            let title = "Null"
            //title extracting ***DEMO***
            try{
                title = await page.evaluate(el => el.querySelector('div > div > a > div.multi--content--11nFIBL > div.multi--title--G7dOCj3 > h3').textContent, product)
            }catch(err){
                console.log(`Error: ${err}`)
            }

            if (title !== "Null"){
                menClothes.push({title})
            }
        }
    /////////////////////////**Save as JSON in local*/
    const jsonString = JSON.stringify(menClothes, null, 2);
    const fs = require('fs');
        fs.writeFile('New_Arrivals_Men.json', jsonString, (err) => {
            if (err) {
                console.log(`Error Occured: ${err}`);
            } else {
                console.log('Sucessfully Created !!');
            }
        });
}

scrollAutomation()

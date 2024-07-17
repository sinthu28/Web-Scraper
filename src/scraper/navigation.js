const path = require("path");

class Navigation{
    constructor(page){
        this.page = page;
    }

    async navigateToUrl(url){
        await this.page.goto(url)
        await this.page.waitForLoadState('load');
    }

    async navigateNextPage(){
        const nextPageButton = await this.page.$('.comet-pagination-next:not(.comet-pagination-disabled)')
        if (nextPageButton){
            await nextPageButton.click();
            await this.page.waitForLoadState('networkidle');
            return true;
        }
        return false;
    }
}

module.exports = Navigation;
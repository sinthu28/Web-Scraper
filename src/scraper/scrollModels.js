
class PageScrollModels{
   constructor(page){
        this.page = page;
   }
   
// Helper function model__1
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
///end model__1

   async model__1() {
        const totalScrolls = this.getRandomInt(4, 8); 
        for (let i = 0; i < totalScrolls - 1; i++) {
            const scrollLength = this.getRandomInt(1500, 1700);
            const scrollSpeed = this.getRandomFloat(50 , 150 );
            await this.page.evaluate(async (scrollLength) => {
                window.scrollBy(0, scrollLength);
            }, scrollLength);
            
            await this.page.waitForTimeout(scrollSpeed);

            const pauseDuration = this.getRandomFloat(3000, 4000); 
            await this.page.waitForTimeout(pauseDuration);
        }
    
        await this.page.screenshot({ path: "web.png" });
    }
}

module.exports = PageScrollModels;
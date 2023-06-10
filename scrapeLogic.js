const puppeteer = require('puppeteer');
const scrapeLogic = async (res) => {

    /*  const browser = await puppeteer.launch({
         headless: true // Set to `true` for headless mode
     }); try {
         //res.send("Hello from scrapeLogic.");
 
         const page = await browser.newPage();
         //throw new Error("Whoops!");
 
         await page.goto('https://developer.chrome.com/');
 
         // Set screen size
         await page.setViewport({ width: 1080, height: 1024 });
 
         // Type into search box
         await page.type('.search-box__input', 'automate beyond recorder');
 
         // Wait and click on first result
         const searchResultSelector = '.search-box__link';
         await page.waitForSelector(searchResultSelector, { timeout: 60000 });
         await page.click(searchResultSelector);
 
         // Locate the full title with a unique string
         const textSelector = await page.waitForSelector(
             //const textSelector = await page.waitForXPath(
             'text/Customize and automate'
         );
         const fullTitle = await textSelector?.evaluate(el => el.textContent);
 
         const logStatement = `The title of this blog post is ${fullTitle}`;
         // Print the full title
         console.log(logStatement);
 
         res.send(logStatement);
     } catch (e) {
         console.error(e);
         res.send(`Something went wrong :${e}`);
     } finally {
         await browser.close();
     } */
    run().then((data) => {
        console.log('data returned : ' + JSON.stringify(data));
        res.send(JSON.stringify(data));
    }).catch((e) => {
        console.error(e);
        res.send(`Something went wrong :${e}`);
    });

};
function run() {

    return new Promise(async (resolve, reject) => {
        try {
            //throw new Error("Whoops!");
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://news.ycombinator.com/");

            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('a');
                //console.log(items);
                items.forEach((item) => {
                    results.push({
                        url: item.getAttribute('href'),
                        text: item.innerText,
                    });
                });
                return results;
            });
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    });
}
module.exports = { scrapeLogic };
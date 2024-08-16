import puppeteer from "puppeteer";
import { saveDocumentation } from "../services/documentation.service";

export default async function nextScrapper(url){
    const browser = await puppeteer.launch({ headless:false});
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.evaluate(() => {
      const main = document.querySelector('main');
      const secondChild = main.children[1];
      const ancorsContainer = secondChild.firstElementChild;
      return Array.from(ancorsContainer.querySelectorAll('a')).map(anchor => anchor.href);
    });

    let text = ''
    for(let link of links.slice(0,40)) {
      await page.goto(link,{ waitUntil:'domcontentloaded', timeout:0});
      text += await page.evaluate(()=>{
        const documentation = document.querySelector('.prose-vercel');
        return documentation ? documentation.innerText : '';
      })
    }
   await browser.close();
   saveDocumentation(text)
}


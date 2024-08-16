import puppeteer from "puppeteer";
import { saveDocumentation } from "../services/documentation.service.js";

export default async function nextScrapper(url){
    const browser = await puppeteer.launch({ headless:true});
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.evaluate(() => {
      const main = document.querySelector('main');
      const secondChild = main.children[1];
      const ancorsContainer = secondChild.firstElementChild;
      return Array.from(ancorsContainer.querySelectorAll('a')).map(anchor => anchor.href);
    });

    let topics = [];
    for(let link of links.slice(0,5)) {
      await page.goto(link,{ waitUntil:'domcontentloaded', timeout:0});
      const newTopic = await page.evaluate(()=>{
        const documentation = document.querySelector('.prose-vercel');
        const topic = document.querySelector(".break-words")
        return {
          documentation: documentation.innerText || '',
          topic: topic.innerText || ''
        }
      })
      topics.push(newTopic);
    }
   await browser.close();
   console.log(topics)
   //saveDocumentation(topics)
}


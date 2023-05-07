const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer')

const html = `
    <h1>HELLO WORLD</h1>
    <p>The Subscriptions are open now !</p>
`

async function email(){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // port: 465,
        // secure: true,
        auth: {
            user: 'bouafia.khaled@univ-setif2.dz',
            pass: 'nextchallenge2021'
        }
    })

    const info = await transporter.sendMail({
        from: 'bouafia <bouafia19rails@gmail.com>',
        to: 'khaledsetif1900@gmail.com',
        subject: 'Notification',
        html: html
    })

    console.log('Message sent: ' + info.messageId)
}

async function run(){
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();
  
    await page.goto('https://developer.chrome.com/');
  
    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
  
    // Type into search box
    await page.type('.search-box__input', 'automate beyond recorder');
  
    // Wait and click on first result
    const searchResultSelector = '.search-box__link';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
  
    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      'text/Customize and automate'
    );
    const fullTitle = await textSelector.evaluate(el => el.textContent);
  
    // Print the full title
    email()
    .catch(e => console.log(e))
    console.log('The title of this blog post is "%s".', fullTitle);
  
    await browser.close();
  }

  run();
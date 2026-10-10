// MQ-101: Browser smoke test. Run: BASE_URL=https://aitoolshubsaas-prog.github.io/MineQuest-3D/ npx -y -p playwright node tests/movement.spec.cjs
// Requires a locally installed Playwright package and Chromium browser.
// Example: npm install --no-save playwright && npx playwright install chromium && node tests/movement.spec.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.BASE_URL||'http://localhost:3000/',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#play');
 await page.click('#play');
 await page.waitForFunction(()=>document.pointerLockElement!==null,{timeout:8000}).catch(()=>{});
 const locked=await page.evaluate(()=>!!document.pointerLockElement);
 assert(locked,'Pointer lock failed; browser/headless mode may not support it');
 const before=await page.locator('#hud').innerText();
 for(const key of ['w','s','a','d']){await page.keyboard.down(key);await page.waitForTimeout(300);await page.keyboard.up(key)}
 await page.keyboard.down('Space');await page.waitForTimeout(180);await page.keyboard.up('Space');
 await page.keyboard.press('Backspace');
 await page.waitForFunction(()=>document.pointerLockElement===null);
 assert(await page.locator('#menu').isVisible(),'Pause menu must appear after Backspace');
 assert.equal(errors.length,0,'Unexpected browser errors: '+errors.join('; '));
 console.log('MQ-101 input smoke test PASS. HUD:',before.slice(0,100));
 await browser.close();
})().catch(e=>{console.error('MQ-101 FAILED:',e);process.exitCode=1});

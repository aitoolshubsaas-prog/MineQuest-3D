// MQ-101 regression test. Install: npm install --no-save playwright && npx playwright install chromium
// Run locally with a server: BASE_URL=http://localhost:3000/ node tests/movement.spec.cjs
// Or target the deployed website with BASE_URL=https://aitoolshubsaas-prog.github.io/MineQuest-3D/
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
 const browser = await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 try {
  const page = await browser.newPage({viewport:{width:1280,height:800}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.BASE_URL || 'http://localhost:3000/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!!window.mineQuestDiagnostics,null,{timeout:30000});
  await page.locator('#play').click();
  await page.waitForFunction(()=>window.mineQuestDiagnostics.locked,null,{timeout:10000});
  const state=()=>page.evaluate(()=>window.mineQuestDiagnostics);
  await page.waitForFunction(()=>window.mineQuestDiagnostics.grounded,null,{timeout:10000});
  const tests=[
   ['w','z',-1],['s','z',1],['a','x',-1],['d','x',1]
  ];
  for(const [key,axis,sign] of tests){
   const before=await state();
   await page.keyboard.down(key);await sleep(400);await page.keyboard.up(key);
   const after=await state(),delta=after.position[axis]-before.position[axis];
   assert(delta*sign>0.15,`${key.toUpperCase()} should move ${axis} in direction ${sign}; got ${delta.toFixed(3)}`);
   console.log('PASS',key.toUpperCase(),'delta',delta.toFixed(2));
  }
  await page.waitForFunction(()=>window.mineQuestDiagnostics.grounded,null,{timeout:5000});
  const ground=(await state()).position.y;
  await page.keyboard.down('Space');await sleep(180);await page.keyboard.up('Space');
  const peak=(await state()).position.y;
  assert(peak>ground+0.25,`Space jump should raise player; ground=${ground}, current=${peak}`);
  console.log('PASS Space jump', (peak-ground).toFixed(2));
  await page.keyboard.press('Digit6');
  assert.equal((await state()).selected,5,'Digit6 should equip pickaxe');
  console.log('PASS pickaxe selection');
  await page.keyboard.press('Backspace');
  await page.waitForFunction(()=>!window.mineQuestDiagnostics.locked,null,{timeout:5000});
  assert(await page.locator('#menu').isVisible(),'Backspace should open pause menu');
  assert.deepEqual(errors,[],'No uncaught browser exceptions');
  console.log('MQ-101 PASS');
 } finally {await browser.close()}
})().catch(e=>{console.error('MQ-101 FAIL',e);process.exitCode=1});

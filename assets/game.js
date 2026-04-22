const crewData = [
  { key:'luffy', name:'Luffy', role:'Captain', cost:50, growth:1.16, dmg:7, text:'Elastic blows raise base swing damage.', skill:'Gomu Combo' },
  { key:'zoro', name:'Zoro', role:'Swordsman', cost:130, growth:1.17, dmg:16, text:'Heavy cuts add big single-hit pressure.', skill:'Santoryu' },
  { key:'nami', name:'Nami', role:'Navigator', cost:320, growth:1.18, dmg:26, text:'Weather tech boosts Belly gains and tempo.', skill:'Thunder Tempo' },
  { key:'usopp', name:'Usopp', role:'Sniper', cost:720, growth:1.19, dmg:41, text:'Ranged shots improve crit chance and relic luck.', skill:'Exploding Star' },
  { key:'sanji', name:'Sanji', role:'Cook', cost:1800, growth:1.2, dmg:66, text:'Fast kicks reduce the long auto-swing timer.', skill:'Diable Jambe' },
  { key:'chopper', name:'Chopper', role:'Doctor', cost:4300, growth:1.21, dmg:96, text:'Medical boosts scale all training better.', skill:'Guard Point' },
  { key:'robin', name:'Robin', role:'Scholar', cost:9800, growth:1.22, dmg:145, text:'Ancient knowledge improves relic income.', skill:'Mil Fleur' },
  { key:'franky', name:'Franky', role:'Shipwright', cost:22000, growth:1.23, dmg:210, text:'Mechanical strikes upgrade ship synergy.', skill:'Radical Beam' },
  { key:'brook', name:'Brook', role:'Musician', cost:50000, growth:1.24, dmg:305, text:'Soul music buffs fruit mastery and fame.', skill:'Soul Parade' },
  { key:'jinbe', name:'Jinbe', role:'Helmsman', cost:110000, growth:1.25, dmg:455, text:'Fish-Man karate dominates late seas.', skill:'Ocean Current Throw' }
];

const shipData = [
  { key:'hull', name:'Reinforced Hull', cost:160, growth:1.85, max:20, text:'More durability means higher Belly rewards.', effect:s=>1 + s.ship.hull * 0.08 },
  { key:'sails', name:'Swift Sails', cost:260, growth:1.9, max:20, text:'Reduces the slow auto-battle swing timer.', effect:s=>Math.max(1.25, 2.8 - s.ship.sails * 0.08) },
  { key:'cannons', name:'Deck Cannons', cost:420, growth:1.92, max:20, text:'Adds bonus damage every auto swing.', effect:s=>s.ship.cannons * 18 },
  { key:'storage', name:'Treasure Hold', cost:760, growth:1.95, max:16, text:'Raises relic and Belly haul from kills.', effect:s=>1 + s.ship.storage * 0.09 },
  { key:'logPose', name:'Grand Log Pose', cost:1400, growth:2.0, max:12, text:'Improves zone unlock pace and bounty gain.', effect:s=>1 + s.ship.logPose * 0.12 }
];

const autoData = [
  { key:'training', name:'Crew Drills', cost:120, scale:2.1, max:12, text:'+20% crew damage.', effect:s=>1 + s.auto.training * 0.2 },
  { key:'denDen', name:'Den Den Commerce', cost:220, scale:2.15, max:12, text:'+18% Belly from victories.', effect:s=>1 + s.auto.denDen * 0.18 },
  { key:'campfire', name:'Night Camp Routine', cost:480, scale:2.2, max:10, text:'+12% manual strike damage.', effect:s=>1 + s.auto.campfire * 0.12 },
  { key:'navigator', name:'Navigator Routing', cost:920, scale:2.28, max:10, text:'+15% relic gain.', effect:s=>1 + s.auto.navigator * 0.15 },
  { key:'posters', name:'Wanted Poster Network', cost:1800, scale:2.35, max:10, text:'+18% bounty gain.', effect:s=>1 + s.auto.posters * 0.18 },
  { key:'lookout', name:'Lookout Rotation', cost:3600, scale:2.44, max:12, text:'+6% attack speed.', effect:s=>1 + s.auto.lookout * 0.06 }
];

const fruitData = [
  { key:'gomu', name:'Gomu Gomu no Mi', cost:120, obtained:false, desc:'+35% manual strike and +10% crew damage.', apply:s=>({manual:1.35, crew:1.1, belly:1, relic:1, bounty:1}) },
  { key:'mera', name:'Mera Mera no Mi', cost:480, obtained:false, desc:'+32% crew damage and fireburst crit chance.', apply:s=>({manual:1.1, crew:1.32, belly:1, relic:1, bounty:1.08}) },
  { key:'goro', name:'Goro Goro no Mi', cost:1350, obtained:false, desc:'+18% attack speed and +12% relic gain.', apply:s=>({manual:1.08, crew:1.16, speed:1.18, belly:1, relic:1.12, bounty:1}) },
  { key:'ope', name:'Ope Ope no Mi', cost:3600, obtained:false, desc:'+15% to all gains and smarter long-grind scaling.', apply:s=>({manual:1.15, crew:1.15, belly:1.15, relic:1.15, bounty:1.15}) },
  { key:'hito', name:'Hito Hito no Mi', cost:7600, obtained:false, desc:'+24% crew damage and +20% fame efficiency.', apply:s=>({manual:1.05, crew:1.24, belly:1, relic:1.05, bounty:1.1, fame:1.2}) }
];

const hakiData = [
  { key:'armament', name:'Armament Haki', cost:80, growth:1.75, max:25, text:'+9% swing damage per level.' },
  { key:'observation', name:'Observation Haki', cost:110, growth:1.78, max:20, text:'+3% attack speed and +4% relic luck per level.' },
  { key:'conqueror', name:'Conqueror’s Haki', cost:280, growth:1.88, max:15, text:'+8% bounty and +6% prestige value per level.' }
];

const zones = [
  { name:'Foosha Village Coast', enemy:'Coast Bandit', hp:70, belly:15, bounty:1, relic:0, req:0, flavor:'A rough shoreline full of low-level bandits and small gains.', color:'#e8c372' },
  { name:'Shells Town Docks', enemy:'Marine Cadet Squad', hp:180, belly:28, bounty:2, relic:0, req:120, flavor:'Early grinding against rookies with sturdier health pools.', color:'#88b9d9' },
  { name:'Orange Town Square', enemy:'Buggy Pirate Mob', hp:520, belly:55, bounty:4, relic:1, req:450, flavor:'Slow clears begin to matter, and relic drops start.', color:'#f19761' },
  { name:'Baratie Waters', enemy:'Krieg Armada Scout', hp:1450, belly:112, bounty:7, relic:1, req:1400, flavor:'A classic mid-game wall with better loot pacing.', color:'#66c5b8' },
  { name:'Arlong Park Bay', enemy:'Fish-Man Raider', hp:4100, belly:245, bounty:12, relic:2, req:4200, flavor:'Longer fights reward steady investment over spam.', color:'#61b9d8' },
  { name:'Loguetown Stormfront', enemy:'Smoker Patrol', hp:9800, belly:520, bounty:21, relic:3, req:12000, flavor:'Combat starts to feel like slow MMO mob farming.', color:'#bda8f3' },
  { name:'Drum Island Ridge', enemy:'Chess Mercenary', hp:23000, belly:1200, bounty:34, relic:4, req:35000, flavor:'Grinding elite packs turns Belly and relics into real progress.', color:'#dbe7f3' },
  { name:'Alabasta Dunes', enemy:'Baroque Works Agent', hp:51000, belly:2750, bounty:52, relic:5, req:96000, flavor:'Ship tuning and fruit bonuses start to matter a lot.', color:'#efc874' },
  { name:'Water 7 Shipyards', enemy:'CP9 Operative', hp:116000, belly:6200, bounty:84, relic:7, req:260000, flavor:'A major grind plateau with strong mid-run prestige value.', color:'#70d0f1' },
  { name:'Marineford Ruins', enemy:'Pacifista Unit', hp:265000, belly:13800, bounty:145, relic:9, req:700000, flavor:'Late-run farming with heavy stat checks and long cycles.', color:'#ff92a4' },
  { name:'Wano Flower Capital', enemy:'Beast Pirate Officer', hp:620000, belly:31500, bounty:250, relic:12, req:1900000, flavor:'High-end mob grinding for fruit and haki builds.', color:'#f4a4ef' },
  { name:'Egghead Frontier', enemy:'Seraphim Replica', hp:1500000, belly:72000, bounty:420, relic:16, req:5600000, flavor:'Endgame grind wall built for repeat prestige runs.', color:'#9ce3e4' }
];

const state = {
  belly: 90,
  bounty: 0,
  relics: 0,
  fame: 0,
  highestBelly: 90,
  zoneIndex: 0,
  enemyHp: zones[0].hp,
  cycle: 0,
  kills: 0,
  totalRelics: 0,
  log:['The ship leaves harbor. This run will be slow and profitable.'],
  crew:Object.fromEntries(crewData.map(c=>[c.key,0])),
  ship:Object.fromEntries(shipData.map(s=>[s.key,0])),
  auto:Object.fromEntries(autoData.map(a=>[a.key,0])),
  fruits:Object.fromEntries(fruitData.map(f=>[f.key,false])),
  equippedFruit:null,
  haki:Object.fromEntries(hakiData.map(h=>[h.key,0]))
};

const el = {
  resourceGrid:document.getElementById('resourceGrid'), zoneName:document.getElementById('zoneName'), zoneFlavor:document.getElementById('zoneFlavor'), zoneReq:document.getElementById('zoneReq'), enemyName:document.getElementById('enemyName'), enemyTier:document.getElementById('enemyTier'), enemyHp:document.getElementById('enemyHp'), enemyHpBar:document.getElementById('enemyHpBar'), attackCycle:document.getElementById('attackCycle'), attackBar:document.getElementById('attackBar'), crewDamage:document.getElementById('crewDamage'), manualDamage:document.getElementById('manualDamage'), attackTempo:document.getElementById('attackTempo'), swingDamage:document.getElementById('swingDamage'), battleLog:document.getElementById('battleLog'), crewGrid:document.getElementById('crewGrid'), shipGrid:document.getElementById('shipGrid'), fruitGrid:document.getElementById('fruitGrid'), hakiGrid:document.getElementById('hakiGrid'), upgradeList:document.getElementById('upgradeList'), crewPower:document.getElementById('crewPower'), shipPower:document.getElementById('shipPower'), equippedFruit:document.getElementById('equippedFruit'), prestigeText:document.getElementById('prestigeText'), milestoneList:document.getElementById('milestoneList'), enemyPortrait:document.getElementById('enemyPortrait')
};

const fmt = n => n >= 1e9 ? (n/1e9).toFixed(2)+'B' : n >= 1e6 ? (n/1e6).toFixed(2)+'M' : n >= 1e3 ? (n/1e3).toFixed(2)+'K' : Math.floor(n).toString();
const currentZone = () => zones[state.zoneIndex];
const fruitBonus = () => state.equippedFruit ? (fruitData.find(f=>f.key===state.equippedFruit).apply(state)) : { manual:1, crew:1, speed:1, belly:1, relic:1, bounty:1, fame:1 };
const fameBonus = () => 1 + state.fame * 0.1;
const hakiDamage = () => 1 + state.haki.armament * 0.09;
const hakiSpeed = () => 1 + state.haki.observation * 0.03;
const hakiRelic = () => 1 + state.haki.observation * 0.04;
const hakiBounty = () => 1 + state.haki.conqueror * 0.08;
const prestigeBoost = () => 1 + state.haki.conqueror * 0.06;
const autoSpeed = () => autoData.find(a=>a.key==='lookout').effect(state);
const shipTempo = () => shipData.find(s=>s.key==='sails').effect(state);
const attackInterval = () => shipTempo() / (autoSpeed() * hakiSpeed() * (fruitBonus().speed || 1) * fameBonus());
function crewDamageTotal(){
  const base = crewData.reduce((sum,c)=>sum + state.crew[c.key] * c.dmg, 0);
  return base * autoData.find(a=>a.key==='training').effect(state) * hakiDamage() * fameBonus() * fruitBonus().crew;
}
function swingDamage(){ return crewDamageTotal() + shipData.find(s=>s.key==='cannons').effect(state); }
function manualStrike(){ return Math.max(10, swingDamage() * 0.7) * autoData.find(a=>a.key==='campfire').effect(state) * fruitBonus().manual; }
function bellyGainMult(){ return fameBonus() * autoData.find(a=>a.key==='denDen').effect(state) * shipData.find(s=>s.key==='hull').effect(state) * shipData.find(s=>s.key==='storage').effect(state) * fruitBonus().belly; }
function relicGainMult(){ return fameBonus() * autoData.find(a=>a.key==='navigator').effect(state) * shipData.find(s=>s.key==='storage').effect(state) * hakiRelic() * fruitBonus().relic; }
function bountyGainMult(){ return fameBonus() * autoData.find(a=>a.key==='posters').effect(state) * shipData.find(s=>s.key==='logPose').effect(state) * hakiBounty() * fruitBonus().bounty; }
function zoneOpen(i){ return state.highestBelly >= Math.max(0, zones[i].req * (1 - Math.min(0.36, state.ship.logPose * 0.015))); }
function addLog(msg){ state.log.unshift(msg); state.log = state.log.slice(0,8); renderLog(); }

function floaty(text, x, y, color){
  const n = document.createElement('div');
  n.className='float-number'; n.textContent=text; n.style.left=`${x}px`; n.style.top=`${y}px`; n.style.color=color;
  document.getElementById('floatingNumbers').appendChild(n); setTimeout(()=>n.remove(),1020);
}

function rewardKill(){
  const z = currentZone();
  const belly = Math.floor(z.belly * bellyGainMult());
  const bounty = Math.floor(z.bounty * bountyGainMult());
  const relicChance = Math.min(0.55, 0.18 + state.haki.observation * 0.01 + (state.equippedFruit ? 0.02 : 0));
  const relic = Math.random() < relicChance ? Math.max(1, Math.floor(z.relic * relicGainMult())) : 0;
  state.belly += belly; state.bounty += bounty; state.relics += relic; state.totalRelics += relic; state.kills += 1; state.highestBelly = Math.max(state.highestBelly, state.belly);
  floaty(`+${fmt(belly)} Belly`, innerWidth*.58, innerHeight*.30, '#ffe08f');
  if (bounty) floaty(`+${fmt(bounty)} Bounty`, innerWidth*.63, innerHeight*.36, '#ffb1bd');
  if (relic) floaty(`+${fmt(relic)} Relic`, innerWidth*.49, innerHeight*.25, '#98f0df');
  addLog(`Defeated ${z.enemy}. Slow grind pays out ${fmt(belly)} Belly.`);
  state.enemyHp = z.hp;
}

function hit(amount, manual=false){
  state.enemyHp -= amount;
  floaty(`-${fmt(amount)}`, innerWidth*.5 + Math.random()*120 - 60, innerHeight*.25 + Math.random()*80, manual ? '#ffd978' : '#ffffff');
  if (state.enemyHp <= 0) rewardKill();
}

function buyCrew(key){
  const c = crewData.find(v=>v.key===key); const cost = Math.floor(c.cost * Math.pow(c.growth, state.crew[key]));
  if (state.belly < cost) return; state.belly -= cost; state.crew[key] += 1; addLog(`${c.name} reached level ${state.crew[key]}.`); render();
}
function buyShip(key){
  const s = shipData.find(v=>v.key===key); const level = state.ship[key]; if (level >= s.max) return; const cost = Math.floor(s.cost * Math.pow(s.growth, level));
  if (state.belly < cost) return; state.belly -= cost; state.ship[key] += 1; addLog(`${s.name} improved to tier ${state.ship[key]}.`); render();
}
function buyAuto(key){
  const a = autoData.find(v=>v.key===key); const level = state.auto[key]; if (level >= a.max) return; const cost = Math.floor(a.cost * Math.pow(a.scale, level));
  if (state.relics < cost) return; state.relics -= cost; state.auto[key] += 1; addLog(`${a.name} upgraded to ${state.auto[key]}.`); render();
}
function buyFruit(key){
  const f = fruitData.find(v=>v.key===key); if (state.fruits[key]) { state.equippedFruit = key; addLog(`${f.name} equipped.`); render(); return; }
  if (state.bounty < f.cost) return; state.bounty -= f.cost; state.fruits[key] = true; state.equippedFruit = key; addLog(`${f.name} obtained and equipped.`); render();
}
function buyHaki(key){
  const h = hakiData.find(v=>v.key===key); const level = state.haki[key]; if (level >= h.max) return; const cost = Math.floor(h.cost * Math.pow(h.growth, level));
  if (state.bounty < cost) return; state.bounty -= cost; state.haki[key] += 1; addLog(`${h.name} advanced to ${state.haki[key]}.`); render();
}
function setZone(next){ if (next < 0 || next >= zones.length || !zoneOpen(next)) return; state.zoneIndex = next; state.enemyHp = currentZone().hp; addLog(`Sailed to ${currentZone().name}.`); render(); }
function prestigePreview(){ return Math.floor((Math.sqrt(state.bounty / 260) + Math.sqrt(state.totalRelics / 90) + state.zoneIndex * 1.1) * prestigeBoost() * (fruitBonus().fame || 1)); }
function prestige(){ const gain = prestigePreview(); if (gain < 1) return; state.fame += gain; state.belly = 90 + state.fame * 15; state.bounty = 0; state.relics = 0; state.highestBelly = state.belly; state.zoneIndex = 0; state.enemyHp = zones[0].hp; state.cycle = 0; state.kills = 0; state.totalRelics = 0; state.crew = Object.fromEntries(crewData.map(c=>[c.key,0])); state.ship = Object.fromEntries(shipData.map(s=>[s.key,0])); state.auto = Object.fromEntries(autoData.map(a=>[a.key,0])); state.fruits = Object.fromEntries(fruitData.map(f=>[f.key,false])); state.equippedFruit = null; state.haki = Object.fromEntries(hakiData.map(h=>[h.key,0])); state.log=[`The voyage resets. ${gain} Pirate King Fame carries forward.`]; render(); }

function renderResources(){
  const items = [
    ['Belly', fmt(state.belly), 'Crew and ship spending'],
    ['Bounty', fmt(state.bounty), 'Fruit and haki currency'],
    ['Relics', fmt(state.relics), 'Automation upgrades'],
    ['Fame', fmt(state.fame), `Permanent x${fameBonus().toFixed(2)}`],
    ['Kills', fmt(state.kills), 'This run'],
    ['Best Belly', fmt(state.highestBelly), 'Route unlocks']
  ];
  el.resourceGrid.innerHTML = items.map(([a,b,c])=>`<div class="resource-card"><span class="mini">${a}</span><strong>${b}</strong><span>${c}</span></div>`).join('');
}
function renderBattle(){
  const z = currentZone();
  el.zoneName.textContent = z.name; el.zoneFlavor.textContent = z.flavor; el.zoneReq.textContent = z.req ? `${fmt(Math.max(0, z.req * (1 - Math.min(0.36, state.ship.logPose * 0.015))))} Belly` : 'Starter Sea'; el.enemyName.textContent = z.enemy; el.enemyTier.textContent = `Tier ${state.zoneIndex + 1}`;
  el.enemyHp.textContent = `${fmt(Math.max(0, state.enemyHp))} / ${fmt(z.hp)}`; el.enemyHpBar.style.width = `${Math.max(0, state.enemyHp / z.hp) * 100}%`; el.attackCycle.textContent = `${Math.floor((state.cycle / attackInterval()) * 100)}%`; el.attackBar.style.width = `${Math.min(100, (state.cycle / attackInterval()) * 100)}%`;
  el.crewDamage.textContent = fmt(swingDamage()); el.manualDamage.textContent = fmt(manualStrike()); el.attackTempo.textContent = `${attackInterval().toFixed(2)}s`; el.swingDamage.textContent = fmt(swingDamage());
  el.enemyPortrait.style.background = `linear-gradient(145deg, ${z.color}55, rgba(80,184,192,.09))`;
}
function renderLog(){ el.battleLog.innerHTML = state.log.map(x=>`<div>${x}</div>`).join(''); }
function renderCrew(){ el.crewPower.textContent = `Power ${fmt(swingDamage())}`; el.crewGrid.innerHTML = crewData.map(c=>{ const level = state.crew[c.key]; const cost = Math.floor(c.cost * Math.pow(c.growth, level)); return `<div class="info-card"><div><div class="card-line"><div><div class="mini">${c.role}</div><h3>${c.name}</h3></div><div class="pill">Lv ${level}</div></div><p>${c.text}</p><div class="stat-row"><span>Skill: ${c.skill}</span><span>Damage: ${fmt(c.dmg)}</span></div></div><div class="buy-wrap"><strong>${fmt(cost)} Belly</strong><button class="primary-btn" data-crew="${c.key}" type="button">Train</button></div></div>`; }).join(''); }
function renderShip(){ const shipScore = Object.values(state.ship).reduce((a,b)=>a+b,0); el.shipPower.textContent = `Ship ${shipScore}`; el.shipGrid.innerHTML = shipData.map(s=>{ const level = state.ship[s.key]; const cost = Math.floor(s.cost * Math.pow(s.growth, level)); return `<div class="info-card"><div><div class="card-line"><h3>${s.name}</h3><div class="pill">${level}/${s.max}</div></div><p>${s.text}</p></div><div class="buy-wrap"><strong>${level>=s.max?'Maxed':fmt(cost)+' Belly'}</strong><button class="secondary-btn" ${level>=s.max?'disabled':''} data-ship="${s.key}" type="button">Upgrade</button></div></div>`; }).join(''); }
function renderAuto(){ el.upgradeList.innerHTML = autoData.map(a=>{ const level = state.auto[a.key]; const cost = Math.floor(a.cost * Math.pow(a.scale, level)); return `<div class="info-card"><div><div class="card-line"><h3>${a.name}</h3><div class="pill">${level}/${a.max}</div></div><p>${a.text}</p></div><div class="buy-wrap"><strong>${level>=a.max?'Maxed':fmt(cost)+' Relics'}</strong><button class="secondary-btn" ${level>=a.max?'disabled':''} data-auto="${a.key}" type="button">Upgrade</button></div></div>`; }).join(''); }
function renderFruits(){ el.equippedFruit.textContent = state.equippedFruit ? fruitData.find(f=>f.key===state.equippedFruit).name : 'No Fruit'; el.fruitGrid.innerHTML = fruitData.map(f=>`<div class="info-card"><div><div class="card-line"><h3>${f.name}</h3><div class="pill">${state.fruits[f.key] ? (state.equippedFruit===f.key ? 'Equipped' : 'Owned') : 'Locked'}</div></div><p>${f.desc}</p></div><div class="buy-wrap"><strong>${state.fruits[f.key] ? 'Owned' : fmt(f.cost)+' Bounty'}</strong><button class="secondary-btn" data-fruit="${f.key}" type="button">${state.fruits[f.key] ? 'Equip' : 'Obtain'}</button></div></div>`).join(''); }
function renderHaki(){ el.hakiGrid.innerHTML = hakiData.map(h=>{ const level = state.haki[h.key]; const cost = Math.floor(h.cost * Math.pow(h.growth, level)); return `<div class="info-card"><div><div class="card-line"><h3>${h.name}</h3><div class="pill">${level}/${h.max}</div></div><p>${h.text}</p></div><div class="buy-wrap"><strong>${level>=h.max?'Maxed':fmt(cost)+' Bounty'}</strong><button class="secondary-btn" ${level>=h.max?'disabled':''} data-haki="${h.key}" type="button">Train</button></div></div>`; }).join(''); }
function renderPrestige(){ const gain = prestigePreview(); el.prestigeText.textContent = gain > 0 ? `Reset the run for +${gain} fame. Current fame gives x${fameBonus().toFixed(2)} to most growth, while the grind stays intentionally slow.` : 'Prestige is weak early. Farm deeper routes, more bounty, and more relics before resetting.'; }
function renderMilestones(){ const goals = [
  { done: state.highestBelly >= 1000, text:'Reach 1,000 Belly and move beyond the starter shore.' },
  { done: Object.values(state.ship).reduce((a,b)=>a+b,0) >= 8, text:'Buy 8 total ship upgrades to smooth the voyage.' },
  { done: !!state.equippedFruit, text:'Obtain and equip your first devil fruit.' },
  { done: state.haki.armament >= 5, text:'Train Armament Haki to level 5.' },
  { done: state.zoneIndex >= 7, text:'Grind through Alabasta Dunes.' },
  { done: prestigePreview() >= 8, text:'Set up a prestige run worth at least 8 fame.' }
];
  el.milestoneList.innerHTML = goals.map(g=>`<li class="${g.done?'done':''}">${g.text}</li>`).join('');
}
function render(){ renderResources(); renderBattle(); renderCrew(); renderShip(); renderAuto(); renderFruits(); renderHaki(); renderPrestige(); renderMilestones(); renderLog(); }

function tick(dt){
  state.cycle += dt;
  const interval = attackInterval();
  if (state.cycle >= interval){ state.cycle -= interval; hit(swingDamage()); }
  const idleIncome = Math.max(0, swingDamage() * 0.018 * dt * bellyGainMult());
  state.belly += idleIncome;
  state.highestBelly = Math.max(state.highestBelly, state.belly);
  const next = state.zoneIndex + 1;
  if (next < zones.length && zoneOpen(next) && !state._routeNotified?.includes(next)) { state._routeNotified = [...(state._routeNotified||[]), next]; addLog(`${zones[next].name} can now be reached.`); }
}

function bind(){
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.dataset.crew) buyCrew(t.dataset.crew);
    if (t.dataset.ship) buyShip(t.dataset.ship);
    if (t.dataset.auto) buyAuto(t.dataset.auto);
    if (t.dataset.fruit) buyFruit(t.dataset.fruit);
    if (t.dataset.haki) buyHaki(t.dataset.haki);
  });
  document.getElementById('manualAttackBtn').addEventListener('click', ()=>hit(manualStrike(), true));
  document.getElementById('nextZoneBtn').addEventListener('click', ()=>setZone(state.zoneIndex + 1));
  document.getElementById('prevZoneBtn').addEventListener('click', ()=>setZone(state.zoneIndex - 1));
  document.getElementById('prestigeBtn').addEventListener('click', prestige);
  document.getElementById('snapshotBtn').addEventListener('click', ()=>{
    const payload = JSON.stringify({ belly:Math.floor(state.belly), bounty:state.bounty, relics:state.relics, fame:state.fame, zone:currentZone().name, crew:state.crew, ship:state.ship, fruit:state.equippedFruit, haki:state.haki }, null, 2);
    navigator.clipboard?.writeText(payload); addLog('Run snapshot copied to clipboard.');
  });
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; const root = document.documentElement; const toggle = document.querySelector('[data-theme-toggle]');
  root.setAttribute('data-theme', theme); toggle.textContent = theme === 'dark' ? '☀' : '☾';
  toggle.addEventListener('click', ()=>{ theme = theme === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', theme); toggle.textContent = theme === 'dark' ? '☀' : '☾'; });
  const tabs = document.querySelectorAll('.tab-btn'); const panels = document.querySelectorAll('[data-panel]');
  function activateTab(name){ tabs.forEach(b=>b.classList.toggle('active', b.dataset.tab===name)); panels.forEach(p=>p.classList.toggle('active', p.dataset.panel===name)); }
  tabs.forEach(b=>b.addEventListener('click', ()=>activateTab(b.dataset.tab))); activateTab('battle');
}

function ocean(){
  const canvas = document.getElementById('ocean'); const ctx = canvas.getContext('2d'); let waves=[];
  function resize(){ canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = innerWidth+'px'; canvas.style.height = innerHeight+'px'; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); waves = Array.from({length:4}, (_,i)=>({ amp:10+i*8, len:260+i*80, speed:.12+i*.05, y:innerHeight*(.58+i*.07) })); }
  resize(); addEventListener('resize', resize);
  function draw(t){ ctx.clearRect(0,0,innerWidth,innerHeight); const g = ctx.createLinearGradient(0,0,0,innerHeight); g.addColorStop(0,'rgba(123,191,230,.38)'); g.addColorStop(.45,'rgba(29,69,105,.22)'); g.addColorStop(1,'rgba(5,14,26,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,innerWidth,innerHeight);
    waves.forEach((w,i)=>{ ctx.beginPath(); ctx.moveTo(0,innerHeight); for(let x=0;x<=innerWidth;x+=10){ const y = w.y + Math.sin((x/w.len)+t*w.speed)*w.amp + Math.cos((x/(w.len*.7))+t*w.speed*1.4)*(w.amp*.45); ctx.lineTo(x,y);} ctx.lineTo(innerWidth,innerHeight); ctx.closePath(); ctx.fillStyle = i%2 ? 'rgba(20,91,127,.28)' : 'rgba(34,146,178,.23)'; ctx.fill(); }); requestAnimationFrame(ms=>draw(ms/1000)); }
  requestAnimationFrame(ms=>draw(ms/1000));
}

let last = performance.now();
function frame(now){ const dt = Math.min(.25, (now - last)/1000); last = now; tick(dt); renderBattle(); renderResources(); requestAnimationFrame(frame); }

bind(); render(); ocean(); requestAnimationFrame(frame);

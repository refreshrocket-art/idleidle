const crewData = [
  { key:'luffy', name:'Luffy', title:'Captain', baseCost:60, baseDps:3, growth:1.17, blurb:'Rubber-fueled punches raise burst damage and unlock treasure pressure.', skill:'Gomu Combo' },
  { key:'zoro', name:'Zoro', title:'Swordsman', baseCost:180, baseDps:9, growth:1.18, blurb:'Three-sword forms add heavy idle DPS for long voyages.', skill:'Santoryu Slash' },
  { key:'nami', name:'Nami', title:'Navigator', baseCost:420, baseDps:16, growth:1.19, blurb:'Weather tricks improve Belly gains and route speed.', skill:'Thunder Tempo' },
  { key:'usopp', name:'Usopp', title:'Sniper', baseCost:960, baseDps:29, growth:1.195, blurb:'Explosive stars improve crit chains and bounty capture.', skill:'Pop Green Volley' },
  { key:'sanji', name:'Sanji', title:'Cook', baseCost:2200, baseDps:55, growth:1.205, blurb:'Fiery kicks raise attack speed and sustain.', skill:'Diable Jambe' },
  { key:'chopper', name:'Chopper', title:'Doctor', baseCost:5400, baseDps:88, growth:1.215, blurb:'Monster medicine boosts global crew training.', skill:'Guard Point' },
  { key:'robin', name:'Robin', title:'Scholar', baseCost:12600, baseDps:145, growth:1.225, blurb:'Knowledge of ruins boosts treasure relic yields.', skill:'Gigantesco Mano' },
  { key:'franky', name:'Franky', title:'Shipwright', baseCost:29000, baseDps:235, growth:1.235, blurb:'Cyborg upgrades increase auto-battle tempo.', skill:'Radical Beam' },
  { key:'brook', name:'Brook', title:'Musician', baseCost:65000, baseDps:380, growth:1.245, blurb:'Soul music improves fame gain and burst crits.', skill:'Soul Parade' },
  { key:'jinbe', name:'Jinbe', title:'Helmsman', baseCost:140000, baseDps:620, growth:1.255, blurb:'Fish-Man karate turns late-game seas into profit.', skill:'Ocean Current Throw' }
];

const upgradeData = [
  { key:'trainingManual', name:'Training Manual', desc:'+25% crew DPS.', baseCost:150, scale:2.2, max:10, effect:s=>1 + s.upgrades.trainingManual * 0.25 },
  { key:'snailOrders', name:'Den Den Orders', desc:'+20% Belly gain from wins.', baseCost:250, scale:2.15, max:10, effect:s=>1 + s.upgrades.snailOrders * 0.2 },
  { key:'colaEngine', name:'Cola Engine', desc:'+10% battle speed.', baseCost:550, scale:2.3, max:12, effect:s=>1 + s.upgrades.colaEngine * 0.1 },
  { key:'mapRoom', name:'Map Room', desc:'+30% treasure relic gain.', baseCost:1200, scale:2.35, max:8, effect:s=>1 + s.upgrades.mapRoom * 0.3 },
  { key:'wantedPress', name:'Wanted Poster Press', desc:'+25% bounty gain.', baseCost:3000, scale:2.4, max:10, effect:s=>1 + s.upgrades.wantedPress * 0.25 },
  { key:'sunnyForge', name:'Sunny Forge', desc:'Manual strikes deal +50% more damage.', baseCost:5000, scale:2.5, max:8, effect:s=>1 + s.upgrades.sunnyForge * 0.5 },
  { key:'autoCaptain', name:'Captain Autopilot', desc:'Adds passive clicks each second.', baseCost:9500, scale:2.6, max:15, effect:s=>s.upgrades.autoCaptain * 0.75 }
];

const zones = [
  { key:'foosha', name:'Foosha Village Coast', enemy:'Coast Bandit', hp:45, belly:18, bounty:1, relic:0, req:0, color:'#e8c372' },
  { key:'shells', name:'Shells Town Docks', enemy:'Marine Cadet Squad', hp:115, belly:34, bounty:2, relic:0, req:130, color:'#8bb8dd' },
  { key:'orange', name:'Orange Town Square', enemy:'Buggy Pirate Mob', hp:300, belly:72, bounty:4, relic:1, req:500, color:'#f58f53' },
  { key:'baratie', name:'Baratie Waters', enemy:'Krieg Armada Scout', hp:760, belly:150, bounty:8, relic:1, req:1800, color:'#6cc7b6' },
  { key:'arlong', name:'Arlong Park Bay', enemy:'Fish-Man Raider', hp:1900, belly:360, bounty:16, relic:2, req:6000, color:'#60b9d9' },
  { key:'loguetown', name:'Loguetown Stormfront', enemy:'Smoker Patrol', hp:4600, belly:870, bounty:28, relic:3, req:18000, color:'#b79cf0' },
  { key:'drum', name:'Drum Island Ridge', enemy:'Chess Mercenary', hp:10800, belly:1850, bounty:44, relic:4, req:55000, color:'#e4edf8' },
  { key:'alabasta', name:'Alabasta Dunes', enemy:'Baroque Works Agent', hp:24500, belly:4200, bounty:72, relic:5, req:160000, color:'#f0ca72' },
  { key:'water7', name:'Water 7 Shipyards', enemy:'CP9 Operative', hp:56000, belly:9200, bounty:120, relic:6, req:420000, color:'#68d4f4' },
  { key:'marineford', name:'Marineford Ruins', enemy:'Pacifista Unit', hp:132000, belly:20400, bounty:205, relic:8, req:1200000, color:'#ff8b98' },
  { key:'wano', name:'Wano Flower Capital', enemy:'Beast Pirate Officer', hp:305000, belly:48000, bounty:340, relic:11, req:3500000, color:'#f39cf4' },
  { key:'egghead', name:'Egghead Frontier', enemy:'Seraphim Replica', hp:760000, belly:114000, bounty:560, relic:16, req:11000000, color:'#9de2e8' }
];

const state = {
  belly: 120,
  bounty: 0,
  relics: 0,
  fame: 0,
  highestBelly: 120,
  zoneIndex: 0,
  enemyHp: zones[0].hp,
  attackCharge: 0,
  crew: Object.fromEntries(crewData.map(c => [c.key, { level: 0 }])),
  upgrades: Object.fromEntries(upgradeData.map(u => [u.key, 0])),
  log: ['A new voyage begins at dawn.'],
  runtime: 0,
  kills: 0,
  totalRelics: 0
};

const el = {
  resourceGrid: document.getElementById('resourceGrid'), crewGrid: document.getElementById('crewGrid'), upgradeList: document.getElementById('upgradeList'),
  zoneName: document.getElementById('zoneName'), zoneReq: document.getElementById('zoneReq'), enemyName: document.getElementById('enemyName'), enemyHp: document.getElementById('enemyHp'),
  enemyHpBar: document.getElementById('enemyHpBar'), crewDps: document.getElementById('crewDps'), battleSpeed: document.getElementById('battleSpeed'), attackBar: document.getElementById('attackBar'),
  battleLog: document.getElementById('battleLog'), crewPower: document.getElementById('crewPower'), prestigeText: document.getElementById('prestigeText'), milestoneList: document.getElementById('milestoneList'),
  enemyPortrait: document.getElementById('enemyPortrait')
};

const fmt = n => n >= 1e9 ? (n/1e9).toFixed(2)+'B' : n >= 1e6 ? (n/1e6).toFixed(2)+'M' : n >= 1e3 ? (n/1e3).toFixed(2)+'K' : Math.floor(n).toString();
const zone = () => zones[state.zoneIndex];
const fameMultiplier = () => 1 + state.fame * 0.12;
const crewMultiplier = () => upgradeData.find(u=>u.key==='trainingManual').effect(state) * fameMultiplier();
const bellyMultiplier = () => upgradeData.find(u=>u.key==='snailOrders').effect(state) * fameMultiplier();
const relicMultiplier = () => upgradeData.find(u=>u.key==='mapRoom').effect(state) * fameMultiplier();
const bountyMultiplier = () => upgradeData.find(u=>u.key==='wantedPress').effect(state) * fameMultiplier();
const speedMultiplier = () => upgradeData.find(u=>u.key==='colaEngine').effect(state) * (1 + state.fame * 0.03);
const manualMultiplier = () => upgradeData.find(u=>u.key==='sunnyForge').effect(state) * fameMultiplier();
const autoClicks = () => upgradeData.find(u=>u.key==='autoCaptain').effect(state);

function crewLevelCost(c){ const lvl = state.crew[c.key].level; return Math.floor(c.baseCost * Math.pow(c.growth, lvl)); }
function crewDpsTotal(){ return crewData.reduce((sum,c)=> sum + c.baseDps * state.crew[c.key].level, 0) * crewMultiplier(); }
function manualDamage(){ return Math.max(8, crewDpsTotal() * 0.55 + 8) * manualMultiplier(); }
function canAdvance(i){ return state.highestBelly >= zones[i].req; }
function logMsg(msg){ state.log.unshift(msg); state.log = state.log.slice(0, 8); renderLog(); }

function spawnFloat(value, x = window.innerWidth * .52, y = window.innerHeight * .28, color = '#fff7ce') {
  const node = document.createElement('div');
  node.className = 'float-number';
  node.textContent = value;
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  node.style.color = color;
  document.getElementById('floatingNumbers').appendChild(node);
  setTimeout(() => node.remove(), 980);
}

function rewardKill() {
  const z = zone();
  const bellyGain = Math.floor(z.belly * bellyMultiplier());
  const bountyGain = Math.floor(z.bounty * bountyMultiplier());
  const relicGain = Math.random() < 0.22 ? Math.max(1, Math.floor(z.relic * relicMultiplier())) : 0;
  state.belly += bellyGain;
  state.bounty += bountyGain;
  state.relics += relicGain;
  state.totalRelics += relicGain;
  state.kills += 1;
  state.highestBelly = Math.max(state.highestBelly, state.belly);
  spawnFloat(`+${fmt(bellyGain)} ฿`, window.innerWidth * .55, window.innerHeight * .30, '#ffe08f');
  if (bountyGain > 0) spawnFloat(`+${fmt(bountyGain)} bounty`, window.innerWidth * .62, window.innerHeight * .36, '#ffb2bb');
  if (relicGain > 0) spawnFloat(`+${fmt(relicGain)} relic`, window.innerWidth * .48, window.innerHeight * .24, '#9ff1e6');
  logMsg(`Defeated ${z.enemy}. Earned ${fmt(bellyGain)} Belly${relicGain ? ` and ${relicGain} relic.` : '.'}`);
  state.enemyHp = z.hp;
}

function hitEnemy(amount, manual = false) {
  state.enemyHp -= amount;
  spawnFloat(`-${fmt(amount)}`, window.innerWidth * .50 + Math.random()*120 - 60, window.innerHeight * .25 + Math.random()*80, manual ? '#ffd46d' : '#ffffff');
  if (state.enemyHp <= 0) rewardKill();
}

function recruit(key) {
  const c = crewData.find(x => x.key === key);
  const cost = crewLevelCost(c);
  if (state.belly < cost) return;
  state.belly -= cost;
  state.crew[key].level += 1;
  logMsg(`${c.name} trained to level ${state.crew[key].level}.`);
  render();
}

function buyUpgrade(key) {
  const u = upgradeData.find(x => x.key === key);
  const level = state.upgrades[key];
  if (level >= u.max) return;
  const cost = Math.floor(u.baseCost * Math.pow(u.scale, level));
  if (state.relics < cost) return;
  state.relics -= cost;
  state.upgrades[key] += 1;
  logMsg(`${u.name} upgraded to tier ${state.upgrades[key]}.`);
  render();
}

function prestigeGainPreview() {
  return Math.floor(Math.sqrt(state.bounty / 400) + Math.sqrt(state.totalRelics / 120) + state.zoneIndex * 0.85);
}

function prestige() {
  const gain = prestigeGainPreview();
  if (gain < 1) return;
  state.fame += gain;
  Object.assign(state, {
    belly: 120 + state.fame * 10,
    bounty: 0,
    relics: 0,
    highestBelly: 120 + state.fame * 10,
    zoneIndex: 0,
    enemyHp: zones[0].hp,
    attackCharge: 0,
    crew: Object.fromEntries(crewData.map(c => [c.key, { level: 0 }])),
    upgrades: Object.fromEntries(upgradeData.map(u => [u.key, 0])),
    log: [`A new legend begins. +${gain} Pirate King fame secured.`],
    runtime: 0,
    kills: 0,
    totalRelics: 0
  });
  render();
}

function setZone(index) {
  if (index < 0 || index >= zones.length || !canAdvance(index)) return;
  state.zoneIndex = index;
  state.enemyHp = zone().hp;
  logMsg(`Sailed to ${zone().name}.`);
  render();
}

function renderResources() {
  const values = [
    ['Belly', fmt(state.belly), 'Spend on crew levels.'],
    ['Bounty', fmt(state.bounty), 'Feeds prestige gain.'],
    ['Treasure Relics', fmt(state.relics), 'Buy automation tiers.'],
    ['Pirate King Fame', fmt(state.fame), `Permanent x${fameMultiplier().toFixed(2)} gains.`]
  ];
  el.resourceGrid.innerHTML = values.map(([k,v,d]) => `<div class="resource-card"><span class="mini">${k}</span><strong>${v}</strong><span>${d}</span></div>`).join('');
}

function renderCrew() {
  const dps = crewDpsTotal();
  el.crewPower.textContent = `Power ${fmt(dps)}`;
  el.crewGrid.innerHTML = crewData.map(c => {
    const lvl = state.crew[c.key].level;
    const cost = crewLevelCost(c);
    const nextDps = c.baseDps * (lvl + 1) * crewMultiplier();
    return `<div class="crew-card">
      <div>
        <div class="card-title"><div><div class="mini">${c.title}</div><h3>${c.name}</h3></div><div class="pill">Lv ${lvl}</div></div>
        <p>${c.blurb}</p>
        <div class="stat-row"><span>Skill: ${c.skill}</span><span>Base DPS: ${fmt(c.baseDps)}</span><span>Next total: ${fmt(nextDps)}</span></div>
      </div>
      <div class="buy-wrap">
        <div class="mini">Cost</div>
        <strong>${fmt(cost)} Belly</strong>
        <button class="primary-btn" data-crew-buy="${c.key}">Recruit / Level</button>
      </div>
    </div>`;
  }).join('');
}

function renderUpgrades() {
  el.upgradeList.innerHTML = upgradeData.map(u => {
    const level = state.upgrades[u.key];
    const cost = Math.floor(u.baseCost * Math.pow(u.scale, level));
    return `<div class="upgrade-card">
      <div>
        <div class="card-title"><div><div class="mini">Relic tier</div><h3>${u.name}</h3></div><div class="pill">${level}/${u.max}</div></div>
        <p>${u.desc}</p>
      </div>
      <div class="buy-wrap">
        <strong>${level >= u.max ? 'Maxed' : `${fmt(cost)} Relics`}</strong>
        <button class="secondary-btn" ${level >= u.max ? 'disabled' : ''} data-upgrade-buy="${u.key}">Upgrade</button>
      </div>
    </div>`;
  }).join('');
}

function renderBattle() {
  const z = zone();
  el.zoneName.textContent = z.name;
  el.zoneReq.textContent = z.req ? `Unlock ${fmt(z.req)} Belly` : 'Starter Sea';
  el.enemyName.textContent = z.enemy;
  el.enemyHp.textContent = `${fmt(Math.max(0, state.enemyHp))} / ${fmt(z.hp)}`;
  el.enemyHpBar.style.width = `${Math.max(0, state.enemyHp / z.hp) * 100}%`;
  el.crewDps.textContent = fmt(crewDpsTotal());
  el.battleSpeed.textContent = `${speedMultiplier().toFixed(2)}x`;
  el.enemyPortrait.style.background = `linear-gradient(145deg, ${z.color}55, rgba(70,182,178,.08))`;
}

function renderLog() { el.battleLog.innerHTML = state.log.map(msg => `<div>${msg}</div>`).join(''); }

function renderPrestige() {
  const gain = prestigeGainPreview();
  el.prestigeText.textContent = gain > 0
    ? `Reset crew, Belly, relics, bounty, and route progress for +${gain} fame. Current fame gives x${fameMultiplier().toFixed(2)} to most gains.`
    : 'Prestige becomes worthwhile after stacking bounty, relics, and deeper route clears. Push several sea zones before ascending.';
}

function renderMilestones() {
  const milestones = [
    { text:'Reach 1,000 Belly to leave the East Blue shallows.', done: state.highestBelly >= 1000 },
    { text:'Train 3 crew members to level 10.', done: crewData.filter(c => state.crew[c.key].level >= 10).length >= 3 },
    { text:'Buy 5 automation upgrades total.', done: Object.values(state.upgrades).reduce((a,b)=>a+b,0) >= 5 },
    { text:'Defeat enemies in Alabasta Dunes.', done: state.zoneIndex >= 7 },
    { text:'Earn enough prestige for at least 5 fame in one run.', done: prestigeGainPreview() >= 5 },
    { text:'Reach Egghead Frontier for a late-game grind wall.', done: state.zoneIndex >= 11 }
  ];
  el.milestoneList.innerHTML = milestones.map(m => `<li class="${m.done ? 'done':''}">${m.text}</li>`).join('');
}

function render() { renderResources(); renderCrew(); renderUpgrades(); renderBattle(); renderLog(); renderPrestige(); renderMilestones(); }

function tick(dt) {
  state.runtime += dt;
  const dps = crewDpsTotal();
  if (dps > 0) hitEnemy(dps * dt * speedMultiplier(), false);
  const passiveBelly = Math.max(0, dps * 0.065 * dt * bellyMultiplier());
  state.belly += passiveBelly;
  state.highestBelly = Math.max(state.highestBelly, state.belly);
  const auto = autoClicks();
  if (auto > 0) hitEnemy(manualDamage() * auto * dt, false);
  state.attackCharge += dt * speedMultiplier();
  if (state.attackCharge >= 1) state.attackCharge = 0;
  el.attackBar.style.width = `${state.attackCharge * 100}%`;
  const unlockIndex = zones.findIndex((z, i) => i > state.zoneIndex && canAdvance(i));
  if (unlockIndex !== -1 && unlockIndex === state.zoneIndex + 1 && state.enemyHp > 0 && state.highestBelly >= zones[state.zoneIndex + 1].req) {
    logMsg(`${zones[state.zoneIndex + 1].name} is now reachable.`);
  }
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(.25, (now - last) / 1000);
  last = now;
  tick(dt);
  renderBattle();
  renderResources();
  requestAnimationFrame(loop);
}

function wireEvents() {
  document.addEventListener('click', e => {
    const crewKey = e.target.getAttribute('data-crew-buy');
    const upgradeKey = e.target.getAttribute('data-upgrade-buy');
    if (crewKey) recruit(crewKey);
    if (upgradeKey) buyUpgrade(upgradeKey);
  });
  document.getElementById('manualAttackBtn').addEventListener('click', () => hitEnemy(manualDamage(), true));
  document.getElementById('nextZoneBtn').addEventListener('click', () => setZone(state.zoneIndex + 1));
  document.getElementById('prevZoneBtn').addEventListener('click', () => setZone(state.zoneIndex - 1));
  document.getElementById('prestigeBtn').addEventListener('click', prestige);
  document.getElementById('saveHintBtn').addEventListener('click', () => {
    const snapshot = JSON.stringify({ belly: Math.floor(state.belly), bounty: state.bounty, relics: state.relics, fame: state.fame, zone: zone().name, crew: state.crew, upgrades: state.upgrades }, null, 2);
    navigator.clipboard?.writeText(snapshot);
    logMsg('Current run snapshot copied to clipboard.');
  });
  const toggle = document.querySelector('[data-theme-toggle]');
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '☀' : '☾';
  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    toggle.textContent = theme === 'dark' ? '☀' : '☾';
  });
}

function startOcean() {
  const canvas = document.getElementById('ocean');
  const ctx = canvas.getContext('2d');
  let w, h, waves;
  function resize() {
    w = canvas.width = innerWidth * devicePixelRatio;
    h = canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    waves = Array.from({length: 4}, (_, i) => ({ amp: 10 + i * 8, len: 220 + i * 90, speed: 0.15 + i * 0.08, y: innerHeight * (.58 + i * .07) }));
  }
  resize(); addEventListener('resize', resize);
  function draw(t) {
    ctx.clearRect(0,0,innerWidth,innerHeight);
    const sky = ctx.createLinearGradient(0,0,0,innerHeight);
    sky.addColorStop(0,'rgba(115,187,230,0.42)');
    sky.addColorStop(.45,'rgba(39,83,122,0.22)');
    sky.addColorStop(1,'rgba(7,18,31,0)');
    ctx.fillStyle = sky; ctx.fillRect(0,0,innerWidth,innerHeight);
    waves.forEach((wave, idx) => {
      ctx.beginPath();
      ctx.moveTo(0, innerHeight);
      for (let x = 0; x <= innerWidth; x += 10) {
        const y = wave.y + Math.sin((x / wave.len) + t * wave.speed) * wave.amp + Math.cos((x / (wave.len * .75)) + t * wave.speed * 1.6) * (wave.amp * .4);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(innerWidth, innerHeight); ctx.closePath();
      ctx.fillStyle = idx % 2 ? 'rgba(19,83,116,.28)' : 'rgba(31,136,166,.24)';
      ctx.fill();
    });
    ctx.fillStyle = 'rgba(255,255,255,.07)';
    for (let i = 0; i < 24; i++) {
      const x = (i * 77 + t * 30) % (innerWidth + 80) - 40;
      const y = innerHeight * .16 + Math.sin(i + t * .45) * 18;
      ctx.beginPath(); ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame((ms)=>draw(ms/1000));
  }
  requestAnimationFrame((ms)=>draw(ms/1000));
}

wireEvents();
render();
startOcean();
requestAnimationFrame(loop);

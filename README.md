# Grand Line Idle

Grand Line Idle is a complete solo idle/incremental RPG built for the browser. It uses a seafaring pirate anime-inspired world with familiar crew roles, island progression, automated combat, relic upgrades, and a prestige loop based on Pirate King fame.

## Features

- Idle combat that continuously damages enemies and generates Belly passively.
- Recruitable crew roster inspired by an iconic pirate team: captain, swordsman, navigator, sniper, cook, doctor, scholar, shipwright, musician, and helmsman.
- Three main run resources: Belly, Bounty, and Treasure Relics.
- Upgrade tiers for DPS, Belly gain, battle speed, relic gain, bounty gain, manual damage, and passive click automation.
- Route progression across multiple seas and islands, from starter waters to a late-game futuristic island.
- Prestige reset system that grants Pirate King Fame, which permanently multiplies future gains.
- Visual feedback with animated ocean background, floating damage numbers, progress bars, and battle log updates.
- Responsive HTML/CSS/JavaScript implementation with no build step required.

## How to Run

### Option 1: Open directly
1. Open `grand-line-idle.html` in any modern browser.
2. The game starts immediately.

### Option 2: Local static server
If your browser has stricter local file rules, run a tiny local server:

```bash
cd grand-line-idle
python3 -m http.server 8000
```

Then open `http://localhost:8000/grand-line-idle.html`.

## How to Play

1. Use **Manual Strike** to speed up early kills.
2. Spend **Belly** on crew levels.
3. Spend **Treasure Relics** on automation and economy upgrades.
4. Push to new routes when your highest Belly unlocks them.
5. Build **Bounty** and deeper progression before using **Ascend Voyage**.
6. Prestige for **Pirate King Fame** when the fame gain preview looks worthwhile.

## Balancing Notes

- Early game is active for a few minutes, then transitions into stronger idle gains.
- Midgame progression depends on relic upgrades and route unlocking.
- Prestige becomes useful only after stacking several zones, bounty, and relics, so the game supports multiple hours of optimization and resets.

## File Structure

- `grand-line-idle.html` - Main game UI.
- `assets/styles.css` - Theme, layout, and animation styling.
- `assets/game.js` - Core game systems, combat loop, upgrades, progression, and rendering.

## Modding Tips

- Add more crew in the `crewData` array.
- Add more routes in the `zones` array.
- Add prestige layers or new resources by extending `state` and the render functions.
- Add boss mechanics by modifying `rewardKill()` and `hitEnemy()`.

## Notes

- The game is session-based and does not save to localStorage because sandboxed browser environments often block it.
- The Snapshot State button copies a JSON summary of the current run so it can be pasted elsewhere.

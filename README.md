# Grand Line Idle

Grand Line Idle is a browser-based solo idle RPG with a seafaring pirate-anime theme. This updated version adds ship upgrades, a cleaner mobile UI, slower automated combat inspired by grindy MMORPG pacing, obtainable devil fruits, haki training, automation upgrades, and Pirate King prestige.

## Main Systems

- **Slow auto-battle loop**: the crew attacks on a measured swing timer instead of constant rapid DPS, which makes progression feel closer to long-form mob grinding.
- **Crew progression**: train crew members based on classic pirate-anime roles.
- **Ship upgrades**: improve the hull, sails, cannons, storage, and log pose using Belly.
- **Devil fruits**: buy and equip fruits using Bounty.
- **Haki training**: spend Bounty on Armament, Observation, and Conqueror’s Haki.
- **Automation**: buy relic-powered idle systems for long runs.
- **Prestige**: reset the voyage to gain Pirate King Fame for permanent multipliers.
- **Responsive mobile UI**: includes a bottom tab bar for switching between panels on smaller screens.

## How To Run

### Direct open
Open `grand-line-idle.html` in a modern browser.

### Local server
If direct file opening behaves oddly, use:

```bash
cd grand-line-idle
python3 -m http.server 8000
```

Then open `http://localhost:8000/grand-line-idle.html`.

## How To Play

1. Start with manual strikes to speed up early kills.
2. Spend Belly on crew training and ship upgrades.
3. Spend Relics on automation systems.
4. Spend Bounty on devil fruits and haki.
5. Push new routes as your highest Belly rises.
6. Prestige once the fame preview looks worthwhile.

## Files

- `grand-line-idle.html` - Main UI and layout.
- `assets/styles.css` - Responsive styling and mobile tabs.
- `assets/game.js` - Core combat, progression, fruits, haki, ship, and prestige systems.
- `README.md` - Setup and overview.

## Notes

- The game is session-based and does not save with localStorage.
- The snapshot button copies the current run state to the clipboard.
- Balance values are easy to tune in the JavaScript data arrays.

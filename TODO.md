# ARR-TYPE Build Plan

## Status Legend
- [ ] pending
- [x] done

---

## Step 1 — sprites.js: player + ordnance + powerups
File: `src/sprites.js`
Export: `SVG_DEFS` (partial) + `SpriteManager` class
Sprites: ARROWHEAD_VII, BIOMETRIC_FORCE_UNIT, all player ordnance (6), all powerups (6)
- [x] done

## Step 2 — sprites.js: stage 1–2 enemies + ordnance
Append to `src/sprites.js`
Sprites: GRUBOID_DRONE, SCYTHE_WING, TUMBLER_POD, LANCE_FRIGATE,
         FLESHING_CRAWLER, SPORE_BURST_ORB, TENDRIL_WHIP, BILE_SHOOTER,
         all enemy ordnance (7)
- [x] done

## Step 3a — sprites.js: stage 3–4 enemies
TOTEM_SENTINEL, RING_CASTER, MIRROR_DRONE, IDOL_GUARDIAN,
TURRET_WALKER, GEAR_MINE, PLASMA_CANNON_EMPLACEMENT, SHIELDED_DRONE
- [x] done

## Step 3b — sprites.js: stage 5–8 enemies
DREADNOUGHT_ESCORT, TURRET_ARRAY_SEGMENT, MISSILE_BATTERY, VOID_FIGHTER,
VOID_SPECTER, ENERGY_RING, PULSE_DRONE_SWARM,
BYDO_SENTRY, BYDO_TURRET, BYDO_LANCE, CORE_GUARDIAN
- [x] done

## Step 3c — sprites.js: all 8 bosses
DOBKERATOPS_PRIME, BIOMORPHIC_LEVIATHAN, TOTEM_COLOSSUS, FORTRESS_SENTINEL,
DREADNOUGHT_BEHEMOTH, VOID_PULSAR, BYDO_HERALD, BYDO_CORE
- [x] done

## Step 3d — sprites.js: terrain + HUD + SpriteManager class
WALL_TILE_SPACE/_BIO/_STONE/_METAL, HUD_* sprites, SpriteManager export
- [x] done

## Step 4 — audio.js
File: `src/audio.js`
Export: `AudioManager` with Web Audio procedural SFX (all 17 named sounds)
BGM placeholders documented as comments
- [x] done

## Step 5 — entities.js: base + player + force + projectile
File: `src/entities.js`
Classes: Entity, Player, Force, Projectile
- [x] done

## Step 6 — entities.js: enemy types + boss + powerup + particles
Append to `src/entities.js`
Classes: Enemy (with ENEMY_TYPES map), Boss, PowerUp, Particle, ParticleSystem
- [x] done

## Step 7 — stages.js
File: `src/stages.js`
Export: STAGE_DATA array (8 stages, wave arrays, boss config), StageManager class
- [x] done

## Step 8 — hud.js
File: `src/hud.js`
Export: HUD class — score, lives, weapon, charge bar, boss bar, overlays
- [x] done

## Step 9 — game.js
File: `src/game.js`
Export: Game class — state machine, input, collision, main loop, rendering
- [x] done

## Step 10 — main.js
File: `main.js`
Wire everything: canvas setup, scaling, load sprites, start Game
- [x] done

## Step 11 — commit + push
`git add -A && git commit && git push`
- [x] done

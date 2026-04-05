// src/stages.js — ARR-TYPE Stage Definitions + StageManager
// Each stage: background type, scroll speed, terrain bounds, wave array, boss config.
// Wave { time, type, count, pattern, y, opts } — time is frames at 60 fps.

// ═══════════════════════════════════════════════════════════
// STAGE DATA
// ═══════════════════════════════════════════════════════════

export const STAGE_DATA = [

  // ── Stage 1 — SPACE ASSAULT ─────────────────────────────
  {
    id: 1, name: 'SPACE ASSAULT',
    bgm: 'BGM_STAGE_1_SPACE_ASSAULT',
    scrollSpeed: 1.2,
    bg: 'space',
    wallTop: 0, wallBottom: 432,       // no terrain walls
    bossTime: 1500,
    boss: { type: 'DOBKERATOPS_PRIME' },
    powerupAt: [ { time: 900, type: 'R', y: 216 }, { time: 1100, type: 'M', y: 150 } ],
    forceAt: 400,                      // frame when POWERUP_FORCE appears
    waves: [
      { time:  60, type:'GRUBOID_DRONE',  count:3, pattern:'v_form',   y:120 },
      { time: 120, type:'GRUBOID_DRONE',  count:3, pattern:'v_form',   y:290 },
      { time: 180, type:'SCYTHE_WING',    count:4, pattern:'sweep_top', y:80 },
      { time: 260, type:'LANCE_FRIGATE',  count:2, pattern:'h_line',    y:216 },
      { time: 320, type:'GRUBOID_DRONE',  count:5, pattern:'v_form',    y:200 },
      { time: 380, type:'TUMBLER_POD',    count:5, pattern:'scatter',   y:200 },
      { time: 460, type:'SCYTHE_WING',    count:4, pattern:'sweep_bot', y:340 },
      { time: 520, type:'LANCE_FRIGATE',  count:2, pattern:'h_line',    y:140 },
      { time: 600, type:'LANCE_FRIGATE',  count:2, pattern:'h_line',    y:300 },
      { time: 660, type:'GRUBOID_DRONE',  count:4, pattern:'diamond',   y:200 },
      { time: 740, type:'TUMBLER_POD',    count:4, pattern:'h_line',    y:200 },
      { time: 800, type:'SCYTHE_WING',    count:6, pattern:'sweep_top', y:100 },
      { time: 870, type:'GRUBOID_DRONE',  count:6, pattern:'v_form',    y:216 },
      { time: 960, type:'LANCE_FRIGATE',  count:3, pattern:'h_line',    y:216 },
      { time:1050, type:'TUMBLER_POD',    count:6, pattern:'scatter',   y:200 },
      { time:1140, type:'SCYTHE_WING',    count:5, pattern:'sweep_bot', y:320 },
      { time:1260, type:'GRUBOID_DRONE',  count:8, pattern:'v_form',    y:200 },
    ],
  },

  // ── Stage 2 — BIO-HORROR ───────────────────────────────
  {
    id: 2, name: 'BIO-HORROR',
    bgm: 'BGM_STAGE_2_BIO_HORROR',
    scrollSpeed: 1.0,
    bg: 'bio',
    wallTop: 48, wallBottom: 384,      // organic walls top & bottom
    bossTime: 1600,
    boss: { type: 'BIOMORPHIC_LEVIATHAN' },
    powerupAt: [ { time: 600, type: 'B', y: 216 }, { time: 1200, type: 'L', y: 216 } ],
    forceAt: -1,
    waves: [
      { time:  80, type:'FLESHING_CRAWLER', count:3, pattern:'h_line',    y:120 },
      { time: 140, type:'FLESHING_CRAWLER', count:3, pattern:'h_line',    y:300 },
      { time: 200, type:'SPORE_BURST_ORB',  count:2, pattern:'h_line',    y:200 },
      { time: 280, type:'TENDRIL_WHIP',     count:2, pattern:'v_spread',  y:180 },
      { time: 340, type:'BILE_SHOOTER',     count:2, pattern:'stationary',y:150, opts:{ x:860 } },
      { time: 400, type:'FLESHING_CRAWLER', count:4, pattern:'h_line',    y:216 },
      { time: 480, type:'SPORE_BURST_ORB',  count:3, pattern:'scatter',   y:200 },
      { time: 560, type:'BILE_SHOOTER',     count:2, pattern:'stationary',y:280, opts:{ x:860 } },
      { time: 640, type:'TENDRIL_WHIP',     count:3, pattern:'v_spread',  y:200 },
      { time: 720, type:'FLESHING_CRAWLER', count:5, pattern:'h_line',    y:216 },
      { time: 820, type:'SPORE_BURST_ORB',  count:4, pattern:'scatter',   y:200 },
      { time: 920, type:'BILE_SHOOTER',     count:3, pattern:'stationary',y:216, opts:{ x:860 } },
      { time:1040, type:'FLESHING_CRAWLER', count:6, pattern:'h_line',    y:216 },
      { time:1140, type:'TENDRIL_WHIP',     count:4, pattern:'v_spread',  y:200 },
      { time:1300, type:'SPORE_BURST_ORB',  count:5, pattern:'scatter',   y:200 },
    ],
  },

  // ── Stage 3 — STONE LABYRINTH ──────────────────────────
  {
    id: 3, name: 'STONE LABYRINTH',
    bgm: 'BGM_STAGE_3_STONE_LABYRINTH',
    scrollSpeed: 0.9,
    bg: 'stone',
    wallTop: 56, wallBottom: 376,
    bossTime: 1700,
    boss: { type: 'TOTEM_COLOSSUS' },
    powerupAt: [ { time: 700, type: 'R', y: 216 }, { time: 1300, type: 'S', y: 216 } ],
    forceAt: -1,
    waves: [
      { time:  80, type:'TOTEM_SENTINEL', count:2, pattern:'stationary', y:180, opts:{ x:850 } },
      { time: 160, type:'RING_CASTER',    count:3, pattern:'h_line',     y:200 },
      { time: 240, type:'MIRROR_DRONE',   count:4, pattern:'v_form',     y:216 },
      { time: 320, type:'TOTEM_SENTINEL', count:2, pattern:'stationary', y:280, opts:{ x:840 } },
      { time: 400, type:'RING_CASTER',    count:4, pattern:'h_line',     y:216 },
      { time: 480, type:'IDOL_GUARDIAN',  count:1, pattern:'single',     y:180 },
      { time: 580, type:'MIRROR_DRONE',   count:5, pattern:'scatter',    y:216 },
      { time: 660, type:'TOTEM_SENTINEL', count:3, pattern:'stationary', y:216, opts:{ x:855 } },
      { time: 760, type:'RING_CASTER',    count:5, pattern:'h_line',     y:200 },
      { time: 860, type:'IDOL_GUARDIAN',  count:2, pattern:'v_spread',   y:200 },
      { time: 980, type:'MIRROR_DRONE',   count:6, pattern:'scatter',    y:216 },
      { time:1100, type:'TOTEM_SENTINEL', count:4, pattern:'stationary', y:180, opts:{ x:855 } },
      { time:1220, type:'RING_CASTER',    count:6, pattern:'h_line',     y:216 },
      { time:1360, type:'IDOL_GUARDIAN',  count:2, pattern:'h_line',     y:200 },
    ],
  },

  // ── Stage 4 — INDUSTRIAL GRIND ─────────────────────────
  {
    id: 4, name: 'INDUSTRIAL GRIND',
    bgm: 'BGM_STAGE_4_INDUSTRIAL_GRIND',
    scrollSpeed: 1.1,
    bg: 'metal',
    wallTop: 52, wallBottom: 380,
    bossTime: 1800,
    boss: { type: 'FORTRESS_SENTINEL' },
    powerupAt: [ { time: 800, type: 'M', y: 216 }, { time: 1500, type: 'B', y: 216 } ],
    forceAt: -1,
    waves: [
      { time:  80, type:'TURRET_WALKER',   count:2, pattern:'h_line',     y:200 },
      { time: 160, type:'GEAR_MINE',       count:4, pattern:'scatter',    y:200 },
      { time: 240, type:'SHIELDED_DRONE',  count:3, pattern:'h_line',     y:216 },
      { time: 320, type:'PLASMA_CANNON_EMPLACEMENT', count:2, pattern:'stationary', y:180, opts:{ x:855 } },
      { time: 400, type:'TURRET_WALKER',   count:3, pattern:'h_line',     y:216 },
      { time: 480, type:'GEAR_MINE',       count:5, pattern:'scatter',    y:200 },
      { time: 560, type:'SHIELDED_DRONE',  count:4, pattern:'v_form',     y:216 },
      { time: 660, type:'PLASMA_CANNON_EMPLACEMENT', count:2, pattern:'stationary', y:280, opts:{ x:855 } },
      { time: 760, type:'TURRET_WALKER',   count:4, pattern:'h_line',     y:200 },
      { time: 860, type:'GEAR_MINE',       count:6, pattern:'scatter',    y:216 },
      { time: 960, type:'SHIELDED_DRONE',  count:5, pattern:'h_line',     y:200 },
      { time:1080, type:'PLASMA_CANNON_EMPLACEMENT', count:3, pattern:'stationary', y:216, opts:{ x:855 } },
      { time:1200, type:'TURRET_WALKER',   count:5, pattern:'h_line',     y:216 },
      { time:1340, type:'GEAR_MINE',       count:7, pattern:'scatter',    y:200 },
      { time:1480, type:'SHIELDED_DRONE',  count:6, pattern:'v_form',     y:216 },
    ],
  },

  // ── Stage 5 — BATTLESHIP BLITZ ─────────────────────────
  {
    id: 5, name: 'BATTLESHIP BLITZ',
    bgm: 'BGM_STAGE_5_BATTLESHIP_BLITZ',
    scrollSpeed: 1.3,
    bg: 'space',
    wallTop: 40, wallBottom: 392,
    bossTime: 1900,
    boss: { type: 'DREADNOUGHT_BEHEMOTH' },
    powerupAt: [ { time: 700, type: 'L', y: 216 } ],
    forceAt: -1,
    waves: [
      { time:  60, type:'DREADNOUGHT_ESCORT',   count:2, pattern:'h_line',    y:180 },
      { time: 150, type:'TURRET_ARRAY_SEGMENT', count:4, pattern:'stationary',y:200, opts:{ x:855 } },
      { time: 250, type:'VOID_FIGHTER',         count:4, pattern:'sweep_top', y:100 },
      { time: 350, type:'MISSILE_BATTERY',      count:2, pattern:'stationary',y:280, opts:{ x:855 } },
      { time: 450, type:'DREADNOUGHT_ESCORT',   count:3, pattern:'h_line',    y:216 },
      { time: 600, type:'VOID_FIGHTER',         count:5, pattern:'sweep_bot', y:320 },
      { time: 700, type:'TURRET_ARRAY_SEGMENT', count:4, pattern:'stationary',y:160, opts:{ x:855 } },
      { time: 820, type:'MISSILE_BATTERY',      count:3, pattern:'stationary',y:216, opts:{ x:855 } },
      { time: 960, type:'DREADNOUGHT_ESCORT',   count:4, pattern:'h_line',    y:200 },
      { time:1100, type:'VOID_FIGHTER',         count:6, pattern:'v_form',    y:216 },
      { time:1300, type:'TURRET_ARRAY_SEGMENT', count:5, pattern:'stationary',y:200, opts:{ x:855 } },
      { time:1500, type:'MISSILE_BATTERY',      count:4, pattern:'stationary',y:200, opts:{ x:855 } },
    ],
  },

  // ── Stage 6 — VOID ENDURANCE ────────────────────────────
  {
    id: 6, name: 'VOID ENDURANCE',
    bgm: 'BGM_STAGE_6_VOID_ENDURANCE',
    scrollSpeed: 1.4,
    bg: 'space',
    wallTop: 30, wallBottom: 402,
    bossTime: 2000,
    boss: { type: 'VOID_PULSAR' },
    powerupAt: [ { time: 900, type: 'R', y: 216 } ],
    forceAt: -1,
    waves: [
      { time:  60, type:'VOID_SPECTER',     count:4, pattern:'scatter',   y:200 },
      { time: 150, type:'PULSE_DRONE_SWARM',count:6, pattern:'v_form',    y:180 },
      { time: 240, type:'ENERGY_RING',      count:2, pattern:'h_line',    y:216 },
      { time: 340, type:'VOID_SPECTER',     count:5, pattern:'scatter',   y:200 },
      { time: 440, type:'PULSE_DRONE_SWARM',count:8, pattern:'v_form',    y:216 },
      { time: 560, type:'ENERGY_RING',      count:3, pattern:'h_line',    y:200 },
      { time: 680, type:'VOID_SPECTER',     count:6, pattern:'scatter',   y:216 },
      { time: 800, type:'PULSE_DRONE_SWARM',count:10,pattern:'v_form',    y:200 },
      { time: 940, type:'ENERGY_RING',      count:4, pattern:'h_line',    y:216 },
      { time:1100, type:'VOID_SPECTER',     count:7, pattern:'scatter',   y:200 },
      { time:1300, type:'PULSE_DRONE_SWARM',count:10,pattern:'v_form',    y:216 },
      { time:1600, type:'ENERGY_RING',      count:5, pattern:'h_line',    y:200 },
    ],
  },

  // ── Stage 7 — ALIEN STRONGHOLD ─────────────────────────
  {
    id: 7, name: 'ALIEN STRONGHOLD',
    bgm: 'BGM_STAGE_7_ALIEN_STRONGHOLD',
    scrollSpeed: 1.0,
    bg: 'bio',
    wallTop: 60, wallBottom: 372,
    bossTime: 2100,
    boss: { type: 'BYDO_HERALD' },
    powerupAt: [ { time: 800, type: 'M', y: 216 } ],
    forceAt: -1,
    waves: [
      { time:  60, type:'BYDO_SENTRY',  count:3, pattern:'h_line',     y:180 },
      { time: 160, type:'BYDO_TURRET',  count:2, pattern:'stationary', y:200, opts:{ x:855 } },
      { time: 260, type:'BYDO_LANCE',   count:4, pattern:'sweep_top',  y:120 },
      { time: 360, type:'BYDO_SENTRY',  count:4, pattern:'h_line',     y:216 },
      { time: 480, type:'BYDO_TURRET',  count:3, pattern:'stationary', y:250, opts:{ x:855 } },
      { time: 600, type:'BYDO_LANCE',   count:5, pattern:'sweep_bot',  y:300 },
      { time: 720, type:'BYDO_SENTRY',  count:5, pattern:'v_form',     y:200 },
      { time: 860, type:'BYDO_TURRET',  count:4, pattern:'stationary', y:180, opts:{ x:855 } },
      { time:1020, type:'BYDO_LANCE',   count:6, pattern:'v_form',     y:216 },
      { time:1200, type:'BYDO_SENTRY',  count:6, pattern:'h_line',     y:200 },
      { time:1400, type:'BYDO_TURRET',  count:5, pattern:'stationary', y:216, opts:{ x:855 } },
      { time:1700, type:'BYDO_LANCE',   count:6, pattern:'v_form',     y:216 },
    ],
  },

  // ── Stage 8 — FINAL CORE ────────────────────────────────
  {
    id: 8, name: 'FINAL CORE',
    bgm: 'BGM_STAGE_8_FINAL_CORE',
    scrollSpeed: 0.6,
    bg: 'space',
    wallTop: 40, wallBottom: 392,
    bossTime: 1200,
    boss: { type: 'BYDO_CORE' },
    powerupAt: [],
    forceAt: -1,
    waves: [
      { time:  60, type:'CORE_GUARDIAN', count:2, pattern:'h_line',   y:180 },
      { time: 200, type:'BYDO_LANCE',    count:4, pattern:'v_form',   y:216 },
      { time: 360, type:'CORE_GUARDIAN', count:3, pattern:'h_line',   y:216 },
      { time: 520, type:'BYDO_SENTRY',   count:5, pattern:'v_form',   y:200 },
      { time: 700, type:'CORE_GUARDIAN', count:4, pattern:'scatter',  y:216 },
      { time: 900, type:'BYDO_LANCE',    count:6, pattern:'v_form',   y:216 },
    ],
  },

];

// ═══════════════════════════════════════════════════════════
// STAGE MANAGER
// ═══════════════════════════════════════════════════════════

import { Enemy, Boss, PowerUp } from './entities.js';

export class StageManager {
  constructor(game) {
    this.game       = game;
    this.stageIndex = 0;
    this.stageTime  = 0;    // frames elapsed in current stage
    this._waveIdx   = 0;    // next wave to spawn
    this._puIdx     = 0;    // next powerup to spawn
    this._bossSpawned = false;
    this._forceDone   = false;
  }

  get stage() { return STAGE_DATA[this.stageIndex]; }

  reset(index = 0) {
    this.stageIndex   = Math.min(index, STAGE_DATA.length - 1);
    this.stageTime    = 0;
    this._waveIdx     = 0;
    this._puIdx       = 0;
    this._bossSpawned = false;
    this._forceDone   = false;
  }

  /** Call every frame while PLAYING. Returns 'boss_warning' or null. */
  update() {
    this.stageTime++;
    const s = this.stage;

    // spawn waves
    while (this._waveIdx < s.waves.length &&
           this.stageTime >= s.waves[this._waveIdx].time) {
      this._spawnWave(s.waves[this._waveIdx]);
      this._waveIdx++;
    }

    // spawn power-ups
    while (this._puIdx < s.powerupAt.length &&
           this.stageTime >= s.powerupAt[this._puIdx].time) {
      const pu = s.powerupAt[this._puIdx];
      this.game.powerups.push(new PowerUp(pu.type, this.game.PLAY_W + 10, pu.y));
      this._puIdx++;
    }

    // Force pod power-up
    if (!this._forceDone && s.forceAt > 0 && this.stageTime >= s.forceAt) {
      this.game.powerups.push(new PowerUp('FORCE', this.game.PLAY_W + 10, this.game.PLAY_H / 2));
      this._forceDone = true;
    }

    // boss warning
    if (!this._bossSpawned && this.stageTime >= s.bossTime - 120) {
      if (this.stageTime === s.bossTime - 120) return 'boss_warning';
    }

    // boss spawn
    if (!this._bossSpawned && this.stageTime >= s.bossTime) {
      this.game.boss = new Boss(s.boss.type, this.game.PLAY_W, this.game.PLAY_H);
      this._bossSpawned = true;
    }

    return null;
  }

  _spawnWave(wave) {
    const count = wave.count;
    const spawnX = this.game.PLAY_W + 20;
    const wallTop = this.stage.wallTop;
    const wallBottom = this.stage.wallBottom;
    const opts = wave.opts || {};

    for (let i = 0; i < count; i++) {
      let x = opts.x ?? spawnX + i * 40;
      let y = wave.y;

      switch (wave.pattern) {
        case 'v_form':
          x = spawnX + i * 30;
          y = wave.y + (i % 2 === 0 ? -i * 14 : i * 14);
          break;
        case 'h_line':
          x = spawnX + i * 32;
          y = wave.y;
          break;
        case 'v_spread':
          x = spawnX;
          y = wallTop + 20 + i * Math.floor((wallBottom - wallTop - 40) / Math.max(count - 1, 1));
          break;
        case 'diamond':
          x = spawnX + (i % 2) * 48;
          y = wave.y + (i < count / 2 ? i * -20 : (i - Math.floor(count / 2)) * 20);
          break;
        case 'scatter':
          x = spawnX + Math.random() * 80;
          y = wallTop + 20 + Math.random() * (wallBottom - wallTop - 40);
          break;
        case 'sweep_top':
          x = spawnX + i * 40;
          y = wallTop + 20;
          break;
        case 'sweep_bot':
          x = spawnX + i * 40;
          y = wallBottom - 40;
          break;
        case 'stationary':
          x = opts.x ?? spawnX;
          y = wave.y + i * 50 - (count - 1) * 25;
          break;
        case 'single':
        default:
          x = opts.x ?? spawnX;
          y = wave.y;
          break;
      }

      y = Math.max(wallTop + 4, Math.min(wallBottom - 44, y));

      const swoopDir = wave.pattern === 'sweep_top' ? 1 : -1;
      const e = new Enemy(wave.type, x, y, { swoopA: i * 0.4, swoopDir });
      this.game.enemies.push(e);
    }
  }

  /** Advance to next stage. Returns false if all stages complete. */
  next() {
    if (this.stageIndex >= STAGE_DATA.length - 1) return false;
    this.reset(this.stageIndex + 1);
    return true;
  }
}

// src/entities.js — ARR-TYPE Entity Classes (Part 1: base + player-side)
// Part 2 (Enemy, Boss, PowerUp, Particles) appended in Step 6.

// ═══════════════════════════════════════════════════════════
// ENTITY BASE
// ═══════════════════════════════════════════════════════════

export class Entity {
  constructor(w, h) {
    this.x = 0; this.y = 0;
    this.w = w; this.h = h;
    this.active = true;
    this.age = 0; // frames alive
  }
  get cx() { return this.x + this.w / 2; }
  get cy() { return this.y + this.h / 2; }
  /** AABB overlap test. */
  overlaps(other) {
    return this.x < other.x + other.w &&
           this.x + this.w > other.x &&
           this.y < other.y + other.h &&
           this.y + this.h > other.y;
  }
}

// ═══════════════════════════════════════════════════════════
// PLAYER — ARROWHEAD_VII
// ═══════════════════════════════════════════════════════════

export const WEAPONS = ['DEFAULT', 'R', 'L', 'M', 'B'];

export class Player extends Entity {
  constructor() {
    super(48, 24);
    this.x = 80; this.y = 204;
    this.speed     = 3;
    this.maxSpeed  = 5;
    this.weapon    = 'DEFAULT';
    // charge
    this.charging  = false;
    this.chargeT   = 0;   // frames held
    this.maxCharge = 180; // 3 s at 60 fps
    // fire
    this.fireTimer    = 0;
    this.fireRate     = 10; // frames between taps
    this.forceFireT   = 0;
    this.forceFireRate= 8;
    // state
    this.lives        = 3;
    this.invincible   = 0; // countdown frames
    this.dead         = false;
    this.hasForce     = false; // Force pod collected
    this.score        = 0;
  }

  /** @param {Set<string>} keys  @param {number} wallTop  @param {number} wallBottom */
  update(keys, wallTop, wallBottom, PLAY_W) {
    if (this.dead) return;
    if (this.invincible > 0) this.invincible--;
    this.age++;

    // movement
    const spd = this.speed;
    if (keys.has('ArrowLeft')  || keys.has('a')) this.x = Math.max(0, this.x - spd);
    if (keys.has('ArrowRight') || keys.has('d')) this.x = Math.min(PLAY_W - this.w - 2, this.x + spd);
    if (keys.has('ArrowUp')    || keys.has('w')) this.y = Math.max(wallTop, this.y - spd);
    if (keys.has('ArrowDown')  || keys.has('s')) this.y = Math.min(wallBottom - this.h, this.y + spd);

    // fire timers
    if (this.fireTimer > 0) this.fireTimer--;
    if (this.forceFireT > 0) this.forceFireT--;
  }

  /** Called when Z is pressed down each frame — returns bullet(s) or null. */
  tryFire(keys) {
    if (this.dead) return null;
    const held = keys.has('z') || keys.has('Z');
    if (!held) {
      // key released — fire if was charging
      if (this.charging && this.chargeT > 0) {
        const t = this.chargeT;
        this.charging = false;
        this.chargeT  = 0;
        return this._releaseShot(t);
      }
      this.charging = false;
      return null;
    }
    // key is held
    if (!this.charging) {
      // first frame held — fire rapid shot
      this.charging = true;
      if (this.fireTimer <= 0) {
        this.fireTimer = this.fireRate;
        return this._rapidShot();
      }
    } else {
      // accumulate charge
      if (this.chargeT < this.maxCharge) this.chargeT++;
    }
    return null;
  }

  /** Quick tap → standard shot(s) based on weapon. */
  _rapidShot() {
    const cx = this.x + this.w;
    const cy = this.y + this.h / 2;
    switch (this.weapon) {
      case 'DEFAULT':
      case 'R':
        return [new Projectile('PLAYER', 'PULSE_BOLT', cx, cy - 2, 10, 0)];
      case 'L':
        return [new Projectile('PLAYER', 'PHOTON_LANCE', cx, cy - 1, 9, 0)];
      case 'M':
        return [new Projectile('PLAYER', 'SEEKER_MISSILE', cx, cy - 2, 6, 0, { homing: true })];
      case 'B': {
        const r = Math.PI / 12; // ±15°
        return [
          new Projectile('PLAYER', 'PLASMA_BURST_SHOT', cx, cy - 4, 8 * Math.cos(-r), 8 * Math.sin(-r)),
          new Projectile('PLAYER', 'PLASMA_BURST_SHOT', cx, cy - 4, 8, 0),
          new Projectile('PLAYER', 'PLASMA_BURST_SHOT', cx, cy - 4, 8 * Math.cos(r),  8 * Math.sin(r)),
        ];
      }
      default:
        return [new Projectile('PLAYER', 'PULSE_BOLT', cx, cy - 2, 10, 0)];
    }
  }

  /** Release after holding — power proportional to chargeT. */
  _releaseShot(t) {
    const cx = this.x + this.w;
    const cy = this.y + this.h / 2;
    if (t < 30) return this._rapidShot(); // too short — just a tap
    const p = new Projectile('PLAYER', 'WAVE_CANNON_BEAM', cx, cy - 4, 8, 0);
    p.power = t >= this.maxCharge ? 3 : t >= 90 ? 2 : 1; // damage multiplier
    p.w = p.power === 3 ? 40 : p.power === 2 ? 28 : 18;
    p.h = p.power === 3 ? 8  : p.power === 2 ? 6  : 4;
    p.damage = p.power * 3;
    return [p];
  }

  /** Force pod fires a vulcan bolt. */
  tryForceVulcan(forceX, forceY) {
    if (!this.hasForce || this.forceFireT > 0) return null;
    this.forceFireT = this.forceFireRate;
    return new Projectile('PLAYER', 'FORCE_VULCAN_BOLT', forceX + 20, forceY + 8, 10, 0);
  }

  /** Hit by enemy / bullet. Returns true if a life was lost. */
  hit() {
    if (this.invincible > 0) return false;
    this.lives--;
    if (this.lives <= 0) { this.dead = true; return true; }
    this.invincible = 120; // 2 s grace
    return true;
  }

  draw(ctx, sprites) {
    if (this.dead) return;
    if (this.invincible > 0 && (this.age & 4)) return; // blink
    sprites.draw(ctx, 'ARROWHEAD_VII', this.x, this.y, this.w, this.h);

    // charge glow
    if (this.charging && this.chargeT > 30) {
      const ratio = Math.min(this.chargeT / this.maxCharge, 1);
      const r = 6 + ratio * 14;
      ctx.save();
      ctx.globalAlpha = 0.35 * ratio;
      ctx.fillStyle = ratio >= 1 ? '#00ffff' : '#0088ff';
      ctx.beginPath();
      ctx.arc(this.x + this.w * 0.75, this.y + this.h / 2, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

// ═══════════════════════════════════════════════════════════
// FORCE POD — BIOMETRIC_FORCE_UNIT
// ═══════════════════════════════════════════════════════════

export const FORCE_STATE = { ATTACHED_FRONT: 0, ATTACHED_REAR: 1, FLOATING: 2 };

export class Force extends Entity {
  constructor() {
    super(20, 20);
    this.state     = FORCE_STATE.FLOATING;
    this.vx = 0; this.vy = 0;
    this.targetX   = 0; this.targetY = 0;
    this.recalling = false;
    this.pulse     = 0; // animation counter
  }

  /**
   * @param {Player} player
   * @param {boolean} launchKey  — X key newly pressed this frame
   */
  update(player, launchKey, PLAY_W, wallTop, wallBottom) {
    this.age++;
    this.pulse = (this.pulse + 1) % 60;

    if (!player.hasForce) return;

    if (launchKey) {
      if (this.state === FORCE_STATE.ATTACHED_FRONT || this.state === FORCE_STATE.ATTACHED_REAR) {
        // detach — launch in appropriate direction
        const dir = this.state === FORCE_STATE.ATTACHED_FRONT ? 1 : -1;
        this.vx = dir * 4;
        this.vy = 0;
        this.state = FORCE_STATE.FLOATING;
        this.recalling = false;
      } else {
        // recall
        this.recalling = !this.recalling;
      }
    }

    if (this.state === FORCE_STATE.ATTACHED_FRONT) {
      this.x = player.x + player.w + 2;
      this.y = player.y + player.h / 2 - this.h / 2;
    } else if (this.state === FORCE_STATE.ATTACHED_REAR) {
      this.x = player.x - this.w - 2;
      this.y = player.y + player.h / 2 - this.h / 2;
    } else {
      // floating — move or recall
      if (this.recalling) {
        const tx = player.cx - this.w / 2;
        const ty = player.cy - this.h / 2;
        const dx = tx - this.x, dy = ty - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 6) {
          // snap to appropriate side
          this.state = this.x > player.cx ? FORCE_STATE.ATTACHED_FRONT : FORCE_STATE.ATTACHED_REAR;
          this.recalling = false;
        } else {
          const spd = 5;
          this.vx = (dx / dist) * spd;
          this.vy = (dy / dist) * spd;
        }
      }
      this.x += this.vx;
      this.y += this.vy;
      // bounce off play-area walls
      if (this.y < wallTop)              { this.y = wallTop;              this.vy *= -1; }
      if (this.y + this.h > wallBottom)  { this.y = wallBottom - this.h;  this.vy *= -1; }
      if (this.x < 0)                    { this.x = 0;                    this.vx *= -1; }
      if (this.x + this.w > PLAY_W)      { this.x = PLAY_W - this.w;      this.vx *= -1; }

      // auto-reattach if drifted very close
      if (!this.recalling) {
        const dx = player.cx - this.cx;
        const dy = player.cy - this.cy;
        if (Math.abs(dx) < this.w + 4 && Math.abs(dy) < 8) {
          this.state = dx < 0 ? FORCE_STATE.ATTACHED_REAR : FORCE_STATE.ATTACHED_FRONT;
        }
      }
    }
  }

  /** True if this side of the player is shielded. */
  blocksFromRight() { return this.state === FORCE_STATE.ATTACHED_FRONT; }
  blocksFromLeft()  { return this.state === FORCE_STATE.ATTACHED_REAR; }

  draw(ctx, sprites) {
    if (!sprites.images['BIOMETRIC_FORCE_UNIT']) return;
    const alpha = 0.7 + 0.3 * Math.sin(this.pulse / 60 * Math.PI * 2);
    sprites.draw(ctx, 'BIOMETRIC_FORCE_UNIT', this.x, this.y, this.w, this.h, false, alpha);
  }
}

// ═══════════════════════════════════════════════════════════
// PROJECTILE
// ═══════════════════════════════════════════════════════════

export class Projectile extends Entity {
  /**
   * @param {'PLAYER'|'ENEMY'} team
   * @param {string} sprite
   * @param {number} x y vx vy
   * @param {object} [opts]  { homing, bounces, damage }
   */
  constructor(team, sprite, x, y, vx, vy, opts = {}) {
    const def = PROJ_DIMS[sprite] || { w: 12, h: 4 };
    super(def.w, def.h);
    this.x = x; this.y = y - def.h / 2;
    this.vx = vx; this.vy = vy;
    this.team   = team;
    this.sprite = sprite;
    this.damage  = opts.damage ?? 1;
    this.homing  = opts.homing ?? false;
    this.bounces = opts.bounces ?? (sprite === 'PULSE_BOLT' ? 0 : 0);
    this.power   = 1;
    this._angle  = Math.atan2(vy, vx); // for rendering rotation
  }

  /** @param {Entity[]} enemies — for homing */
  update(enemies, wallTop, wallBottom, PLAY_W) {
    this.age++;
    if (this.homing && enemies.length) {
      // steer toward nearest enemy
      let nearest = null, nearDist = Infinity;
      for (const e of enemies) {
        if (!e.active) continue;
        const d = Math.hypot(e.cx - this.cx, e.cy - this.cy);
        if (d < nearDist) { nearDist = d; nearest = e; }
      }
      if (nearest) {
        const dx = nearest.cx - this.cx, dy = nearest.cy - this.cy;
        const d  = Math.hypot(dx, dy) || 1;
        const turn = 0.18;
        this.vx += (dx / d) * turn;
        this.vy += (dy / d) * turn;
        const spd = Math.hypot(this.vx, this.vy);
        if (spd > 6) { this.vx = this.vx / spd * 6; this.vy = this.vy / spd * 6; }
      }
    }

    // R-weapon bounce
    if (this.sprite === 'PULSE_BOLT' && this.team === 'PLAYER') {
      // (Reflex weapon bouncing handled in game.js when weapon === 'R')
    }

    this.x += this.vx;
    this.y += this.vy;
    this._angle = Math.atan2(this.vy, this.vx);

    // deactivate out of bounds
    if (this.x > PLAY_W + 60 || this.x < -60 ||
        this.y < wallTop - 20 || this.y > wallBottom + 20) {
      this.active = false;
    }
  }

  draw(ctx, sprites) {
    if (!this.active) return;
    if (this.vy !== 0) {
      // rotated rendering for angled shots
      ctx.save();
      ctx.translate(this.cx, this.cy);
      ctx.rotate(this._angle);
      sprites.draw(ctx, this.sprite, -this.w / 2, -this.h / 2, this.w, this.h);
      ctx.restore();
    } else {
      sprites.draw(ctx, this.sprite, this.x, this.y, this.w, this.h);
    }
  }
}

// Natural dimensions per projectile type
const PROJ_DIMS = {
  PULSE_BOLT:        { w: 12, h:  4 },
  WAVE_CANNON_BEAM:  { w: 40, h:  8 },
  SEEKER_MISSILE:    { w: 10, h:  4 },
  PHOTON_LANCE:      { w: 60, h:  2 },
  PLASMA_BURST_SHOT: { w:  8, h:  8 },
  FORCE_VULCAN_BOLT: { w:  6, h:  4 },
  ENEMY_BULLET_ROUND:{ w:  6, h:  6 },
  ENEMY_BULLET_BEAM: { w: 16, h:  3 },
  ENEMY_BULLET_RING: { w: 12, h: 12 },
  ENEMY_MISSILE:     { w: 10, h:  4 },
  BYDO_ORB:          { w:  8, h:  8 },
  SPORE_FRAGMENT:    { w:  5, h:  5 },
  BOSS_CORE_SHOT:    { w: 14, h: 14 },
};

// ═══════════════════════════════════════════════════════════
// ENEMY TYPE CATALOGUE
// ═══════════════════════════════════════════════════════════

export const ENEMY_TYPES = {
  // ── Stage 1 ──────────────────────────────────────────────
  GRUBOID_DRONE:   { w:24,h:16, hp:1, score:100, sprite:'GRUBOID_DRONE',  move:'straight', spd:1.5, fireRate:120, bullet:'ENEMY_BULLET_ROUND', bspd:3 },
  SCYTHE_WING:     { w:28,h:14, hp:1, score:150, sprite:'SCYTHE_WING',    move:'swooper',  spd:3.5, fireRate:0   },
  TUMBLER_POD:     { w:18,h:18, hp:2, score:200, sprite:'TUMBLER_POD',    move:'spin',     spd:1.2, fireRate:60,  bullet:'ENEMY_BULLET_ROUND', bspd:2 },
  LANCE_FRIGATE:   { w:32,h:12, hp:3, score:300, sprite:'LANCE_FRIGATE',  move:'straight', spd:1.0, fireRate:80,  bullet:'ENEMY_BULLET_BEAM',  bspd:4 },
  // ── Stage 2 ──────────────────────────────────────────────
  FLESHING_CRAWLER:{ w:30,h:12, hp:2, score:200, sprite:'FLESHING_CRAWLER',move:'wave',    spd:1.2, fireRate:90,  bullet:'ENEMY_BULLET_ROUND', bspd:2.5 },
  SPORE_BURST_ORB: { w:20,h:20, hp:2, score:250, sprite:'SPORE_BURST_ORB',move:'straight', spd:0.8, fireRate:200, bullet:'SPORE_FRAGMENT',     bspd:3,  onDeath:'spore' },
  TENDRIL_WHIP:    { w:40,h: 8, hp:3, score:300, sprite:'TENDRIL_WHIP',   move:'wave',     spd:1.5, fireRate:0   },
  BILE_SHOOTER:    { w:16,h:16, hp:4, score:350, sprite:'BILE_SHOOTER',   move:'stationary',spd:0,  fireRate:60,  bullet:'ENEMY_BULLET_ROUND', bspd:2.5 },
  // ── Stage 3 ──────────────────────────────────────────────
  TOTEM_SENTINEL:  { w:24,h:32, hp:4, score:400, sprite:'TOTEM_SENTINEL', move:'stationary',spd:0,  fireRate:50,  bullet:'ENEMY_BULLET_RING',  bspd:2.5 },
  RING_CASTER:     { w:20,h:20, hp:2, score:250, sprite:'RING_CASTER',    move:'patrol_v',  spd:1.5, fireRate:70, bullet:'ENEMY_BULLET_RING',  bspd:3   },
  MIRROR_DRONE:    { w:16,h:16, hp:2, score:200, sprite:'MIRROR_DRONE',   move:'straight',  spd:2,   fireRate:0   },
  IDOL_GUARDIAN:   { w:32,h:40, hp:6, score:600, sprite:'IDOL_GUARDIAN',  move:'patrol_v',  spd:0.8, fireRate:60, bullet:'ENEMY_BULLET_RING',  bspd:2.5 },
  // ── Stage 4 ──────────────────────────────────────────────
  TURRET_WALKER:   { w:28,h:20, hp:4, score:400, sprite:'TURRET_WALKER',  move:'straight',  spd:0.8, fireRate:60, bullet:'ENEMY_BULLET_BEAM',  bspd:4   },
  GEAR_MINE:       { w:20,h:20, hp:3, score:300, sprite:'GEAR_MINE',      move:'homing',    spd:1.5, fireRate:0   },
  PLASMA_CANNON_EMPLACEMENT:{ w:24,h:18, hp:6, score:500, sprite:'PLASMA_CANNON_EMPLACEMENT', move:'stationary', spd:0, fireRate:45, bullet:'ENEMY_BULLET_BEAM', bspd:5 },
  SHIELDED_DRONE:  { w:24,h:16, hp:3, score:350, sprite:'SHIELDED_DRONE', move:'straight',  spd:1.2, fireRate:90, bullet:'ENEMY_BULLET_ROUND', bspd:3   },
  // ── Stage 5 ──────────────────────────────────────────────
  DREADNOUGHT_ESCORT:{ w:36,h:16, hp:5, score:500, sprite:'DREADNOUGHT_ESCORT', move:'straight', spd:0.8, fireRate:50, bullet:'ENEMY_BULLET_BEAM', bspd:4 },
  TURRET_ARRAY_SEGMENT:{ w:20,h:14, hp:4, score:400, sprite:'TURRET_ARRAY_SEGMENT', move:'stationary', spd:0, fireRate:40, bullet:'ENEMY_BULLET_BEAM', bspd:4 },
  MISSILE_BATTERY: { w:24,h:16, hp:4, score:450, sprite:'MISSILE_BATTERY', move:'stationary', spd:0, fireRate:80, bullet:'ENEMY_MISSILE', bspd:4 },
  VOID_FIGHTER:    { w:28,h:14, hp:3, score:350, sprite:'VOID_FIGHTER',   move:'swooper',   spd:4,   fireRate:80, bullet:'ENEMY_BULLET_ROUND', bspd:4 },
  // ── Stage 6 ──────────────────────────────────────────────
  VOID_SPECTER:    { w:20,h:20, hp:2, score:300, sprite:'VOID_SPECTER',   move:'homing',    spd:2.5, fireRate:90, bullet:'ENEMY_BULLET_ROUND', bspd:3 },
  ENERGY_RING:     { w:24,h:24, hp:5, score:500, sprite:'ENERGY_RING',    move:'patrol_v',  spd:1.8, fireRate:40, bullet:'ENEMY_BULLET_RING',  bspd:3 },
  PULSE_DRONE_SWARM:{ w:12,h:12,hp:1, score:100, sprite:'PULSE_DRONE_SWARM', move:'swooper', spd:5,  fireRate:0  },
  // ── Stage 7 ──────────────────────────────────────────────
  BYDO_SENTRY:     { w:28,h:20, hp:5, score:600, sprite:'BYDO_SENTRY',    move:'straight',  spd:1.5, fireRate:50, bullet:'BYDO_ORB', bspd:3.5 },
  BYDO_TURRET:     { w:20,h:20, hp:6, score:600, sprite:'BYDO_TURRET',    move:'stationary', spd:0,  fireRate:40, bullet:'BYDO_ORB', bspd:3.5 },
  BYDO_LANCE:      { w:32,h:14, hp:4, score:500, sprite:'BYDO_LANCE',     move:'swooper',   spd:4,   fireRate:70, bullet:'BYDO_ORB', bspd:4   },
  // ── Stage 8 ──────────────────────────────────────────────
  CORE_GUARDIAN:   { w:32,h:24, hp:8, score:800, sprite:'CORE_GUARDIAN',  move:'homing',    spd:2,   fireRate:40, bullet:'BYDO_ORB', bspd:3.5 },
};

// ═══════════════════════════════════════════════════════════
// ENEMY
// ═══════════════════════════════════════════════════════════

export class Enemy extends Entity {
  /** @param {string} type  key in ENEMY_TYPES */
  constructor(type, x, y, extraOpts = {}) {
    const def = ENEMY_TYPES[type];
    super(def.w, def.h);
    this.x = x; this.y = y;
    this.type      = type;
    this.def       = def;
    this.hp        = def.hp;
    this.maxHp     = def.hp;
    this.score     = def.score;
    this.fireTimer = Math.floor(Math.random() * (def.fireRate || 60));
    // movement state
    this._vy       = (def.move === 'patrol_v') ? def.spd : 0;
    this._startY   = y;
    this._swoopA   = extraOpts.swoopA ?? 0; // initial angle for swooper
    this._swoopDir = extraOpts.swoopDir ?? 1; // +1 down, -1 up
    this.rotation  = 0; // for TUMBLER_POD spin
    this.onDeath   = def.onDeath ?? null;
  }

  /**
   * @param {Player} player
   * @param {Projectile[]} enemyBullets
   * @param {number} wallTop / wallBottom
   */
  update(player, enemyBullets, wallTop, wallBottom) {
    this.age++;
    const d = this.def;

    // movement
    switch (d.move) {
      case 'straight':
        this.x -= d.spd;
        break;
      case 'swooper':
        this._swoopA += 0.05;
        this.x -= d.spd;
        this.y = this._startY + Math.sin(this._swoopA) * 60 * this._swoopDir;
        break;
      case 'wave':
        this.x -= d.spd * 0.8;
        this.y = this._startY + Math.sin(this.age * 0.07) * 40;
        break;
      case 'patrol_v':
        this.y += this._vy;
        this.x -= 0.4;
        if (this.y < wallTop + 4 || this.y + this.h > wallBottom - 4) this._vy *= -1;
        break;
      case 'homing':
        if (player && !player.dead) {
          const dx = player.cx - this.cx, dy = player.cy - this.cy;
          const dist = Math.hypot(dx, dy) || 1;
          this.x += (dx / dist) * d.spd * 0.6;
          this.y += (dy / dist) * d.spd * 0.6;
        } else {
          this.x -= d.spd * 0.5;
        }
        break;
      case 'spin':
        this.rotation += 0.08;
        this.x -= d.spd * 0.6;
        this.y = this._startY + Math.sin(this.age * 0.04) * 25;
        break;
      case 'stationary':
      default:
        // stays put until off-screen left
        break;
    }

    // fire
    if (d.fireRate && d.bullet && player && !player.dead) {
      this.fireTimer--;
      if (this.fireTimer <= 0) {
        this.fireTimer = d.fireRate + Math.floor(Math.random() * 20);
        this._shootAt(player, enemyBullets);
      }
    }

    // deactivate if off-screen
    if (this.x + this.w < -50 || this.y + this.h < wallTop - 50 || this.y > wallBottom + 50) {
      this.active = false;
    }
  }

  _shootAt(player, bullets) {
    const cx = this.cx, cy = this.cy;
    const pcx = player.cx, pcy = player.cy;
    const dx = pcx - cx, dy = pcy - cy;
    const d = Math.hypot(dx, dy) || 1;
    const spd = this.def.bspd ?? 3;

    if (this.def.bullet === 'ENEMY_BULLET_RING') {
      // fire 4-way ring
      for (let i = 0; i < 4; i++) {
        const a = (Math.PI / 2) * i;
        bullets.push(new Projectile('ENEMY', 'ENEMY_BULLET_RING',
          cx - 6, cy - 6, Math.cos(a) * spd, Math.sin(a) * spd));
      }
    } else if (this.def.bullet === 'SPORE_FRAGMENT') {
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI * 2 / 6) * i;
        bullets.push(new Projectile('ENEMY', 'SPORE_FRAGMENT',
          cx, cy, Math.cos(a) * spd, Math.sin(a) * spd));
      }
    } else {
      bullets.push(new Projectile('ENEMY', this.def.bullet,
        cx, cy, (dx / d) * spd, (dy / d) * spd));
    }
  }

  /** @returns {boolean} true if killed */
  hit(dmg = 1) {
    this.hp -= dmg;
    if (this.hp <= 0) { this.active = false; return true; }
    return false;
  }

  draw(ctx, sprites) {
    if (!this.active) return;
    if (this.rotation !== 0) {
      ctx.save();
      ctx.translate(this.cx, this.cy);
      ctx.rotate(this.rotation);
      sprites.draw(ctx, this.def.sprite, -this.w / 2, -this.h / 2, this.w, this.h);
      ctx.restore();
    } else {
      sprites.draw(ctx, this.def.sprite, this.x, this.y, this.w, this.h, true);
    }
    // damage flash
    if (this.hp < this.maxHp && (this.age & 2)) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.restore();
    }
  }
}

// ═══════════════════════════════════════════════════════════
// BOSS
// ═══════════════════════════════════════════════════════════

export const BOSS_DEFS = {
  DOBKERATOPS_PRIME:    { w:120, h:80,  hp:150, score:10000, sprite:'DOBKERATOPS_PRIME',    weakSprite:'DOBKERATOPS_PRIME' },
  BIOMORPHIC_LEVIATHAN: { w:160, h:40,  hp:200, score:15000, sprite:'BIOMORPHIC_LEVIATHAN', weakSprite:'BIOMORPHIC_LEVIATHAN' },
  TOTEM_COLOSSUS:       { w: 80, h:100, hp:180, score:14000, sprite:'TOTEM_COLOSSUS',       weakSprite:'TOTEM_COLOSSUS' },
  FORTRESS_SENTINEL:    { w:120, h:100, hp:220, score:18000, sprite:'FORTRESS_SENTINEL',    weakSprite:'FORTRESS_SENTINEL' },
  DREADNOUGHT_BEHEMOTH: { w:200, h: 80, hp:280, score:25000, sprite:'DREADNOUGHT_BEHEMOTH', weakSprite:'DREADNOUGHT_BEHEMOTH' },
  VOID_PULSAR:          { w:100, h:100, hp:250, score:22000, sprite:'VOID_PULSAR',          weakSprite:'VOID_PULSAR' },
  BYDO_HERALD:          { w:120, h:100, hp:300, score:30000, sprite:'BYDO_HERALD',          weakSprite:'BYDO_HERALD' },
  BYDO_CORE:            { w: 80, h: 80, hp:350, score:50000, sprite:'BYDO_CORE',            weakSprite:'BYDO_CORE' },
};

export class Boss extends Entity {
  constructor(type, PLAY_W, PLAY_H) {
    const def = BOSS_DEFS[type];
    super(def.w, def.h);
    this.type    = type;
    this.def     = def;
    this.hp      = def.hp;
    this.maxHp   = def.hp;
    this.score   = def.score;
    this.phase   = 1;
    this.fireT   = 60;
    this.moveT   = 0;
    this.entered = false; // true once fully on screen
    // start off right edge
    this.x = PLAY_W + 20;
    this.y = Math.round(PLAY_H / 2 - def.h / 2);
    this._baseY   = this.y;
    this._PLAY_W  = PLAY_W;
    this._PLAY_H  = PLAY_H;
    this.dead     = false;
    this.deathT   = 0;
  }

  update(player, bullets, wallTop, wallBottom) {
    if (this.dead) { this.deathT++; return; }
    this.age++;
    this.moveT++;
    const targetX = this._PLAY_W - this.w - 40;

    // slide onto screen
    if (!this.entered) {
      this.x -= 1.5;
      if (this.x <= targetX) { this.x = targetX; this.entered = true; }
      return;
    }

    // phase threshold
    if (this.hp < this.maxHp * 0.5 && this.phase === 1) this.phase = 2;

    // movement: gentle vertical sine
    const amp  = Math.min(80, (wallBottom - wallTop) / 2 - this.h / 2 - wallTop);
    const freq = this.phase === 2 ? 0.025 : 0.018;
    this.y = this._baseY + Math.sin(this.moveT * freq) * amp;
    this.y = Math.max(wallTop + 2, Math.min(wallBottom - this.h - 2, this.y));

    // fire
    if (this.fireT > 0) { this.fireT--; return; }
    this.fireT = this.phase === 2 ? 30 : 50;
    this._fire(player, bullets);
  }

  _fire(player, bullets) {
    if (!player || player.dead) return;
    const cx = this.cx, cy = this.cy;
    const pcx = player.cx, pcy = player.cy;
    const dx = pcx - cx, dy = pcy - cy;
    const d  = Math.hypot(dx, dy) || 1;

    const bullet = ['BYDO_HERALD','BYDO_CORE','CORE_GUARDIAN'].includes(this.type)
      ? 'BYDO_ORB' : this.type === 'VOID_PULSAR' ? 'ENEMY_BULLET_RING' : 'ENEMY_BULLET_ROUND';
    const spd = this.phase === 2 ? 4 : 3;

    // 3-way spread
    for (const a of [0, -0.35, 0.35]) {
      const angle = Math.atan2(dy, dx) + a;
      bullets.push(new Projectile('ENEMY', bullet,
        cx, cy, Math.cos(angle) * spd, Math.sin(angle) * spd));
    }
    // DOBKERATOPS: also fires arc
    if (this.type === 'DOBKERATOPS_PRIME' && this.phase === 2) {
      for (let i = 0; i < 5; i++) {
        const angle = Math.atan2(dy, dx) + (i - 2) * 0.28;
        bullets.push(new Projectile('ENEMY', 'ENEMY_BULLET_ROUND',
          cx, cy, Math.cos(angle) * 3.5, Math.sin(angle) * 3.5));
      }
    }
  }

  hit(dmg = 1) {
    if (this.dead) return false;
    this.hp -= dmg;
    if (this.hp <= 0) { this.hp = 0; this.dead = true; this.deathT = 0; return true; }
    return false;
  }

  draw(ctx, sprites) {
    if (!this.active) return;
    const alpha = this.dead ? Math.max(0, 1 - this.deathT / 60) : 1;
    sprites.draw(ctx, this.def.sprite, this.x, this.y, this.w, this.h, true, alpha);
    // weak-point glow (front quarter)
    if (!this.dead) {
      const wx = this.def.w > 80 ? this.x + 20 : this.x + this.w * 0.65;
      const wy = this.y + this.h / 2;
      const pulse = 0.45 + 0.55 * Math.abs(Math.sin(this.age * 0.07));
      ctx.save();
      ctx.globalAlpha = 0.5 * pulse;
      ctx.fillStyle = '#ff4400';
      ctx.beginPath();
      ctx.arc(wx, wy, 8 + 4 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

// ═══════════════════════════════════════════════════════════
// POWER-UP
// ═══════════════════════════════════════════════════════════

export const POWERUP_TYPES = ['R', 'L', 'M', 'B', 'S', 'FORCE'];

export class PowerUp extends Entity {
  constructor(puType, x, y) {
    super(16, 10);
    this.puType = puType;
    this.x = x; this.y = y;
    this.vx = -0.8;
    if (puType === 'FORCE') { this.w = 16; this.h = 16; }
  }
  update() {
    this.x += this.vx;
    this.age++;
    if (this.x < -20) this.active = false;
  }
  draw(ctx, sprites) {
    if (!this.active) return;
    const key = 'POWERUP_' + this.puType;
    const bob = Math.sin(this.age * 0.08) * 2;
    sprites.draw(ctx, key, this.x, this.y + bob, this.w, this.h);
  }
}

// ═══════════════════════════════════════════════════════════
// PARTICLES
// ═══════════════════════════════════════════════════════════

export class Particle {
  constructor(x, y, vx, vy, color, life) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.life  = life;
    this.maxLife = life;
    this.active = true;
    this.size = 2 + Math.random() * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    this.life--;
    if (this.life <= 0) this.active = false;
  }
  draw(ctx) {
    if (!this.active) return;
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

export class ParticleSystem {
  constructor(maxParticles = 400) {
    this.pool = [];
    this.max  = maxParticles;
  }
  _get() {
    for (const p of this.pool) if (!p.active) return p;
    if (this.pool.length < this.max) {
      const p = new Particle(0, 0, 0, 0, '#fff', 1);
      this.pool.push(p);
      return p;
    }
    return null; // pool full
  }
  spawn(x, y, vx, vy, color, life) {
    const p = this._get();
    if (!p) return;
    p.x = x; p.y = y; p.vx = vx; p.vy = vy;
    p.color = color; p.life = life; p.maxLife = life;
    p.active = true;
    p.size = 2 + Math.random() * 2;
  }
  /** Spawn an explosion burst at (cx, cy). */
  explode(cx, cy, count = 12, colors = ['#ff8800','#ffcc00','#ff4400','#ffffff']) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 1 + Math.random() * 3;
      this.spawn(cx, cy,
        Math.cos(angle) * spd, Math.sin(angle) * spd,
        colors[Math.floor(Math.random() * colors.length)],
        20 + Math.floor(Math.random() * 20)
      );
    }
  }
  bydoExplode(cx, cy) {
    this.explode(cx, cy, 16, ['#ff0000','#cc0000','#ff4422','#880000']);
  }
  update() { for (const p of this.pool) if (p.active) p.update(); }
  draw(ctx) { for (const p of this.pool) if (p.active) p.draw(ctx); }
}

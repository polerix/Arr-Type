// src/game.js — ARR-TYPE Main Game Engine

import { SpriteManager }                from './sprites.js';
import { AudioManager }                  from './audio.js';
import { Player, Force, Projectile,
         Enemy, Boss, PowerUp,
         ParticleSystem, FORCE_STATE }   from './entities.js';
import { StageManager, STAGE_DATA }      from './stages.js';
import { HUD }                           from './hud.js';

// ─── Constants ────────────────────────────────────────────────────────────────
export const PLAY_W = 896;
export const PLAY_H = 432; // play area height (HUD below)
const TOTAL_H = 504;       // canvas height (play + HUD)
const EXTRA_LIFE_SCORE = 20000;

// Game states
const S = {
  LOADING:      'LOADING',
  TITLE:        'TITLE',
  PLAYING:      'PLAYING',
  PAUSED:       'PAUSED',
  BOSS_WARNING: 'BOSS_WARNING',
  STAGE_CLEAR:  'STAGE_CLEAR',
  GAME_OVER:    'GAME_OVER',
};

// ─── Background Renderer ──────────────────────────────────────────────────────
class Background {
  constructor() {
    this.stars = [];
    for (let i = 0; i < 160; i++) {
      this.stars.push({
        x: Math.random() * PLAY_W,
        y: Math.random() * PLAY_H,
        spd: 0.3 + Math.random() * 1.2,
        size: Math.random() < 0.15 ? 2 : 1,
        bright: Math.random(),
      });
    }
    this.scrollX = 0;
  }

  update(scrollSpeed) {
    this.scrollX += scrollSpeed;
    for (const s of this.stars) {
      s.x -= s.spd * (scrollSpeed / 1.2);
      if (s.x < 0) { s.x = PLAY_W; s.y = Math.random() * PLAY_H; }
    }
  }

  draw(ctx, bgType, wallTop, wallBottom, sprites) {
    // sky
    const grad = ctx.createLinearGradient(0, 0, 0, PLAY_H);
    if (bgType === 'bio') {
      grad.addColorStop(0, '#030d03'); grad.addColorStop(1, '#040a08');
    } else if (bgType === 'stone') {
      grad.addColorStop(0, '#0a0a0e'); grad.addColorStop(1, '#080810');
    } else if (bgType === 'metal') {
      grad.addColorStop(0, '#060608'); grad.addColorStop(1, '#08080e');
    } else {
      grad.addColorStop(0, '#000008'); grad.addColorStop(1, '#000414');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, PLAY_W, PLAY_H);

    // stars (space/metal only)
    if (bgType === 'space' || bgType === 'metal') {
      for (const s of this.stars) {
        const alpha = 0.4 + s.bright * 0.6;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.size === 2 ? '#aaddff' : '#ffffff';
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      }
      ctx.globalAlpha = 1;
    }

    // terrain walls
    if (wallTop > 0) this._drawWall(ctx, bgType, sprites, 0,           wallTop,           true);
    if (wallBottom < PLAY_H) this._drawWall(ctx, bgType, sprites, wallBottom, PLAY_H - wallBottom, false);
  }

  _drawWall(ctx, bgType, sprites, startY, thickness, isTop) {
    const tileKey = {
      bio: 'WALL_TILE_BIO', stone: 'WALL_TILE_STONE',
      metal: 'WALL_TILE_METAL',
    }[bgType] || 'WALL_TILE_SPACE';

    const tileH = 32;
    const rows  = Math.ceil(thickness / tileH);
    for (let col = 0; col < Math.ceil(PLAY_W / 32) + 1; col++) {
      for (let row = 0; row < rows; row++) {
        const tx = (col * 32 - (this.scrollX % 32)) | 0;
        const ty = isTop ? startY + row * tileH : startY + row * tileH;
        sprites.draw(ctx, tileKey, tx, ty, 32, 32);
      }
    }
  }
}

// ─── GAME CLASS ───────────────────────────────────────────────────────────────
export class Game {
  constructor(canvas) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext('2d');
    this.PLAY_W  = PLAY_W;
    this.PLAY_H  = PLAY_H;

    this.sprites  = new SpriteManager();
    this.audio    = new AudioManager();
    this.hud      = null; // set after sprites load
    this.bg       = new Background();
    this.stageMgr = new StageManager(this);

    // game entities
    this.player       = new Player();
    this.force        = new Force();
    this.enemies      = [];
    this.playerBullets= [];
    this.enemyBullets = [];
    this.powerups     = [];
    this.particles    = new ParticleSystem(500);
    this.boss         = null;

    // state
    this.state        = S.LOADING;
    this.score        = 0;
    this.hiScore      = 10000;
    this._nextLifeAt  = EXTRA_LIFE_SCORE;

    // overlay timers
    this._warnTimer   = 0;
    this._clearTimer  = 0;
    this._blinkTimer  = 0;

    // input
    this.keys         = new Set();
    this._prevKeys    = new Set();
    this._xJustPressed = false;
    this._eJustPressed = false;
    this._pJustPressed = false;

    this._raf = null;
    this._boundLoop = this._loop.bind(this);
  }

  // ── Init ─────────────────────────────────────────────────────────────────────

  async init(onProgress) {
    await this.sprites.loadAll(onProgress);
    this.hud   = new HUD(this.sprites);
    this.audio.init();
    this._bindInput();
    this.state = S.TITLE;
    this._raf  = requestAnimationFrame(this._boundLoop);
  }

  _bindInput() {
    window.addEventListener('keydown', e => {
      this.keys.add(e.key);
      e.preventDefault?.();
    });
    window.addEventListener('keyup', e => {
      this.keys.delete(e.key);
    });
  }

  // ── Main Loop ─────────────────────────────────────────────────────────────────

  _loop() {
    this._raf = requestAnimationFrame(this._boundLoop);
    this._detectJustPressed();
    this._update();
    this._render();
    this._prevKeys = new Set(this.keys);
  }

  _detectJustPressed() {
    this._xJustPressed = this.keys.has('x') && !this._prevKeys.has('x');
    this._eJustPressed = (this.keys.has('Enter') || this.keys.has(' ')) &&
                         !this._prevKeys.has('Enter') && !this._prevKeys.has(' ');
    this._pJustPressed = this.keys.has('p') && !this._prevKeys.has('p');
  }

  // ── Update ────────────────────────────────────────────────────────────────────

  _update() {
    this.audio.resume();
    this._blinkTimer++;

    switch (this.state) {
      case S.TITLE:        this._updateTitle();       break;
      case S.PLAYING:      this._updatePlaying();     break;
      case S.PAUSED:       this._updatePaused();      break;
      case S.BOSS_WARNING: this._updateWarning();     break;
      case S.STAGE_CLEAR:  this._updateStageClear();  break;
      case S.GAME_OVER:    this._updateGameOver();    break;
    }
  }

  _updateTitle() {
    if (this._eJustPressed) {
      this._startGame();
    }
  }

  _updatePaused() {
    if (this._pJustPressed) this.state = S.PLAYING;
  }

  _updateWarning() {
    this._warnTimer++;
    if (this._warnTimer > 180) {
      this._warnTimer = 0;
      this.state = S.PLAYING;
    }
  }

  _updateStageClear() {
    this._clearTimer++;
    if (this._clearTimer > 180) {
      this._clearTimer = 0;
      const hasNext = this.stageMgr.next();
      if (hasNext) {
        this._resetForStage();
        this.state = S.PLAYING;
      } else {
        // all stages done — loop back to title (classic loop)
        this.state = S.TITLE;
      }
    }
  }

  _updateGameOver() {
    if (this._eJustPressed) {
      this.state = S.TITLE;
    }
  }

  _updatePlaying() {
    if (this._pJustPressed) { this.state = S.PAUSED; return; }

    const stage = STAGE_DATA[this.stageMgr.stageIndex];
    const wallTop    = stage.wallTop;
    const wallBottom = stage.wallBottom;

    // background scroll
    this.bg.update(stage.scrollSpeed);

    // stage manager (wave spawning)
    const signal = this.stageMgr.update();
    if (signal === 'boss_warning') {
      this.audio.play('SFX_WARNING');
      this._warnTimer = 0;
      this.state = S.BOSS_WARNING;
      return;
    }

    // player update
    this.player.update(this.keys, wallTop, wallBottom, PLAY_W);

    // player fire
    const newBullets = this.player.tryFire(this.keys);
    if (newBullets) {
      for (const b of newBullets) {
        this.playerBullets.push(b);
        if (b.sprite === 'WAVE_CANNON_BEAM' && b.power > 1) {
          this.audio.play('SFX_WAVE_CANNON_RELEASE');
        } else {
          this.audio.play('SFX_PULSE_BOLT_FIRE');
        }
      }
    }
    // charge sound
    if (this.player.charging && this.player.chargeT === 1) {
      this.audio.SFX_WAVE_CANNON_CHARGE_START();
    }

    // Force pod
    if (this.player.hasForce) {
      this.force.update(this.player, this._xJustPressed, PLAY_W, wallTop, wallBottom);
      if (this._xJustPressed) {
        if (this.force.state === FORCE_STATE.FLOATING) {
          this.audio.play('SFX_FORCE_DETACH');
        } else {
          this.audio.play('SFX_FORCE_DETACH');
        }
      }
      // force vulcan auto-fire
      if (this.force.state !== FORCE_STATE.FLOATING) {
        const vb = this.player.tryForceVulcan(this.force.x, this.force.y);
        if (vb) { this.playerBullets.push(vb); }
      }
    }

    // player bullets
    for (const b of this.playerBullets) {
      b.update(this.enemies, wallTop, wallBottom, PLAY_W);
      // Reflex weapon: bounce off walls
      if (this.player.weapon === 'R' && b.sprite === 'PULSE_BOLT') {
        if (b.y <= wallTop && b.vy < 0) b.vy *= -1;
        if (b.y + b.h >= wallBottom && b.vy > 0) b.vy *= -1;
      }
    }

    // enemies
    for (const e of this.enemies) {
      e.update(this.player, this.enemyBullets, wallTop, wallBottom);
    }

    // boss
    if (this.boss) {
      this.boss.update(this.player, this.enemyBullets, wallTop, wallBottom);
      if (this.boss.dead && this.boss.deathT > 90) {
        this._bossKilled();
      }
    }

    // enemy bullets
    for (const b of this.enemyBullets) {
      b.update([], wallTop, wallBottom, PLAY_W);
    }

    // power-ups
    for (const p of this.powerups) p.update();

    // particles
    this.particles.update();

    // ── Collision Detection ──────────────────────────────────────────────────

    // Player bullets vs enemies
    for (const b of this.playerBullets) {
      if (!b.active) continue;
      for (const e of this.enemies) {
        if (!e.active) continue;
        if (b.overlaps(e)) {
          const killed = e.hit(b.damage ?? 1);
          if (killed) {
            this._addScore(e.score);
            this.particles.explode(e.cx, e.cy);
            this.audio.play('SFX_ENEMY_DEATH_SMALL');
            if (e.onDeath === 'spore') this._sporeExplosion(e);
          } else {
            this.audio.play('SFX_BOSS_HIT');
          }
          if (b.sprite !== 'PHOTON_LANCE') b.active = false;
          break;
        }
      }
    }

    // Player bullets vs boss
    if (this.boss && !this.boss.dead) {
      for (const b of this.playerBullets) {
        if (!b.active) continue;
        if (b.overlaps(this.boss)) {
          const killed = this.boss.hit(b.damage ?? 1);
          this.particles.explode(b.cx, b.cy, 6, ['#ff8800','#ffcc00','#ffffff']);
          this.audio.play('SFX_BOSS_HIT');
          if (killed) {
            this.audio.play('SFX_BOSS_DEATH');
            this.particles.explode(this.boss.cx, this.boss.cy, 40);
          }
          if (b.sprite !== 'PHOTON_LANCE') b.active = false;
        }
      }
    }

    // Enemy bullets vs player
    if (!this.player.dead && this.player.invincible === 0) {
      for (const b of this.enemyBullets) {
        if (!b.active) continue;
        // check if Force blocks it
        if (this.player.hasForce) {
          if (this.force.blocksFromRight() && b.x + b.w > this.force.x && b.vx < 0) {
            b.active = false;
            this.particles.explode(this.force.cx, this.force.cy, 4, ['#ff8866','#ffffff']);
            continue;
          }
          if (this.force.blocksFromLeft() && b.x < this.force.x + this.force.w && b.vx > 0) {
            b.active = false;
            this.particles.explode(this.force.cx, this.force.cy, 4, ['#ff8866','#ffffff']);
            continue;
          }
        }
        if (b.overlaps(this.player)) {
          b.active = false;
          this._playerHit();
          if (this.state === S.GAME_OVER) return;
        }
      }
    }

    // Player vs enemies (contact)
    if (!this.player.dead && this.player.invincible === 0) {
      for (const e of this.enemies) {
        if (!e.active) continue;
        if (e.overlaps(this.player)) {
          e.active = false;
          this.particles.explode(e.cx, e.cy);
          this._playerHit();
          if (this.state === S.GAME_OVER) return;
          break;
        }
      }
    }

    // Player vs boss contact
    if (this.boss && !this.boss.dead && !this.player.dead && this.player.invincible === 0) {
      if (this.boss.overlaps(this.player)) {
        this._playerHit();
        if (this.state === S.GAME_OVER) return;
      }
    }

    // Player vs walls
    if (!this.player.dead && this.player.invincible === 0) {
      if (this.player.y < wallTop || this.player.y + this.player.h > wallBottom) {
        this._playerHit();
        if (this.state === S.GAME_OVER) return;
      }
    }

    // Power-up collection
    for (const p of this.powerups) {
      if (!p.active) continue;
      if (p.overlaps(this.player)) {
        this._collectPowerUp(p);
        p.active = false;
      }
    }

    // ── Cleanup ──────────────────────────────────────────────────────────────
    this.playerBullets = this.playerBullets.filter(b => b.active);
    this.enemyBullets  = this.enemyBullets.filter(b => b.active);
    this.enemies       = this.enemies.filter(e => e.active);
    this.powerups      = this.powerups.filter(p => p.active);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  _startGame() {
    this.score        = 0;
    this._nextLifeAt  = EXTRA_LIFE_SCORE;
    this.player       = new Player();
    this.force        = new Force();
    this.enemies      = [];
    this.playerBullets= [];
    this.enemyBullets = [];
    this.powerups     = [];
    this.particles    = new ParticleSystem(500);
    this.boss         = null;
    this.bg           = new Background();
    this.stageMgr.reset(0);
    this._resetForStage();
    this.state = S.PLAYING;
  }

  _resetForStage() {
    this.player.x = 80;
    this.player.y = PLAY_H / 2 - this.player.h / 2;
    this.player.invincible = 60;
    this.enemies      = [];
    this.playerBullets= [];
    this.enemyBullets = [];
    this.powerups     = [];
    this.boss         = null;
  }

  _playerHit() {
    const died = this.player.hit();
    if (died) {
      this.audio.play('SFX_PLAYER_DEATH');
      this.particles.explode(this.player.cx, this.player.cy, 20, ['#ff8800','#ffcc44','#ffffff','#0088ff']);
      if (this.player.lives <= 0) {
        if (this.score > this.hiScore) this.hiScore = this.score;
        this.state = S.GAME_OVER;
      } else {
        // respawn
        setTimeout(() => {
          this.player.dead = false;
          this.player.x = 80;
          this.player.y = PLAY_H / 2 - this.player.h / 2;
          this.player.invincible = 120;
        }, 1200);
      }
    } else {
      this.audio.play('SFX_PLAYER_HIT');
    }
  }

  _bossKilled() {
    this._addScore(this.boss.score);
    this.boss = null;
    this._clearTimer = 0;
    this.state = S.STAGE_CLEAR;
    this.audio.play('SFX_STAGE_CLEAR');
  }

  _addScore(pts) {
    this.score += pts;
    if (this.score >= this._nextLifeAt) {
      this.player.lives++;
      this._nextLifeAt += EXTRA_LIFE_SCORE;
      this.audio.play('SFX_EXTRA_LIFE');
    }
    if (this.score > this.hiScore) this.hiScore = this.score;
  }

  _collectPowerUp(p) {
    this.audio.play('SFX_POWERUP_COLLECT');
    if (p.puType === 'FORCE') {
      this.player.hasForce = true;
      this.force.state = FORCE_STATE.ATTACHED_FRONT;
      this.force.x = this.player.x + this.player.w + 2;
      this.force.y = this.player.y + this.player.h / 2 - this.force.h / 2;
      this.audio.play('SFX_FORCE_ATTACH');
    } else if (p.puType === 'S') {
      this.player.speed = Math.min(this.player.speed + 0.8, this.player.maxSpeed);
    } else {
      this.player.weapon = p.puType;
    }
  }

  _sporeExplosion(enemy) {
    // extra spore fragments shot out
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 / 6) * i;
      this.enemyBullets.push(new Projectile('ENEMY', 'SPORE_FRAGMENT',
        enemy.cx, enemy.cy, Math.cos(a) * 3, Math.sin(a) * 3));
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  _render() {
    const ctx = this.ctx;
    const stage = STAGE_DATA[this.stageMgr.stageIndex];

    // clear
    ctx.clearRect(0, 0, PLAY_W, TOTAL_H);

    // background
    this.bg.draw(ctx, stage.bg, stage.wallTop, stage.wallBottom, this.sprites);

    // game entities
    for (const p of this.powerups)      p.draw(ctx, this.sprites);
    for (const b of this.enemyBullets)  b.draw(ctx, this.sprites);
    for (const b of this.playerBullets) b.draw(ctx, this.sprites);
    for (const e of this.enemies)       e.draw(ctx, this.sprites);
    if (this.boss)                       this.boss.draw(ctx, this.sprites);
    if (this.player.hasForce)            this.force.draw(ctx, this.sprites);
    this.player.draw(ctx, this.sprites);
    this.particles.draw(ctx);

    // HUD
    this.hud.draw(ctx, {
      score:     this.score,
      hiScore:   this.hiScore,
      lives:     this.player.lives,
      weapon:    this.player.weapon,
      chargeT:   this.player.chargeT,
      maxCharge: this.player.maxCharge,
      boss:      this.boss,
      stageId:   stage.id,
    });

    // overlays
    switch (this.state) {
      case S.TITLE:
        this.hud.drawTitle(ctx, this.hiScore, Math.floor(this._blinkTimer / 30) % 2 === 0);
        break;
      case S.BOSS_WARNING:
        this.hud.drawWarning(ctx, Math.abs(Math.sin(this._warnTimer * 0.07)));
        break;
      case S.STAGE_CLEAR:
        this.hud.drawStageClear(ctx, stage.id, Math.min(1, this._clearTimer / 30));
        break;
      case S.GAME_OVER:
        this.hud.drawGameOver(ctx, this.score, this.hiScore);
        break;
      case S.PAUSED:
        this.hud.drawPaused(ctx);
        break;
    }
  }
}

// src/hud.js — ARR-TYPE HUD & UI Renderer

const FONT = "'Courier New', monospace";
const HUD_Y = 432; // top of HUD strip
const HUD_H =  72;

export class HUD {
  constructor(sprites) {
    this.sprites = sprites;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {object} state  { score, hiScore, lives, weapon, chargeT, maxCharge, boss, stageId }
   */
  draw(ctx, state) {
    this._bg(ctx);
    this._score(ctx, state.score, state.hiScore);
    this._lives(ctx, state.lives);
    this._weapon(ctx, state.weapon);
    this._chargeMeter(ctx, state.chargeT, state.maxCharge);
    this._stageLabel(ctx, state.stageId);
    if (state.boss) this._bossBar(ctx, state.boss);
  }

  _bg(ctx) {
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, HUD_Y, 896, HUD_H);
    ctx.strokeStyle = '#334';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, HUD_Y); ctx.lineTo(896, HUD_Y); ctx.stroke();
  }

  _score(ctx, score, hiScore) {
    ctx.fillStyle = '#88aaff';
    ctx.font = `12px ${FONT}`;
    ctx.fillText('1UP', 16, HUD_Y + 16);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 14px ${FONT}`;
    ctx.fillText(String(score).padStart(8, '0'), 16, HUD_Y + 34);

    ctx.fillStyle = '#88aaff';
    ctx.font = `12px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('HI-SCORE', 448, HUD_Y + 16);
    ctx.fillStyle = '#ffdd44';
    ctx.font = `bold 14px ${FONT}`;
    ctx.fillText(String(hiScore).padStart(8, '0'), 448, HUD_Y + 34);
    ctx.textAlign = 'left';
  }

  _lives(ctx, lives) {
    const icon_w = 24, icon_h = 12, gap = 6;
    const startX = 16, startY = HUD_Y + 50;
    for (let i = 0; i < Math.max(0, lives); i++) {
      this.sprites.draw(ctx, 'HUD_SHIP_ICON', startX + i * (icon_w + gap), startY, icon_w, icon_h);
    }
  }

  _weapon(ctx, weapon) {
    const cx = 448;
    ctx.fillStyle = '#556688';
    ctx.font = `11px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('WEAPON', cx, HUD_Y + 50);

    const colors = { DEFAULT:'#00ffff', R:'#ff4444', L:'#ffdd00', M:'#44ff44', B:'#ff8800' };
    ctx.fillStyle = colors[weapon] ?? '#00ffff';
    ctx.font = `bold 16px ${FONT}`;
    ctx.fillText(weapon === 'DEFAULT' ? '●' : weapon, cx, HUD_Y + 68);
    ctx.textAlign = 'left';
  }

  _chargeMeter(ctx, chargeT, maxCharge) {
    const bx = 230, by = HUD_Y + 42, bw = 160, bh = 10;
    const ratio = Math.min(chargeT / maxCharge, 1);

    // label
    ctx.fillStyle = '#556688';
    ctx.font = `10px ${FONT}`;
    ctx.fillText('WAVE CANNON', bx, by - 3);

    // background
    ctx.fillStyle = '#111122';
    ctx.fillRect(bx, by, bw, bh);

    // fill
    if (ratio > 0) {
      const fillColor = ratio >= 1 ? '#00ffff' : ratio >= 0.5 ? '#0088ff' : '#004488';
      ctx.fillStyle = fillColor;
      ctx.fillRect(bx, by, Math.round(bw * ratio), bh);
      // shimmer
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.2;
      ctx.fillRect(bx, by, Math.round(bw * ratio), 3);
      ctx.globalAlpha = 1;
    }

    // border (HUD_CHARGE_BAR_BORDER sprite or drawn directly)
    ctx.strokeStyle = '#aabbcc';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, bh);

    // FULL indicator
    if (ratio >= 1) {
      ctx.fillStyle = '#00ffff';
      ctx.font = `bold 10px ${FONT}`;
      ctx.fillText('FULL', bx + bw + 6, by + 9);
    }
  }

  _stageLabel(ctx, stageId) {
    ctx.fillStyle = '#556688';
    ctx.font = `11px ${FONT}`;
    ctx.textAlign = 'right';
    ctx.fillText(`STAGE ${stageId}`, 880, HUD_Y + 16);
    ctx.textAlign = 'left';
  }

  _bossBar(ctx, boss) {
    const bw = 300, bh = 10;
    const bx = (896 - bw) / 2, by = 8;
    const ratio = Math.max(0, boss.hp / boss.maxHp);

    // label
    ctx.fillStyle = '#ff4444';
    ctx.font = `bold 10px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('BOSS', 448, by - 1);
    ctx.textAlign = 'left';

    // bg
    ctx.fillStyle = '#1a0000';
    ctx.fillRect(bx, by, bw, bh);

    // fill
    ctx.fillStyle = ratio > 0.5 ? '#ff2200' : ratio > 0.2 ? '#ff6600' : '#ffaa00';
    ctx.fillRect(bx, by, Math.round(bw * ratio), bh);

    // shimmer
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.15;
    ctx.fillRect(bx, by, Math.round(bw * ratio), 3);
    ctx.globalAlpha = 1;

    // border
    ctx.strokeStyle = '#ff8866';
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, bw, bh);
  }

  // ── Overlay screens ────────────────────────────────────────────────────────

  drawTitle(ctx, hiScore, blink) {
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, 896, 432);

    // Logo
    ctx.fillStyle = '#0088ff';
    ctx.font = `bold 72px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00ccff';
    ctx.shadowBlur  = 24;
    ctx.fillText('ARR-TYPE', 448, 160);
    ctx.shadowBlur  = 0;

    ctx.fillStyle = '#4488ff';
    ctx.font = `16px ${FONT}`;
    ctx.fillText('— A SIDE-SCROLLING SPACE COMBAT SHOOTER —', 448, 195);

    if (blink) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold 18px ${FONT}`;
      ctx.fillText('PRESS  ENTER  TO  START', 448, 260);
    }

    ctx.fillStyle = '#ffdd44';
    ctx.font = `14px ${FONT}`;
    ctx.fillText(`HI-SCORE  ${String(hiScore).padStart(8, '0')}`, 448, 310);

    ctx.fillStyle = '#556677';
    ctx.font = `12px ${FONT}`;
    ctx.fillText('Z: FIRE / HOLD=CHARGE    X: FORCE POD    ARROWS / WASD: MOVE', 448, 370);
    ctx.fillText('P: PAUSE', 448, 390);

    ctx.textAlign = 'left';
  }

  drawWarning(ctx, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ff0000';
    ctx.font = `bold 48px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('!! WARNING !!', 448, 216);
    ctx.fillStyle = '#ffaa00';
    ctx.font = `24px ${FONT}`;
    ctx.fillText('APPROACHING BOSS', 448, 270);
    ctx.textAlign = 'left';
    ctx.restore();
  }

  drawStageClear(ctx, stageId, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#00ffcc';
    ctx.font = `bold 42px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(`STAGE  ${stageId}  CLEAR`, 448, 200);
    ctx.fillStyle = '#ffdd44';
    ctx.font = `20px ${FONT}`;
    ctx.fillText('CONTINUE...', 448, 260);
    ctx.textAlign = 'left';
    ctx.restore();
  }

  drawGameOver(ctx, score, hiScore) {
    ctx.fillStyle = 'rgba(0,0,0,0.88)';
    ctx.fillRect(0, 0, 896, 504);

    ctx.fillStyle = '#ff2200';
    ctx.font = `bold 64px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff4400';
    ctx.shadowBlur  = 20;
    ctx.fillText('GAME  OVER', 448, 190);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = `18px ${FONT}`;
    ctx.fillText(`SCORE  ${String(score).padStart(8, '0')}`, 448, 260);

    ctx.fillStyle = '#ffdd44';
    ctx.fillText(`HI-SCORE  ${String(hiScore).padStart(8, '0')}`, 448, 295);

    ctx.fillStyle = '#aabbcc';
    ctx.font = `14px ${FONT}`;
    ctx.fillText('PRESS  ENTER  TO  CONTINUE', 448, 360);

    ctx.textAlign = 'left';
  }

  drawPaused(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, 896, 504);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 36px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', 448, 220);
    ctx.font = `16px ${FONT}`;
    ctx.fillStyle = '#aabbcc';
    ctx.fillText('PRESS  P  TO  RESUME', 448, 270);
    ctx.textAlign = 'left';
  }
}

// main.js — ARR-TYPE Entry Point
// Sets up the canvas, responsive scaling, and initialises the Game.

import { Game, PLAY_W } from './src/game.js';

const GAME_W = 896;
const GAME_H = 504;

const canvas    = document.getElementById('gameCanvas');
const container = document.getElementById('game-container');
const loadBar   = document.getElementById('loading-bar');

canvas.width  = GAME_W;
canvas.height = GAME_H;

// ── Responsive scaling ───────────────────────────────────────────────────────
function resize() {
  const scaleX = window.innerWidth  / GAME_W;
  const scaleY = window.innerHeight / GAME_H;
  const scale  = Math.min(scaleX, scaleY);
  const w = Math.round(GAME_W * scale);
  const h = Math.round(GAME_H * scale);
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  container.style.width  = w + 'px';
  container.style.height = h + 'px';
}
window.addEventListener('resize', resize);
resize();

// ── Boot ─────────────────────────────────────────────────────────────────────
const game = new Game(canvas);

game.init(ratio => {
  if (loadBar) loadBar.style.width = Math.round(ratio * 100) + '%';
}).then(() => {
  // hide loading screen
  const loadScreen = document.getElementById('loading-screen');
  if (loadScreen) {
    loadScreen.style.transition = 'opacity 0.4s';
    loadScreen.style.opacity = '0';
    setTimeout(() => loadScreen.remove(), 450);
  }
}).catch(err => {
  console.error('ARR-TYPE init error:', err);
});

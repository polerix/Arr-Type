// src/audio.js — ARR-TYPE Procedural Audio System
// All SFX generated via Web Audio API oscillators and noise buffers.
//
// ── BGM PLACEHOLDERS (require external audio files) ──────────────────────────
//   BGM_TITLE_SCREEN          Title screen — atmospheric synth, slow arp
//   BGM_STAGE_1_SPACE_ASSAULT Stage 1 — driving mechanical beat, upbeat
//   BGM_STAGE_2_BIO_HORROR    Stage 2 — dissonant bass, unsettling pulse
//   BGM_STAGE_3_STONE_LABYRINTH Stage 3 — ancient percussion, mysterious
//   BGM_STAGE_4_INDUSTRIAL_GRIND Stage 4 — heavy synth, metallic rhythm
//   BGM_STAGE_5_BATTLESHIP_BLITZ Stage 5 — epic orchestral, fast tempo
//   BGM_STAGE_6_VOID_ENDURANCE Stage 6 — tense repeating motif, pulsing
//   BGM_STAGE_7_ALIEN_STRONGHOLD Stage 7 — alien timbre, biomechanical drone
//   BGM_STAGE_8_FINAL_CORE    Stage 8 — dark, minimal, intense
//   BGM_BOSS_ENCOUNTER        Boss theme — fast, aggressive, driven
//   BGM_STAGE_CLEAR           Stage clear fanfare — ascending, bright
//   BGM_GAME_OVER             Game over — somber descending arpeggio
// ─────────────────────────────────────────────────────────────────────────────

export class AudioManager {
  constructor() {
    /** @type {AudioContext|null} */
    this.ctx = null;
    this.enabled = true;
    this.sfxVolume  = 0.35;
    this._chargeOsc = null; // sustained oscillator for charge sound
  }

  /** Call once after a user gesture to unlock Web Audio. */
  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  }

  resume() {
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  // ── private helpers ────────────────────────────────────────────────────────

  _now() { return this.ctx.currentTime; }

  /** Single oscillator tone with exponential volume release. */
  _tone(freq, type, vol, dur) {
    if (!this.enabled || !this.ctx) return null;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol * this.sfxVolume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g); g.connect(this.ctx.destination);
    osc.start(t); osc.stop(t + dur + 0.01);
    return { osc, g };
  }

  /** White-noise burst. */
  _noise(vol, dur) {
    if (!this.enabled || !this.ctx) return;
    const t = this._now();
    const sr  = this.ctx.sampleRate;
    const len = Math.ceil(sr * dur);
    const buf = this.ctx.createBuffer(1, len, sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol * this.sfxVolume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(g); g.connect(this.ctx.destination);
    src.start(t);
  }

  /** Frequency sweep (exponential). */
  _sweep(f0, f1, type, vol, dur) {
    if (!this.enabled || !this.ctx) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(vol * this.sfxVolume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g); g.connect(this.ctx.destination);
    osc.start(t); osc.stop(t + dur + 0.01);
  }

  /** Short ascending arpeggio. */
  _arp(freqs, type, vol, noteDur) {
    if (!this.enabled || !this.ctx) return;
    freqs.forEach((f, i) => {
      const t = this._now() + i * noteDur;
      const osc = this.ctx.createOscillator();
      const g   = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol * this.sfxVolume, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + noteDur);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(t); osc.stop(t + noteDur + 0.01);
    });
  }

  // ── SFX ────────────────────────────────────────────────────────────────────

  /** SFX_PULSE_BOLT_FIRE — short square blip */
  SFX_PULSE_BOLT_FIRE()       { this._tone(520, 'square', 0.15, 0.06); }

  /** SFX_FORCE_VULCAN_BOLT — softer rapid buzz */
  SFX_FORCE_VULCAN_BOLT_FIRE(){ this._tone(380, 'square', 0.07, 0.04); }

  /** SFX_WAVE_CANNON_CHARGE — begin rising sweep (sustained) */
  SFX_WAVE_CANNON_CHARGE_START() {
    if (!this.enabled || !this.ctx) return;
    this._stopCharge();
    const t   = this._now();
    const osc = this.ctx.createOscillator();
    const g   = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.linearRampToValueAtTime(1200, t + 3);
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.18 * this.sfxVolume, t + 0.3);
    osc.connect(g); g.connect(this.ctx.destination);
    osc.start(t);
    this._chargeOsc = { osc, g };
  }

  /** SFX_WAVE_CANNON_CHARGE — stop sustained charge hum */
  _stopCharge() {
    if (this._chargeOsc) {
      try {
        this._chargeOsc.g.gain.setValueAtTime(0.001, this._now());
        this._chargeOsc.osc.stop(this._now() + 0.01);
      } catch(_) {}
      this._chargeOsc = null;
    }
  }

  /** SFX_WAVE_CANNON_RELEASE — big boom + pitch drop */
  SFX_WAVE_CANNON_RELEASE() {
    this._stopCharge();
    this._noise(0.55, 0.15);
    this._sweep(900, 70, 'sawtooth', 0.35, 0.45);
    this._tone(200, 'sine', 0.28, 0.4);
  }

  /** SFX_SEEKER_MISSILE_LAUNCH — high whoosh */
  SFX_SEEKER_MISSILE_LAUNCH() { this._sweep(1000, 400, 'sawtooth', 0.12, 0.15); }

  /** SFX_FORCE_ATTACH — deep clunk */
  SFX_FORCE_ATTACH() { this._noise(0.18, 0.05); this._tone(220, 'sine', 0.18, 0.12); }

  /** SFX_FORCE_DETACH — bright whoosh */
  SFX_FORCE_DETACH() { this._sweep(300, 800, 'sine', 0.14, 0.1); }

  /** SFX_PLAYER_HIT — harsh buzz-noise */
  SFX_PLAYER_HIT() { this._noise(0.42, 0.1); this._tone(120, 'sawtooth', 0.22, 0.15); }

  /** SFX_PLAYER_DEATH — big explosion + dying sine */
  SFX_PLAYER_DEATH() { this._noise(0.65, 0.4); this._sweep(400, 40, 'sawtooth', 0.38, 0.65); }

  /** SFX_ENEMY_DEATH_SMALL — short noise pop */
  SFX_ENEMY_DEATH_SMALL() { this._noise(0.22, 0.08); }

  /** SFX_ENEMY_DEATH_LARGE — louder burst with tone */
  SFX_ENEMY_DEATH_LARGE() { this._noise(0.38, 0.22); this._sweep(300, 80, 'sine', 0.22, 0.28); }

  /** SFX_BOSS_HIT — heavy low thud */
  SFX_BOSS_HIT() { this._noise(0.28, 0.07); this._tone(100, 'sine', 0.22, 0.12); }

  /** SFX_BOSS_DEATH — massive multi-layer explosion */
  SFX_BOSS_DEATH() {
    this._noise(0.75, 0.9);
    this._sweep(600, 30, 'sawtooth', 0.45, 1.0);
    this._tone(80, 'sine', 0.32, 0.9);
  }

  /** SFX_POWERUP_COLLECT — ascending arpeggio */
  SFX_POWERUP_COLLECT() { this._arp([440, 554, 659, 880], 'sine', 0.22, 0.1); }

  /** SFX_STAGE_CLEAR — celebratory fanfare */
  SFX_STAGE_CLEAR() { this._arp([440, 494, 554, 659, 880, 1100], 'sine', 0.28, 0.12); }

  /** SFX_EXTRA_LIFE — bright chord */
  SFX_EXTRA_LIFE() { this._arp([659, 784, 988, 1319], 'sine', 0.32, 0.15); }

  /** SFX_WARNING — three alarm pulses */
  SFX_WARNING() {
    if (!this.enabled || !this.ctx) return;
    [0, 250, 500].forEach(ms =>
      setTimeout(() => this._tone(880, 'square', 0.22, 0.2), ms)
    );
  }

  // ── generic dispatcher ─────────────────────────────────────────────────────

  /** Call with an SFX name string, e.g. 'SFX_PULSE_BOLT_FIRE'. */
  play(name) {
    const fn = this[name];
    if (typeof fn === 'function') fn.call(this);
  }
}

// src/sprites.js — ARR-TYPE SVG Placeholder Artwork
// All named sprite assets. SVG strings loaded into HTMLImageElement via blob URLs.
// SpriteManager class appended in Step 3.

export const SVG_DEFS = {

  // ═══════════════════════════════════════════════════════════
  // PLAYER
  // ═══════════════════════════════════════════════════════════

  /** ARROWHEAD_VII — player fighter, 48×24, blue/cyan */
  ARROWHEAD_VII: { w: 48, h: 24, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 24">
      <polygon points="2,12 14,5 42,8 48,12 42,16 14,19" fill="#1a5fc8"/>
      <polygon points="14,5 26,1 32,5 20,8" fill="#0d4aa0"/>
      <polygon points="14,19 26,23 32,19 20,16" fill="#0d4aa0"/>
      <ellipse cx="34" cy="12" rx="7" ry="4" fill="#7ae8ff" opacity="0.9"/>
      <ellipse cx="5" cy="9.5" rx="4" ry="2" fill="#ff7700" opacity="0.9"/>
      <ellipse cx="5" cy="14.5" rx="4" ry="2" fill="#ff4400" opacity="0.9"/>
      <line x1="16" y1="9" x2="40" y2="11" stroke="#4af" stroke-width="0.5" opacity="0.7"/>
      <line x1="16" y1="15" x2="40" y2="13" stroke="#4af" stroke-width="0.5" opacity="0.7"/>
    </svg>`
  },

  /** BIOMETRIC_FORCE_UNIT — detachable Force pod, 20×20, red orb */
  BIOMETRIC_FORCE_UNIT: { w: 20, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="none" stroke="#ff6644" stroke-width="1.5" opacity="0.4"/>
      <circle cx="10" cy="10" r="7" fill="#cc2200"/>
      <circle cx="10" cy="10" r="4.5" fill="#ff4422"/>
      <circle cx="10" cy="10" r="2" fill="#ffeedd" opacity="0.95"/>
      <rect x="9.5" y="1" width="1" height="3.5" fill="#ff8866"/>
      <rect x="9.5" y="15.5" width="1" height="3.5" fill="#ff8866"/>
      <rect x="1" y="9.5" width="3.5" height="1" fill="#ff8866"/>
      <rect x="15.5" y="9.5" width="3.5" height="1" fill="#ff8866"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // PLAYER ORDNANCE
  // ═══════════════════════════════════════════════════════════

  /** PULSE_BOLT — standard rapid laser, 12×4, cyan */
  PULSE_BOLT: { w: 12, h: 4, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 4">
      <rect x="0" y="1" width="10" height="2" fill="#00ffff"/>
      <rect x="10" y="0" width="2" height="4" fill="#ffffff" opacity="0.9"/>
    </svg>`
  },

  /** WAVE_CANNON_BEAM — charged wave cannon shot, 40×8, white-cyan gradient */
  WAVE_CANNON_BEAM: { w: 40, h: 8, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 8">
      <defs>
        <linearGradient id="wg" x1="0" x2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="#00eeff"/>
          <stop offset="100%" stop-color="#0066ff" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <rect x="0" y="1" width="40" height="6" fill="url(#wg)" rx="3"/>
      <rect x="2" y="3" width="36" height="2" fill="#ffffff" opacity="0.7"/>
    </svg>`
  },

  /** SEEKER_MISSILE — homing missile, 10×4, white dart */
  SEEKER_MISSILE: { w: 10, h: 4, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 4">
      <polygon points="0,2 3,0 10,2 3,4" fill="#ddddff"/>
      <rect x="0" y="1.5" width="2" height="1" fill="#ff8800" opacity="0.9"/>
    </svg>`
  },

  /** PHOTON_LANCE — piercing laser beam, 60×2, yellow-white */
  PHOTON_LANCE: { w: 60, h: 2, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 2">
      <rect x="0" y="0" width="60" height="2" fill="#ffff44"/>
      <rect x="0" y="0.5" width="60" height="1" fill="#ffffff" opacity="0.7"/>
    </svg>`
  },

  /** PLASMA_BURST_SHOT — spread plasma ball, 8×8, orange */
  PLASMA_BURST_SHOT: { w: 8, h: 8, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill="#ff6600"/>
      <circle cx="4" cy="4" r="2.5" fill="#ffaa00"/>
      <circle cx="4" cy="4" r="1" fill="#ffff88"/>
    </svg>`
  },

  /** FORCE_VULCAN_BOLT — Force pod auto-fire, 6×4, red dot */
  FORCE_VULCAN_BOLT: { w: 6, h: 4, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 4">
      <rect x="0" y="1" width="5" height="2" fill="#ff4400"/>
      <rect x="5" y="0" width="1" height="4" fill="#ff8866"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // POWER-UPS  (16×10 capsules)
  // ═══════════════════════════════════════════════════════════

  /** POWERUP_R — Reflex Laser, red capsule */
  POWERUP_R: { w: 16, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10">
      <rect x="1" y="1" width="14" height="8" rx="4" fill="#cc2222" stroke="#ff6666" stroke-width="0.5"/>
      <text x="8" y="7.5" text-anchor="middle" font-size="6" font-family="monospace" font-weight="bold" fill="#fff">R</text>
    </svg>`
  },

  /** POWERUP_L — Photon Lance, yellow capsule */
  POWERUP_L: { w: 16, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10">
      <rect x="1" y="1" width="14" height="8" rx="4" fill="#cc9900" stroke="#ffdd44" stroke-width="0.5"/>
      <text x="8" y="7.5" text-anchor="middle" font-size="6" font-family="monospace" font-weight="bold" fill="#fff">L</text>
    </svg>`
  },

  /** POWERUP_M — Seeker Missiles, green capsule */
  POWERUP_M: { w: 16, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10">
      <rect x="1" y="1" width="14" height="8" rx="4" fill="#226622" stroke="#66ff66" stroke-width="0.5"/>
      <text x="8" y="7.5" text-anchor="middle" font-size="6" font-family="monospace" font-weight="bold" fill="#fff">M</text>
    </svg>`
  },

  /** POWERUP_B — Plasma Burst, orange capsule */
  POWERUP_B: { w: 16, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10">
      <rect x="1" y="1" width="14" height="8" rx="4" fill="#994400" stroke="#ff8833" stroke-width="0.5"/>
      <text x="8" y="7.5" text-anchor="middle" font-size="6" font-family="monospace" font-weight="bold" fill="#fff">B</text>
    </svg>`
  },

  /** POWERUP_S — Speed Up, cyan capsule */
  POWERUP_S: { w: 16, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10">
      <rect x="1" y="1" width="14" height="8" rx="4" fill="#007788" stroke="#00ddff" stroke-width="0.5"/>
      <text x="8" y="7.5" text-anchor="middle" font-size="6" font-family="monospace" font-weight="bold" fill="#fff">S</text>
    </svg>`
  },

  /** POWERUP_FORCE — Force pod pickup, pulsing red orb 16×16 */
  POWERUP_FORCE: { w: 16, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="none" stroke="#ff4422" stroke-width="1" opacity="0.5"/>
      <circle cx="8" cy="8" r="5" fill="#aa1100"/>
      <circle cx="8" cy="8" r="3" fill="#ff3311"/>
      <circle cx="8" cy="8" r="1.5" fill="#ffeecc"/>
      <rect x="7.5" y="1" width="1" height="3" fill="#ff6644"/>
      <rect x="7.5" y="12" width="1" height="3" fill="#ff6644"/>
      <rect x="1" y="7.5" width="3" height="1" fill="#ff6644"/>
      <rect x="12" y="7.5" width="3" height="1" fill="#ff6644"/>
    </svg>`
  },


  // ═══════════════════════════════════════════════════════════
  // STAGE 1 ENEMIES — SPACE / MECHANICAL
  // ═══════════════════════════════════════════════════════════

  /** GRUBOID_DRONE — basic insectoid grunt, 24×16, grey-purple */
  GRUBOID_DRONE: { w: 24, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
      <ellipse cx="13" cy="8" rx="9" ry="5.5" fill="#4a4a60"/>
      <ellipse cx="13" cy="8" rx="6" ry="3.5" fill="#5e5e78"/>
      <circle cx="17" cy="7" r="2" fill="#ff2200"/>
      <circle cx="17" cy="7" r="1" fill="#ff9966" opacity="0.8"/>
      <polygon points="5,5 0,2 7,8" fill="#3a3a50" opacity="0.9"/>
      <polygon points="5,11 0,14 7,8" fill="#3a3a50" opacity="0.9"/>
      <line x1="7" y1="7" x2="1" y2="5" stroke="#6666aa" stroke-width="1"/>
      <line x1="7" y1="9" x2="1" y2="11" stroke="#6666aa" stroke-width="1"/>
      <polygon points="22,8 24,6 24,10" fill="#4a4a60"/>
    </svg>`
  },

  /** SCYTHE_WING — fast swooping red fighter, 28×14 */
  SCYTHE_WING: { w: 28, h: 14, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14">
      <polygon points="0,7 12,4 24,6 28,7 24,8 12,10" fill="#882211"/>
      <polygon points="12,4 20,0 22,6 16,6" fill="#661100"/>
      <polygon points="12,10 20,14 22,8 16,8" fill="#661100"/>
      <ellipse cx="22" cy="7" rx="4" ry="2.5" fill="#dd4422"/>
      <ellipse cx="3" cy="7" rx="3" ry="1.5" fill="#ff6600" opacity="0.8"/>
      <line x1="8" y1="6.5" x2="22" y2="7" stroke="#ff4444" stroke-width="0.5" opacity="0.7"/>
    </svg>`
  },

  /** TUMBLER_POD — rotating spiked mine, 18×18, purple */
  TUMBLER_POD: { w: 18, h: 18, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="7" fill="#553377"/>
      <circle cx="9" cy="9" r="4.5" fill="#6644aa"/>
      <circle cx="9" cy="9" r="2" fill="#aa88ff"/>
      <polygon points="9,2 10.5,6 9,5 7.5,6" fill="#7755bb"/>
      <polygon points="9,16 10.5,12 9,13 7.5,12" fill="#7755bb"/>
      <polygon points="2,9 6,10.5 5,9 6,7.5" fill="#7755bb"/>
      <polygon points="16,9 12,10.5 13,9 12,7.5" fill="#7755bb"/>
      <polygon points="3.5,3.5 5.5,7 5,5 7,5.5" fill="#7755bb"/>
      <polygon points="14.5,14.5 12.5,11 13,13 11,12.5" fill="#7755bb"/>
      <polygon points="14.5,3.5 11,5.5 13,5 12.5,7" fill="#7755bb"/>
      <polygon points="3.5,14.5 7,12.5 5,13 5.5,11" fill="#7755bb"/>
    </svg>`
  },

  /** LANCE_FRIGATE — forward-firing silver dart, 32×12 */
  LANCE_FRIGATE: { w: 32, h: 12, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 12">
      <polygon points="0,6 8,2 28,4 32,6 28,8 8,10" fill="#8a8a9a"/>
      <polygon points="8,2 16,0 20,4 12,4" fill="#6a6a7a"/>
      <polygon points="8,10 16,12 20,8 12,8" fill="#6a6a7a"/>
      <ellipse cx="24" cy="6" rx="5" ry="3" fill="#aaaabc"/>
      <ellipse cx="3" cy="5" rx="3" ry="1.5" fill="#ff8800" opacity="0.85"/>
      <ellipse cx="3" cy="7" rx="3" ry="1.5" fill="#ff5500" opacity="0.85"/>
      <line x1="10" y1="5" x2="26" y2="5.5" stroke="#ccc" stroke-width="0.5"/>
      <line x1="10" y1="7" x2="26" y2="6.5" stroke="#ccc" stroke-width="0.5"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 2 ENEMIES — BIO-HORROR / ORGANIC
  // ═══════════════════════════════════════════════════════════

  /** FLESHING_CRAWLER — segmented organic crawler, 30×12, flesh-red */
  FLESHING_CRAWLER: { w: 30, h: 12, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 12">
      <ellipse cx="15" cy="6" rx="14" ry="5" fill="#8b3a3a"/>
      <ellipse cx="10" cy="5" rx="4" ry="3" fill="#aa4444"/>
      <ellipse cx="20" cy="5" rx="4" ry="3" fill="#993333"/>
      <ellipse cx="25" cy="6" rx="3" ry="2" fill="#aa4444"/>
      <circle cx="26" cy="5" r="1.5" fill="#ff2200"/>
      <circle cx="26" cy="5" r="0.7" fill="#ff9988"/>
      <line x1="8" y1="10" x2="6" y2="12" stroke="#7a3030" stroke-width="1.5"/>
      <line x1="15" y1="11" x2="13" y2="12" stroke="#7a3030" stroke-width="1.5"/>
      <line x1="22" y1="10" x2="20" y2="12" stroke="#7a3030" stroke-width="1.5"/>
      <line x1="8" y1="2" x2="6" y2="0" stroke="#7a3030" stroke-width="1.5"/>
      <line x1="15" y1="1" x2="13" y2="0" stroke="#7a3030" stroke-width="1.5"/>
    </svg>`
  },

  /** SPORE_BURST_ORB — explodes into spread fragments, 20×20, green blob */
  SPORE_BURST_ORB: { w: 20, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="#2a6a1a" opacity="0.35"/>
      <circle cx="10" cy="10" r="7" fill="#3a8a22"/>
      <circle cx="10" cy="10" r="5" fill="#4aaa2a"/>
      <circle cx="10" cy="10" r="2.5" fill="#88ff44"/>
      <circle cx="7" cy="7" r="1.5" fill="#55cc22" opacity="0.8"/>
      <circle cx="13" cy="7" r="1" fill="#66dd33" opacity="0.8"/>
      <circle cx="10" cy="13" r="1.5" fill="#55cc22" opacity="0.8"/>
      <polygon points="10,1 11,4 10,3.5 9,4" fill="#5acc33"/>
      <polygon points="1,10 4,11 3.5,10 4,9" fill="#5acc33"/>
      <polygon points="19,10 16,11 16.5,10 16,9" fill="#5acc33"/>
      <polygon points="10,19 11,16 10,16.5 9,16" fill="#5acc33"/>
    </svg>`
  },

  /** TENDRIL_WHIP — sinuous tentacle enemy, 40×8, dark purple */
  TENDRIL_WHIP: { w: 40, h: 8, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 8">
      <path d="M40,4 C32,1 24,7 16,3 C8,-1 4,6 0,4"
            stroke="#6622aa" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M40,4 C32,1 24,7 16,3 C8,-1 4,6 0,4"
            stroke="#9944dd" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>
      <circle cx="40" cy="4" r="3" fill="#8833bb"/>
      <circle cx="40" cy="4" r="1.5" fill="#bb66ff"/>
    </svg>`
  },

  /** BILE_SHOOTER — stationary organic turret, 16×16, dark green */
  BILE_SHOOTER: { w: 16, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <ellipse cx="8" cy="9" rx="7" ry="6" fill="#1a4a0a"/>
      <ellipse cx="8" cy="8" rx="5" ry="4" fill="#2a6a14"/>
      <circle cx="8" cy="6" r="2.5" fill="#44aa22"/>
      <circle cx="8" cy="6" r="1.2" fill="#88ff44"/>
      <ellipse cx="4" cy="12" rx="2" ry="1.5" fill="#1a4a0a"/>
      <ellipse cx="12" cy="12" rx="2" ry="1.5" fill="#1a4a0a"/>
      <line x1="8" y1="1" x2="8" y2="3.5" stroke="#44aa22" stroke-width="1.5"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // ENEMY ORDNANCE
  // ═══════════════════════════════════════════════════════════

  /** ENEMY_BULLET_ROUND — standard round shot, 6×6, red */
  ENEMY_BULLET_ROUND: { w: 6, h: 6, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6">
      <circle cx="3" cy="3" r="3" fill="#ff3300"/>
      <circle cx="3" cy="3" r="1.5" fill="#ff8866"/>
    </svg>`
  },

  /** ENEMY_BULLET_BEAM — orange laser shot, 16×3 */
  ENEMY_BULLET_BEAM: { w: 16, h: 3, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 3">
      <rect x="0" y="0.5" width="16" height="2" fill="#ff6600"/>
      <rect x="2" y="1" width="12" height="1" fill="#ffaa44"/>
    </svg>`
  },

  /** ENEMY_BULLET_RING — teal ring projectile, 12×12 */
  ENEMY_BULLET_RING: { w: 12, h: 12, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="5.5" fill="none" stroke="#00bbcc" stroke-width="2"/>
      <circle cx="6" cy="6" r="2.5" fill="none" stroke="#00eeff" stroke-width="1"/>
      <circle cx="6" cy="6" r="1" fill="#00eeff" opacity="0.7"/>
    </svg>`
  },

  /** ENEMY_MISSILE — dark red enemy rocket, 10×4 */
  ENEMY_MISSILE: { w: 10, h: 4, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 4">
      <polygon points="10,2 7,0 0,2 7,4" fill="#aa1100"/>
      <rect x="0" y="1.5" width="2" height="1" fill="#ff5500" opacity="0.8"/>
    </svg>`
  },

  /** BYDO_ORB — alien organic projectile, 8×8, dark red pulse */
  BYDO_ORB: { w: 8, h: 8, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill="#550000"/>
      <circle cx="4" cy="4" r="2.5" fill="#880000"/>
      <circle cx="4" cy="4" r="1.2" fill="#cc1100"/>
      <circle cx="3" cy="3" r="0.7" fill="#ff8866" opacity="0.6"/>
    </svg>`
  },

  /** SPORE_FRAGMENT — spore burst piece, 5×5, green triangle */
  SPORE_FRAGMENT: { w: 5, h: 5, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5">
      <polygon points="2.5,0 5,5 0,5" fill="#44bb22"/>
      <polygon points="2.5,0.5 4.5,4.5 0.5,4.5" fill="#66dd33" opacity="0.5"/>
    </svg>`
  },

  /** BOSS_CORE_SHOT — final boss orb, 14×14, black-red */
  BOSS_CORE_SHOT: { w: 14, h: 14, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="7" fill="#0a0000"/>
      <circle cx="7" cy="7" r="5" fill="#330000"/>
      <circle cx="7" cy="7" r="3.5" fill="#660000"/>
      <circle cx="7" cy="7" r="2" fill="#aa1100"/>
      <circle cx="7" cy="7" r="1" fill="#ff4422"/>
      <circle cx="5" cy="5" r="1" fill="#ff8866" opacity="0.4"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 3 ENEMIES — MOAI / SURREAL
  // ═══════════════════════════════════════════════════════════

  /** TOTEM_SENTINEL — moai head that fires rings, 24×32, stone grey */
  TOTEM_SENTINEL: { w: 24, h: 32, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32">
      <rect x="4" y="8" width="16" height="22" rx="2" fill="#787868"/>
      <rect x="2" y="4" width="20" height="10" rx="3" fill="#888878"/>
      <rect x="3" y="2" width="18" height="5" rx="2" fill="#999988"/>
      <rect x="6" y="12" width="5" height="4" rx="1" fill="#2222aa"/>
      <rect x="13" y="12" width="5" height="4" rx="1" fill="#2222aa"/>
      <rect x="6" y="12" width="5" height="4" rx="1" fill="#4444ff" opacity="0.5"/>
      <rect x="13" y="12" width="5" height="4" rx="1" fill="#4444ff" opacity="0.5"/>
      <rect x="7" y="19" width="10" height="2" rx="1" fill="#555545"/>
      <rect x="9" y="23" width="6" height="5" rx="1" fill="#555545"/>
      <rect x="0" y="10" width="4" height="3" rx="1" fill="#888878"/>
      <rect x="20" y="10" width="4" height="3" rx="1" fill="#888878"/>
    </svg>`
  },

  /** RING_CASTER — fires rotating ring projectiles, 20×20, teal diamond */
  RING_CASTER: { w: 20, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <polygon points="10,1 19,10 10,19 1,10" fill="#117788"/>
      <polygon points="10,4 16,10 10,16 4,10" fill="#1a99aa"/>
      <circle cx="10" cy="10" r="4" fill="#22bbcc"/>
      <circle cx="10" cy="10" r="2" fill="#44ddee"/>
      <circle cx="10" cy="10" r="0.8" fill="#aaffff"/>
      <line x1="10" y1="4" x2="10" y2="6" stroke="#44ddee" stroke-width="0.8"/>
      <line x1="10" y1="14" x2="10" y2="16" stroke="#44ddee" stroke-width="0.8"/>
      <line x1="4" y1="10" x2="6" y2="10" stroke="#44ddee" stroke-width="0.8"/>
      <line x1="14" y1="10" x2="16" y2="10" stroke="#44ddee" stroke-width="0.8"/>
    </svg>`
  },

  /** MIRROR_DRONE — reflects shots, 16×16, silver hexagon */
  MIRROR_DRONE: { w: 16, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <polygon points="8,0 16,8 8,16 0,8" fill="#aaaacc" stroke="#ddddff" stroke-width="0.5"/>
      <polygon points="8,3 13,8 8,13 3,8" fill="#bbbbdd"/>
      <polygon points="8,6 10,8 8,10 6,8" fill="#ddeeff"/>
      <circle cx="8" cy="8" r="1.5" fill="#ffffff"/>
      <line x1="8" y1="0" x2="8" y2="16" stroke="#eeeeff" stroke-width="0.3" opacity="0.5"/>
      <line x1="0" y1="8" x2="16" y2="8" stroke="#eeeeff" stroke-width="0.3" opacity="0.5"/>
    </svg>`
  },

  /** IDOL_GUARDIAN — large moai with arm cannons, 32×40, stone */
  IDOL_GUARDIAN: { w: 32, h: 40, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40">
      <rect x="6" y="10" width="20" height="28" rx="2" fill="#707060"/>
      <rect x="2" y="4" width="28" height="14" rx="3" fill="#808070"/>
      <rect x="4" y="1" width="24" height="7" rx="2" fill="#909080"/>
      <rect x="0" y="14" width="8" height="4" rx="1" fill="#808070"/>
      <rect x="24" y="14" width="8" height="4" rx="1" fill="#808070"/>
      <rect x="7" y="16" width="7" height="5" rx="1" fill="#110088"/>
      <rect x="18" y="16" width="7" height="5" rx="1" fill="#110088"/>
      <rect x="7" y="16" width="7" height="5" rx="1" fill="#2222ff" opacity="0.5"/>
      <rect x="18" y="16" width="7" height="5" rx="1" fill="#2222ff" opacity="0.5"/>
      <rect x="9" y="24" width="14" height="3" rx="1" fill="#5a5a4a"/>
      <rect x="11" y="30" width="10" height="6" rx="1" fill="#5a5a4a"/>
      <rect x="0" y="16" width="6" height="8" rx="2" fill="#707060"/>
      <rect x="26" y="16" width="6" height="8" rx="2" fill="#707060"/>
      <rect x="0" y="14" width="4" height="4" rx="1" fill="#aaaaaa"/>
      <rect x="28" y="14" width="4" height="4" rx="1" fill="#aaaaaa"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 4 ENEMIES — INDUSTRIAL / MECHANICAL
  // ═══════════════════════════════════════════════════════════

  /** TURRET_WALKER — 4-legged gun platform, 28×20, dark metal */
  TURRET_WALKER: { w: 28, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20">
      <rect x="4" y="6" width="20" height="10" rx="1" fill="#3a3a44"/>
      <rect x="2" y="4" width="24" height="7" rx="1" fill="#4a4a54"/>
      <rect x="8" y="2" width="12" height="5" rx="1" fill="#5a5a66"/>
      <rect x="22" y="5" width="6" height="3" rx="1" fill="#2a2a34"/>
      <rect x="27" y="4" width="1" height="5" fill="#888888"/>
      <circle cx="6" cy="16" r="4" fill="#222233" stroke="#555566" stroke-width="1"/>
      <circle cx="6" cy="16" r="2" fill="#333344"/>
      <circle cx="22" cy="16" r="4" fill="#222233" stroke="#555566" stroke-width="1"/>
      <circle cx="22" cy="16" r="2" fill="#333344"/>
      <circle cx="14" cy="17" r="3" fill="#222233" stroke="#555566" stroke-width="1"/>
      <circle cx="14" cy="17" r="1.5" fill="#333344"/>
      <rect x="9" y="7" width="3" height="2" fill="#ff4400" opacity="0.8"/>
    </svg>`
  },

  /** GEAR_MINE — spinning bronze gear that homes on player, 20×20 */
  GEAR_MINE: { w: 20, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" fill="#7a5a22"/>
      <circle cx="10" cy="10" r="5" fill="#9a7a33"/>
      <circle cx="10" cy="10" r="2.5" fill="#cc9944"/>
      <rect x="9" y="0" width="2" height="5" rx="1" fill="#8a6a28"/>
      <rect x="9" y="15" width="2" height="5" rx="1" fill="#8a6a28"/>
      <rect x="0" y="9" width="5" height="2" rx="1" fill="#8a6a28"/>
      <rect x="15" y="9" width="5" height="2" rx="1" fill="#8a6a28"/>
      <rect x="2" y="2" width="2" height="4" rx="1" fill="#8a6a28" transform="rotate(45 3 4)"/>
      <rect x="16" y="14" width="2" height="4" rx="1" fill="#8a6a28" transform="rotate(45 17 16)"/>
      <rect x="16" y="2" width="2" height="4" rx="1" fill="#8a6a28" transform="rotate(-45 17 4)"/>
      <rect x="2" y="14" width="2" height="4" rx="1" fill="#8a6a28" transform="rotate(-45 3 16)"/>
    </svg>`
  },

  /** PLASMA_CANNON_EMPLACEMENT — heavy fixed turret, 24×18, steel */
  PLASMA_CANNON_EMPLACEMENT: { w: 24, h: 18, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18">
      <rect x="0" y="8" width="24" height="10" rx="1" fill="#2a2a38"/>
      <rect x="2" y="6" width="20" height="8" rx="1" fill="#3a3a48"/>
      <rect x="6" y="3" width="14" height="8" rx="2" fill="#4a4a58"/>
      <rect x="18" y="5" width="6" height="4" rx="1" fill="#222230"/>
      <rect x="23" y="4" width="1" height="6" fill="#aaaacc"/>
      <circle cx="12" cy="8" r="3" fill="#0044aa"/>
      <circle cx="12" cy="8" r="2" fill="#0066dd"/>
      <circle cx="12" cy="8" r="1" fill="#88aaff"/>
      <rect x="2" y="14" width="4" height="4" rx="1" fill="#1a1a26"/>
      <rect x="18" y="14" width="4" height="4" rx="1" fill="#1a1a26"/>
    </svg>`
  },

  /** SHIELDED_DRONE — enemy with front energy shield, 24×16 */
  SHIELDED_DRONE: { w: 24, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
      <rect x="4" y="4" width="14" height="8" rx="2" fill="#7a7a8a"/>
      <ellipse cx="12" cy="8" rx="7" ry="4" fill="#8a8a9a"/>
      <ellipse cx="19" cy="8" rx="5" ry="6" fill="none" stroke="#4488ff" stroke-width="2" opacity="0.8"/>
      <rect x="20" y="3" width="4" height="10" rx="2" fill="#2244aa" opacity="0.65"/>
      <circle cx="9" cy="8" r="2" fill="#ff3300"/>
      <circle cx="9" cy="8" r="1" fill="#ff9966"/>
      <ellipse cx="4" cy="7" rx="3" ry="1.5" fill="#ff8800" opacity="0.7"/>
      <ellipse cx="4" cy="9" rx="3" ry="1.5" fill="#ff5500" opacity="0.7"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 5 ENEMIES — BATTLESHIPS / SCALE
  // ═══════════════════════════════════════════════════════════

  /** DREADNOUGHT_ESCORT — mini battleship, 36×16, dark grey */
  DREADNOUGHT_ESCORT: { w: 36, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 16">
      <polygon points="0,8 6,3 30,3 36,8 30,13 6,13" fill="#2a2a3a"/>
      <rect x="8" y="5" width="18" height="6" fill="#3a3a4a"/>
      <rect x="14" y="3" width="8" height="4" rx="1" fill="#4a4a5a"/>
      <rect x="28" y="6" width="8" height="3" rx="1" fill="#1a1a28"/>
      <rect x="4" y="6" width="4" height="2" fill="#ff8800" opacity="0.8"/>
      <circle cx="16" cy="8" r="2" fill="#222230"/>
      <circle cx="22" cy="8" r="2" fill="#222230"/>
      <line x1="8" y1="8" x2="26" y2="8" stroke="#555566" stroke-width="0.5"/>
    </svg>`
  },

  /** TURRET_ARRAY_SEGMENT — battleship gun segment, 20×14, grey block */
  TURRET_ARRAY_SEGMENT: { w: 20, h: 14, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14">
      <rect x="0" y="3" width="20" height="8" fill="#2a2a38"/>
      <rect x="2" y="5" width="16" height="4" fill="#3a3a48"/>
      <rect x="5" y="2" width="5" height="6" rx="1" fill="#4a4a58"/>
      <rect x="13" y="2" width="5" height="6" rx="1" fill="#4a4a58"/>
      <rect x="6" y="0" width="3" height="3" rx="0.5" fill="#222230"/>
      <rect x="14" y="0" width="3" height="3" rx="0.5" fill="#222230"/>
      <rect x="0" y="9" width="20" height="5" fill="#1a1a24"/>
    </svg>`
  },

  /** MISSILE_BATTERY — fires missile volleys, 24×16, gunmetal */
  MISSILE_BATTERY: { w: 24, h: 16, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
      <rect x="0" y="4" width="24" height="10" rx="1" fill="#3a3540"/>
      <rect x="4" y="2" width="16" height="8" rx="1" fill="#4a4550"/>
      <rect x="7" y="1" width="3" height="5" rx="1" fill="#555060"/>
      <rect x="14" y="1" width="3" height="5" rx="1" fill="#555060"/>
      <rect x="11" y="0" width="2" height="4" rx="0.5" fill="#666070"/>
      <polygon points="7,0 8.5,0 7,1.2" fill="#cccccc"/>
      <polygon points="14,0 15.5,0 14,1.2" fill="#cccccc"/>
      <polygon points="11,0 12,0 11,0.9" fill="#cccccc"/>
      <rect x="2" y="7" width="4" height="4" rx="1" fill="#222028"/>
      <rect x="18" y="7" width="4" height="4" rx="1" fill="#222028"/>
    </svg>`
  },

  /** VOID_FIGHTER — fast elite black/red fighter, 28×14 */
  VOID_FIGHTER: { w: 28, h: 14, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14">
      <polygon points="0,7 10,2 24,4 28,7 24,10 10,12" fill="#0a0a14"/>
      <polygon points="10,2 18,0 20,4 14,4" fill="#1a0000"/>
      <polygon points="10,12 18,14 20,10 14,10" fill="#1a0000"/>
      <ellipse cx="22" cy="7" rx="4" ry="2.5" fill="#330000"/>
      <ellipse cx="4" cy="6" rx="3" ry="1.5" fill="#ff2200" opacity="0.9"/>
      <ellipse cx="4" cy="8" rx="3" ry="1.5" fill="#cc1100" opacity="0.9"/>
      <circle cx="20" cy="7" r="1.5" fill="#ff0000"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 6 ENEMIES — VOID / ABSTRACT
  // ═══════════════════════════════════════════════════════════

  /** VOID_SPECTER — ghost-like translucent enemy, 20×20, blue */
  VOID_SPECTER: { w: 20, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" fill="#0a0a44" opacity="0.55"/>
      <circle cx="10" cy="10" r="7" fill="#1111aa" opacity="0.7"/>
      <circle cx="10" cy="10" r="4.5" fill="#2222cc" opacity="0.8"/>
      <circle cx="10" cy="10" r="2" fill="#6666ff" opacity="0.9"/>
      <circle cx="7" cy="8" r="1.5" fill="#ffffff" opacity="0.7"/>
      <circle cx="13" cy="8" r="1.5" fill="#ffffff" opacity="0.7"/>
      <path d="M7,12 Q10,15 13,12" stroke="#aaaaff" stroke-width="1" fill="none" opacity="0.8"/>
      <circle cx="10" cy="10" r="9" fill="none" stroke="#4444ff" stroke-width="0.5" opacity="0.4"/>
    </svg>`
  },

  /** ENERGY_RING — rotating energy barrier enemy, 24×24, electric purple */
  ENERGY_RING: { w: 24, h: 24, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="none" stroke="#8800ff" stroke-width="3"/>
      <circle cx="12" cy="12" r="11" fill="none" stroke="#aa44ff" stroke-width="1.5" opacity="0.6"/>
      <circle cx="12" cy="12" r="8" fill="none" stroke="#6600cc" stroke-width="1"/>
      <circle cx="12" cy="1" r="2" fill="#cc66ff"/>
      <circle cx="12" cy="23" r="2" fill="#cc66ff"/>
      <circle cx="1" cy="12" r="2" fill="#cc66ff"/>
      <circle cx="23" cy="12" r="2" fill="#cc66ff"/>
      <circle cx="12" cy="12" r="2" fill="#9900ff"/>
    </svg>`
  },

  /** PULSE_DRONE_SWARM — small neon yellow pack drone, 12×12 */
  PULSE_DRONE_SWARM: { w: 12, h: 12, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="5" fill="#aaaa00"/>
      <circle cx="6" cy="6" r="3" fill="#dddd00"/>
      <circle cx="6" cy="6" r="1.5" fill="#ffff44"/>
      <circle cx="6" cy="1" r="1" fill="#ffff88"/>
      <circle cx="6" cy="11" r="1" fill="#ffff88"/>
      <circle cx="1" cy="6" r="1" fill="#ffff88"/>
      <circle cx="11" cy="6" r="1" fill="#ffff88"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 7 ENEMIES — BYDO STRONGHOLD
  // ═══════════════════════════════════════════════════════════

  /** BYDO_SENTRY — elite alien biomechanical guard, 28×20, dark crimson */
  BYDO_SENTRY: { w: 28, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20">
      <ellipse cx="14" cy="10" rx="12" ry="8" fill="#3a0808"/>
      <ellipse cx="14" cy="9" rx="9" ry="6" fill="#550a0a"/>
      <circle cx="20" cy="8" r="3" fill="#880000"/>
      <circle cx="20" cy="8" r="1.5" fill="#ff2200"/>
      <circle cx="8" cy="8" r="2" fill="#660000"/>
      <polygon points="4,10 0,8 3,14" fill="#3a0808"/>
      <polygon points="4,10 0,12 3,6" fill="#3a0808"/>
      <ellipse cx="5" cy="9" rx="3" ry="1.5" fill="#cc1100" opacity="0.8"/>
      <ellipse cx="5" cy="11" rx="3" ry="1.5" fill="#991100" opacity="0.8"/>
    </svg>`
  },

  /** BYDO_TURRET — alien organic gun emplacement, 20×20, dark red blob */
  BYDO_TURRET: { w: 20, h: 20, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <ellipse cx="10" cy="12" rx="9" ry="7" fill="#2a0505"/>
      <ellipse cx="10" cy="10" rx="7" ry="6" fill="#3d0707"/>
      <ellipse cx="10" cy="8" rx="5" ry="4" fill="#550a0a"/>
      <circle cx="10" cy="6" r="3" fill="#770d0d"/>
      <circle cx="10" cy="6" r="1.5" fill="#ff1100"/>
      <circle cx="10" cy="6" r="0.6" fill="#ffaa88"/>
      <line x1="10" y1="3" x2="10" y2="1" stroke="#880000" stroke-width="2"/>
      <line x1="6" y1="4.5" x2="4" y2="3" stroke="#880000" stroke-width="1.5"/>
      <line x1="14" y1="4.5" x2="16" y2="3" stroke="#880000" stroke-width="1.5"/>
    </svg>`
  },

  /** BYDO_LANCE — fast aggressive alien fighter, 32×14, sleek dark red */
  BYDO_LANCE: { w: 32, h: 14, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 14">
      <polygon points="0,7 12,2 28,4 32,7 28,10 12,12" fill="#1a0000"/>
      <polygon points="12,2 22,0 24,4 16,4" fill="#2a0000"/>
      <polygon points="12,12 22,14 24,10 16,10" fill="#2a0000"/>
      <ellipse cx="25" cy="7" rx="5" ry="3" fill="#3a0000"/>
      <circle cx="26" cy="7" r="2" fill="#880000"/>
      <circle cx="26" cy="7" r="1" fill="#ff1100"/>
      <ellipse cx="4" cy="6" rx="4" ry="2" fill="#ff2200" opacity="0.9"/>
      <ellipse cx="4" cy="8" rx="4" ry="2" fill="#cc1100" opacity="0.9"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // STAGE 8 ENEMIES — FINAL CORE
  // ═══════════════════════════════════════════════════════════

  /** CORE_GUARDIAN — final stage protector, 32×24, black/red biomech */
  CORE_GUARDIAN: { w: 32, h: 24, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
      <ellipse cx="16" cy="12" rx="15" ry="10" fill="#0a0000"/>
      <ellipse cx="16" cy="12" rx="11" ry="7" fill="#1a0000"/>
      <ellipse cx="16" cy="11" rx="7" ry="5" fill="#2a0000"/>
      <circle cx="22" cy="10" r="4" fill="#550000"/>
      <circle cx="22" cy="10" r="2.5" fill="#880000"/>
      <circle cx="22" cy="10" r="1.5" fill="#ff0000"/>
      <circle cx="10" cy="10" r="3" fill="#440000"/>
      <circle cx="10" cy="10" r="1.5" fill="#770000"/>
      <polygon points="2,12 0,9 4,16" fill="#1a0000"/>
      <polygon points="2,12 0,15 4,8" fill="#1a0000"/>
      <polygon points="30,12 28,9 32,15" fill="#1a0000"/>
      <polygon points="30,12 28,15 32,9" fill="#1a0000"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // BOSSES
  // ═══════════════════════════════════════════════════════════

  /** DOBKERATOPS_PRIME — Stage 1 boss: giant biomechanical crab, 120×80 */
  DOBKERATOPS_PRIME: { w: 120, h: 80, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80">
      <ellipse cx="55" cy="42" rx="38" ry="28" fill="#2a4a6a"/>
      <ellipse cx="55" cy="40" rx="30" ry="22" fill="#3a5a7a"/>
      <ellipse cx="62" cy="38" rx="14" ry="10" fill="#6a9aaa" opacity="0.8"/>
      <circle cx="72" cy="34" r="6" fill="#ff2200"/>
      <circle cx="72" cy="34" r="3" fill="#ff8866"/>
      <circle cx="44" cy="34" r="5" fill="#ff2200"/>
      <circle cx="44" cy="34" r="2.5" fill="#ff8866"/>
      <polygon points="20,25 2,10 18,32 6,40 22,36 10,50 26,42" fill="#1a3a5a"/>
      <polygon points="20,58 2,72 18,52 6,44 22,48 10,36 26,42" fill="#1a3a5a"/>
      <ellipse cx="88" cy="40" rx="18" ry="12" fill="#2a4a6a"/>
      <polygon points="88,28 95,22 106,30 110,40 105,52 94,56 86,50 83,40 85,30" fill="#1a3a5a"/>
      <polygon points="106,30 120,22 116,36" fill="#2a5a7a"/>
      <polygon points="105,52 118,60 116,46" fill="#2a5a7a"/>
      <ellipse cx="100" cy="40" rx="8" ry="6" fill="#ff4400" opacity="0.7"/>
      <rect x="24" y="36" width="14" height="8" rx="3" fill="#1a3a5a"/>
      <rect x="26" y="38" width="10" height="4" rx="2" fill="#ff8800" opacity="0.6"/>
      <polygon points="0,40 10,35 10,45" fill="#4a7a9a"/>
    </svg>`
  },

  /** BIOMORPHIC_LEVIATHAN — Stage 2 boss: organic serpent, 160×40 */
  BIOMORPHIC_LEVIATHAN: { w: 160, h: 40, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40">
      <ellipse cx="25" cy="20" rx="24" ry="14" fill="#1a4a1a"/>
      <circle cx="36" cy="16" r="5" fill="#ff2200"/>
      <circle cx="36" cy="16" r="2.5" fill="#ff9966"/>
      <circle cx="20" cy="15" r="4" fill="#ff1100"/>
      <circle cx="20" cy="15" r="2" fill="#ff8866"/>
      <path d="M46,20 C50,14 56,26 62,20 C68,14 74,26 80,20 C86,14 92,26 98,20 C104,14 110,26 116,20"
            stroke="#2a6a2a" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M46,20 C50,14 56,26 62,20 C68,14 74,26 80,20 C86,14 92,26 98,20 C104,14 110,26 116,20"
            stroke="#3a8a3a" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M46,20 C50,14 56,26 62,20 C68,14 74,26 80,20 C86,14 92,26 98,20 C104,14 110,26 116,20"
            stroke="#44aa44" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.5"/>
      <ellipse cx="130" cy="20" rx="22" ry="10" fill="#1a4a1a"/>
      <ellipse cx="148" cy="20" rx="12" ry="7" fill="#2a6a2a"/>
      <polygon points="155,20 160,16 160,24" fill="#3a8a3a"/>
      <circle cx="56" cy="20" r="5" fill="#1a4a1a" stroke="#44aa44" stroke-width="1"/>
      <circle cx="80" cy="20" r="5" fill="#1a4a1a" stroke="#44aa44" stroke-width="1"/>
      <circle cx="104" cy="20" r="5" fill="#1a4a1a" stroke="#44aa44" stroke-width="1"/>
    </svg>`
  },

  /** TOTEM_COLOSSUS — Stage 3 boss: massive moai, 80×100 */
  TOTEM_COLOSSUS: { w: 80, h: 100, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100">
      <rect x="10" y="20" width="60" height="78" rx="3" fill="#6a6a58"/>
      <rect x="5" y="10" width="70" height="25" rx="4" fill="#7a7a68"/>
      <rect x="8" y="4" width="64" height="14" rx="3" fill="#8a8a78"/>
      <rect x="14" y="38" width="20" height="14" rx="2" fill="#110088"/>
      <rect x="46" y="38" width="20" height="14" rx="2" fill="#110088"/>
      <rect x="14" y="38" width="20" height="14" rx="2" fill="#3333ff" opacity="0.5"/>
      <rect x="46" y="38" width="20" height="14" rx="2" fill="#3333ff" opacity="0.5"/>
      <rect x="22" y="56" width="36" height="6" rx="2" fill="#555548"/>
      <rect x="24" y="66" width="32" height="16" rx="2" fill="#555548"/>
      <rect x="27" y="84" width="26" height="14" rx="1" fill="#555548"/>
      <rect x="0" y="36" width="12" height="20" rx="3" fill="#7a7a68"/>
      <rect x="68" y="36" width="12" height="20" rx="3" fill="#7a7a68"/>
      <rect x="0" y="38" width="8" height="8" rx="1" fill="#aaaaaa"/>
      <rect x="72" y="38" width="8" height="8" rx="1" fill="#aaaaaa"/>
      <polygon points="40,0 45,8 40,6 35,8" fill="#888878"/>
    </svg>`
  },

  /** FORTRESS_SENTINEL — Stage 4 boss: heavy mechanical core, 120×100 */
  FORTRESS_SENTINEL: { w: 120, h: 100, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100">
      <rect x="10" y="20" width="100" height="70" rx="2" fill="#2a2a38"/>
      <rect x="5" y="15" width="110" height="20" rx="1" fill="#3a3a48"/>
      <rect x="0" y="35" width="120" height="40" rx="1" fill="#323242"/>
      <rect x="20" y="10" width="80" height="15" rx="2" fill="#4a4a5a"/>
      <rect x="40" y="5" width="40" height="12" rx="2" fill="#5a5a6a"/>
      <circle cx="60" cy="50" r="20" fill="#1a1a28"/>
      <circle cx="60" cy="50" r="15" fill="#222232"/>
      <circle cx="60" cy="50" r="10" fill="#0044aa"/>
      <circle cx="60" cy="50" r="6" fill="#0066dd"/>
      <circle cx="60" cy="50" r="3" fill="#44aaff"/>
      <rect x="10" y="30" width="15" height="8" rx="1" fill="#1a1a26"/>
      <rect x="25" y="32" width="20" height="4" rx="1" fill="#444455"/>
      <rect x="95" y="30" width="15" height="8" rx="1" fill="#1a1a26"/>
      <rect x="75" y="32" width="20" height="4" rx="1" fill="#444455"/>
      <rect x="10" y="55" width="15" height="8" rx="1" fill="#1a1a26"/>
      <rect x="95" y="55" width="15" height="8" rx="1" fill="#1a1a26"/>
      <rect x="0" y="40" width="12" height="20" rx="1" fill="#1a1a26"/>
      <rect x="108" y="40" width="12" height="20" rx="1" fill="#1a1a26"/>
    </svg>`
  },

  /** DREADNOUGHT_BEHEMOTH — Stage 5 boss: massive battleship, 200×80 */
  DREADNOUGHT_BEHEMOTH: { w: 200, h: 80, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
      <polygon points="0,40 20,15 160,15 180,25 200,40 180,55 160,65 20,65" fill="#181822"/>
      <rect x="20" y="25" width="140" height="30" fill="#222232"/>
      <rect x="40" y="20" width="100" height="15" fill="#2a2a3a"/>
      <rect x="60" y="15" width="60" height="12" rx="1" fill="#323244"/>
      <rect x="25" y="32" width="20" height="6" rx="1" fill="#1a1a28"/>
      <rect x="115" y="32" width="20" height="6" rx="1" fill="#1a1a28"/>
      <rect x="60" y="30" width="10" height="8" rx="1" fill="#1a1a26"/>
      <rect x="80" y="30" width="10" height="8" rx="1" fill="#1a1a26"/>
      <rect x="100" y="30" width="10" height="8" rx="1" fill="#1a1a26"/>
      <rect x="120" y="30" width="10" height="8" rx="1" fill="#1a1a26"/>
      <circle cx="170" cy="40" r="8" fill="#0044aa"/>
      <circle cx="170" cy="40" r="5" fill="#0066dd"/>
      <circle cx="170" cy="40" r="2.5" fill="#44aaff"/>
      <rect x="0" y="35" width="20" height="10" fill="#ff8800" opacity="0.7"/>
    </svg>`
  },

  /** VOID_PULSAR — Stage 6 boss: pulsing energy sphere, 100×100, purple */
  VOID_PULSAR: { w: 100, h: 100, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#0a0022" opacity="0.5"/>
      <circle cx="50" cy="50" r="38" fill="#110033" opacity="0.7"/>
      <circle cx="50" cy="50" r="28" fill="#220055"/>
      <circle cx="50" cy="50" r="18" fill="#440088"/>
      <circle cx="50" cy="50" r="10" fill="#6600cc"/>
      <circle cx="50" cy="50" r="5" fill="#aa44ff"/>
      <circle cx="50" cy="50" r="2.5" fill="#ffffff" opacity="0.9"/>
      <line x1="50" y1="2" x2="50" y2="22" stroke="#8800ff" stroke-width="3" opacity="0.8"/>
      <line x1="50" y1="78" x2="50" y2="98" stroke="#8800ff" stroke-width="3" opacity="0.8"/>
      <line x1="2" y1="50" x2="22" y2="50" stroke="#8800ff" stroke-width="3" opacity="0.8"/>
      <line x1="78" y1="50" x2="98" y2="50" stroke="#8800ff" stroke-width="3" opacity="0.8"/>
      <line x1="15" y1="15" x2="30" y2="30" stroke="#6600cc" stroke-width="2" opacity="0.6"/>
      <line x1="70" y1="70" x2="85" y2="85" stroke="#6600cc" stroke-width="2" opacity="0.6"/>
      <line x1="15" y1="85" x2="30" y2="70" stroke="#6600cc" stroke-width="2" opacity="0.6"/>
      <line x1="70" y1="30" x2="85" y2="15" stroke="#6600cc" stroke-width="2" opacity="0.6"/>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#9933ff" stroke-width="1" opacity="0.3"/>
    </svg>`
  },

  /** BYDO_HERALD — Stage 7 boss: alien biomechanical guardian, 120×100 */
  BYDO_HERALD: { w: 120, h: 100, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100">
      <ellipse cx="60" cy="50" rx="55" ry="42" fill="#0f0000"/>
      <ellipse cx="60" cy="48" rx="44" ry="34" fill="#1a0000"/>
      <ellipse cx="60" cy="46" rx="32" ry="24" fill="#2a0000"/>
      <circle cx="78" cy="36" r="8" fill="#770000"/>
      <circle cx="78" cy="36" r="5" fill="#aa0000"/>
      <circle cx="78" cy="36" r="2.5" fill="#ff2200"/>
      <circle cx="50" cy="36" r="7" fill="#660000"/>
      <circle cx="50" cy="36" r="4" fill="#990000"/>
      <circle cx="50" cy="36" r="2" fill="#ee1100"/>
      <polygon points="10,50 0,42 8,60" fill="#0f0000"/>
      <polygon points="10,50 0,58 8,40" fill="#0f0000"/>
      <polygon points="110,50 120,42 112,60" fill="#0f0000"/>
      <polygon points="110,50 120,58 112,40" fill="#0f0000"/>
      <line x1="14" y1="48" x2="4" y2="44" stroke="#550000" stroke-width="2"/>
      <line x1="14" y1="52" x2="4" y2="56" stroke="#550000" stroke-width="2"/>
      <line x1="106" y1="48" x2="116" y2="44" stroke="#550000" stroke-width="2"/>
      <line x1="106" y1="52" x2="116" y2="56" stroke="#550000" stroke-width="2"/>
      <rect x="40" y="58" width="40" height="6" rx="2" fill="#330000"/>
      <ellipse cx="60" cy="72" rx="18" ry="6" fill="#1a0000"/>
    </svg>`
  },

  /** BYDO_CORE — Stage 8 final boss: the alien heart, 80×80 */
  BYDO_CORE: { w: 80, h: 80, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" fill="#050000" opacity="0.7"/>
      <circle cx="40" cy="40" r="30" fill="#0f0000" opacity="0.8"/>
      <circle cx="40" cy="40" r="22" fill="#1a0000"/>
      <circle cx="40" cy="40" r="15" fill="#2d0000"/>
      <circle cx="40" cy="40" r="10" fill="#550000"/>
      <circle cx="40" cy="40" r="6" fill="#880000"/>
      <circle cx="40" cy="40" r="3.5" fill="#cc2200"/>
      <circle cx="40" cy="40" r="1.5" fill="#ff8866"/>
      <ellipse cx="30" cy="34" rx="6" ry="4" fill="#660000" opacity="0.8"/>
      <circle cx="30" cy="33" r="2.5" fill="#ff1100"/>
      <circle cx="30" cy="33" r="1" fill="#ffaa88"/>
      <ellipse cx="50" cy="34" rx="5" ry="3.5" fill="#550000" opacity="0.8"/>
      <circle cx="50" cy="33" r="2" fill="#ee1100"/>
      <circle cx="50" cy="33" r="0.8" fill="#ffaa88"/>
      <path d="M28,48 Q40,58 52,48" stroke="#660000" stroke-width="2" fill="none"/>
      <circle cx="40" cy="40" r="38" fill="none" stroke="#660000" stroke-width="1" opacity="0.4"/>
      <circle cx="40" cy="40" r="22" fill="none" stroke="#440000" stroke-width="0.8" opacity="0.4"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // TERRAIN TILES  (32×32 each)
  // ═══════════════════════════════════════════════════════════

  /** WALL_TILE_SPACE — dark asteroid rock, stage 1 */
  WALL_TILE_SPACE: { w: 32, h: 32, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#1a1a24"/>
      <polygon points="4,2 12,0 10,8 2,10" fill="#252532"/>
      <polygon points="20,14 28,10 30,22 22,24" fill="#1e1e2a"/>
      <polygon points="6,20 14,22 12,30 4,28" fill="#222230"/>
      <rect x="0" y="0" width="32" height="32" fill="none" stroke="#2a2a38" stroke-width="1"/>
    </svg>`
  },

  /** WALL_TILE_BIO — pulsating organic flesh, stage 2 */
  WALL_TILE_BIO: { w: 32, h: 32, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#0a1a08"/>
      <ellipse cx="10" cy="10" rx="9" ry="7" fill="#0e2210"/>
      <ellipse cx="24" cy="20" rx="8" ry="8" fill="#0c1e0e"/>
      <ellipse cx="8" cy="26" rx="7" ry="5" fill="#102414"/>
      <circle cx="16" cy="8" r="2" fill="#1a3a1a"/>
      <circle cx="26" cy="6" r="1.5" fill="#1a3a1a"/>
      <rect x="0" y="0" width="32" height="32" fill="none" stroke="#143014" stroke-width="0.5"/>
    </svg>`
  },

  /** WALL_TILE_STONE — moai stone block, stage 3 */
  WALL_TILE_STONE: { w: 32, h: 32, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#4a4a3a"/>
      <rect x="0" y="0" width="16" height="16" fill="#525244"/>
      <rect x="16" y="0" width="16" height="16" fill="#484838"/>
      <rect x="0" y="16" width="16" height="16" fill="#484838"/>
      <rect x="16" y="16" width="16" height="16" fill="#525244"/>
      <line x1="0" y1="16" x2="32" y2="16" stroke="#3a3a2a" stroke-width="1"/>
      <line x1="16" y1="0" x2="16" y2="32" stroke="#3a3a2a" stroke-width="1"/>
      <line x1="0" y1="8" x2="16" y2="8" stroke="#3a3a2a" stroke-width="0.5" opacity="0.5"/>
      <line x1="16" y1="24" x2="32" y2="24" stroke="#3a3a2a" stroke-width="0.5" opacity="0.5"/>
    </svg>`
  },

  /** WALL_TILE_METAL — industrial gunmetal plate, stage 4 */
  WALL_TILE_METAL: { w: 32, h: 32, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#2a2a34"/>
      <rect x="1" y="1" width="30" height="14" rx="1" fill="#323240"/>
      <rect x="1" y="17" width="30" height="14" rx="1" fill="#2e2e3c"/>
      <rect x="2" y="2" width="8" height="12" rx="1" fill="#383848"/>
      <rect x="12" y="2" width="8" height="12" rx="1" fill="#363646"/>
      <rect x="22" y="2" width="8" height="12" rx="1" fill="#383848"/>
      <rect x="2" y="18" width="12" height="12" rx="1" fill="#363646"/>
      <rect x="18" y="18" width="12" height="12" rx="1" fill="#383848"/>
      <rect x="0" y="15" width="32" height="2" fill="#1a1a22"/>
    </svg>`
  },

  // ═══════════════════════════════════════════════════════════
  // HUD / UI ELEMENTS
  // ═══════════════════════════════════════════════════════════

  /** HUD_SHIP_ICON — small player ship silhouette for lives display, 24×12 */
  HUD_SHIP_ICON: { w: 24, h: 12, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 12">
      <polygon points="1,6 7,2.5 21,4 24,6 21,8 7,9.5" fill="#1a5fc8"/>
      <polygon points="7,2.5 13,0 16,2.5 10,4" fill="#0d4aa0"/>
      <polygon points="7,9.5 13,12 16,9.5 10,8" fill="#0d4aa0"/>
      <ellipse cx="17" cy="6" rx="3.5" ry="2" fill="#7ae8ff" opacity="0.9"/>
    </svg>`
  },

  /** HUD_CHARGE_BAR_FILL — charge meter fill, cyan gradient, 100×8 */
  HUD_CHARGE_BAR_FILL: { w: 100, h: 8, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 8">
      <defs>
        <linearGradient id="cf" x1="0" x2="1">
          <stop offset="0%" stop-color="#00aaff"/>
          <stop offset="100%" stop-color="#00ffff"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="8" fill="url(#cf)" rx="2"/>
      <rect x="2" y="2" width="96" height="2" fill="#aaffff" opacity="0.4"/>
    </svg>`
  },

  /** HUD_CHARGE_BAR_BORDER — charge meter border, 100×8 */
  HUD_CHARGE_BAR_BORDER: { w: 100, h: 8, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 8">
      <rect x="0.5" y="0.5" width="99" height="7" fill="none" stroke="#ffffff" stroke-width="1" rx="2"/>
    </svg>`
  },

  /** HUD_SHIELD_ICON — shield/armor indicator, 12×14 */
  HUD_SHIELD_ICON: { w: 12, h: 14, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 14">
      <path d="M6,0 L12,3 L12,8 Q12,13 6,14 Q0,13 0,8 L0,3 Z" fill="#1144aa"/>
      <path d="M6,1.5 L10.5,4 L10.5,8.5 Q10.5,12 6,13 Q1.5,12 1.5,8.5 L1.5,4 Z" fill="#2266cc"/>
      <line x1="6" y1="4" x2="6" y2="11" stroke="#88aaff" stroke-width="1"/>
      <line x1="3" y1="7" x2="9" y2="7" stroke="#88aaff" stroke-width="1"/>
    </svg>`
  },

  /** HUD_BOSS_HEALTH_FILL — boss HP bar fill, red gradient, 200×10 */
  HUD_BOSS_HEALTH_FILL: { w: 200, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10">
      <defs>
        <linearGradient id="bh" x1="0" x2="1">
          <stop offset="0%" stop-color="#ff0000"/>
          <stop offset="100%" stop-color="#ff4400"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="10" fill="url(#bh)" rx="2"/>
      <rect x="2" y="2" width="196" height="2" fill="#ff8866" opacity="0.3"/>
    </svg>`
  },

  /** HUD_BOSS_HEALTH_BORDER — boss HP bar border, 200×10 */
  HUD_BOSS_HEALTH_BORDER: { w: 200, h: 10, svg:
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 10">
      <rect x="0.5" y="0.5" width="199" height="9" fill="none" stroke="#ffffff" stroke-width="1" rx="2"/>
    </svg>`
  },

};

// ═══════════════════════════════════════════════════════════
// SPRITE MANAGER
// ═══════════════════════════════════════════════════════════

/** Loads all SVG_DEFS into HTMLImageElements via blob URLs. */
export class SpriteManager {
  constructor() {
    /** @type {Record<string, HTMLImageElement>} */
    this.images = {};
  }

  /** @param {(ratio: number) => void} onProgress */
  async loadAll(onProgress) {
    const keys = Object.keys(SVG_DEFS);
    for (let i = 0; i < keys.length; i++) {
      await this._load(keys[i], SVG_DEFS[keys[i]].svg);
      if (onProgress) onProgress((i + 1) / keys.length);
    }
  }

  _load(name, svgStr) {
    return new Promise(resolve => {
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); this.images[name] = img; resolve(); };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(); }; // fail gracefully
      img.src = url;
    });
  }

  /** Returns natural width from SVG_DEFS. */
  nw(name) { return SVG_DEFS[name]?.w ?? 16; }
  /** Returns natural height from SVG_DEFS. */
  nh(name) { return SVG_DEFS[name]?.h ?? 16; }

  /**
   * Draw a sprite on a canvas context.
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} name  sprite key
   * @param {number} x     left edge
   * @param {number} y     top edge
   * @param {number} [w]   draw width  (defaults to natural width)
   * @param {number} [h]   draw height (defaults to natural height)
   * @param {boolean} [flipX=false]
   * @param {number}  [alpha=1]
   */
  draw(ctx, name, x, y, w, h, flipX = false, alpha = 1) {
    const img = this.images[name];
    if (!img) return;
    const def = SVG_DEFS[name];
    const dw = w ?? def.w;
    const dh = h ?? def.h;
    ctx.save();
    if (alpha !== 1) ctx.globalAlpha = alpha;
    if (flipX) {
      ctx.translate(x + dw, y);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, dw, dh);
    } else {
      ctx.drawImage(img, x, y, dw, dh);
    }
    ctx.restore();
  }
}

#!/usr/bin/env node
// Generates ArtempireMJ social/brand covers (PNG) from the master-circle logo + brand colours.
// Teal field, the colourful master mark, ivory serif wordmark + tagline, an ember accent rule.
// node scripts/make-brand-covers.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('C:/Users/User/Desktop/artempiremj-ai-platform/site/');
const sharp = require('sharp');

const LOGO = new URL('../frontend/assets/logos/master-circle.png', import.meta.url);
const OUT = new URL('../brand-covers/', import.meta.url);
fs.mkdirSync(OUT, { recursive: true });
const logo64 = fs.readFileSync(LOGO).toString('base64');

const C = { teal: '#1A3A42', orange: '#E8891C', ivory: '#F1E8D4', ink: '#15100C' };
const esc = (s) => s.replace(/&/g, '&amp;');

// Horizontal lockup: logo on the left, wordmark + tagline on the right. Sizes scale to the canvas.
function svgCover(w, h, opts = {}) {
  const pad = Math.round(h * 0.16);
  const logoSize = Math.min(h - pad * 2, Math.round(w * 0.28));
  const lx = opts.center ? (w - logoSize) / 2 : pad * 1.4;
  const ly = opts.center ? pad * 0.7 : (h - logoSize) / 2;
  const textX = opts.center ? w / 2 : lx + logoSize + pad * 0.9;
  const anchor = opts.center ? 'middle' : 'start';
  const wordSize = Math.round(h * (opts.center ? 0.16 : 0.20));
  const tagSize = Math.round(h * (opts.center ? 0.072 : 0.085));
  const wordY = opts.center ? ly + logoSize + wordSize * 1.1 : h / 2 - tagSize * 0.2;
  const tagY = wordY + tagSize * 1.7;
  const showTag = h > 240;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1F4651"/><stop offset="1" stop-color="${C.teal}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="0" y="${h - Math.max(6, h * 0.012)}" width="${w}" height="${Math.max(6, h * 0.012)}" fill="${C.orange}"/>
  <image x="${lx}" y="${ly}" width="${logoSize}" height="${logoSize}" href="data:image/png;base64,${logo64}"/>
  <text x="${textX}" y="${wordY}" text-anchor="${anchor}" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${wordSize}" fill="${C.ivory}" letter-spacing="0.5">ArtempireMJ</text>
  ${showTag ? `<text x="${textX}" y="${tagY}" text-anchor="${anchor}" font-family="Georgia, serif" font-style="italic" font-size="${tagSize}" fill="#E9DCC2">The world, told through artists.</text>` : ''}
</svg>`;
}

const sizes = [
  { name: 'facebook-cover-1640x624', w: 1640, h: 624 },
  { name: 'linkedin-personal-1584x396', w: 1584, h: 396 },
  { name: 'linkedin-company-1128x191', w: 1128, h: 191 },
  { name: 'x-header-1500x500', w: 1500, h: 500 },
  { name: 'gbp-cover-1080x608', w: 1080, h: 608 },
  { name: 'og-share-1200x630', w: 1200, h: 630, center: true },
  { name: 'instagram-square-1080x1080', w: 1080, h: 1080, center: true },
];

const run = async () => {
  for (const s of sizes) {
    const svg = svgCover(s.w, s.h, s);
    const out = new URL(`./artempiremj-${s.name}.png`, OUT);
    await sharp(Buffer.from(svg)).png().toFile(out.pathname.replace(/^\//, process.platform === 'win32' ? '' : '/'));
    console.log(`  ${s.name} (${s.w}x${s.h})`);
  }
  console.log(`\n  Covers in ${OUT.pathname}`);
};
run().catch((e) => { console.error(e); process.exit(1); });

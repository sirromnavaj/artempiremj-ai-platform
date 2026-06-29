#!/usr/bin/env node
// Composes the retina journey screenshots into a premium, Apple-style showcase for a Google post.
import { createRequire } from 'node:module';
const require = createRequire('C:/Users/User/Desktop/artempiremj-ai-platform/site/');
const sharp = require('sharp');

const SHOTS = 'C:/Users/User/Desktop/artempiremj-ai-platform/brand-shots/';
const LOGO = 'C:/Users/User/Desktop/artempiremj-ai-platform/frontend/assets/logos/master-circle.png';
const OUT = SHOTS + 'artempiremj-journey-showcase.png';
const W = 1200, H = 1200, teal = '#1A3A42';

async function card(file, cw, ch) {
  const meta = await sharp(SHOTS + file).metadata();
  const cropH = Math.min(meta.height, Math.round(meta.width * (ch / cw)));
  const base = await sharp(SHOTS + file)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .resize(cw, ch, { fit: 'cover', position: 'top' }).png().toBuffer();
  const mask = Buffer.from(`<svg width="${cw}" height="${ch}"><rect width="${cw}" height="${ch}" rx="16" ry="16"/></svg>`);
  return sharp(base).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

const run = async () => {
  const logo = await sharp(LOGO).resize(120, 120).png().toBuffer();
  const c1 = await card('01-home.png', 1032, 360);
  const c2 = await card('02-festivals.png', 504, 318);
  const c3 = await card('03-festival.png', 504, 318);

  const t = (x, y, s, fill, str, opts = '') => `<text x="${x}" y="${y}" font-family="Georgia,serif" font-size="${s}" fill="${fill}" ${opts}>${str}</text>`;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#214d59"/><stop offset="1" stop-color="${teal}"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect x="0" y="${H - 12}" width="${W}" height="12" fill="#E8891C"/>
    ${t(W/2, 205, 56, '#F1E8D4', 'ArtempireMJ', 'text-anchor="middle" font-weight="700" letter-spacing="0.5"')}
    ${t(W/2, 244, 26, '#E9DCC2', 'The world, told through artists.', 'text-anchor="middle" font-style="italic"')}
    ${t(84, 296, 25, '#E8891C', '1', 'font-weight="700"')}${t(112, 296, 24, '#F1E8D4', 'Land on the world’s art')}
    ${t(84, 706, 25, '#E8891C', '2', 'font-weight="700"')}${t(112, 706, 24, '#F1E8D4', 'Find what’s on, Kenya to the world')}
    ${t(612, 706, 25, '#E8891C', '3', 'font-weight="700"')}${t(640, 706, 24, '#F1E8D4', 'Plan the trip, free')}
    ${t(W/2, 1140, 30, '#F1E8D4', 'Free for artists · artempiremj.com', 'text-anchor="middle" font-weight="700"')}
  </svg>`);

  await sharp(bg).composite([
    { input: logo, top: 40, left: Math.round((W - 120) / 2) },
    { input: c1, top: 312, left: 84 },
    { input: c2, top: 722, left: 84 },
    { input: c3, top: 722, left: 612 },
  ]).png().toFile(OUT);
  console.log('  showcase ->', OUT);
};
run().catch((e) => { console.error(e.message); process.exit(1); });

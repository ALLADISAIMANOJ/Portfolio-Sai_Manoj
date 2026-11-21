import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { profile } from '../data/profile';
const xml = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const GET: APIRoute = async () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <radialGradient id="v"><stop stop-color="#6d28ae"/><stop offset="1" stop-color="#07070b" stop-opacity="0"/></radialGradient>
      <radialGradient id="t"><stop stop-color="#116878"/><stop offset="1" stop-color="#07070b" stop-opacity="0"/></radialGradient>
      <linearGradient id="glow"><stop stop-color="#c4b5fd"/><stop offset=".47" stop-color="#f0abfc"/><stop offset="1" stop-color="#5eead4"/></linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#07070b"/>
    <ellipse cx="255" cy="90" rx="770" ry="550" fill="url(#v)"/><ellipse cx="1150" cy="55" rx="530" ry="400" fill="url(#t)"/>
    <circle cx="102" cy="101" r="35" fill="url(#glow)"/><text x="102" y="110" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="#10101a">${xml(profile.initials)}</text>
    <g font-family="sans-serif"><text x="70" y="295" font-size="91" font-weight="bold" fill="#f3f3f8" letter-spacing="-4">${xml(profile.name)}</text>
      <text x="74" y="382" font-size="47" fill="url(#glow)">Reliable AI agents. Resilient backends.</text>
      <path d="M74 478h1052" stroke="#777589" opacity=".5"/><text x="74" y="539" font-size="25" fill="#c6c4d5">${xml(profile.title)}  ·  ${xml(profile.location)}</text>
    </g>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

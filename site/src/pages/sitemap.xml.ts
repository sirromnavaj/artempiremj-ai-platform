// Generated sitemap. Add routes here as pages ship.
const site = 'https://artempiremj.com';
const paths = ['/', '/spotlight', '/discover', '/itineraries', '/studio', '/studio/commission', '/sponsor', '/about'];

export async function GET() {
  const urls = paths
    .map((p) => `  <url><loc>${site}${p === '/' ? '' : p}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

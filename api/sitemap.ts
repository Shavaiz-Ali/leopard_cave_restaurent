const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/menu', priority: '0.8', changefreq: 'monthly' },
  { path: '/menu-images', priority: '0.8', changefreq: 'monthly' },
  { path: '/menu-cards', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.8', changefreq: 'monthly' },
  { path: '/videos', priority: '0.7', changefreq: 'monthly' },
  { path: '/reservation', priority: '0.9', changefreq: 'yearly' },
  { path: '/nearby', priority: '0.7', changefreq: 'monthly' },
  { path: '/location', priority: '0.8', changefreq: 'yearly' },
  { path: '/about', priority: '0.8', changefreq: 'yearly' },
  { path: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { path: '/social-media', priority: '0.6', changefreq: 'monthly' },
  { path: '/leopard-cave-resort', priority: '0.8', changefreq: 'monthly' },
  { path: '/campaign-reservation', priority: '0.7', changefreq: 'monthly' },
];

export default function handler(_req: any, res: any) {
  const baseUrl = 'https://leopardcaverestaurant.com';
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(xml);
}

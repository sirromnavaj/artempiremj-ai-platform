import { defineConfig } from 'astro/config';

// Static output: content lives in the served HTML (crawlable + AEO), per skill
// v3.17 SITE DISCIPLINE (#24). Interactive bits become islands where needed.
export default defineConfig({
  site: 'https://artempiremj.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});

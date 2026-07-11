import { defineConfig } from 'astro/config';

// Solves configuration mapping during Vercel dynamic page rendering
export default defineConfig({
  output: 'static'
});

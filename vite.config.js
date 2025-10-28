import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      // All requests that start with /api/openaq will be proxied
      '^/api/openaq/.*': {
        target: 'https://api.openaq.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/openaq/, ''), // strip prefix
        configure: (proxy, _options) => {
          // Inject the API key on **every** proxied request
          const apiKey = '461dfa48dc52970ab8da021154c328b11e17efbefa606bef512eaf210691843d';
          // if (!apiKey) {
          //   console.warn('Warning: VITE_OPENAQ_KEY is missing – OpenAQ calls will fail with 401');
          // }
          proxy.on('proxyReq', (proxyReq) => {
            if (apiKey) {
              proxyReq.setHeader('X-API-Key', apiKey);
            }
            proxyReq.setHeader('Accept', 'application/json');
          });
        },
      },
    },
  },
});
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const fromEnv = env.VITE_DEV_API_PROXY?.trim();
  /** Proxy /api during `vite` dev so /api/chat hits your Vercel deployment (plain Vite does not run serverless routes). */
  const apiProxy =
    fromEnv === '0' || fromEnv === 'false'
      ? ''
      : (fromEnv?.replace(/\/$/, '') ||
          (mode === 'development' ? 'https://michellewilliams.dev' : ''));

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: true,
      ...(apiProxy
        ? {
            proxy: {
              '/api': {
                target: apiProxy,
                changeOrigin: true,
                secure: true,
              },
            },
          }
        : {}),
    },
  };
});
